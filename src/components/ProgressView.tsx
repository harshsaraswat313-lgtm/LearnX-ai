import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Flame,
  Award,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Sparkles,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Cell,
} from 'recharts';
import { UserProfile, Topic } from '../types';
import { WEEKLY_PROGRESS_DATA } from '../lib/demoData';

interface ProgressViewProps {
  user: UserProfile;
  topics: Topic[];
}

export const ProgressView: React.FC<ProgressViewProps> = ({ user, topics }) => {
  const masteredTopics = topics.filter((t) => t.mastery >= 75).length;
  const remainingTopics = topics.length - masteredTopics;

  // Topic mastery bar data
  const topicChartData = topics.map((t) => ({
    name: t.name,
    mastery: t.mastery,
    status: t.status,
  }));

  // Accuracy trends data
  const accuracyTrends = [
    { session: 'Quiz 1 (Algebra)', accuracy: 100, topic: 'Algebra' },
    { session: 'Quiz 2 (Linear Eq)', accuracy: 80, topic: 'Linear Equations' },
    { session: 'Quiz 3 (Diag)', accuracy: 58, topic: 'Full Subject' },
    { session: 'Quiz 4 (Functions)', accuracy: 75, topic: 'Functions' },
    { session: 'Quiz 5 (Quadratics)', accuracy: 82, topic: 'Adaptive Checkpoint' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            Analytics Engine
          </span>
          <span className="text-xs text-slate-400">• Real-Time Competency Tracking</span>
        </div>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Progress & Analytics
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
          Comprehensive diagnostic and practice telemetry verifying topic mastery, study velocity, and knowledge retention.
        </p>
      </div>

      {/* Top 4 Metrics (Section 14) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Overall Subject Mastery</span>
            <span className="text-emerald-600 font-bold">+8% gain</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{user.overallMastery}%</span>
            <span className="text-xs text-slate-400">calibrated</span>
          </div>
          <p className="mt-2 text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
            Threshold for Subject Honors: 85%
          </p>
        </div>

        {/* Metric 2 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Topics Mastery State</span>
            <Layers className="h-4 w-4 text-slate-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{masteredTopics}</span>
            <span className="text-xs text-slate-400">/ {topics.length} Mastered</span>
          </div>
          <p className="mt-2 text-[11px] text-amber-600 font-medium">{remainingTopics} topics in active reinforcement</p>
        </div>

        {/* Metric 3 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Study Velocity</span>
            <Clock className="h-4 w-4 text-slate-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">4.5</span>
            <span className="text-xs text-slate-400">hours completed</span>
          </div>
          <p className="mt-2 text-[11px] text-emerald-600 font-medium">Daily consistency: 30 mins / day</p>
        </div>

        {/* Metric 4 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Current Streak</span>
            <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{user.currentStreak}</span>
            <span className="text-xs text-slate-400">days active</span>
          </div>
          <p className="mt-2 text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">Record: 14 days</p>
        </div>
      </div>

      {/* Topic Mastery Breakdown Chart (Section 14 requirement) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Topic Mastery Breakdown</h3>
            <p className="text-xs text-slate-400">Calculated from diagnostic answers and adaptive practice accuracy</p>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span>Strong (&gt;70%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span>Developing (40-70%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
              <span>Needs Focus (&lt;40%)</span>
            </div>
          </div>
        </div>

        <div className="mt-6 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topicChartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.15} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#888' }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#888' }} width={120} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-lg bg-slate-900 p-2.5 text-xs text-white shadow-md">
                        <p className="font-bold">{data.name}</p>
                        <p className="text-indigo-300">Mastery: {data.mastery}%</p>
                        <p className="capitalize text-slate-400">Status: {data.status}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="mastery" radius={[0, 6, 6, 0]}>
                {topicChartData.map((entry, index) => (
                  <Cell
                    key={`bar-${index}`}
                    fill={entry.mastery >= 70 ? '#10b981' : entry.mastery >= 40 ? '#f59e0b' : '#f43f5e'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Grid: Weekly Study Time & Accuracy Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Study Time */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Weekly Study Time (Hours)</h3>
            <p className="text-xs text-slate-400">Daily effort distribution</p>
          </div>

          <div className="mt-5 h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_PROGRESS_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#888' }} />
                <YAxis tick={{ fontSize: 11, fill: '#888' }} />
                <Tooltip />
                <Bar dataKey="hours" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Accuracy Trends Over Time */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Accuracy Trends Over Time</h3>
            <p className="text-xs text-slate-400">Test accuracy trajectory across recent practice sets</p>
          </div>

          <div className="mt-5 h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={accuracyTrends}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="session" tick={{ fontSize: 10, fill: '#888' }} />
                <YAxis domain={[40, 100]} tick={{ fontSize: 11, fill: '#888' }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#10b981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
