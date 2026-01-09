import React, { useState, useEffect } from 'react';
import { startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay, isToday } from 'date-fns';
import { WorkoutSession } from '../../types';
import { getWorkoutSessionsByDateRange } from '../../db/indexedDB';
import './WeekView.css';

interface WeekViewProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  onLogWorkout: (date: Date) => void;
  selectedDate?: Date;
}

const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  onDateSelect,
  onLogWorkout,
  selectedDate
}) => {
  const [weekDays, setWeekDays] = useState<Date[]>([]);
  const [workoutSessions, setWorkoutSessions] = useState<Map<string, WorkoutSession>>(new Map());
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  useEffect(() => {
    generateWeekDays();
  }, [currentDate]);

  useEffect(() => {
    if (weekDays.length > 0) {
      loadWorkoutSessions();
    }
  }, [weekDays]);

  const generateWeekDays = () => {
    const weekStart = startOfWeek(currentDate);
    const weekEnd = endOfWeek(currentDate);
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
    setWeekDays(days);
  };

  const loadWorkoutSessions = async () => {
    try {
      const weekStart = startOfWeek(currentDate);
      const weekEnd = endOfWeek(currentDate);
      const sessions = await getWorkoutSessionsByDateRange(weekStart, weekEnd);

      const sessionMap = new Map<string, WorkoutSession>();
      sessions.forEach(session => {
        const dateKey = new Date(session.date).toDateString();
        sessionMap.set(dateKey, session);
      });

      setWorkoutSessions(sessionMap);
    } catch (error) {
      console.error('Error loading workout sessions:', error);
    }
  };

  const getSessionForDay = (date: Date): WorkoutSession | undefined => {
    const dateKey = date.toDateString();
    return workoutSessions.get(dateKey);
  };

  const getTotalVolume = (session: WorkoutSession): number => {
    return session.exercises.reduce((total, exercise) => {
      return total + exercise.sets.reduce((sum, set) => sum + (set.reps * set.weight), 0);
    }, 0);
  };

  const toggleExpand = (dateKey: string) => {
    setExpandedDay(expandedDay === dateKey ? null : dateKey);
  };

  return (
    <div className="week-view">
      <div className="week-header">
        <h2>{format(startOfWeek(currentDate), 'MMM d')} - {format(endOfWeek(currentDate), 'MMM d, yyyy')}</h2>
      </div>

      <div className="week-grid">
        {weekDays.map(day => {
          const session = getSessionForDay(day);
          const dateKey = day.toDateString();
          const isExpanded = expandedDay === dateKey;
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isTodayDate = isToday(day);
          const hasWorkout = !!session;

          return (
            <div
              key={dateKey}
              className={`week-day-card ${hasWorkout ? 'has-workout' : ''} ${isSelected ? 'selected' : ''} ${isTodayDate ? 'today' : ''}`}
            >
              <div className="day-header" onClick={() => onDateSelect(day)}>
                <div className="day-info">
                  <span className="day-name">{format(day, 'EEE')}</span>
                  <span className="day-number">{format(day, 'd')}</span>
                </div>
                {hasWorkout && (
                  <button
                    className="expand-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(dateKey);
                    }}
                  >
                    {isExpanded ? '▼' : '▶'}
                  </button>
                )}
              </div>

              {hasWorkout && session ? (
                <div className="day-content">
                  {!isExpanded ? (
                    <div className="workout-summary">
                      <div className="summary-stat">
                        <span className="stat-value">{session.exercises.length}</span>
                        <span className="stat-label">exercises</span>
                      </div>
                      <div className="summary-stat">
                        <span className="stat-value">{getTotalVolume(session).toLocaleString()}</span>
                        <span className="stat-label">lbs total</span>
                      </div>
                    </div>
                  ) : (
                    <div className="workout-details">
                      {session.exercises.map((exercise, idx) => (
                        <div key={idx} className="exercise-summary">
                          <span className="exercise-name">{exercise.exerciseName}</span>
                          <span className="exercise-sets">{exercise.sets.length} sets</span>
                        </div>
                      ))}
                      <button
                        className="edit-workout-button"
                        onClick={() => onLogWorkout(day)}
                      >
                        Edit Workout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="day-content empty">
                  <button
                    className="add-workout-button-small"
                    onClick={() => onLogWorkout(day)}
                  >
                    + Add
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekView;
