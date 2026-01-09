import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Exercise, WorkoutSession, ExerciseHistory, UserGoals, WorkoutTemplate } from '../types';

// Define the database schema
export interface GymTrackerDB extends DBSchema {
  exercises: {
    key: string;
    value: Exercise;
    indexes: {
      'by-name': string;
      'by-muscle-group': string;
      'by-category': string;
    };
  };
  workoutSessions: {
    key: string;
    value: WorkoutSession;
    indexes: {
      'by-date': Date;
      'by-start-time': Date;
    };
  };
  exerciseHistory: {
    key: string; // exerciseId
    value: ExerciseHistory;
  };
  userGoals: {
    key: string; // singleton key
    value: UserGoals;
  };
  templates: {
    key: string;
    value: WorkoutTemplate;
    indexes: {
      'by-created-date': Date;
    };
  };
}

const DB_NAME = 'GymTrackerDB';
const DB_VERSION = 1;

export async function initDB(): Promise<IDBPDatabase<GymTrackerDB>> {
  const db = await openDB<GymTrackerDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create exercises store
      if (!db.objectStoreNames.contains('exercises')) {
        const exerciseStore = db.createObjectStore('exercises', { keyPath: 'id' });
        exerciseStore.createIndex('by-name', 'name');
        exerciseStore.createIndex('by-muscle-group', 'primaryMuscleGroup');
        exerciseStore.createIndex('by-category', 'category');
      }

      // Create workoutSessions store
      if (!db.objectStoreNames.contains('workoutSessions')) {
        const sessionStore = db.createObjectStore('workoutSessions', { keyPath: 'id' });
        sessionStore.createIndex('by-date', 'date');
        sessionStore.createIndex('by-start-time', 'startTime');
      }

      // Create exerciseHistory store
      if (!db.objectStoreNames.contains('exerciseHistory')) {
        db.createObjectStore('exerciseHistory', { keyPath: 'exerciseId' });
      }

      // Create userGoals store
      if (!db.objectStoreNames.contains('userGoals')) {
        db.createObjectStore('userGoals', { keyPath: 'id' });
      }

      // Create templates store
      if (!db.objectStoreNames.contains('templates')) {
        const templateStore = db.createObjectStore('templates', { keyPath: 'id' });
        templateStore.createIndex('by-created-date', 'createdDate');
      }
    },
  });

  return db;
}
