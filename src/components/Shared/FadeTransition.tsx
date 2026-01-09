import React, { ReactNode } from 'react';
import './FadeTransition.css';

interface FadeTransitionProps {
  children: ReactNode;
  duration?: number;
}

const FadeTransition: React.FC<FadeTransitionProps> = ({ children, duration = 300 }) => {
  return (
    <div className="fade-transition" style={{ animationDuration: `${duration}ms` }}>
      {children}
    </div>
  );
};

export default FadeTransition;
