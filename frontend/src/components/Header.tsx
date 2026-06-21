import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  FolderKanban,
  LogOut,
  Menu,
  Rocket,
  User,
  X,
} from 'lucide-react';
import { Button } from './Button';
import { useAuth } from '@/hooks';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/profile', label: 'Profile', icon: User },
];

export const Header: React.FC = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-app-bg/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3 text-lg font-semibold text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-cyan-400 text-white shadow-glow">
              <Rocket className="h-5 w-5" />
            </span>
            ProjectHub
          </Link>
          <nav className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button size="sm" onClick={() => navigate('/register')}>
              Sign up
            </Button>
          </nav>
        </div>
      </header>
    );
  }

  const sidebar = (
    <aside className="flex h-full flex-col border-r border-slate-800 bg-app-sidebar px-4 py-5">
      <Link to="/dashboard" className="flex items-center gap-3 px-2 text-lg font-semibold text-white">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-cyan-400 text-white shadow-glow">
          <Rocket className="h-5 w-5" />
        </span>
        ProjectHub
      </Link>

      <nav className="mt-8 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-primary/15 text-white ring-1 ring-primary/20'
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto rounded-lg border border-slate-800 bg-slate-950/35 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-sm font-semibold text-white">
            {currentUser?.name?.slice(0, 1).toUpperCase() || 'U'}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{currentUser?.name || 'Workspace User'}</p>
            <p className="truncate text-xs text-slate-500">{currentUser?.email}</p>
          </div>
        </div>
        <Button variant="secondary" size="sm" className="mt-4 w-full" icon={<LogOut className="h-4 w-4" />} onClick={logout}>
          Logout
        </Button>
      </div>
    </aside>
  );

  return (
    <>
      <div className="fixed inset-y-0 left-0 z-40 hidden w-72 lg:block">{sidebar}</div>
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-slate-800 bg-app-sidebar/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3 font-semibold text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-cyan-400">
              <Rocket className="h-5 w-5" />
            </span>
            ProjectHub
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-md border border-slate-700 p-2 text-slate-200"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/70"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          />
          <div className="relative h-full w-80 max-w-[86vw] animate-float-in">
            {sidebar}
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute right-4 top-4 rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
