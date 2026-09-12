import React, { useState } from 'react';
import {
  Sparkles,
  Calculator,
  Atom,
  Binary,
  Dna,
  ArrowRight,
  ArrowLeft,
  Clock,
  Target,
  GraduationCap,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import { SubjectId, LearningLevel, UserProfile } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (preferences: {
    subject: SubjectId;
    subjectName: string;
    level: LearningLevel;
    goal: string;
    dailyMinutes: number;
  }) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [step, setStep] = useState(1);
  const [subject, setSubject] = useState<SubjectId>('math');
  const [level, setLevel] = useState<LearningLevel>('Intermediate');
  const [goal, setGoal] = useState('Master a subject');
  const [dailyMinutes, setDailyMinutes] = useState(30);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  if (!isOpen) return null;

  const subjects = [
    {
      id: 'math' as SubjectId,
      name: 'Mathematics',
      icon: Calculator,
      desc: 'Algebra, Functions, Quadratics, Calculus & Statistics',
      popular: true,
    },
    {
      id: 'physics' as SubjectId,
      name: 'Physics',
      icon: Atom,
      desc: 'Mechanics, Waves, Thermodynamics & Electromagnetism',
    },
    {
      id: 'cs' as SubjectId,
      name: 'Computer Science',
      icon: Binary,
      desc: 'Data Structures, Algorithms, Complexity & Systems',
    },
    {
      id: 'biology' as SubjectId,
      name: 'Biology',
      icon: Dna,
      desc: 'Genetics, Cellular Metabolism, Physiology & Ecology',
    },
  ];

  const levels: { id: LearningLevel; label: string; desc: string }[] = [
    {
      id: 'Beginner',
      label: 'Beginner',
      desc: 'New to the subject or need foundational intuition from the ground up',
    },
    {
      id: 'Intermediate',
      label: 'Intermediate',
      desc: 'Have general familiarity; looking to plug subtle misconceptions & accelerate',
    },
    {
      id: 'Advanced',
      label: 'Advanced',
      desc: 'Strong foundation; targeting high-rigor contest or university-level mastery',
    },
  ];

  const goals = [
    { id: 'Exam preparation', label: 'Exam preparation', icon: GraduationCap },
    { id: 'Build fundamentals', label: 'Build fundamentals', icon: Target },
    { id: 'Improve grades', label: 'Improve grades', icon: Sparkles },
    { id: 'Master a subject', label: 'Master a subject', icon: CheckCircle2 },
  ];

  const timeOptions = [
    { minutes: 15, label: '15 minutes', subtitle: 'Quick daily refresh' },
    { minutes: 30, label: '30 minutes', subtitle: 'Optimal steady progress' },
    { minutes: 60, label: '1 hour', subtitle: 'Deep accelerated learning' },
    { minutes: 120, label: '2+ hours', subtitle: 'Intensive exam sprint' },
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Step 4 complete -> Trigger animated generation
      setIsGenerating(true);
      let p = 0;
      const interval = setInterval(() => {
        p += 25;
        setGenerationProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const chosenSub = subjects.find((s) => s.id === subject);
            onComplete({
              subject,
              subjectName: chosenSub?.name || 'Mathematics',
              level,
              goal,
              dailyMinutes,
            });
          }, 400);
        }
      }, 350);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900 transition-all">
        {isGenerating ? (
          /* Animated Generation Experience */
          <div className="py-10 text-center space-y-6">
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
              <Cpu className="h-10 w-10 text-indigo-600 dark:text-indigo-400 animate-spin" />
              <div className="absolute inset-0 rounded-2xl border-2 border-indigo-500 animate-ping opacity-25" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                We're building your personalized learning path…
              </h3>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Synthesizing subject prerequisites, target difficulty, and preparing your diagnostic assessment.
              </p>
            </div>

            <div className="w-full max-w-xs mx-auto space-y-2">
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
                  style={{ width: `${generationProgress}%` }}
                />
              </div>
              <p className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                {generationProgress < 30 && 'Analyzing topic taxonomy...'}
                {generationProgress >= 30 && generationProgress < 75 && 'Configuring adaptive diagnostic questions...'}
                {generationProgress >= 75 && 'Ready! Launching assessment...'}
              </p>
            </div>
          </div>
        ) : (
          <div>
            {/* Step Progress Indicators */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                  {step}
                </span>
                <span className="text-xs font-semibold text-slate-500">Step {step} of 4</span>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-7 rounded-full transition-colors ${
                      i <= step ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Step 1: Subject */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What do you want to learn?</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Select your core study domain to calibrate your personalized diagnostic.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {subjects.map((s) => {
                    const Icon = s.icon;
                    const isSelected = subject === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSubject(s.id)}
                        className={`relative flex flex-col items-start rounded-xl p-4 text-left border transition-all ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                            : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/60'
                        }`}
                      >
                        {s.popular && (
                          <span className="absolute top-3 right-3 rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                            Recommended
                          </span>
                        )}
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-lg mb-3 ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{s.name}</h4>
                        <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 leading-normal">{s.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Level */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What is your current level?</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    This determines how the AI Tutor paces explanations and formats question difficulty.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {levels.map((lvl) => {
                    const isSelected = level === lvl.id;
                    return (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setLevel(lvl.id)}
                        className={`flex w-full items-center justify-between rounded-xl p-4 text-left border transition-all ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                            : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/60'
                        }`}
                      >
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{lvl.label}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{lvl.desc}</p>
                        </div>
                        <div
                          className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Goal */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What is your primary goal?</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    We adapt roadmap milestones and practice sets to match your urgency.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {goals.map((g) => {
                    const Icon = g.icon;
                    const isSelected = goal === g.id;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setGoal(g.id)}
                        className={`flex items-center gap-3 rounded-xl p-4 text-left border transition-all ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                            : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/60'
                        }`}
                      >
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{g.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Daily Time */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    How much time can you study each day?
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Micro-learning works best when paced consistently. You can adjust this anytime.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {timeOptions.map((opt) => {
                    const isSelected = dailyMinutes === opt.minutes;
                    return (
                      <button
                        key={opt.minutes}
                        type="button"
                        onClick={() => setDailyMinutes(opt.minutes)}
                        className={`flex flex-col items-start rounded-xl p-4 text-left border transition-all ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                            : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{opt.label}</span>
                          <Clock className="h-4 w-4 text-slate-400" />
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{opt.subtitle}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Modal Controls */}
            <div className="mt-8 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg px-3.5 py-2 text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400"
                >
                  Cancel
                </button>
              )}

              <button
                type="button"
                id="onboarding-next-btn"
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition-colors"
              >
                <span>{step === 4 ? 'Build My Roadmap →' : 'Continue'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
