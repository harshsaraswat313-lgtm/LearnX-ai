import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE_PROJECT_ID = 'nvmrymkwrgzacqngoxfs';
export const DEFAULT_SUPABASE_URL = 'https://nvmrymkwrgzacqngoxfs.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_m6FosiMmNPP_e1bcal8hsA_XkDpJWQX';

const metaEnv = (import.meta as any).env || {};
export const supabaseUrl = metaEnv.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
export const supabaseAnonKey = metaEnv.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  supabaseAnonKey.length > 20
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

// Database schema SQL for developer/user to run in Supabase SQL Editor
export const SUPABASE_SCHEMA_DOCS = `-- LearnX AI Supabase Database Schema
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/nvmrymkwrgzacqngoxfs/sql/new

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  subject_id TEXT DEFAULT 'math',
  subject_name TEXT DEFAULT 'Mathematics',
  learning_level TEXT DEFAULT 'Intermediate',
  target_goal TEXT DEFAULT 'Score 90%+ on Calculus Exam',
  daily_study_minutes INT DEFAULT 30,
  overall_mastery INT DEFAULT 68,
  lessons_completed INT DEFAULT 4,
  quiz_accuracy INT DEFAULT 78,
  current_streak INT DEFAULT 3,
  avatar TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Topic Mastery Table
CREATE TABLE IF NOT EXISTS public.topics (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  subject_id TEXT NOT NULL DEFAULT 'math',
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  mastery INT DEFAULT 0,
  status TEXT DEFAULT 'developing',
  prerequisites TEXT[],
  why_it_matters TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Diagnostic Assessments
CREATE TABLE IF NOT EXISTS public.assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  subject_id TEXT NOT NULL,
  overall_mastery INT NOT NULL,
  topic_masteries JSONB,
  strong_areas TEXT[],
  weak_areas TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Personalized Roadmaps & Lessons
CREATE TABLE IF NOT EXISTS public.roadmaps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  subject_id TEXT NOT NULL,
  milestones JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Adaptive Quiz Attempts
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  topic_name TEXT NOT NULL,
  score INT NOT NULL,
  total_questions INT NOT NULL,
  mastery_gained INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. AI Tutor Chat Messages
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  topic TEXT,
  difficulty TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS) and grant permissive access for publishable anon key
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all for profiles" ON public.profiles;
CREATE POLICY "Allow all for profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all for topics" ON public.topics;
CREATE POLICY "Allow all for topics" ON public.topics FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all for assessments" ON public.assessments;
CREATE POLICY "Allow all for assessments" ON public.assessments FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all for roadmaps" ON public.roadmaps;
CREATE POLICY "Allow all for roadmaps" ON public.roadmaps FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all for quiz_attempts" ON public.quiz_attempts;
CREATE POLICY "Allow all for quiz_attempts" ON public.quiz_attempts FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all for chat_messages" ON public.chat_messages;
CREATE POLICY "Allow all for chat_messages" ON public.chat_messages FOR ALL USING (true) WITH CHECK (true);
`;
