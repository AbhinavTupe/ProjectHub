import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogIn } from 'lucide-react';
import { Alert, Button, Input } from '@/components';
import { useAuth } from '@/hooks';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email, password });
      toast.success('Welcome back');
    } catch (err: any) {
      const message = err.response?.data?.detail || 'Login failed. Please try again.';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-73px)] bg-app-bg px-4 py-12">
      <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
        <section className="hidden lg:block">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">ProjectHub</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white">Keep your portfolio projects moving.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
            Sign in to manage project spaces, drag tasks through a Kanban board, and review delivery analytics.
          </p>
        </section>

        <section className="rounded-lg border border-slate-700 bg-app-card p-6 shadow-2xl shadow-slate-950/30 sm:p-8">
          <div className="mb-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <LogIn className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Login</h2>
            <p className="mt-2 text-sm text-slate-400">Access your project command center.</p>
          </div>

          {error && <Alert type="error" message={error} onClose={() => setError('')} />}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <Input
              type="password"
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <Button size="lg" className="w-full" loading={loading} disabled={loading}>
              Login
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Do not have an account?{' '}
            <Link to="/register" className="font-semibold text-primary hover:text-blue-300">
              Sign up
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};
