import React from 'react';
import { Card } from './Card';

interface StatCardProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  trend?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, trend }) => {
  return (
    <Card className="group overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-400">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</p>
        </div>
        {icon && (
          <div className="rounded-lg border border-primary/20 bg-primary/10 p-3 text-primary transition group-hover:scale-105">
            {icon}
          </div>
        )}
      </div>
      {trend && <p className="mt-5 text-xs font-medium text-emerald-300">{trend}</p>}
    </Card>
  );
};
