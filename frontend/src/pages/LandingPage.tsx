import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, CheckCircle2, FolderKanban, Layers3 } from 'lucide-react';
import { Button } from '@/components';
import { useAuth } from '@/hooks';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <main className="bg-app-bg">
      <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">ProjectHub</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-white sm:text-6xl">ProjectHub</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
            A premium project workspace for tracking portfolio-grade builds with analytics, Kanban flow, and fast execution signals.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {isAuthenticated ? (
              <Button size="lg" icon={<ArrowRight className="h-4 w-4" />} onClick={() => navigate('/dashboard')}>
                Go to dashboard
              </Button>
            ) : (
              <>
                <Button size="lg" icon={<ArrowRight className="h-4 w-4" />} onClick={() => navigate('/register')}>
                  Get started
                </Button>
                <Button variant="secondary" size="lg" onClick={() => navigate('/login')}>
                  Login
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-lg border border-slate-700 bg-app-card p-4 shadow-2xl shadow-slate-950/40">
            <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <p className="text-sm font-semibold text-white">Internship Portfolio Sprint</p>
                <p className="text-xs text-slate-500">Live delivery view</p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">82% complete</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { title: 'Projects', value: '12', icon: FolderKanban },
                { title: 'Tasks', value: '48', icon: Layers3 },
                { title: 'Done', value: '39', icon: CheckCircle2 },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-lg border border-slate-800 bg-slate-950/35 p-4">
                    <Icon className="h-5 w-5 text-primary" />
                    <p className="mt-4 text-2xl font-semibold text-white">{item.value}</p>
                    <p className="text-xs text-slate-500">{item.title}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-lg border border-slate-800 bg-slate-950/35 p-4">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  Analytics
                </div>
                <div className="flex h-40 items-end gap-2">
                  {[35, 58, 42, 78, 64, 92, 74].map((height, index) => (
                    <div key={index} className="flex-1 rounded-t bg-gradient-to-t from-primary to-cyan-400" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
              <div className="space-y-3 rounded-lg border border-slate-800 bg-slate-950/35 p-4">
                {['API polish', 'Kanban drag state', 'Deploy notes'].map((task, index) => (
                  <div key={task} className="rounded-md border border-slate-800 bg-slate-900 p-3">
                    <p className="text-sm font-medium text-white">{task}</p>
                    <p className="mt-1 text-xs text-slate-500">{index === 2 ? 'Completed' : 'In progress'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {[
            ['Modern workspace', 'Dark SaaS interface with responsive navigation and reusable components.'],
            ['Execution board', 'Drag tasks through Todo, In Progress, and Completed without backend changes.'],
            ['Analytics layer', 'KPI cards, Recharts visuals, and activity history for portfolio storytelling.'],
          ].map(([title, description]) => (
            <div key={title} className="rounded-lg border border-slate-800 bg-app-card p-6">
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
