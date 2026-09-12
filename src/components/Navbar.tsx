import React from 'react';
import { Sparkles, Moon, Sun, BookOpen, Compass, Award, ArrowRight, UserCheck, LogIn, LayoutDashboard } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  isLoggedIn: boolean;
  user: UserProfile;
  onOpenAuth: () => void;
  onOpenOnboarding: () => void;
  onStartDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  darkMode,
  setDarkMode,
  isLoggedIn,
  user,
  onOpenAuth,
  onOpenOnboarding,
  onStartDemo,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/90 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <button
          id="nav-brand-logo"
          onClick={() => setCurrentView(isLoggedIn ? 'dashboard' : 'landing')}
          className="group flex items-center gap-2.5 text-left focus:outline-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-white shadow-sm shadow-indigo-500/20 transition-transform group-hover:scale-105">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-slate-900 dark:text-white text-lg">LearnX</span>
              <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-xs font-semibold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/40">
                AI
              </span>
            </div>
          </div>
        </button>

        {/* Center Nav for Landing */}
        {!isLoggedIn && currentView === 'landing' && (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              How It Works
            </a>
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#demo-preview" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Live Preview
            </a>
            <button
              onClick={onOpenOnboarding}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Diagnostic
            </button>
          </nav>
        )}

        {/* Right CTA / Controls */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button
                id="nav-go-dashboard"
                onClick={() => setCurrentView('dashboard')}
                className={`hidden sm:flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  currentView === 'dashboard'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                Dashboard
              </button>

              <button
                id="nav-profile-button"
                onClick={() => setCurrentView('profile')}
                className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white p-1 pr-3 text-xs font-medium text-slate-700 shadow-sm hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-7 w-7 rounded-full object-cover border border-indigo-200 dark:border-indigo-800"
                />
                <span className="hidden md:inline font-semibold">{user.name}</span>
                <span className="hidden md:inline text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded">
                  {user.overallMastery}%
                </span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                id="nav-try-demo-btn"
                onClick={onStartDemo}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50/70 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300 dark:hover:bg-indigo-900/60 transition-colors shadow-xs"
              >
                <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                Try Demo →
              </button>

              <button
                id="nav-signin-btn"
                onClick={onOpenAuth}
                className="rounded-lg px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Sign In
              </button>

              <button
                id="nav-start-learning-btn"
                onClick={onOpenOnboarding}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
              >
                Start Learning
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
