import { WorkoutSession, ExerciseLog, PRStatus } from '../types';
import { getExerciseHistory } from '../db/indexedDB';

/**
 * Detects PR status for a workout session by comparing against exercise history
 */
export async function detectSessionPRStatus(session: WorkoutSession): Promise<PRStatus> {
  if (!session.exercises || session.exercises.length === 0) {
    return 'NO_DATA';
  }

  let hasPR = false;
  let hasMatched = false;
  let hasRegression = false;

  for (const exercise of session.exercises) {
    const status = await detectExercisePRStatus(exercise, session.date);

    if (status === 'PR') {
      hasPR = true;
    } else if (status === 'MATCHED') {
      hasMatched = true;
    } else if (status === 'REGRESSION') {
      hasRegression = true;
    }
  }

  // Prioritize PR > Matched > Regression
  if (hasPR) return 'PR';
  if (hasMatched) return 'MATCHED';
  if (hasRegression) return 'REGRESSION';

  return 'NO_DATA';
}

/**
 * Detects PR status for a single exercise by comparing max weight against history
 */
export async function detectExercisePRStatus(
  exercise: ExerciseLog,
  sessionDate: Date
): Promise<PRStatus> {
  if (!exercise.sets || exercise.sets.length === 0) {
    return 'NO_DATA';
  }

  try {
    const history = await getExerciseHistory(exercise.exerciseId);

    if (!history) {
      return 'NO_DATA';
    }

    // Get max weight from current exercise
    const currentMaxWeight = Math.max(...exercise.sets.map(set => set.weight));

    // Get previous sessions (before this date)
    const previousSessions = history.sessions.filter(
      s => new Date(s.date).getTime() < new Date(sessionDate).getTime()
    );

    if (previousSessions.length === 0) {
      return 'NO_DATA';
    }

    // Get previous max weight
    const previousMaxWeight = Math.max(...previousSessions.map(s => s.maxWeight));

    if (currentMaxWeight > previousMaxWeight) {
      return 'PR';
    } else if (currentMaxWeight === previousMaxWeight) {
      return 'MATCHED';
    } else {
      return 'REGRESSION';
    }
  } catch (error) {
    console.error('Error detecting PR status:', error);
    return 'NO_DATA';
  }
}

/**
 * Gets the color for a PR status
 */
export function getPRStatusColor(status: PRStatus): string {
  switch (status) {
    case 'PR':
      return '#10B981'; // Green
    case 'MATCHED':
      return '#F59E0B'; // Orange
    case 'REGRESSION':
      return '#EF4444'; // Red
    case 'NO_DATA':
    default:
      return '#9CA3AF'; // Gray
  }
}

/**
 * Gets the label for a PR status
 */
export function getPRStatusLabel(status: PRStatus): string {
  switch (status) {
    case 'PR':
      return 'Personal Record';
    case 'MATCHED':
      return 'Matched Previous';
    case 'REGRESSION':
      return 'Below Previous';
    case 'NO_DATA':
    default:
      return 'No History';
  }
}
