import { IDBPDatabase } from 'idb';
import { GymTrackerDB, initDB } from './schema';
import {
  Exercise,
  WorkoutSession,
  ExerciseHistory,
  UserGoals,
  WorkoutTemplate,
  ExerciseLog
} from '../types';
import { exercisesDatabase } from '../data/exercises';

let dbInstance: IDBPDatabase<GymTrackerDB> | null = null;

// Initialize the database and populate exercises
export async function getDB(): Promise<IDBPDatabase<GymTrackerDB>> {
  if (!dbInstance) {
    dbInstance = await initDB();
    await populateExercisesIfEmpty();
  }
  return dbInstance;
}

// Populate exercises database if empty
async function populateExercisesIfEmpty() {
  if (!dbInstance) return;

  const count = await dbInstance.count('exercises');
  if (count === 0) {
    const tx = dbInstance.transaction('exercises', 'readwrite');
    for (const exercise of exercisesDatabase) {
      await tx.store.put(exercise);
    }
    await tx.done;
  }
}

// =================
// EXERCISES
// =================

export async function getAllExercises(): Promise<Exercise[]> {
  const db = await getDB();
  return db.getAll('exercises');
}

export async function getExerciseById(id: string): Promise<Exercise | undefined> {
  const db = await getDB();
  return db.get('exercises', id);
}

export async function searchExercisesByName(query: string): Promise<Exercise[]> {
  const db = await getDB();
  const allExercises = await db.getAll('exercises');
  const lowercaseQuery = query.toLowerCase();
  return allExercises.filter(ex => ex.name.toLowerCase().includes(lowercaseQuery));
}

export async function getExercisesByMuscleGroup(muscleGroup: string): Promise<Exercise[]> {
  const db = await getDB();
  return db.getAllFromIndex('exercises', 'by-muscle-group', muscleGroup);
}

// =================
// WORKOUT SESSIONS
// =================

export async function saveWorkoutSession(session: WorkoutSession): Promise<void> {
  const db = await getDB();
  await db.put('workoutSessions', session);

  // Update exercise history for each exercise in the session
  for (const exerciseLog of session.exercises) {
    await updateExerciseHistory(exerciseLog, session.date);
  }
}

export async function getWorkoutSession(id: string): Promise<WorkoutSession | undefined> {
  const db = await getDB();
  return db.get('workoutSessions', id);
}

export async function getWorkoutSessionsByDateRange(startDate: Date, endDate: Date): Promise<WorkoutSession[]> {
  const db = await getDB();
  const allSessions = await db.getAll('workoutSessions');

  return allSessions.filter(session => {
    const sessionDate = new Date(session.date);
    return sessionDate >= startDate && sessionDate <= endDate;
  });
}

export async function getWorkoutSessionByDate(date: Date): Promise<WorkoutSession | undefined> {
  const db = await getDB();
  const allSessions = await db.getAll('workoutSessions');

  // Find session on this specific date
  return allSessions.find(session => {
    const sessionDate = new Date(session.date);
    return sessionDate.toDateString() === date.toDateString();
  });
}

