import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Target,
  BrainCircuit,
  Compass,
  CheckCircle2,
  BarChart3,
  BotMessageSquare,
  Zap,
  TrendingUp,
  Award,
  Clock,
  Layers,
  Check,
  ChevronRight,
  Play,
  ShieldCheck,
  Star,
  Users,
} from 'lucide-react';
import heroIllustration from '../assets/images/ai_learning_hero_1789192006893.jpg';
import knowledgeMapVisual from '../assets/images/knowledge_network_visual_1789192026342.jpg';
import aiTutorCompanion from '../assets/images/ai_tutor_companion_1789192044084.jpg';
import studentStudyBanner from '../assets/images/student_study_banner_1789192063789.jpg';

interface LandingPageProps {
  onStartLearning: () => void;
  onTryDemo: () => void;
  onOpenAuth: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartLearning,
  onTryDemo,
  onOpenAuth,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Subtle background radial ambient glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/15" />
        <div className="pointer-events-none absolute top-1/3 right-10 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/10" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50/70 px-4 py-1.5 text-xs font-semibold text-indigo-700 shadow-xs dark:border-indigo-800/80 dark:bg-indigo-950/40 dark:text-indigo-300">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Next-Generation Adaptive EdTech</span>
              <span className="hidden sm:inline text-indigo-400 dark:text-indigo-600">•</span>
              <span className="hidden sm:inline font-normal">Diagnostic-first learning</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Stop studying everything.{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
                Learn what you need.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              LearnX AI identifies your knowledge gaps and creates a personalized learning journey that adapts to how you learn.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                id="hero-start-learning-btn"
                onClick={onStartLearning}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/25 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all group"
              >
                <span>Start Learning</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700/80 transition-colors"
              >
                See How It Works
              </a>

              {/* Hackathon Demo Button */}
              <button
                id="hero-try-demo-btn"
                onClick={onTryDemo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3.5 text-sm font-semibold text-indigo-700 hover:bg-indigo-100 dark:border-indigo-800/80 dark:bg-indigo-950/50 dark:text-indigo-300 dark:hover:bg-indigo-900/60 transition-colors"
              >
                <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span>Try Demo →</span>
              </button>
            </div>

            {/* Quick credibility proofs */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" />
                <span>3-Minute Diagnostic Test</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" />
                <span>Adaptive Weak-Area Practice</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" />
                <span>Socratic AI Personal Tutor</span>
              </div>
            </div>
          </div>

          {/* 2. Hero Visual Graphic & Mock Student Dashboard */}
          <div id="demo-preview" className="mt-14 relative max-w-5xl mx-auto space-y-6">
            {/* Cinematic Hero Illustration Showcase */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 bg-slate-950 shadow-2xl dark:border-slate-700/80 group">
              <img
                src={heroIllustration}
                alt="AI-Powered Personalized Learning Platform"
                referrerPolicy="no-referrer"
                className="w-full h-56 sm:h-72 md:h-[380px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Overlaid Live Badges */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-white shadow-md">
                  <Sparkles className="h-3.5 w-3.5" />
                  Neural Knowledge Engine
                </span>
                <span className="rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-xs font-medium text-slate-200 border border-slate-700">
                  Real-Time Socratic Feedback
                </span>
              </div>

              {/* Floating Telemetry overlays on image */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-white shadow-md">
                      <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                      Diagnostic Calibration Active
                    </span>
                    <span className="hidden sm:inline-block text-xs font-medium text-slate-300">
                      Targeted STEM Curriculums
                    </span>
                  </div>
                  <p className="text-white text-sm sm:text-xl font-bold drop-shadow-md">
                    Skip redundant lectures. Laser-focus on the 20% of concepts causing 80% of errors.
                  </p>
                </div>

                <button
                  onClick={onTryDemo}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-900 shadow-lg hover:bg-slate-100 transition-all shrink-0"
                >
                  <Play className="h-3.5 w-3.5 fill-indigo-600 text-indigo-600" />
                  <span>Interactive Walkthrough</span>
                </button>
              </div>
            </div>

            {/* Floating micro badges */}
            <div className="hidden lg:flex items-center gap-2 absolute -top-5 -left-6 z-20 rounded-xl bg-white p-3 shadow-lg border border-slate-200/80 dark:bg-slate-800 dark:border-slate-700 animate-bounce duration-1000">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <Target className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-slate-900 dark:text-white">Functions Mastery</p>
                <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">+17% in 15 mins</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 absolute -bottom-5 -right-6 z-20 rounded-xl bg-white p-3 shadow-lg border border-slate-200/80 dark:bg-slate-800 dark:border-slate-700">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                <BotMessageSquare className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-slate-900 dark:text-white">AI Tutor Active</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Socratic mode: Beginner</p>
              </div>
            </div>

            {/* Dashboard Mock Window */}
            <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-4 sm:p-6 shadow-2xl backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/90 transition-all">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-semibold text-slate-400">learnx.ai/dashboard/alex</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    Live Demo Ready
                  </span>
                </div>
              </div>

              {/* Window Content Grid */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* 1. Mastery Score Widget */}
                <div className="md:col-span-4 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Overall Mastery</span>
                    <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                      Target: 85%
                    </span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">68%</span>
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+8% this week</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="mt-3 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 w-[68%]" />
                  </div>
                  <div className="mt-4 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span>Algebra</span>
                      <span className="font-semibold text-emerald-600">82% (Strong)</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span>Functions</span>
                      <span className="font-semibold text-amber-600">45% (Developing)</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span>Quadratics</span>
                      <span className="font-semibold text-rose-500">25% (Needs Focus)</span>
                    </div>
                  </div>
                </div>

                {/* 2. Personalized Roadmap Card */}
                <div className="md:col-span-5 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Your Path to Mastery</span>
                    <span className="text-[10px] font-bold text-slate-400">Week 1 of 3</span>
                  </div>
                  <div className="mt-3 space-y-2.5">
                    <div className="flex items-center justify-between rounded-lg bg-white p-2.5 shadow-2xs border border-slate-200/60 dark:bg-slate-900 dark:border-slate-700/60">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <div>
                          <p className="text-xs font-semibold text-slate-900 dark:text-white">Functions Fundamentals</p>
                          <p className="text-[10px] text-slate-500">20 min • Completed</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600">Done</span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg bg-indigo-50/80 p-2.5 border border-indigo-200 dark:bg-indigo-950/40 dark:border-indigo-800">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                        <div>
                          <p className="text-xs font-bold text-indigo-900 dark:text-indigo-200">Domain & Range Focus</p>
                          <p className="text-[10px] text-indigo-700/70 dark:text-indigo-400">15 min • In Progress</p>
                        </div>
                      </div>
                      <span className="rounded bg-indigo-600 px-2 py-0.5 text-[10px] font-bold text-white">Next</span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg bg-white p-2.5 border border-slate-200/60 dark:bg-slate-900 dark:border-slate-700/60 opacity-60">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full border border-slate-300 text-[10px] flex items-center justify-center font-bold text-slate-400">
                          3
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-700 dark:text-slate-300">Practice Quiz (Functions)</p>
                          <p className="text-[10px] text-slate-400">10 min • Unlocks next</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. AI Tutor Card */}
                <div className="md:col-span-3 rounded-xl border border-indigo-100 bg-gradient-to-b from-indigo-50/50 to-white p-4 dark:border-indigo-900/50 dark:from-indigo-950/30 dark:to-slate-900 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                      <img
                        src={aiTutorCompanion}
                        alt="AI Tutor Avatar"
                        referrerPolicy="no-referrer"
                        className="h-6 w-6 rounded-full object-cover ring-1 ring-indigo-500"
                      />
                      <span className="text-xs font-bold">LearnX AI Tutor</span>
                    </div>
                    <div className="mt-3 rounded-lg bg-white p-2.5 text-[11px] text-slate-700 shadow-2xs border border-slate-200/60 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Misconception Solved:</p>
                      <p className="text-[10px] leading-relaxed">
                        "Notice that 1/√(x-4) has two rules: no dividing by zero, and non-negative roots. So x &gt; 4 strictly!"
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onTryDemo}
                    className="mt-3 w-full rounded-lg bg-indigo-600 py-1.5 text-center text-xs font-semibold text-white hover:bg-indigo-700 transition-colors"
                  >
                    Open Live Tutor →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Comparison Section: Before vs After */}
      <section className="border-y border-slate-200 bg-slate-100/70 py-16 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Why Traditional Learning Fails High-Performance Students
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Generic curricula force you through hours of material you already understand, while skimming over your exact hidden gaps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Generic Learning Card */}
            <div className="rounded-2xl border border-rose-200/80 bg-white p-6 shadow-xs dark:border-rose-950/60 dark:bg-slate-900/80">
              <div className="flex items-center justify-between pb-4 border-b border-rose-100 dark:border-rose-950">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Standard Textbooks & Courses
                </span>
                <span className="text-xs font-semibold text-slate-400">35+ Hours Wasted</span>
              </div>
              <ul className="mt-4 space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 font-bold text-[10px]">
                    ✕
                  </span>
                  <span>Forces linear study from Chapter 1 even if you already know Algebra.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 font-bold text-[10px]">
                    ✕
                  </span>
                  <span>Hidden misconceptions remain unnoticed until you fail an exam.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 font-bold text-[10px]">
                    ✕
                  </span>
                  <span>Passive video watching with zero adaptive check-for-understanding.</span>
                </li>
              </ul>
            </div>

            {/* LearnX AI Card */}
            <div className="rounded-2xl border-2 border-indigo-500 bg-white p-6 shadow-md shadow-indigo-500/10 dark:bg-slate-900">
              <div className="flex items-center justify-between pb-4 border-b border-indigo-100 dark:border-indigo-900/60">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  LearnX AI Personalized Path
                </span>
                <span className="text-xs font-bold text-emerald-600">11 Focused Hours</span>
              </div>
              <ul className="mt-4 space-y-3 text-xs text-slate-700 dark:text-slate-200">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold text-[10px]">
                    ✓
                  </span>
                  <span>Rapid diagnostic pinpointing exactly what you know vs what you need.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold text-[10px]">
                    ✓
                  </span>
                  <span>Connected roadmap targeting your precise weak areas (Functions & Quadratics).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold text-[10px]">
                    ✓
                  </span>
                  <span>Socratic AI tutor explaining your exact misconceptions at your level.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works (Section 4 in prompt) */}
      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              The 4-Step Learning Engine
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Transforming scattered revision into targeted, measurable subject mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-transform hover:-translate-y-1 overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative rounded-xl overflow-hidden mb-4 h-36 bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <img
                    src={knowledgeMapVisual}
                    alt="Assess Knowledge Gaps"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2.5 left-2.5 rounded-lg bg-indigo-600/90 backdrop-blur-xs text-white text-[10px] font-extrabold px-2.5 py-0.5 shadow-sm">
                    STEP 1
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Assess</h3>
                <p className="mt-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  “Discover what you know and what you're missing.”
                </p>
                <p className="mt-2.5 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  A 5–7 question diagnostic evaluates underlying intuition, calculating topic-by-topic mastery percentages.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-transform hover:-translate-y-1 overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative rounded-xl overflow-hidden mb-4 h-36 bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80"
                    alt="Personalized Path Architecture"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2.5 left-2.5 rounded-lg bg-indigo-600/90 backdrop-blur-xs text-white text-[10px] font-extrabold px-2.5 py-0.5 shadow-sm">
                    STEP 2
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Personalize</h3>
                <p className="mt-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  “AI builds a learning path based on your knowledge.”
                </p>
                <p className="mt-2.5 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Bypasses mastered concepts and stitches together a week-by-week connected sequence of micro-lessons.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-transform hover:-translate-y-1 overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative rounded-xl overflow-hidden mb-4 h-36 bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <img
                    src={aiTutorCompanion}
                    alt="Socratic AI Tutor Guidance"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2.5 left-2.5 rounded-lg bg-indigo-600/90 backdrop-blur-xs text-white text-[10px] font-extrabold px-2.5 py-0.5 shadow-sm">
                    STEP 3
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Learn</h3>
                <p className="mt-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  “Get explanations designed for your current level.”
                </p>
                <p className="mt-2.5 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Interactive Socratic AI Tutor diagnoses misconceptions, providing analogies and active mini-questions.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-transform hover:-translate-y-1 overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative rounded-xl overflow-hidden mb-4 h-36 bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <img
                    src={studentStudyBanner}
                    alt="Master Weak Concepts"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2.5 left-2.5 rounded-lg bg-indigo-600/90 backdrop-blur-xs text-white text-[10px] font-extrabold px-2.5 py-0.5 shadow-sm">
                    STEP 4
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Master</h3>
                <p className="mt-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  “Practice until your weak areas become strengths.”
                </p>
                <p className="mt-2.5 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Adaptive quizzes adjust difficulty in real-time, verifying mastery gains and unlocking achievements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. Supported Curriculums Visual Showcase */}
      <section className="border-t border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Personalized Disciplines
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Curriculums Designed for Accelerated Mastery
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Each discipline maps prerequisites into an interconnected neural graph for instant diagnostic evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Subject 1: Mathematics */}
            <div className="group rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs hover:shadow-xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80"
                    alt="Mathematics & Calculus"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  <div className="absolute top-3 left-3 rounded-md bg-indigo-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                    Most Popular
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-base font-bold text-white">Mathematics</h3>
                    <p className="text-[11px] text-indigo-300">Algebra, Calculus & Linear Systems</p>
                  </div>
                </div>
                <div className="p-4 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                    <span>Syllabus Reduction:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">-65% Study Time</span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                    <span>Diagnostic Test:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">3 minutes (7 questions)</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] pt-1 leading-relaxed">
                    Pinpoints domain & range misconceptions, vertex shifts, and logarithmic errors instantly.
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  onClick={onStartLearning}
                  className="w-full rounded-xl bg-indigo-50 py-2 text-center text-xs font-bold text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-900 transition-colors"
                >
                  Start Math Diagnostic →
                </button>
              </div>
            </div>

            {/* Subject 2: Physics */}
            <div className="group rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs hover:shadow-xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=800&q=80"
                    alt="Physics & Mechanics"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-base font-bold text-white">Physics & Mechanics</h3>
                    <p className="text-[11px] text-cyan-300">Kinematics, Forces & Energy</p>
                  </div>
                </div>
                <div className="p-4 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                    <span>Syllabus Reduction:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">-58% Study Time</span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                    <span>Diagnostic Test:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">4 minutes (6 questions)</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] pt-1 leading-relaxed">
                    Translates free-body diagram intuitions and vector components into high-retention reflexes.
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  onClick={onStartLearning}
                  className="w-full rounded-xl bg-slate-100 py-2 text-center text-xs font-bold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Start Physics Track →
                </button>
              </div>
            </div>

            {/* Subject 3: Computer Science */}
            <div className="group rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs hover:shadow-xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
                    alt="Computer Science & Data Structures"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-base font-bold text-white">Computer Science</h3>
                    <p className="text-[11px] text-violet-300">Data Structures & Algorithms</p>
                  </div>
                </div>
                <div className="p-4 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                    <span>Syllabus Reduction:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">-72% Study Time</span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                    <span>Diagnostic Test:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">5 minutes (8 questions)</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] pt-1 leading-relaxed">
                    Evaluates recursion, Big-O complexity, and tree traversal intuition with Socratic code review.
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  onClick={onStartLearning}
                  className="w-full rounded-xl bg-slate-100 py-2 text-center text-xs font-bold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Start CS Track →
                </button>
              </div>
            </div>

            {/* Subject 4: Biology */}
            <div className="group rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs hover:shadow-xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80"
                    alt="Biology & Genetics"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-base font-bold text-white">Biology & Genetics</h3>
                    <p className="text-[11px] text-emerald-300">Cellular Mechanisms & DNA</p>
                  </div>
                </div>
                <div className="p-4 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                    <span>Syllabus Reduction:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">-60% Study Time</span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                    <span>Diagnostic Test:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">3 minutes (6 questions)</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] pt-1 leading-relaxed">
                    Identifies conceptual friction in transcription, translation, and cellular respiration cycles.
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  onClick={onStartLearning}
                  className="w-full rounded-xl bg-slate-100 py-2 text-center text-xs font-bold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Start Biology Track →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.8. Student Testimonials & Outcomes with Real Photos */}
      <section className="py-20 border-t border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Verified Student Outcomes
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              From Overwhelmed to Confident Mastery
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              See how learners replaced 40-hour indiscriminate cramming with targeted AI diagnostics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  “I used to spend entire weekends watching 3-hour YouTube playlists only to fail the same quiz questions. LearnX tested me in 3 minutes, pointed out I only had 2 gaps in Quadratics, and fixed them in 45 minutes.”
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Alex Morgan"
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500/20"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Alex Morgan</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Pre-Engineering • Stanford University</p>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">+24% Calculus Grade Jump</span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  “The Socratic AI Tutor is unlike any generic chatbot. When I got confused by fractional exponents, it didn’t give me the answer; it gave me a tailored pizza-slice analogy that finally made it click.”
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
                  alt="Priya Sharma"
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500/20"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Priya Sharma</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">AP Biology & Calculus • Grade 12</p>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Saved 18 hrs/week</span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  “The interactive knowledge map gave me total clarity. Seeing my weak concepts turn from rose-pink into vibrant emerald green gave me the momentum I needed to pass my midterms with flying colors.”
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                  alt="Marcus Chen"
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500/20"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Marcus Chen</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Computer Science • UC Berkeley</p>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">94% Final Mastery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Features Grid (Section 4 in prompt) */}
      <section id="features" className="border-t border-slate-200 bg-slate-50/50 py-20 dark:border-slate-800 dark:bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Complete EdTech Architecture
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Engineered for True Competency
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Everything you need to master difficult STEM subjects without burnout.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 mb-4">
                <BotMessageSquare className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">AI Personal Tutor</h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Never dumps raw answers. Asks targeted follow-ups, pinpoints exact student misconceptions, and switches effortlessly between Beginner and Advanced modes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 mb-4">
                <Compass className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Personalized Roadmaps</h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A connected visual timeline generated purely from your diagnostic outcome, with bite-sized lessons, checkpoints, and estimated time budgets.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 mb-4">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Adaptive Quizzes</h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Dynamically generated practice targeting only your low-mastery concepts, featuring instant pedagogic explanations for every distractor.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 mb-4">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Knowledge Gap Detection</h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Visual knowledge map color-coding strong, developing, and critical gap areas so you immediately know where to spend your energy.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 mb-4">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Progress Analytics</h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Comprehensive analytics tracking overall subject mastery, weekly study minutes, streak consistency, and topic-level accuracy.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 mb-4">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Smart Study Recommendations</h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Daily proactive recommendations (e.g., “You’re close to mastering Functions — spend 15 min reviewing Domain & Range”) keeping you in the flow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA Section (Section 4 in prompt) */}
      <section className="relative overflow-hidden py-20 bg-slate-900 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 opacity-80" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Your learning journey starts here.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
            Find your exact knowledge gaps in 3 minutes and experience AI-guided education tailored to your goals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              id="final-cta-start-learning-btn"
              onClick={onStartLearning}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 focus:outline-none transition-all group"
            >
              <span>Start Learning →</span>
            </button>

            <button
              id="final-cta-demo-btn"
              onClick={onTryDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
            >
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span>Explore Demo Account</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white">LearnX AI</span>
            <span>— “Stop studying everything. Learn what you need.”</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Full-Stack EdTech Architecture</span>
            <span>•</span>
            <span>Gemini LLM API</span>
            <span>•</span>
            <span>Supabase Auth & Database</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
