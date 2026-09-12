import React from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Flame,
  CheckCircle2,
  Clock,
  Target,
  AlertTriangle,
  Play,
  BotMessageSquare,
  Compass,
  Zap,
  BookOpen,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from 'recharts';
import { UserProfile, Topic } from '../types';
import { WEEKLY_PROGRESS_DATA } from '../lib/demoData';
import studentStudyBanner from '../assets/images/student_study_banner_1789192063789.jpg';
import aiTutorCompanion from '../assets/images/ai_tutor_companion_1789192044084.jpg';

interface DashboardViewProps {
  user: UserProfile;
  topics: Topic[];
  onStartLesson: (lessonId?: string) => void;
  onOpenAITutor: (topicName?: string) => void;
  onStartQuiz: () => void;
  onOpenKnowledgeMap: () => void;
  onOpenRoadmap: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  topics,
  onStartLesson,
  onOpenAITutor,
  onStartQuiz,
  onOpenKnowledgeMap,
  onOpenRoadmap,
}) => {
  const weakTopics = topics.filter((t) => t.status === 'weak' || t.status === 'developing');

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Dynamic Visual Study Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-950 p-6 sm:p-8 text-white shadow-xl dark:border-slate-800">
        <img
          src={studentStudyBanner}
          alt="Focused Learning"
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-luminosity filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-indigo-950/75" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 backdrop-blur-md px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-400/30">
                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                Active Track: {user.subjectName}
              </span>
              <span className="text-xs text-slate-400">Targeting 85% Exam Mastery</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Good morning, {user.name.split(' ')[0]} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Your AI diagnostic isolated <span className="font-semibold text-rose-300">2 priority gap areas</span> in Quadratic symmetry and Domain restrictions. Spend 15 minutes today to unlock the next milestone.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="flex items-center justify-center gap-2 rounded-xl bg-amber-500/10 backdrop-blur-md px-3.5 py-2.5 text-xs font-bold text-amber-300 border border-amber-500/20">
              <Flame className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span>{user.currentStreak} Day Streak</span>
            </div>

            <button
              id="dash-quick-tutor-btn"
              onClick={() => onOpenAITutor('Functions')}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-500 transition-colors"
            >
              <img
                src={aiTutorCompanion}
                alt="AI Tutor Avatar"
                referrerPolicy="no-referrer"
                className="h-4 w-4 rounded-full object-cover ring-1 ring-white/50"
              />
              <span>Ask AI Tutor</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Overall Mastery */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Overall Mastery</span>
            <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
              +8% this week
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{user.overallMastery}%</span>
            <span className="text-xs text-slate-400">/ 100%</span>
          </div>
          <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
              style={{ width: `${user.overallMastery}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Today's Goal */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Today's Goal</span>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              {user.todayCompletedActivities}/{user.todayGoalActivities}
            </span>
          </div>
          <div className="mt-3">
            <p className="text-sm font-bold text-slate-900 dark:text-white">Complete 2 learning activities</p>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">1 practice quiz + 1 concept review</p>
          </div>
          <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-indigo-600"
              style={{ width: `${(user.todayCompletedActivities / user.todayGoalActivities) * 100}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Time Spent */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Study Time</span>
            <Clock className="h-4 w-4 text-slate-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">4.5</span>
            <span className="text-xs font-semibold text-slate-500">hours this week</span>
          </div>
          <p className="mt-2 text-[11px] text-emerald-600 font-medium">Daily target: {user.dailyStudyMinutes} mins</p>
        </div>

        {/* Metric 4: Quiz Accuracy */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Quiz Accuracy</span>
            <Target className="h-4 w-4 text-slate-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{user.quizAccuracy}%</span>
            <span className="text-xs text-slate-400">adaptive</span>
          </div>
          <p className="mt-2 text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
            3 Topics Tested & Validated
          </p>
        </div>
      </div>

      {/* 3. AI Recommendation Prominent Card (Section 13 in prompt) */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-indigo-500/80 bg-gradient-to-r from-indigo-500/10 via-indigo-50/50 to-white p-6 shadow-md shadow-indigo-500/5 dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-900">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <img
              src={aiTutorCompanion}
              alt="Socratic AI Tutor"
              referrerPolicy="no-referrer"
              className="h-12 w-12 rounded-2xl object-cover ring-2 ring-indigo-500 shadow-sm shrink-0"
            />
            <div className="space-y-1 max-w-xl">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600/10 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                <Sparkles className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
                <span>AI Socratic Advice</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                You’re close to mastering Functions.
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Spend 15 minutes reviewing Domain & Range before moving forward to Quadratic Factoring.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              id="dash-start-rec-lesson"
              onClick={() => onStartLesson('lesson-2')}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-colors"
            >
              <Play className="h-3.5 w-3.5 fill-white" />
              <span>Start Recommended Lesson</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Center Grid: Continue Learning & Weak Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Continue Learning Card */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Continue Learning</span>
            <button
              onClick={onOpenRoadmap}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              View Full Roadmap →
            </button>
          </div>

          <div className="mt-5 space-y-4">
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
              <div className="flex items-start justify-between">
                <div>
                  <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    Week 2 Module
                  </span>
                  <h4 className="mt-2 text-base font-bold text-slate-900 dark:text-white">Quadratic Equations</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Introduction to Parabolas, Symmetry & Geometric Roots
                  </p>
                </div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">60% Complete</span>
              </div>

              {/* Progress */}
              <div className="mt-3 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className="h-full rounded-full bg-indigo-600 w-[60%]" />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Estimated 20 min remaining</span>
                <button
                  id="dash-continue-learning-btn"
                  onClick={() => onStartLesson('lesson-4')}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Next lesson in queue */}
            <div className="flex items-center justify-between rounded-xl border border-slate-100 p-3.5 dark:border-slate-800/60">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 text-xs font-bold">
                  3
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Practice Quiz: Functions</p>
                  <p className="text-[10px] text-slate-400">10 min • Adaptive checkpoint</p>
                </div>
              </div>
              <button
                onClick={onStartQuiz}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                Practice Quiz
              </button>
            </div>
          </div>
        </div>

        {/* Weak Areas Widget (Section 13 in prompt) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Weak Areas (Priority)
              </span>
            </div>
            <button
              onClick={onOpenKnowledgeMap}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              Knowledge Map →
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {weakTopics.map((topic) => (
              <div
                key={topic.id}
                className="rounded-xl border border-slate-200/70 p-3.5 dark:border-slate-800 hover:border-indigo-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{topic.name}</span>
                  <span
                    className={`text-xs font-bold ${
                      topic.mastery < 40 ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {topic.mastery}% Mastery
                  </span>
                </div>

                <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      topic.mastery < 40 ? 'bg-rose-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${topic.mastery}%` }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-400">{topic.whyItMatters.slice(0, 45)}...</span>
                  <button
                    onClick={() => onOpenAITutor(topic.name)}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                  >
                    Fix Gap →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onStartQuiz}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
          >
            <span>Launch Adaptive Practice Set</span>
          </button>
        </div>
      </div>

      {/* 5. Weekly Progress Chart & Recent Activity (Section 13 in prompt) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Progress Chart */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Weekly Study Progress</h3>
              <p className="text-xs text-slate-400">Daily hours dedicated to targeted revision</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded">
              Consistent
            </span>
          </div>

          <div className="mt-5 h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_PROGRESS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg bg-slate-900 p-2 text-xs text-white shadow-md">
                          <p className="font-bold">{payload[0].payload.day}</p>
                          <p className="text-indigo-300">{payload[0].value} hours studied</p>
                          <p className="text-emerald-300">{payload[0].payload.mastery}% mastery</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
                  {WEEKLY_PROGRESS_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.day === 'Sun' || entry.day === 'Fri' ? '#6366f1' : '#94a3b8'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-100 pb-4 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Activity</h3>
            <p className="text-xs text-slate-400">Milestones and study logs</p>
          </div>

          <div className="mt-4 space-y-3.5">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 text-sm dark:bg-emerald-950 dark:text-emerald-400">
                🎯
              </span>
              <div className="text-xs">
                <p className="font-bold text-slate-900 dark:text-white">Completed Algebra Quiz</p>
                <p className="text-slate-500 dark:text-slate-400">Score 5/5 (100%) • Topic verified</p>
                <span className="text-[10px] text-slate-400">2 hours ago</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 text-sm dark:bg-indigo-950 dark:text-indigo-400">
                📘
              </span>
              <div className="text-xs">
                <p className="font-bold text-slate-900 dark:text-white">Learned Functions Fundamentals</p>
                <p className="text-slate-500 dark:text-slate-400">Completed 20 min lesson on relations</p>
                <span className="text-[10px] text-slate-400">Yesterday at 4:15 PM</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600 text-sm dark:bg-amber-950 dark:text-amber-400">
                📈
              </span>
              <div className="text-xs">
                <p className="font-bold text-slate-900 dark:text-white">Improved mastery by 8%</p>
                <p className="text-slate-500 dark:text-slate-400">Functions elevated from 37% to 45%</p>
                <span className="text-[10px] text-slate-400">Yesterday at 4:40 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Explore Additional Adaptive Tracks */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span>Explore Other Adaptive Curriculums</span>
            </h3>
            <p className="text-xs text-slate-400">Switch topics anytime or test your gap profile across disciplines.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Track 1 */}
          <div className="group rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-950/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col justify-between">
            <div className="relative h-28 overflow-hidden bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=600&q=80"
                alt="Physics Track"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <span className="text-xs font-bold text-white">Physics & Mechanics</span>
              </div>
            </div>
            <div className="p-3">
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                Kinematics, forces, work & energy with adaptive free-body diagnostics.
              </p>
              <button
                onClick={() => onOpenAITutor('Physics: Newton Laws')}
                className="mt-2.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 inline-flex items-center gap-1"
              >
                <span>Ask Physics Tutor</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Track 2 */}
          <div className="group rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-950/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col justify-between">
            <div className="relative h-28 overflow-hidden bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80"
                alt="CS Track"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <span className="text-xs font-bold text-white">Computer Science</span>
              </div>
            </div>
            <div className="p-3">
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                Data structures, Big-O algorithm analysis, and recursive call trees.
              </p>
              <button
                onClick={() => onOpenAITutor('Data Structures: Recursion')}
                className="mt-2.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 inline-flex items-center gap-1"
              >
                <span>Ask CS Tutor</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Track 3 */}
          <div className="group rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-950/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col justify-between">
            <div className="relative h-28 overflow-hidden bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=600&q=80"
                alt="Biology Track"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <span className="text-xs font-bold text-white">Biology & Genetics</span>
              </div>
            </div>
            <div className="p-3">
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                Cellular respiration, molecular genetics, and DNA transcription.
              </p>
              <button
                onClick={() => onOpenAITutor('Biology: Cellular Respiration')}
                className="mt-2.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 inline-flex items-center gap-1"
              >
                <span>Ask Biology Tutor</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
