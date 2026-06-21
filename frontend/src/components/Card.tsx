import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`rounded-lg border border-slate-700/70 bg-app-card/90 p-6 shadow-xl shadow-slate-950/20 transition-all duration-200 hover:border-slate-600 hover:shadow-2xl ${className}`}
    >
      {children}
    </div>
  );
};
