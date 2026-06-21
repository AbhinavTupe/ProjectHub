import React from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card } from './Card';

interface AnalyticsChartProps {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  totalProjects: number;
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  totalTasks,
  completedTasks,
  pendingTasks,
  totalProjects,
}) => {
  const inProgressTasks = Math.max(totalTasks - completedTasks - pendingTasks, 0);
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const areaData = [
    { name: 'Mon', tasks: Math.max(pendingTasks - 2, 0), done: Math.max(completedTasks - 4, 0) },
    { name: 'Tue', tasks: pendingTasks + 1, done: Math.max(completedTasks - 3, 0) },
    { name: 'Wed', tasks: pendingTasks + inProgressTasks, done: Math.max(completedTasks - 2, 0) },
    { name: 'Thu', tasks: totalTasks, done: Math.max(completedTasks - 1, 0) },
    { name: 'Fri', tasks: totalTasks + totalProjects, done: completedTasks },
  ];
  const barData = [
    { name: 'Todo', value: pendingTasks },
    { name: 'Active', value: inProgressTasks },
    { name: 'Done', value: completedTasks },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
      <Card>
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-400">Analytics</p>
            <h2 className="mt-1 text-xl font-semibold text-white">Delivery momentum</h2>
          </div>
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-blue-200">
            {completionRate}% complete
          </span>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="taskGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#94A3B8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  background: '#111827',
                  border: '1px solid #334155',
                  borderRadius: 8,
                  color: '#F8FAFC',
                }}
              />
              <Area type="monotone" dataKey="tasks" stroke="#3B82F6" fill="url(#taskGradient)" strokeWidth={2} />
              <Area type="monotone" dataKey="done" stroke="#10B981" fill="transparent" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-400">Task mix</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Status distribution</h2>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid stroke="#334155" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="#94A3B8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip
                cursor={{ fill: 'rgba(59, 130, 246, 0.08)' }}
                contentStyle={{
                  background: '#111827',
                  border: '1px solid #334155',
                  borderRadius: 8,
                  color: '#F8FAFC',
                }}
              />
              <Bar dataKey="value" fill="#3B82F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
