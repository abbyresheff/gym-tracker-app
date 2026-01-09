import React, { useState, useEffect } from 'react';
import SetEntry from './SetEntry';
import { ExerciseLog, SetLog, Exercise, ExerciseHistory } from '../../types';
import { getExerciseById, getExerciseHistory } from '../../db/indexedDB';
import { getMuscleGroupInfo } from '../../data/muscleGroups';
import './ExerciseCard.css';

interface ExerciseCardProps {
  exerciseLog: ExerciseLog;
  onUpdate: (updatedLog: ExerciseLog) => void;
  onDelete: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exerciseLog, onUpdate, onDelete }) => {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [exerciseHistory, setExerciseHistory] = useState<ExerciseHistory | null>(null);

  useEffect(() => {
    loadExerciseDetails();
    loadHistory();
  }, [exerciseLog.exerciseId]);

  const loadExerciseDetails = async () => {
    try {
      const ex = await getExerciseById(exerciseLog.exerciseId);
      if (ex) setExercise(ex);
    } catch (error) {
      console.error('Error loading exercise details:', error);
    }
  };

  const loadHistory = async () => {
    try {
      const history = await getExerciseHistory(exerciseLog.exerciseId);
      setExerciseHistory(history || null);
    } catch (error) {
      console.error('Error loading exercise history:', error);
    }
  };

  const checkSetPRStatus = (weight: number): { isPR: boolean; isMatched: boolean } => {
    if (!exerciseHistory || exerciseHistory.sessions.length === 0) {
      return { isPR: false, isMatched: false };
    }

    const previousMaxWeight = exerciseHistory.personalRecords.maxWeight;

    if (weight > previousMaxWeight) {
      return { isPR: true, isMatched: false };
    } else if (weight === previousMaxWeight) {
      return { isPR: false, isMatched: true };
    }

    return { isPR: false, isMatched: false };
  };

  const handleAddSet = () => {
    // Inherit values from previous set, or use defaults
    const previousSet = exerciseLog.sets[exerciseLog.sets.length - 1];
    const newSet: SetLog = {
      setNumber: exerciseLog.sets.length + 1,
      reps: previousSet?.reps || 8,
      weight: previousSet?.weight || 0,
      completed: false
    };

    onUpdate({
      ...exerciseLog,
      sets: [...exerciseLog.sets, newSet]
    });
  };

  const handleUpdateSet = (index: number, updatedSet: SetLog) => {
    const newSets = [...exerciseLog.sets];
    newSets[index] = updatedSet;
    onUpdate({
      ...exerciseLog,
      sets: newSets
    });
  };

  const handleDeleteSet = (index: number) => {
    const newSets = exerciseLog.sets.filter((_, i) => i !== index);
    // Renumber the remaining sets
    const renumberedSets = newSets.map((set, i) => ({
      ...set,
      setNumber: i + 1
    }));
    onUpdate({
      ...exerciseLog,
      sets: renumberedSets
    });
  };

  const getTotalVolume = () => {
    return exerciseLog.sets.reduce((sum, set) => sum + (set.reps * set.weight), 0);
  };

  const muscleGroupInfo = exercise ? getMuscleGroupInfo(exercise.primaryMuscleGroup) : null;

  return (
    <div className="exercise-card">
      <div className="exercise-card-header">
        <div className="exercise-info">
          <button
            className="expand-button"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '▼' : '▶'}
          </button>
          <div className="exercise-title">
            <h3>{exerciseLog.exerciseName}</h3>
            {muscleGroupInfo && (
              <span
                className="muscle-badge"
                style={{ backgroundColor: muscleGroupInfo.color }}
              >
                {muscleGroupInfo.displayName}
              </span>
            )}
          </div>
        </div>

        <div className="exercise-stats">
          <span className="stat-item">
            {exerciseLog.sets.length} {exerciseLog.sets.length === 1 ? 'set' : 'sets'}
          </span>
          {exerciseLog.sets.length > 0 && (
            <span className="stat-item text-secondary">
              {getTotalVolume().toLocaleString()} lbs total
            </span>
          )}
          <button
            className="delete-exercise-button"
            onClick={onDelete}
            title="Delete exercise"
          >
            ✕
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="exercise-card-content">
          {exerciseLog.sets.length === 0 ? (
            <div className="no-sets">
              <p className="text-secondary">No sets logged yet</p>
              <button className="add-set-button primary" onClick={handleAddSet}>
                + Add First Set
              </button>
            </div>
          ) : (
            <>
              <div className="sets-list">
                {exerciseLog.sets.map((set, index) => {
                  const { isPR, isMatched } = checkSetPRStatus(set.weight);
                  return (
                    <SetEntry
                      key={index}
                      set={set}
                      setNumber={index + 1}
                      onUpdate={(updated) => handleUpdateSet(index, updated)}
                      onDelete={() => handleDeleteSet(index)}
                      isPR={isPR}
                      isMatched={isMatched}
                    />
                  );
                })}
              </div>
              <button className="add-set-button secondary" onClick={handleAddSet}>
                + Add Set
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(ExerciseCard);
