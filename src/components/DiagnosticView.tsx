import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  Compass,
  Zap,
  TrendingUp,
  BrainCircuit,
  BookOpen,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DIAGNOSTIC_QUESTIONS } from '../lib/demoData';
import { aiService } from '../services/aiService';
import { Topic, UserProfile } from '../types';

interface DiagnosticViewProps {
  onComplete: (results: {
    overallMastery: number;
    topicMasteries: Record<string, number>;
    strongAreas: string[];
    weakAreas: string[];
  }) => void;
  onExploreKnowledgeMap: () => void;
  onViewRoadmap: () => void;
}

export const DiagnosticView: React.FC<DiagnosticViewProps> = ({
  onComplete,
  onExploreKnowledgeMap,
  onViewRoadmap,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showWowMoment, setShowWowMoment] = useState(false);
  const [wowAnimationStep, setWowAnimationStep] = useState(1); // 1: "We found gaps", 2: Before vs After, 3: Roadmap generated
  const [results, setResults] = useState<{
    topicMasteries: Record<string, number>;
    overallMastery: number;
    strongAreas: string[];
    weakAreas: string[];
    gapCount: number;
  } | null>(null);

  const currentQ = DIAGNOSTIC_QUESTIONS[currentIndex];
  const totalQuestions = DIAGNOSTIC_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;

  const handleSelectOption = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    const analysis = aiService.analyzeKnowledgeGaps(answers, DIAGNOSTIC_QUESTIONS);
    setResults(analysis);
    setIsSubmitted(true);
    setShowWowMoment(true);

    // Fire festive celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }

    // Progression through WOW moment steps
    setTimeout(() => setWowAnimationStep(2), 2200);
    setTimeout(() => {
      setWowAnimationStep(3);
      onComplete({
        overallMastery: analysis.overallMastery,
        topicMasteries: analysis.topicMasteries,
        strongAreas: analysis.strongAreas,
        weakAreas: analysis.weakAreas,
      });
    }, 4500);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {!isSubmitted ? (
        /* Diagnostic Questions Form */
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {/* Header */}
          <div className="border-b border-slate-100 pb-5 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    Mathematics Diagnostic
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">• Knowledge Gap Audit</span>
                </div>
                <h1 className="mt-1 text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  Assess Your Foundations
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-500">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
                <div className="h-2 w-28 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
                    style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Topic pill */}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-400">Focus Concept:</span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {currentQ.topicName}
              </span>
            </div>
          </div>

          {/* Question Body */}
          <div className="mt-6 space-y-6">
            <div>
              <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
                {currentQ.question}
              </p>

              {currentQ.codeOrFormula && (
                <div className="mt-3 rounded-xl bg-slate-50 p-4 border border-slate-200/80 font-mono text-sm text-indigo-900 dark:bg-slate-800/60 dark:border-slate-700 dark:text-indigo-300">
                  {currentQ.codeOrFormula}
                </div>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = answers[currentQ.id] === option.id;
                const letter = String.fromCharCode(65 + idx);
                return (
                  <button
                    key={option.id}
                    id={`diag-option-${option.id}`}
                    onClick={() => handleSelectOption(option.id)}
                    className={`flex w-full items-center justify-between rounded-xl p-4 text-left border transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 dark:bg-indigo-950/40 dark:text-indigo-200 ring-2 ring-indigo-500/20 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-200 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="text-xs sm:text-sm font-medium">{option.text}</span>
                    </div>

                    <div
                      className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-40 dark:text-slate-400 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>

            {currentIndex < totalQuestions - 1 ? (
              <button
                id="diag-next-btn"
                onClick={handleNext}
                disabled={!answers[currentQ.id]}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 disabled:opacity-40 transition-colors"
              >
                <span>Next Question</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                id="diag-submit-btn"
                onClick={handleSubmit}
                disabled={answeredCount < totalQuestions}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 disabled:opacity-40 transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                <span>Submit & Analyze Gaps</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* WOW MOMENT & Results Screen */
        <div className="space-y-8">
          {/* WOW Moment Centerpiece Card */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-indigo-500 bg-gradient-to-b from-indigo-50/70 to-white p-6 sm:p-10 shadow-xl dark:from-slate-900 dark:to-slate-900/90 dark:border-indigo-500/60">
            {/* Ambient indicator */}
            <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-indigo-500/10 blur-2xl" />

            <div className="relative z-10 text-center space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-600/10 px-3.5 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800">
                <BrainCircuit className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span>Diagnostic Assessment Complete</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                We found <span className="text-rose-600 dark:text-rose-400">{results?.gapCount || 2} knowledge gaps</span>.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
                Here is how your personalized learning path compares against a standard linear textbook course.
              </p>

              {/* Centerpiece Before vs After Transformation Animation */}
              <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
                {/* Before Box */}
                <div className="rounded-xl border border-slate-200 bg-white/90 p-5 shadow-xs dark:border-slate-800 dark:bg-slate-800/80">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Before</span>
                    <span className="text-[11px] font-semibold text-rose-500 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded">
                      Generic Curriculum
                    </span>
                  </div>
                  <div className="mt-4 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                    <p className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                      <span>Chapter 1: Arithmetic (4 hrs) — Redundant</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                      <span>Chapter 2: Basic Algebra (6 hrs) — Already strong</span>
                    </p>
                    <p className="flex items-center gap-2 font-semibold text-rose-600 dark:text-rose-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                      <span>Chapter 4: Functions (Skipped misconceptions!)</span>
                    </p>
                    <p className="pt-2 text-[11px] font-bold text-slate-400">Total: 40 hours of scattered study</p>
                  </div>
                </div>

                {/* After Box */}
                <div className="rounded-xl border-2 border-indigo-500 bg-indigo-50/40 p-5 shadow-md shadow-indigo-500/10 dark:bg-indigo-950/30">
                  <div className="flex items-center justify-between pb-3 border-b border-indigo-200 dark:border-indigo-800">
                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                      After
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                      Personalized Roadmap
                    </span>
                  </div>
                  <div className="mt-4 space-y-2.5 text-xs text-slate-800 dark:text-slate-200">
                    <p className="flex items-center gap-2 font-medium text-emerald-700 dark:text-emerald-400">
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Algebra & Statistics: Tested out! Saved 10 hours</span>
                    </p>
                    <p className="flex items-center gap-2 font-semibold text-indigo-700 dark:text-indigo-300">
                      <Zap className="h-3.5 w-3.5 text-indigo-600" />
                      <span>Week 1 Focus: Domain & Range (15 min micro-lessons)</span>
                    </p>
                    <p className="flex items-center gap-2 font-semibold text-indigo-700 dark:text-indigo-300">
                      <Zap className="h-3.5 w-3.5 text-indigo-600" />
                      <span>Week 2 Focus: Factoring Quadratic Equations</span>
                    </p>
                    <p className="pt-2 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                      Total: 12 high-impact hours (Save 28 hours!)
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  id="wow-explore-map-btn"
                  onClick={onExploreKnowledgeMap}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-colors"
                >
                  <BrainCircuit className="h-4 w-4" />
                  <span>Explore Knowledge Map</span>
                </button>

                <button
                  id="wow-view-roadmap-btn"
                  onClick={onViewRoadmap}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors"
                >
                  <Compass className="h-4 w-4 text-indigo-600" />
                  <span>View Generated Roadmap →</span>
                </button>
              </div>
            </div>
          </div>

          {/* Learning Profile Summary (Section 7 in prompt) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Your Learning Profile</h3>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <span className="text-xs font-semibold text-slate-500">Overall Mastery</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    {results?.overallMastery || 58}%
                  </span>
                  <span className="text-xs text-slate-400">calibrated</span>
                </div>
              </div>

              <div className="rounded-xl bg-emerald-50/70 p-4 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Strong Areas</span>
                <ul className="mt-2 space-y-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  {results?.strongAreas.map((area) => (
                    <li key={area} className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-rose-50/70 p-4 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                <span className="text-xs font-bold text-rose-800 dark:text-rose-300">Needs Improvement</span>
                <ul className="mt-2 space-y-1 text-xs font-semibold text-rose-700 dark:text-rose-300">
                  {results?.weakAreas.map((area) => (
                    <li key={area} className="flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
