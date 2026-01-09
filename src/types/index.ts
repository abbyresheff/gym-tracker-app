// Muscle Groups - 16 anatomical groups
export type MuscleGroup =
  | 'front-delts' | 'side-delts' | 'rear-delts'
  | 'upper-chest' | 'mid-chest' | 'lower-chest'
  | 'lats' | 'upper-back' | 'mid-back' | 'lower-back'
  | 'biceps' | 'triceps' | 'forearms'
  | 'quads' | 'hamstrings' | 'glutes' | 'calves'
  | 'abs' | 'obliques';

export type ExerciseCategory = 'barbell' | 'dumbbell' | 'machine' | 'cable' | 'bodyweight';

export type PRStatus = 'PR' | 'MATCHED' | 'REGRESSION' | 'NO_DATA';

// Exercise Database
export interface Exercise {
  id: string;
  name: string;
  primaryMuscleGroup: MuscleGroup;
  category: ExerciseCategory;
  commonRepRanges?: string;
}

// Workout Session
export interface WorkoutSession {
  id: string;
  date: Date;
  startTime: Date;
  endTime?: Date;
  exercises: ExerciseLog[];
  autoGrouped: boolean;
}

export interface ExerciseLog {
  id: string;
  exerciseId: string;
  exerciseName: string;
  sets: SetLog[];
  notes?: string;
  timestamp: Date;
}

export interface SetLog {
  setNumber: number;
  reps: number;
  weight: number; // in pounds
  completed: boolean;
}

// Exercise History & Progress
export interface ExerciseHistory {
  exerciseId: string;
  personalRecords: {
    maxWeight: number;
    date: Date;
  };
  sessions: {
    date: Date;
    maxWeight: number;
    totalVolume: number;
    sets: number;
  }[];
}

// User Goals
export interface UserGoals {
  workoutsPerWeek: number;
  currentStreak: number;
  longestStreak: number;
  lastWorkoutDate?: Date;
}

// Workout Template
export interface WorkoutTemplate {
  id: string;
  name: string;
  exercises: {
    exerciseId: string;
    exerciseName: string;
    targetSets: number;
    targetReps: number;
    lastWeight?: number;
  }[];
  createdDate: Date;
}

// UI State Types
export type CalendarView = 'month' | 'week' | 'day';

export interface DateSelection {
  selectedDate: Date;
  viewMode: CalendarView;
}
