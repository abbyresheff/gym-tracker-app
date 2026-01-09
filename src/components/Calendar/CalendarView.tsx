import React, { useState } from 'react';
import { addMonths, subMonths, addWeeks, subWeeks } from 'date-fns';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';
import { CalendarView as CalendarViewType } from '../../types';
import './CalendarView.css';

const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<CalendarViewType>('month');
  const [showDayView, setShowDayView] = useState(false);

  const handlePrevious = () => {
    if (viewMode === 'month') {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (viewMode === 'week') {
      setCurrentDate(subWeeks(currentDate, 1));
    }
  };

  const handleNext = () => {
    if (viewMode === 'month') {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (viewMode === 'week') {
      setCurrentDate(addWeeks(currentDate, 1));
    }
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const handleLogWorkout = (date?: Date) => {
    const dateToLog = date || selectedDate;
    if (dateToLog) {
      setSelectedDate(dateToLog);
      setShowDayView(true);
    }
  };

  const handleBackToCalendar = () => {
    setShowDayView(false);
  };

  const handleViewChange = (view: CalendarViewType) => {
    setViewMode(view);
  };

  // Show DayView if activated
  if (showDayView && selectedDate) {
    return <DayView selectedDate={selectedDate} onBack={handleBackToCalendar} />;
  }

  // Show calendar views
  return (
    <div className="calendar-view">
      <div className="calendar-controls">
        <div className="nav-controls">
          <button onClick={handlePrevious} className="control-button">
            ← Previous
          </button>
          <button onClick={handleToday} className="control-button today-button">
            Today
          </button>
          <button onClick={handleNext} className="control-button">
            Next →
          </button>
        </div>

        <div className="view-switcher">
          <button
            className={`view-button ${viewMode === 'month' ? 'active' : ''}`}
            onClick={() => handleViewChange('month')}
          >
            Month
          </button>
          <button
            className={`view-button ${viewMode === 'week' ? 'active' : ''}`}
            onClick={() => handleViewChange('week')}
          >
            Week
          </button>
        </div>
      </div>

      {viewMode === 'month' && (
        <MonthView
          currentDate={currentDate}
          onDateSelect={setSelectedDate}
          selectedDate={selectedDate}
        />
      )}

      {viewMode === 'week' && (
        <WeekView
          currentDate={currentDate}
          onDateSelect={setSelectedDate}
          onLogWorkout={handleLogWorkout}
          selectedDate={selectedDate}
        />
      )}

      {viewMode === 'month' && selectedDate && (
        <div className="selected-date-info">
          <p className="text-secondary">
            Selected: {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <button className="add-workout-button" onClick={() => handleLogWorkout()}>
            + Log Workout
          </button>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
