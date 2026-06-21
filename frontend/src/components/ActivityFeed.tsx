import React from 'react';
import { CheckCircle2, Clock3, FolderPlus } from 'lucide-react';
import { Card } from './Card';
import { formatDate } from '@/utils';

interface ActivityItem {
  id: number | string;
  title: string;
  subtitle: string;
  created_at: string;
  type: 'project' | 'task' | 'completed';
}

interface ActivityFeedProps {
  items: ActivityItem[];
}

const iconByType = {
  project: FolderPlus,
  task: Clock3,
  completed: CheckCircle2,
};

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ items }) => {
  return (
    <Card>
      <div className="mb-6">
        <p className="text-sm font-medium text-slate-400">Activity</p>
        <h2 className="mt-1 text-xl font-semibold text-white">Latest workspace updates</h2>
      </div>
      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((item) => {
            const Icon = iconByType[item.type];
            return (
              <div key={item.id} className="flex gap-3 rounded-lg border border-slate-800 bg-slate-950/25 p-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-slate-400">{item.subtitle}</p>
                  <p className="mt-1 text-xs text-slate-500">{formatDate(item.created_at)}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="rounded-lg border border-dashed border-slate-700 p-6 text-center text-sm text-slate-400">
            No activity yet. New projects and completed tasks will appear here.
          </p>
        )}
      </div>
    </Card>
  );
};
