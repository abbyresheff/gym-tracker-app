import React, { useState, useEffect } from 'react';
import { getUserGoals, saveUserGoals, getAllWorkoutSessions } from '../../db/indexedDB';
import { UserGoals, WorkoutSession } from '../../types';
import { startOfWeek, endOfWeek, isWithinInterval, format, differenceInDays, startOfDay } from 'date-fns';
import LoadingSpinner from '../Shared/LoadingSpinner';
import './GoalsView.css';

const GoalsView: React.FC = () => {
  const [goals, setGoals] = useState<UserGoals | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [weeklyTarget, setWeeklyTarget] = useState(3);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [thisWeekCount, setThisWeekCount] = useState(0);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGoalsAndStats();
  }, []);

  const loadGoalsAndStats = async () => {
    try {
      const [userGoals, allSessions] = await Promise.all([
        getUserGoals(),
        getAllWorkoutSessions()
      ]);

      if (userGoals) {
        setGoals(userGoals);
        setWeeklyTarget(userGoals.workoutsPerWeek);
      }

      // Calculate stats from workout sessions
      const stats = calculateStats(allSessions);
      setCurrentStreak(stats.currentStreak);
      setLongestStreak(stats.longestStreak);
      setThisWeekCount(stats.thisWeekCount);
      setTotalWorkouts(allSessions.length);
    } catch (error) {
      console.error('Error loading goals and stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (sessions: WorkoutSession[]) => {
    if (sessions.length === 0) {
      return { currentStreak: 0, longestStreak: 0, thisWeekCount: 0 };
    }

    // Sort sessions by date (oldest to newest)
    const sortedSessions = [...sessions].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Get unique workout dates (one workout per day)
    const workoutDates = Array.from(
      new Set(sortedSessions.map(s => startOfDay(new Date(s.date)).getTime()))
    ).map(time => new Date(time));

    // Calculate current streak
    const today = startOfDay(new Date());
    let currentStreak = 0;
    let checkDate = today;

    for (let i = workoutDates.length - 1; i >= 0; i--) {
      const workoutDate = startOfDay(workoutDates[i]);
      const daysDiff = differenceInDays(checkDate, workoutDate);

      if (daysDiff === 0) {
        currentStreak++;
        checkDate = new Date(checkDate.getTime() - 24 * 60 * 60 * 1000); // Go back one day
      } else if (daysDiff === 1) {
        // Allow for rest days (if we skipped one day, continue checking)
        checkDate = new Date(checkDate.getTime() - 24 * 60 * 60 * 1000);
        i++; // Recheck this workout date
      } else {
        break; // Streak is broken
      }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 0;
    let lastDate: Date | null = null;

    for (const workoutDate of workoutDates) {
      if (lastDate === null) {
        tempStreak = 1;
      } else {
        const daysDiff = differenceInDays(workoutDate, lastDate);
        if (daysDiff === 1) {
          tempStreak++;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
      }
      lastDate = workoutDate;
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    // Calculate this week's workout count
    const weekStart = startOfWeek(today, { weekStartsOn: 0 }); // Sunday
    const weekEnd = endOfWeek(today, { weekStartsOn: 0 });

    const thisWeekCount = workoutDates.filter(date =>
      isWithinInterval(date, { start: weekStart, end: weekEnd })
    ).length;

    return { currentStreak, longestStreak, thisWeekCount };
  };

  const handleSaveGoals = async () => {
    try {
      const updatedGoals: UserGoals = {
        workoutsPerWeek: weeklyTarget,
        currentStreak: currentStreak,
        longestStreak: longestStreak,
        lastWorkoutDate: goals?.lastWorkoutDate
      };

      await saveUserGoals(updatedGoals);
      setGoals(updatedGoals);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving goals:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (goals) {
      setWeeklyTarget(goals.workoutsPerWeek);
    }
  };

  if (isLoading) {
    return (
      <div className="goals-view">
        <LoadingSpinner size="large" text="Loading goals..." />
      </div>
    );
  }

  const weekProgress = (thisWeekCount / weeklyTarget) * 100;
  const isWeekGoalMet = thisWeekCount >= weeklyTarget;

  return (
    <div className="goals-view">
      <div className="goals-header">
        <h2>Goals & Streaks</h2>
        {!isEditing && (
          <button className="edit-goals-button" onClick={() => setIsEditing(true)}>
            Edit Goals
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="goals-editor">
          <div className="editor-card">
            <h3>Set Your Weekly Goal</h3>
            <div className="goal-input-group">
              <label htmlFor="weekly-target">Workouts per week</label>
              <div className="stepper-input">
                <button
                  className="stepper-button"
                  onClick={() => setWeeklyTarget(Math.max(1, weeklyTarget - 1))}
                >
                  -
                </button>
                <input
                  id="weekly-target"
                  type="number"
                  min="1"
                  max="7"
                  value={weeklyTarget}
                  onChange={(e) => setWeeklyTarget(Math.max(1, Math.min(7, parseInt(e.target.value) || 1)))}
                  className="goal-input"
                />
                <button
                  className="stepper-button"
                  onClick={() => setWeeklyTarget(Math.min(7, weeklyTarget + 1))}
                >
                  +
                </button>
              </div>
            </div>

            <div className="editor-actions">
              <button className="save-button" onClick={handleSaveGoals}>
                Save Goals
              </button>
              <button className="cancel-button" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Weekly Progress */}
          <div className="progress-section">
            <div className="section-card">
              <div className="card-header">
                <h3>This Week</h3>
                <span className="week-dates">
                  {format(startOfWeek(new Date(), { weekStartsOn: 0 }), 'MMM d')} - {format(endOfWeek(new Date(), { weekStartsOn: 0 }), 'MMM d')}
                </span>
              </div>

              <div className="weekly-progress">
                <div className="progress-stats">
                  <div className="progress-count">
                    <span className="count-current">{thisWeekCount}</span>
                    <span className="count-separator">/</span>
                    <span className="count-target">{weeklyTarget}</span>
                    <span className="count-label">workouts</span>
                  </div>
                  {isWeekGoalMet && (
                    <div className="goal-achieved">
                      <span className="achievement-badge">🎉 Goal Achieved!</span>
                    </div>
                  )}
                </div>

                <div className="progress-bar-container">
                  <div
                    className={`progress-bar ${isWeekGoalMet ? 'goal-met' : ''}`}
                    style={{ width: `${Math.min(weekProgress, 100)}%` }}
                  />
                </div>

                <div className="progress-description">
                  {thisWeekCount === 0 ? (
                    <p>No workouts logged this week yet. Get started!</p>
                  ) : isWeekGoalMet ? (
                    <p>Great job! You've reached your weekly goal!</p>
                  ) : (
                    <p>{weeklyTarget - thisWeekCount} more {weeklyTarget - thisWeekCount === 1 ? 'workout' : 'workouts'} to reach your goal</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Streak Stats */}
          <div className="stats-section">
            <div className="stat-card-large streak-card">
              <div className="stat-icon-large">🔥</div>
              <div className="stat-content-large">
                <div className="stat-label">Current Streak</div>
                <div className="stat-value-huge">
                  {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
                </div>
                <div className="stat-sublabel">
                  {currentStreak === 0 ? 'Start your streak today!' : 'Keep it going!'}
                </div>
              </div>
            </div>

            <div className="stat-card-large">
              <div className="stat-icon-large">🏆</div>
              <div className="stat-content-large">
                <div className="stat-label">Longest Streak</div>
                <div className="stat-value-huge">
                  {longestStreak} {longestStreak === 1 ? 'day' : 'days'}
                </div>
                <div className="stat-sublabel">Personal best</div>
              </div>
            </div>

            <div className="stat-card-large">
              <div className="stat-icon-large">💪</div>
              <div className="stat-content-large">
                <div className="stat-label">Total Workouts</div>
                <div className="stat-value-huge">{totalWorkouts}</div>
                <div className="stat-sublabel">All time</div>
              </div>
            </div>
          </div>

          {/* Motivational Message */}
          <div className="motivation-section">
            <div className="motivation-card">
              {currentStreak === 0 ? (
                <>
                  <h4>Ready to Start Your Streak?</h4>
                  <p>Log a workout today to begin building your consistency!</p>
                </>
              ) : currentStreak >= 7 ? (
                <>
                  <h4>You're On Fire! 🔥</h4>
                  <p>A {currentStreak}-day streak is incredible! Keep up the amazing work!</p>
                </>
              ) : currentStreak >= 3 ? (
                <>
                  <h4>Building Momentum!</h4>
                  <p>You're {currentStreak} days in. Consistency is key to results!</p>
                </>
              ) : (
                <>
                  <h4>Great Start!</h4>
                  <p>You've started your streak. Keep showing up!</p>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GoalsView;
