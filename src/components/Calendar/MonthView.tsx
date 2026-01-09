import React, { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay, isToday } from 'date-fns';
import { WorkoutSession, PRStatus } from '../../types';
import { getWorkoutSessionsByDateRange } from '../../db/indexedDB';
import { detectSessionPRStatus, getPRStatusColor } from '../../utils/prDetection';
import './MonthView.css';

interface MonthViewProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  selectedDate?: Date;
}

interface DayWithWorkout {
  date: Date;
  session?: WorkoutSession;
  prStatus?: PRStatus;
}

const MonthView: React.FC<MonthViewProps> = ({ currentDate, onDateSelect, selectedDate }) => {
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [daysWithWorkouts, setDaysWithWorkouts] = useState<Map<string, DayWithWorkout>>(new Map());

  useEffect(() => {
    generateCalendarDays();
  }, [currentDate]);

  useEffect(() => {
    if (calendarDays.length > 0) {
      loadWorkoutSessions();
    }
  }, [calendarDays]);

  const generateCalendarDays = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
    setCalendarDays(days);
  };

  const loadWorkoutSessions = async () => {
    try {
      const start = calendarDays[0];
      const end = calendarDays[calendarDays.length - 1];
      const sessions = await getWorkoutSessionsByDateRange(start, end);

      const workoutMap = new Map<string, DayWithWorkout>();

      // Load sessions and detect PR status for each
      for (const session of sessions) {
        const dateKey = new Date(session.date).toDateString();
        const prStatus = await detectSessionPRStatus(session);

        workoutMap.set(dateKey, {
          date: new Date(session.date),
          session,
          prStatus
        });
      }

      setDaysWithWorkouts(workoutMap);
    } catch (error) {
      console.error('Error loading workout sessions:', error);
    }
  };

  const getWorkoutForDay = (day: Date): DayWithWorkout | undefined => {
    const dateKey = day.toDateString();
    return daysWithWorkouts.get(dateKey);
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="month-view">
      <div className="month-header">
        <h2>{format(currentDate, 'MMMM yyyy')}</h2>
      </div>

      <div className="calendar-grid">
        {/* Week day headers */}
        {weekDays.map(day => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {calendarDays.map(day => {
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isTodayDate = isToday(day);
          const dayWorkout = getWorkoutForDay(day);
          const hasWorkout = !!dayWorkout;

          return (
            <button
              key={day.toISOString()}
              className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isSelected ? 'selected' : ''} ${isTodayDate ? 'today' : ''} ${hasWorkout ? 'has-workout' : ''}`}
              onClick={() => onDateSelect(day)}
            >
              <span className="day-number">{format(day, 'd')}</span>
              {hasWorkout && dayWorkout && (
                <div className="workout-indicators">
                  <div
                    className="workout-dot"
                    style={{ backgroundColor: getPRStatusColor(dayWorkout.prStatus || 'NO_DATA') }}
                    title={`${dayWorkout.session?.exercises.length} exercises`}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