export async function getAllWorkoutSessions(): Promise<WorkoutSession[]> {
  const db = await getDB();
  const sessions = await db.getAll('workoutSessions');
  return sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function deleteWorkoutSession(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('workoutSessions', id);
}

export async function updateWorkoutSession(session: WorkoutSession): Promise<void> {
  await saveWorkoutSession(session);
}

// =================
// EXERCISE HISTORY
// =================

async function updateExerciseHistory(exerciseLog: ExerciseLog, sessionDate: Date): Promise<void> {
  const db = await getDB();

  // Calculate max weight and total volume for this exercise
  const maxWeight = Math.max(...exerciseLog.sets.map(set => set.weight));
  const totalVolume = exerciseLog.sets.reduce((sum, set) => sum + (set.reps * set.weight), 0);

  // Get existing history or create new
  let history = await db.get('exerciseHistory', exerciseLog.exerciseId);

  if (!history) {
    history = {
      exerciseId: exerciseLog.exerciseId,
      personalRecords: {
        maxWeight,
        date: sessionDate
      },
      sessions: []
    };
  }

  // Update PR if needed
  if (maxWeight > history.personalRecords.maxWeight) {
    history.personalRecords = {
      maxWeight,
      date: sessionDate
    };
  }

  // Add or update session in history
  const existingSessionIndex = history.sessions.findIndex(
    s => new Date(s.date).toDateString() === sessionDate.toDateString()
  );

  const sessionData = {
    date: sessionDate,
    maxWeight,
    totalVolume,
    sets: exerciseLog.sets.length
  };

  if (existingSessionIndex >= 0) {
    history.sessions[existingSessionIndex] = sessionData;
  } else {
    history.sessions.push(sessionData);
  }

  // Sort sessions by date
  history.sessions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  await db.put('exerciseHistory', history);
}

export async function getExerciseHistory(exerciseId: string): Promise<ExerciseHistory | undefined> {
  const db = await getDB();
  return db.get('exerciseHistory', exerciseId);
}

export async function getAllExerciseHistory(): Promise<ExerciseHistory[]> {
  const db = await getDB();
  return db.getAll('exerciseHistory');
}

// =================
// USER GOALS
// =================

const GOALS_KEY = 'user-goals-singleton';

export async function getUserGoals(): Promise<UserGoals> {
  const db = await getDB();
  const goals = await db.get('userGoals', GOALS_KEY);

  if (!goals) {
    const defaultGoals: UserGoals = {
      workoutsPerWeek: 4,
      currentStreak: 0,
      longestStreak: 0
    };
    await db.put('userGoals', { ...defaultGoals, id: GOALS_KEY } as any);
    return defaultGoals;
  }

  return goals;
}

export async function saveUserGoals(goals: UserGoals): Promise<void> {
  const db = await getDB();
  await db.put('userGoals', { ...goals, id: GOALS_KEY } as any);
}

export async function updateStreakData(): Promise<void> {
  const goals = await getUserGoals();
  const sessions = await getAllWorkoutSessions();

  if (sessions.length === 0) {
    goals.currentStreak = 0;
    goals.lastWorkoutDate = undefined;
    await saveUserGoals(goals);
    return;
  }

  // Calculate streaks based on weekly workout goals
  const streakData = calculateStreak(sessions, goals.workoutsPerWeek);

  goals.currentStreak = streakData.currentStreak;
  goals.longestStreak = Math.max(goals.longestStreak, streakData.currentStreak);
  goals.lastWorkoutDate = sessions[0].date;

  await saveUserGoals(goals);
}

function calculateStreak(sessions: WorkoutSession[], workoutsPerWeek: number): { currentStreak: number } {
  // Group sessions by week (Monday-Sunday)
  const weekMap = new Map<string, number>();

  sessions.forEach(session => {
    const date = new Date(session.date);
    const weekKey = getWeekKey(date);
    weekMap.set(weekKey, (weekMap.get(weekKey) || 0) + 1);
  });

  // Calculate current streak
  let currentStreak = 0;
  const today = new Date();
  let checkDate = new Date(today);

  // Start from current week and go backwards
  while (true) {
    const weekKey = getWeekKey(checkDate);
    const workoutsThisWeek = weekMap.get(weekKey) || 0;

    if (workoutsThisWeek >= workoutsPerWeek) {
      currentStreak++;
      // Move to previous week
      checkDate.setDate(checkDate.getDate() - 7);
    } else {
      break;
    }
  }

  return { currentStreak };
}

function getWeekKey(date: Date): string {
  // Get Monday of the week for this date
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  const monday = new Date(d.setDate(diff));
  return monday.toISOString().split('T')[0];
}

// =================
// TEMPLATES
// =================

export async function saveTemplate(template: WorkoutTemplate): Promise<void> {
  const db = await getDB();
  await db.put('templates', template);
}

export async function getTemplate(id: string): Promise<WorkoutTemplate | undefined> {
  const db = await getDB();
  return db.get('templates', id);
}

export async function getAllTemplates(): Promise<WorkoutTemplate[]> {
  const db = await getDB();
  const templates = await db.getAll('templates');
  return templates.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
}

export async function deleteTemplate(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('templates', id);
}

// =================
// AUTO-GROUPING
// =================

export async function groupExercisesByProximity(exercises: ExerciseLog[]): Promise<WorkoutSession[]> {
  const TWO_HOURS = 2 * 60 * 60 * 1000;
  const sessions: WorkoutSession[] = [];
  let currentSession: ExerciseLog[] = [];
  let lastTimestamp: Date | null = null;

  // Sort exercises by timestamp
  const sortedExercises = [...exercises].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  for (const exercise of sortedExercises) {
    const exerciseTime = new Date(exercise.timestamp).getTime();

    if (lastTimestamp && exerciseTime - new Date(lastTimestamp).getTime() > TWO_HOURS) {
      // Create new session from current group
      if (currentSession.length > 0) {
        sessions.push(createSessionFromExercises(currentSession));
      }
      currentSession = [];
    }

    currentSession.push(exercise);
    lastTimestamp = exercise.timestamp;
  }

  // Don't forget the last session
  if (currentSession.length > 0) {
    sessions.push(createSessionFromExercises(currentSession));
  }

  return sessions;
}

function createSessionFromExercises(exercises: ExerciseLog[]): WorkoutSession {
  const startTime = new Date(exercises[0].timestamp);
  const endTime = new Date(exercises[exercises.length - 1].timestamp);

  return {
    id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    date: startTime,
    startTime,
    endTime,
    exercises,
    autoGrouped: true
  };
}
