import React, { useState } from 'react';
import { X, Sparkles, Mail, Lock, User, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserProfile } from '../types';
import { INITIAL_USER } from '../lib/demoData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile, isNewUser?: boolean) => void;
  onStartDemo: () => void;
}

type AuthMode = 'login' | 'signup' | 'forgot';

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onStartDemo,
}) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      if (mode === 'forgot') {
        if (isSupabaseConfigured && supabase) {
          const { error } = await supabase.auth.resetPasswordForEmail(email);
          if (error) throw error;
        }
        setStatusMessage({
          type: 'success',
          text: `A reset link has been dispatched to ${email || 'your email'}.`,
        });
        setLoading(false);
        return;
      }

      if (mode === 'signup') {
        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: fullName } },
          });
          if (error) throw error;
        }

        const newUser: UserProfile = {
          ...INITIAL_USER,
          id: `user-${Date.now()}`,
          name: fullName || email.split('@')[0] || 'Learner',
          email: email || 'user@learnx.ai',
          overallMastery: 0,
          lessonsCompleted: 0,
          currentStreak: 1,
        };

        setStatusMessage({ type: 'success', text: 'Account created! Redirecting to Onboarding...' });
        setTimeout(() => {
          onLoginSuccess(newUser, true);
          onClose();
        }, 800);
        return;
      }

      // Login mode
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }

      const loggedInUser: UserProfile = {
        ...INITIAL_USER,
        name: fullName || (email ? email.split('@')[0] : 'Alex Morgan'),
        email: email || INITIAL_USER.email,
      };

      onLoginSuccess(loggedInUser, false);
      onClose();
    } catch (err: any) {
      console.warn('Auth operation notice:', err?.message);
      // If Supabase credentials aren't set or network error, provide friendly fallback
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Authentication failed. You can also use the instant 1-click Demo Account below!',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
            {mode === 'login' && 'Welcome back to LearnX AI'}
            {mode === 'signup' && 'Create your LearnX AI account'}
            {mode === 'forgot' && 'Reset your password'}
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {mode === 'login' && 'Sign in to access your personalized roadmap & AI tutor'}
            {mode === 'signup' && 'Start with your 3-minute diagnostic assessment'}
            {mode === 'forgot' && 'Enter your email to receive recovery instructions'}
          </p>
        </div>

        {/* Quick Demo Button */}
        <div className="mt-5">
          <button
            type="button"
            id="auth-quick-demo-btn"
            onClick={() => {
              onStartDemo();
              onClose();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50/60 py-2.5 px-4 text-xs font-bold text-indigo-700 hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300 transition-colors"
          >
            <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span>1-Click Hackathon Demo (Alex Morgan • 68% Mastery)</span>
          </button>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-white px-2 font-bold tracking-wider text-slate-400 dark:bg-slate-900">
              Or use Supabase Auth
            </span>
          </div>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`mb-4 flex items-start gap-2 rounded-lg p-3 text-xs ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                : 'bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Alex Morgan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="student@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60 transition-colors"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>
                  {mode === 'login' && 'Sign In'}
                  {mode === 'signup' && 'Create Account'}
                  {mode === 'forgot' && 'Send Reset Link'}
                </span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Footer Mode Switcher */}
        <div className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
          {mode === 'login' && (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              >
                Sign up free
              </button>
            </p>
          )}

          {mode === 'signup' && (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              >
                Sign in
              </button>
            </p>
          )}

          {mode === 'forgot' && (
            <p>
              Remembered your password?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              >
                Back to Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
