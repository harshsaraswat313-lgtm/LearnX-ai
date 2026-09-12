import React from 'react';
import {
  LayoutDashboard,
  Map,
  Compass,
  BotMessageSquare,
  Sparkles,
  BarChart3,
  Award,
  User,
  Settings,
  LogOut,
  Flame,
  CheckCircle2,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';
import { UserProfile } from '../types';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  user: UserProfile;
  onLogout: () => void;
  onResetDemo: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setCurrentView,
  user,
  onLogout,
  onResetDemo,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'knowledge-map', label: 'Knowledge Map', icon: Map, badge: 'Gaps' },
    { id: 'roadmap', label: 'My Roadmap', icon: Compass },
    { id: 'ai-tutor', label: 'AI Tutor', icon: BotMessageSquare, highlight: true },
    { id: 'quiz', label: 'Practice (Quiz)', icon: CheckCircle2 },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 transition-transform lg:static lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* App Logo & Header */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-slate-100 dark:border-slate-800/80">
          <button
            id="sidebar-logo"
            onClick={() => {
              setCurrentView('dashboard');
              setIsMobileOpen(false);
            }}
            className="flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs shadow-indigo-600/30">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-tight text-slate-900 dark:text-white">LearnX</span>
                <span className="rounded bg-indigo-50 px-1 text-[10px] font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 -mt-0.5">Personalized EdTech</p>
            </div>
          </button>
        </div>

        {/* User Quick Status / Streak pill */}
        <div className="p-4">
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/40">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-9 w-9 rounded-full object-cover border-2 border-indigo-500"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{user.name}</p>
                <div className="flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                  <Flame className="h-3 w-3 fill-amber-500" />
                  <span>{user.currentStreak} Day Streak</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Mastery</span>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{user.overallMastery}%</span>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-1 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
            Main Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-item-${item.id}`}
                onClick={() => {
                  setCurrentView(item.id);
                  setIsMobileOpen(false);
                }}
                className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-600/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? 'bg-indigo-500 text-white'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {item.highlight && !isActive && (
                  <span className="flex h-2 w-2 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20" />
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-slate-200 p-3 dark:border-slate-800 space-y-1">
          {/* Quick Demo Reset */}
          <button
            id="sidebar-reset-demo"
            onClick={onResetDemo}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reset Demo State</span>
            </div>
            <span className="text-[10px] rounded bg-slate-200 px-1 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
              Demo
            </span>
          </button>

          <button
            id="sidebar-settings-btn"
            onClick={() => {
              setCurrentView('profile');
              setIsMobileOpen(false);
            }}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
          >
            <Settings className="h-3.5 w-3.5 text-slate-400" />
            <span>Settings & Database</span>
          </button>

          <button
            id="sidebar-logout-btn"
            onClick={onLogout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5 text-rose-500" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-around border-t border-slate-200 bg-white/95 px-2 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 lg:hidden">
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`flex flex-col items-center gap-1 p-1 text-[10px] font-medium ${
            currentView === 'dashboard' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
          }`}
        >
          <LayoutDashboard className="h-4 w-4" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => setCurrentView('knowledge-map')}
          className={`flex flex-col items-center gap-1 p-1 text-[10px] font-medium ${
            currentView === 'knowledge-map' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
          }`}
        >
          <Map className="h-4 w-4" />
          <span>Map</span>
        </button>

        <button
          onClick={() => setCurrentView('ai-tutor')}
          className={`relative flex flex-col items-center gap-1 p-1 text-[10px] font-bold ${
            currentView === 'ai-tutor' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
          }`}
        >
          <div className="flex h-8 w-8 -mt-4 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
            <BotMessageSquare className="h-4 w-4" />
          </div>
          <span>Tutor</span>
        </button>

        <button
          onClick={() => setCurrentView('quiz')}
          className={`flex flex-col items-center gap-1 p-1 text-[10px] font-medium ${
            currentView === 'quiz' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>Quiz</span>
        </button>

        <button
          onClick={() => setCurrentView('progress')}
          className={`flex flex-col items-center gap-1 p-1 text-[10px] font-medium ${
            currentView === 'progress' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          <span>Progress</span>
        </button>
      </nav>
    </>
  );
};
