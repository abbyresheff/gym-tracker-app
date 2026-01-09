import React, { useState, useEffect } from 'react';
import { Exercise, ExerciseHistory } from '../../types';
import { getAllExercises, getAllExerciseHistory } from '../../db/indexedDB';
import { getMuscleGroupInfo } from '../../data/muscleGroups';
import { format } from 'date-fns';
import LoadingSpinner from '../Shared/LoadingSpinner';
import './ExerciseList.css';

interface ExerciseWithHistory {
  exercise: Exercise;
  history: ExerciseHistory;
}

interface ExerciseListProps {
  onSelectExercise: (exerciseId: string) => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({ onSelectExercise }) => {
  const [exercisesWithHistory, setExercisesWithHistory] = useState<ExerciseWithHistory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      const [exercises, histories] = await Promise.all([
        getAllExercises(),
        getAllExerciseHistory()
      ]);

      // Filter exercises that have history
      const exercisesWithData: ExerciseWithHistory[] = [];

      for (const history of histories) {
        const exercise = exercises.find(ex => ex.id === history.exerciseId);
        if (exercise && history.sessions.length > 0) {
          exercisesWithData.push({ exercise, history });
        }
      }

      // Sort by last performed date (most recent first)
      exercisesWithData.sort((a, b) => {
        const aLastDate = a.history.sessions[a.history.sessions.length - 1]?.date;
        const bLastDate = b.history.sessions[b.history.sessions.length - 1]?.date;
        return new Date(bLastDate).getTime() - new Date(aLastDate).getTime();
      });

      setExercisesWithHistory(exercisesWithData);
    } catch (error) {
      console.error('Error loading exercises:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredExercises = exercisesWithHistory.filter(({ exercise }) =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="exercise-list">
        <LoadingSpinner size="large" text="Loading exercise history..." />
      </div>
    );
  }

  if (exercisesWithHistory.length === 0) {
    return (
      <div className="exercise-list">
        <div className="empty-state">
          <h3>No exercise history yet</h3>
          <p className="text-secondary">
            Start logging workouts to see your progress here!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="exercise-list">
      <div className="list-header">
        <h2>Exercise Progress</h2>
        <input
          type="text"
          className="search-input"
          placeholder="Search exercises..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search exercises"
        />
      </div>

      <div className="exercises-grid">
        {filteredExercises.length === 0 ? (
          <div className="no-results">
            <p>No exercises found</p>
            <p className="text-secondary">Try a different search term</p>
          </div>
        ) : (
          filteredExercises.map(({ exercise, history }) => {
            const muscleGroupInfo = getMuscleGroupInfo(exercise.primaryMuscleGroup);
            const lastSession = history.sessions[history.sessions.length - 1];
            const sessionCount = history.sessions.length;

            return (
              <button
                key={exercise.id}
                className="exercise-card-progress"
                onClick={() => onSelectExercise(exercise.id)}
                aria-label={`View progress for ${exercise.name}`}
              >
                <div className="exercise-header">
                  <h3 className="exercise-name">{exercise.name}</h3>
                  <span
                    className="muscle-badge"
                    style={{ backgroundColor: muscleGroupInfo.color }}
                  >
                    {muscleGroupInfo.displayName}
                  </span>
                </div>

                <div className="exercise-stats">
                  <div className="stat-row">
                    <span className="stat-label">Current PR</span>
                    <span className="stat-value pr-value">
                      {history.personalRecords.maxWeight} lbs
                    </span>
                  </div>

                  <div className="stat-row">
                    <span className="stat-label">Times Performed</span>
                    <span className="stat-value">{sessionCount} sessions</span>
                  </div>

                  <div className="stat-row">
                    <span className="stat-label">Last Performed</span>
                    <span className="stat-value text-secondary">
                      {format(new Date(lastSession.date), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>

                <div className="view-progress-link">
                  View Progress →
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ExerciseList;
