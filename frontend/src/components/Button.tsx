import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  className = '',
  disabled = false,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-app-bg disabled:cursor-not-allowed disabled:opacity-60';

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-primary to-cyan-400 text-white shadow-glow hover:-translate-y-0.5 hover:shadow-blue-500/30',
    secondary:
      'border border-slate-700 bg-slate-900/70 text-slate-100 hover:border-slate-500 hover:bg-slate-800',
    danger:
      'bg-gradient-to-r from-rose-600 to-red-500 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose-950/40',
    success:
      'bg-gradient-to-r from-emerald-500 to-teal-400 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-950/40',
    ghost: 'text-slate-300 hover:bg-slate-800/80 hover:text-white',
  };

  const sizeClasses = {
    sm: 'min-h-9 px-3 text-sm',
    md: 'min-h-10 px-4 text-sm',
    lg: 'min-h-12 px-5 text-base',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
      <span>{loading ? 'Loading' : children}</span>
    </button>
  );
};
