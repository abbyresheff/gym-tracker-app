import React, { useState, useEffect } from 'react';
import { ExerciseLog, MuscleGroup } from '../../types';
import { getExerciseById } from '../../db/indexedDB';
import { getMuscleGroupInfo } from '../../data/muscleGroups';
import './MuscleGroupIndicator.css';

interface MuscleGroupIndicatorProps {
  exerciseLogs: ExerciseLog[];
}

const MuscleGroupIndicator: React.FC<MuscleGroupIndicatorProps> = ({ exerciseLogs }) => {
  const [activeMuscleGroups, setActiveMuscleGroups] = useState<MuscleGroup[]>([]);

  useEffect(() => {
    loadMuscleGroups();
  }, [exerciseLogs]);

  const loadMuscleGroups = async () => {
    const muscleGroupsSet = new Set<MuscleGroup>();

    for (const log of exerciseLogs) {
      try {
        const exercise = await getExerciseById(log.exerciseId);
        if (exercise) {
          muscleGroupsSet.add(exercise.primaryMuscleGroup);
        }
      } catch (error) {
        console.error('Error loading exercise:', error);
      }
    }

    setActiveMuscleGroups(Array.from(muscleGroupsSet));
  };

  if (activeMuscleGroups.length === 0) {
    return null;
  }

  return (
    <div className="muscle-group-indicator">
      <div className="indicator-label">Muscles Trained:</div>
      <div className="muscle-badges">
        {activeMuscleGroups.map(muscleGroup => {
          const info = getMuscleGroupInfo(muscleGroup);
          return (
            <div
              key={muscleGroup}
              className="muscle-badge-indicator"
              style={{ backgroundColor: info.color }}
              title={info.displayName}
            >
              {info.displayName}
            </div>
          );
        })}
      </div>
      <div className="indicator-count">
        {activeMuscleGroups.length} {activeMuscleGroups.length === 1 ? 'group' : 'groups'}
      </div>
    </div>
  );
};

export default MuscleGroupIndicator;
