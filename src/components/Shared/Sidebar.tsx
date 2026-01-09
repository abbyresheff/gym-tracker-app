import React, { useState } from 'react';
import './Sidebar.css';

export type NavSection = 'calendar' | 'progress' | 'goals';

interface SidebarProps {
  activeSection: NavSection;
  onSectionChange: (section: NavSection) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems: { id: NavSection; label: string; icon: string }[] = [
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'progress', label: 'Progress', icon: '📈' },
    { id: 'goals', label: 'Goals', icon: '🎯' },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h1 className="sidebar-title">
          {!isCollapsed && 'Gym Tracker'}
        </h1>
        <button
          className="collapse-button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!isCollapsed}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => onSectionChange(item.id)}
            aria-label={item.label}
            aria-current={activeSection === item.id ? 'page' : undefined}
          >
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            {!isCollapsed && <span className="nav-label">{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
