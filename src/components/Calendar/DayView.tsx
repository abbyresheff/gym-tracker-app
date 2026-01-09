import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import ExerciseSelector from '../WorkoutLogger/ExerciseSelector';
import ExerciseCard from '../WorkoutLogger/ExerciseCard';
import MuscleGroupIndicator from '../WorkoutLogger/MuscleGroupIndicator';
import TemplateManager from '../WorkoutLogger/TemplateManager';
import { WorkoutSession, ExerciseLog, Exercise, WorkoutTemplate, SetLog } from '../../types';
import { getWorkoutSessionByDate, saveWorkoutSession } from '../../db/indexedDB';
import './DayView.css';

interface DayViewProps {
  selectedDate: Date;
  onBack: () => void;
}

const DayView: React.FC<DayViewProps> = ({ selectedDate, onBack }) => {
  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);
  const [showTemplateManager, setShowTemplateManager] = useState(false);
  const [saveTimeout, setSaveTimeout] = useState<number | null>(null);

  useEffect(() => {
    loadSession();
  }, [selectedDate]);

  const loadSession = async () => {
    setIsLoading(true);
    try {
      const existingSession = await getWorkoutSessionByDate(selectedDate);
      if (existingSession) {
        setSession(existingSession);
      } else {
        // Create new empty session
        const newSession: WorkoutSession = {
          id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          date: selectedDate,
          startTime: new Date(),
          exercises: [],
          autoGrouped: false
        };
        setSession(newSession);
      }
    } catch (error) {
      console.error('Error loading session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-save with debounce
  const debouncedSave = useCallback((updatedSession: WorkoutSession) => {
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }

    const timeout = setTimeout(async () => {
      try {
        await saveWorkoutSession(updatedSession);
      } catch (error) {
        console.error('Error saving session:', error);
      }
    }, 500);

    setSaveTimeout(timeout);
  }, [saveTimeout]);

  const handleAddExercise = (exercise: Exercise) => {
    if (!session) return;

    const newExerciseLog: ExerciseLog = {
      id: `exercise-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      sets: [],
      timestamp: new Date()
    };

    const updatedSession = {
      ...session,
      exercises: [...session.exercises, newExerciseLog]
    };

    setSession(updatedSession);
    setShowExerciseSelector(false);
    debouncedSave(updatedSession);
  };

  const handleUpdateExercise = (exerciseId: string, updatedExercise: ExerciseLog) => {
    if (!session) return;

    const updatedSession = {
      ...session,
      exercises: session.exercises.map(ex =>
        ex.id === exerciseId ? updatedExercise : ex
      )
    };

    setSession(updatedSession);
    debouncedSave(updatedSession);
  };

  const handleDeleteExercise = (exerciseId: string) => {
    if (!session) return;

    const updatedSession = {
      ...session,
      exercises: session.exercises.filter(ex => ex.id !== exerciseId)
    };

    setSession(updatedSession);
    debouncedSave(updatedSession);
  };

  const handleLoadTemplate = (template: WorkoutTemplate) => {
    if (!session) return;

    // Convert template exercises to exercise logs
    const newExercises: ExerciseLog[] = template.exercises.map(templateExercise => {
      // Create initial sets based on template
      const initialSets: SetLog[] = Array.from({ length: templateExercise.targetSets }, (_, index) => ({
        setNumber: index + 1,
        reps: templateExercise.targetReps,
        weight: templateExercise.lastWeight || 0,
        completed: false
      }));

      return {
        id: `exercise-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        exerciseId: templateExercise.exerciseId,
        exerciseName: templateExercise.exerciseName,
        sets: initialSets,
        timestamp: new Date()
      };
    });

    const updatedSession = {
      ...session,
      exercises: [...session.exercises, ...newExercises]
    };

    setSession(updatedSession);
    debouncedSave(updatedSession);
  };

  if (isLoading) {
    return (
      <div className="day-view">
        <div className="day-view-loading">Loading workout...</div>
      </div>
    );
  }

  return (
    <div className="day-view">
      <div className="day-view-header">
        <button onClick={onBack} className="back-button">
          ← Back to Calendar
        </button>
        <h2 className="day-view-title">
          {format(selectedDate, 'EEEE, MMMM d, yyyy')}
        </h2>
      </div>

      <MuscleGroupIndicator exerciseLogs={session?.exercises || []} />

      <div className="day-view-content">
        {session && session.exercises.length === 0 && !showExerciseSelector && (
          <div className="empty-state">
            <p className="empty-state-text">No exercises logged yet</p>
            <div className="empty-state-actions">
              <button
                className="add-exercise-button primary"
                onClick={() => setShowExerciseSelector(true)}
              >
                + Add First Exercise
              </button>
              <button
                className="template-button"
                onClick={() => setShowTemplateManager(true)}
              >
                📋 Use Template
              </button>
            </div>
          </div>
        )}

        {session && session.exercises.length > 0 && (
          <div className="exercises-list">
            {session.exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exerciseLog={exercise}
                onUpdate={(updated) => handleUpdateExercise(exercise.id, updated)}
                onDelete={() => handleDeleteExercise(exercise.id)}
              />
            ))}
          </div>
        )}

        {session && session.exercises.length > 0 && !showExerciseSelector && (
          <div className="action-buttons">
            <button
              className="add-exercise-button secondary"
              onClick={() => setShowExerciseSelector(true)}
            >
              + Add Exercise
            </button>
            <button
              className="template-button secondary"
              onClick={() => setShowTemplateManager(true)}
            >
              📋 Templates
            </button>
          </div>
        )}

        {showExerciseSelector && (
          <ExerciseSelector
            onSelect={handleAddExercise}
            onCancel={() => setShowExerciseSelector(false)}
          />
        )}

        {showTemplateManager && (
          <TemplateManager
            onSelectTemplate={handleLoadTemplate}
            onClose={() => setShowTemplateManager(false)}
            currentSession={session || undefined}
          />
        )}
      </div>
    </div>
  );
};

export default DayView;
