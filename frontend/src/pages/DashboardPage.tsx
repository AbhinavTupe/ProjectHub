import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock3, FolderKanban, ListTodo, Plus } from 'lucide-react';
import {
  ActivityFeed,
  Alert,
  AnalyticsChart,
  Card,
  DashboardSkeleton,
  EmptyState,
  StatCard,
} from '@/components';
import { dashboardService, projectService } from '@/services/api';
import { DashboardStats, Project } from '@/types';
import { formatDate } from '@/utils';

export const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, projectsData] = await Promise.all([
          dashboardService.getStats(),
          projectService.getAll(),
        ]);
        setStats(statsData);
        setRecentProjects(projectsData.slice(0, 5));
      } catch {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <DashboardSkeleton />;

  const totalProjects = stats?.total_projects || 0;
  const totalTasks = stats?.total_tasks || 0;
  const completedTasks = stats?.completed_tasks || 0;
  const pendingTasks = stats?.pending_tasks || 0;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const activityItems = recentProjects.map((project) => ({
    id: project.id,
    title: project.title,
    subtitle: 'Project created',
    created_at: project.created_at,
    type: 'project' as const,
  }));

  return (
    <main className="app-page">
      <div className="app-container space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Command center</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Dashboard</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-400">
              A focused view of project throughput, task health, and recent workspace movement.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-primary to-cyan-400 px-4 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" />
            New project
          </Link>
        </div>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Projects" value={totalProjects} icon={<FolderKanban className="h-5 w-5" />} trend="Workspace scope" />
          <StatCard label="Total Tasks" value={totalTasks} icon={<ListTodo className="h-5 w-5" />} trend="Across active projects" />
          <StatCard label="Completed" value={completedTasks} icon={<CheckCircle2 className="h-5 w-5" />} trend={`${completionRate}% completion rate`} />
          <StatCard label="Pending" value={pendingTasks} icon={<Clock3 className="h-5 w-5" />} trend="Needs attention" />
        </div>

        <AnalyticsChart
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          pendingTasks={pendingTasks}
          totalProjects={totalProjects}
        />

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-400">Projects</p>
                <h2 className="mt-1 text-xl font-semibold text-white">Recent workspaces</h2>
              </div>
              <Link to="/projects" className="text-sm font-semibold text-primary hover:text-blue-300">
                View all
              </Link>
            </div>
            {recentProjects.length > 0 ? (
              <div className="grid gap-3 md:grid-cols-2">
                {recentProjects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/projects/${project.id}`}
                    className="rounded-lg border border-slate-800 bg-slate-950/25 p-4 transition hover:-translate-y-0.5 hover:border-primary/50 hover:bg-slate-900"
                  >
                    <h3 className="truncate text-sm font-semibold text-white">{project.title}</h3>
                    <p className="mt-2 text-xs text-slate-500">Created {formatDate(project.created_at)}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No projects yet"
                description="Create your first project to unlock dashboard trends, Kanban workflow, and activity history."
                actionLabel="Create project"
                onAction={() => {
                  window.location.href = '/projects';
                }}
              />
            )}
          </Card>
          <ActivityFeed items={activityItems} />
        </div>
      </div>
    </main>
  );
};
