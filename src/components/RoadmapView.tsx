import React from 'react';
import {
  Compass,
  CheckCircle2,
  Clock,
  Lock,
  Play,
  ArrowRight,
  Sparkles,
  Award,
  ChevronRight,
} from 'lucide-react';
import { RoadmapMilestone } from '../types';

interface RoadmapViewProps {
  milestones: RoadmapMilestone[];
  onStartLesson: (lessonId: string) => void;
  onCompleteLesson: (milestoneId: string) => void;
  onOpenQuiz: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  milestones,
  onStartLesson,
  onCompleteLesson,
  onOpenQuiz,
}) => {
  // Group milestones by Phase
  const phases = Array.from(new Set(milestones.map((m) => m.phase)));
  const totalCompleted = milestones.filter((m) => m.status === 'completed').length;
  const progressPercent = Math.round((totalCompleted / milestones.length) * 100);

  const getStatusBadge = (status: RoadmapMilestone['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            <CheckCircle2 className="h-3 w-3" />
            Completed
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400">
            <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
            In Progress
          </span>
        );
      case 'next':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700 dark:bg-amber-950 dark:text-amber-400">
            Up Next
          </span>
        );
      case 'locked':
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <Lock className="h-3 w-3" />
            Locked
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              Personalized Learning Path
            </span>
            <span className="text-xs text-slate-400">• Calibrated for Alex</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Subject Roadmap
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Linear courses waste hours on what you already know. This roadmap skips your strong areas and focuses strictly on your gaps.
          </p>
        </div>

        {/* Progress Tracker Card */}
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Roadmap Progress</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">{progressPercent}%</span>
              <span className="text-xs text-slate-400">({totalCompleted}/{milestones.length} milestones)</span>
            </div>
          </div>
          <div className="h-10 w-10 rounded-full border-4 border-indigo-500/20 border-t-indigo-600 flex items-center justify-center font-bold text-xs text-indigo-600">
            {totalCompleted}
          </div>
        </div>
      </div>

      {/* Roadmap Timeline by Phases */}
      <div className="space-y-8">
        {phases.map((phase, pIdx) => {
          const phaseMilestones = milestones.filter((m) => m.phase === phase);
          return (
            <div
              key={phase}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900"
            >
              {/* Phase Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 font-mono text-xs font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                    0{pIdx + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{phase}</h3>
                    <p className="text-xs text-slate-400">{phaseMilestones.length} structured milestones</p>
                  </div>
                </div>

                <span className="text-xs font-semibold text-slate-500">
                  {phaseMilestones.filter((m) => m.status === 'completed').length}/{phaseMilestones.length} done
                </span>
              </div>

              {/* Milestones list */}
              <div className="mt-5 space-y-4">
                {phaseMilestones.map((m) => {
                  const isLocked = m.status === 'locked';
                  return (
                    <div
                      key={m.id}
                      className={`relative flex flex-col sm:flex-row sm:items-center justify-between rounded-xl p-4 border transition-all ${
                        m.status === 'in_progress'
                          ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20 shadow-xs'
                          : m.status === 'completed'
                          ? 'border-emerald-200 bg-emerald-50/20 dark:border-emerald-950/60 dark:bg-emerald-950/20'
                          : isLocked
                          ? 'border-slate-200 bg-slate-50/50 opacity-60 dark:border-slate-800 dark:bg-slate-800/30'
                          : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-start gap-3.5 mb-3 sm:mb-0">
                        <div
                          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                            m.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                              : m.status === 'in_progress'
                              ? 'bg-indigo-600 text-white'
                              : isLocked
                              ? 'bg-slate-200 text-slate-400 dark:bg-slate-800'
                              : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400'
                          }`}
                        >
                          {m.status === 'completed' ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : isLocked ? (
                            <Lock className="h-4 w-4" />
                          ) : (
                            <Play className="h-3.5 w-3.5 fill-current" />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{m.title}</h4>
                            {getStatusBadge(m.status)}
                          </div>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-xl">
                            {m.description}
                          </p>
                          <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {m.estimatedTime}
                            </span>
                            <span>•</span>
                            <span className="text-indigo-600 dark:text-indigo-400 font-medium">{m.topicName}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons per milestone */}
                      <div className="flex items-center gap-2 shrink-0 sm:ml-4">
                        {m.status === 'in_progress' && (
                          <div className="flex items-center gap-2">
                            <button
                              id={`roadmap-continue-${m.id}`}
                              onClick={() => onStartLesson(m.id)}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition-colors"
                            >
                              <span>Continue</span>
                              <ArrowRight className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => onCompleteLesson(m.id)}
                              className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                              title="Mark complete for demo"
                            >
                              Mark Done
                            </button>
                          </div>
                        )}

                        {m.status === 'next' && (
                          <button
                            id={`roadmap-start-${m.id}`}
                            onClick={() => onStartLesson(m.id)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition-colors"
                          >
                            <span>Start Lesson</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        )}

                        {m.status === 'completed' && (
                          <button
                            onClick={() => onStartLesson(m.id)}
                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                          >
                            Review
                          </button>
                        )}

                        {isLocked && (
                          <span className="text-xs text-slate-400 font-medium px-2 py-1">Locked</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
