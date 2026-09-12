import React from 'react';
import { Award, Flame, CheckCircle2, Lock, Sparkles, Target, Zap, ShieldCheck } from 'lucide-react';
import { Achievement, UserProfile } from '../types';

interface AchievementsViewProps {
  user: UserProfile;
  achievements: Achievement[];
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({ user, achievements }) => {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              Gamification & Rewards
            </span>
            <span className="text-xs text-slate-400">• Mastery Milestones</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Badges & Achievements
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Earn badges as you test out of concepts, overcome tricky misconceptions, and build steady study habits.
          </p>
        </div>

        {/* Streak & Badge Summary */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2.5 text-xs font-bold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
            <span>{user.currentStreak} Day Streak</span>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 text-xs font-bold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <Award className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span>
              {unlockedCount} / {achievements.length} Unlocked
            </span>
          </div>
        </div>
      </div>

      {/* Badges Grid (Section 15 requirement) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {achievements.map((ach) => {
          return (
            <div
              key={ach.id}
              className={`relative flex flex-col justify-between rounded-2xl p-5 border transition-all ${
                ach.unlocked
                  ? 'border-indigo-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900'
                  : 'border-slate-200 bg-slate-50/60 opacity-60 dark:border-slate-800 dark:bg-slate-800/30'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-3xl p-2 rounded-xl bg-slate-100 dark:bg-slate-800 inline-block">
                    {ach.icon}
                  </span>
                  {ach.unlocked ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="h-3 w-3" />
                      Unlocked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                      <Lock className="h-3 w-3" />
                      Locked
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">{ach.title}</h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{ach.description}</p>
              </div>

              {/* Progress bar or unlock date */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                {ach.unlocked ? (
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    Earned on {ach.unlockedDate || 'Recent Session'}
                  </span>
                ) : (
                  <div>
                    <div className="flex justify-between text-[10px] font-semibold text-slate-400 mb-1">
                      <span>Progress</span>
                      <span>
                        {ach.progress || 0} / {ach.maxProgress || 10}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{
                          width: `${Math.min(100, (((ach.progress || 0) / (ach.maxProgress || 10)) * 100))}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
