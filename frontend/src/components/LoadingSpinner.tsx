import React from 'react';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  label?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ fullScreen = false, label = 'Loading workspace' }) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4 text-slate-300">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-slate-700 border-t-primary"></div>
      <p className="text-sm font-medium">{label}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-app-bg">
        {spinner}
      </div>
    );
  }

  return spinner;
};
