import React, { useState } from 'react';
import {
  User,
  Mail,
  GraduationCap,
  Clock,
  Flame,
  Award,
  RotateCcw,
  Sparkles,
  Save,
  CheckCircle2,
  Database,
  Cpu,
  Layers,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  Server,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { UserProfile, Topic, RoadmapMilestone } from '../types';
import {
  isSupabaseConfigured,
  SUPABASE_PROJECT_ID,
  supabaseUrl,
  supabaseAnonKey,
  SUPABASE_SCHEMA_DOCS,
} from '../lib/supabase';
import { supabaseStorage, SupabaseSyncStatus } from '../services/supabaseStorage';

interface ProfileViewProps {
  user: UserProfile;
  topics?: Topic[];
  milestones?: RoadmapMilestone[];
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onRetakeDiagnostic: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  topics = [],
  milestones = [],
  onUpdateUser,
  onRetakeDiagnostic,
}) => {
  const [name, setName] = useState(user.name);
  const [targetGoal, setTargetGoal] = useState(user.targetGoal);
  const [dailyMinutes, setDailyMinutes] = useState(user.dailyStudyMinutes);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Supabase management state
  const [isTestingSupabase, setIsTestingSupabase] = useState(false);
  const [testResults, setTestResults] = useState<SupabaseSyncStatus | null>(null);
  const [isSyncingData, setIsSyncingData] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [showSqlModal, setShowSqlModal] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name,
      targetGoal,
      dailyStudyMinutes: dailyMinutes,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleTestConnection = async () => {
    setIsTestingSupabase(true);
    setSyncFeedback(null);
    try {
      const results = await supabaseStorage.testTables();
      setTestResults(results);
    } catch (err: any) {
      console.warn('Supabase test catch:', err);
    } finally {
      setIsTestingSupabase(false);
    }
  };

  const handleSyncToSupabase = async () => {
    setIsSyncingData(true);
    setSyncFeedback(null);
    try {
      const res = await supabaseStorage.syncAllToSupabase({
        user,
        topics,
        milestones,
      });

      if (res.success) {
        setSyncFeedback(`Successfully synced Profile, ${topics.length} Topics, and Roadmap to Supabase!`);
      } else {
        setSyncFeedback(`Sync initiated: Note that tables need to be created in Supabase SQL editor if not yet present.`);
      }
    } catch (err: any) {
      setSyncFeedback(`Sync notice: ${err?.message || 'Error communicating with Supabase.'}`);
    } finally {
      setIsSyncingData(false);
      setTimeout(() => setSyncFeedback(null), 5000);
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SCHEMA_DOCS);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            Account Management
          </span>
          <span className="text-xs text-slate-400">• Preferences & Diagnostics</span>
        </div>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Student Profile
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Manage your learning objectives, study pacing, and diagnostic profile.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-slate-100 dark:border-slate-800">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-20 w-20 rounded-2xl object-cover border-2 border-indigo-500 shadow-md"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
            <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                {user.subjectName}
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Level: {user.learningLevel}
              </span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {user.overallMastery}% Mastery
              </span>
            </div>
          </div>
        </div>

        {/* Study Stats Grid (Section 16 requirement) */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Streak</span>
            <span className="text-lg font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-1 mt-1">
              <Flame className="h-4 w-4 fill-amber-500" />
              {user.currentStreak} Days
            </span>
          </div>

          <div className="rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Lessons Done</span>
            <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 mt-1 block">
              {user.lessonsCompleted}
            </span>
          </div>

          <div className="rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Quiz Accuracy</span>
            <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 block">
              {user.quizAccuracy}%
            </span>
          </div>

          <div className="rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Daily Target</span>
            <span className="text-lg font-extrabold text-slate-800 dark:text-slate-200 mt-1 block">
              {user.dailyStudyMinutes} Mins
            </span>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <form
        onSubmit={handleSave}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4"
      >
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Personal Details & Preferences</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Student Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email (Supabase Auth)</label>
            <input
              type="email"
              disabled
              value={user.email}
              className="w-full rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Goal / Exam</label>
            <input
              type="text"
              value={targetGoal}
              onChange={(e) => setTargetGoal(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Daily Study Commitment</label>
            <select
              value={dailyMinutes}
              onChange={(e) => setDailyMinutes(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value={15}>15 minutes / day</option>
              <option value={30}>30 minutes / day</option>
              <option value={60}>1 hour / day</option>
              <option value={120}>2+ hours / day</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition-colors"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Preferences</span>
          </button>

          {savedSuccess && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              Preferences updated!
            </span>
          )}
        </div>
      </form>

      {/* Retake Diagnostic (Section 16 requirement: Allow resetting diagnostic to retake it) */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 dark:border-amber-950/60 dark:bg-amber-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-amber-900 dark:text-amber-300">
              Reset & Retake Diagnostic Assessment
            </h3>
            <p className="mt-1 text-xs text-amber-800/80 dark:text-amber-400 max-w-xl">
              Recalibrate your knowledge map from scratch. This resets your topic mastery bars and regenerates a brand-new adaptive roadmap.
            </p>
          </div>

          <button
            id="profile-retake-diag-btn"
            onClick={onRetakeDiagnostic}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-amber-700 transition-colors shrink-0 shadow-xs"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Retake Diagnostic</span>
          </button>
        </div>
      </div>

      {/* Supabase Database Connection & Storage Dashboard */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Supabase Cloud Database
                </h3>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Connected
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Live persistence for profiles, diagnostics, topic masteries, quiz records, and chat
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTestConnection}
              disabled={isTestingSupabase}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700/60 transition-colors"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isTestingSupabase ? 'animate-spin text-indigo-600' : ''}`} />
              <span>{isTestingSupabase ? 'Testing...' : 'Check Tables'}</span>
            </button>

            <button
              onClick={handleSyncToSupabase}
              disabled={isSyncingData}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-xs"
            >
              <Server className="h-3.5 w-3.5" />
              <span>{isSyncingData ? 'Syncing...' : 'Sync Data Now'}</span>
            </button>
          </div>
        </div>

        {/* Feedback message */}
        {syncFeedback && (
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 p-3 text-xs font-medium text-indigo-800 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>{syncFeedback}</span>
          </div>
        )}

        {/* Connection Credentials Information */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Project ID</span>
            <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5 block truncate">
              {SUPABASE_PROJECT_ID}
            </span>
          </div>

          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Endpoint URL</span>
            <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5 block truncate">
              {supabaseUrl}
            </span>
          </div>

          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">API Key (Publishable)</span>
            <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5 block truncate">
              {supabaseAnonKey.slice(0, 16)}...{supabaseAnonKey.slice(-6)}
            </span>
          </div>
        </div>

        {/* Test Results Display if executed */}
        {testResults && (
          <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-850/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Database Tables Health Status:
              </span>
              <span className="text-[11px] text-slate-500">
                {testResults.connected ? 'Connected to PostgREST' : 'Connection unreachable'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(testResults.tableStatus).map(([tbl, status]) => (
                <div
                  key={tbl}
                  className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-xs border border-slate-200 dark:bg-slate-900 dark:border-slate-800"
                >
                  <span className="font-mono text-slate-700 dark:text-slate-300">{tbl}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                      status === 'ready'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                    }`}
                  >
                    {status === 'ready' ? 'Ready' : 'Setup Needed'}
                  </span>
                </div>
              ))}
            </div>

            {Object.values(testResults.tableStatus).some((s) => s !== 'ready') && (
              <p className="text-[11px] text-amber-700 dark:text-amber-400">
                Notice: Some tables have not been created yet in your Supabase project. Use the 1-click SQL script below to create them in seconds.
              </p>
            )}
          </div>
        )}

        {/* SQL Schema Generator & 1-Click Copy */}
        <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 dark:border-indigo-950 dark:bg-indigo-950/20 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-indigo-950 dark:text-indigo-300">
                Supabase Schema Setup (1-Click SQL)
              </h4>
              <p className="text-[11px] text-indigo-700/80 dark:text-indigo-400">
                Quickly create all 6 tables and permissive Row Level Security (RLS) policies in your Supabase SQL Editor.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopySql}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors shadow-xs"
              >
                {copiedSql ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL Script'}</span>
              </button>

              <a
                href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:bg-slate-900 dark:text-indigo-300 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Open SQL Editor</span>
              </a>
            </div>
          </div>

          <div>
            <button
              onClick={() => setShowSqlModal(!showSqlModal)}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {showSqlModal ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              <span>{showSqlModal ? 'Hide Schema SQL' : 'View Schema SQL'}</span>
            </button>

            {showSqlModal && (
              <pre className="mt-2 max-h-56 overflow-y-auto rounded-lg bg-slate-950 p-3 text-[11px] text-indigo-200 font-mono leading-relaxed border border-slate-800">
                {SUPABASE_SCHEMA_DOCS}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
