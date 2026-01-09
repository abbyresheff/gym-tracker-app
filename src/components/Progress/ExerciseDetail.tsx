import React, { useState, useEffect } from 'react';
import { Exercise, ExerciseHistory } from '../../types';
import { getExerciseById, getExerciseHistory } from '../../db/indexedDB';
import { getMuscleGroupInfo } from '../../data/muscleGroups';
import { format } from 'date-fns';
import ProgressionChart from './ProgressionChart';
import LoadingSpinner from '../Shared/LoadingSpinner';
import './ExerciseDetail.css';

interface ExerciseDetailProps {
  exerciseId: string;
  onBack: () => void;
}

const ExerciseDetail: React.FC<ExerciseDetailProps> = ({ exerciseId, onBack }) => {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [history, setHistory] = useState<ExerciseHistory | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadExerciseData();
  }, [exerciseId]);

  const loadExerciseData = async () => {
    try {
      const [ex, hist] = await Promise.all([
        getExerciseById(exerciseId),
        getExerciseHistory(exerciseId)
      ]);

      setExercise(ex || null);
      setHistory(hist || null);
    } catch (error) {
      console.error('Error loading exercise data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="exercise-detail">
        <LoadingSpinner size="large" text="Loading exercise details..." />
      </div>
    );
  }

  if (!exercise || !history) {
    return (
      <div className="exercise-detail">
        <button onClick={onBack} className="back-button">
          ← Back
        </button>
        <div className="error-state">Exercise not found</div>
      </div>
    );
  }

  const muscleGroupInfo = getMuscleGroupInfo(exercise.primaryMuscleGroup);
  const totalSessions = history.sessions.length;
  const totalVolume = history.sessions.reduce((sum, s) => sum + s.totalVolume, 0);
  const averageVolume = totalSessions > 0 ? totalVolume / totalSessions : 0;
  const lastSession = history.sessions[history.sessions.length - 1];

  return (
    <div className="exercise-detail">
      <button onClick={onBack} className="back-button">
        ← Back to Exercise List
      </button>

      <div className="detail-header">
        <div className="header-info">
          <h1 className="exercise-title">{exercise.name}</h1>
          <div className="header-badges">
            <span
              className="muscle-badge"
              style={{ backgroundColor: muscleGroupInfo.color }}
            >
              {muscleGroupInfo.displayName}
            </span>
            <span className="category-badge">{exercise.category}</span>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card pr-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <div className="stat-label">Personal Record</div>
            <div className="stat-value-large">{history.personalRecords.maxWeight} lbs</div>
            <div className="stat-sublabel">
              {format(new Date(history.personalRecords.date), 'MMM d, yyyy')}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-label">Total Sessions</div>
            <div className="stat-value-large">{totalSessions}</div>
            <div className="stat-sublabel">times performed</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💪</div>
          <div className="stat-content">
            <div className="stat-label">Avg Volume</div>
            <div className="stat-value-large">{Math.round(averageVolume).toLocaleString()}</div>
            <div className="stat-sublabel">lbs per session</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-label">Last Performed</div>
            <div className="stat-value-medium">
              {format(new Date(lastSession.date), 'MMM d')}
            </div>
            <div className="stat-sublabel">{format(new Date(lastSession.date), 'yyyy')}</div>
          </div>
        </div>
      </div>

      <ProgressionChart history={history} />

      <div className="session-history">
        <h3 className="section-title">Session History</h3>
        <div className="sessions-list">
          {history.sessions.slice().reverse().map((session, index) => (
            <div key={index} className="session-row">
              <div className="session-date">
                {format(new Date(session.date), 'MMM d, yyyy')}
              </div>
              <div className="session-details">
                <span className="session-stat">
                  <strong>{session.maxWeight} lbs</strong> max
                </span>
                <span className="session-stat">
                  {session.sets} sets
                </span>
                <span className="session-stat">
                  {session.totalVolume.toLocaleString()} lbs total
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;
