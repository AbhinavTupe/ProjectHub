import React, { useEffect, useState } from 'react';
import { Mail, ShieldCheck, UserRound } from 'lucide-react';
import { Alert, Card, LoadingSpinner } from '@/components';
import { authService } from '@/services/api';
import { User } from '@/types';
import { formatDate } from '@/utils';

export const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch {
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <LoadingSpinner fullScreen label="Loading profile" />;

  if (!user) {
    return (
      <main className="app-page">
        <div className="app-container">
          <Alert type="warning" message={error || 'User not found'} />
        </div>
      </main>
    );
  }

  return (
    <main className="app-page">
      <div className="app-container max-w-5xl space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Account</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Profile</h1>
          <p className="mt-3 text-sm text-slate-400">Manage the identity attached to your ProjectHub workspace.</p>
        </div>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-cyan-400 text-4xl font-semibold text-white shadow-glow">
              {user.name.slice(0, 1).toUpperCase()}
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-white">{user.name}</h2>
            <p className="mt-2 text-sm text-slate-400">{user.email}</p>
            <p className="mt-6 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm text-slate-300">
              Member since {formatDate(user.created_at)}
            </p>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold text-white">Account information</h3>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4 rounded-lg border border-slate-800 bg-slate-950/25 p-4">
                <UserRound className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Name</p>
                  <p className="mt-1 text-sm font-semibold text-white">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-slate-800 bg-slate-950/25 p-4">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Email</p>
                  <p className="mt-1 text-sm font-semibold text-white">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-slate-800 bg-slate-950/25 p-4">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Status</p>
                  <p className="mt-1 text-sm font-semibold text-white">Authenticated workspace member</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
};
