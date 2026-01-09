import React, { useState } from 'react';
import Sidebar, { NavSection } from './components/Shared/Sidebar';
import CalendarView from './components/Calendar/CalendarView';
import ProgressView from './components/Progress/ProgressView';
import GoalsView from './components/Goals/GoalsView';
import ErrorBoundary from './components/Shared/ErrorBoundary';
import FadeTransition from './components/Shared/FadeTransition';
import { ToastProvider } from './contexts/ToastContext';
import './App.css';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavSection>('calendar');

  const renderContent = () => {
    switch (activeSection) {
      case 'calendar':
        return (
          <ErrorBoundary>
            <FadeTransition key="calendar">
              <CalendarView />
            </FadeTransition>
          </ErrorBoundary>
        );
      case 'progress':
        return (
          <ErrorBoundary>
            <FadeTransition key="progress">
              <ProgressView />
            </FadeTransition>
          </ErrorBoundary>
        );
      case 'goals':
        return (
          <ErrorBoundary>
            <FadeTransition key="goals">
              <GoalsView />
            </FadeTransition>
          </ErrorBoundary>
        );
      default:
        return (
          <ErrorBoundary>
            <FadeTransition key="calendar-default">
              <CalendarView />
            </FadeTransition>
          </ErrorBoundary>
        );
    }
  };

  return (
    <ToastProvider>
      <div className="app">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </ToastProvider>
  );
};

export default App;
