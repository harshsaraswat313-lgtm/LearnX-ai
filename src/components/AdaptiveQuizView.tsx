import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Award,
  TrendingUp,
  RefreshCw,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AdaptiveQuizQuestion, UserProfile } from '../types';

interface AdaptiveQuizViewProps {
  onCompleteQuiz: (masteryGained: number, topic: string) => void;
  onBackToDashboard: () => void;
}

const ADAPTIVE_QUESTIONS_BANK: AdaptiveQuizQuestion[] = [
  {
    id: 'aq-1',
    topicId: 'functions',
    topicName: 'Functions & Relations',
    difficulty: 'easy',
    question: 'Which of the following describes why $f(x) = \\frac{1}{x-3}$ is undefined at $x = 3$?',
    options: [
      { id: 'a', text: 'Division by zero is undefined in arithmetic and real analysis', isCorrect: true },
      { id: 'b', text: 'The square root of a negative number has no real value', isCorrect: false },
      { id: 'c', text: 'Linear expressions cannot exist in a denominator', isCorrect: false },
      { id: 'd', text: 'The function oscillates towards infinity without a limit', isCorrect: false },
    ],
    correctAnswerId: 'a',
    explanation: 'Correct! When x = 3, the denominator evaluates to (3 - 3) = 0. Division by zero is mathematically undefined.',
  },
  {
    id: 'aq-2',
    topicId: 'functions',
    topicName: 'Functions (Domain Rules)',
    difficulty: 'medium',
    question: 'Find the domain of $g(x) = \\sqrt{2x - 10}$ in interval notation.',
    options: [
      { id: 'a', text: '(-∞, 5]', isCorrect: false },
      { id: 'b', text: '[5, ∞)', isCorrect: true },
      { id: 'c', text: '(5, ∞)', isCorrect: false },
      { id: 'd', text: '[-5, 5]', isCorrect: false },
    ],
    correctAnswerId: 'b',
    explanation: 'Radicand must be non-negative: 2x - 10 ≥ 0 ⇒ 2x ≥ 10 ⇒ x ≥ 5. Hence in interval notation: [5, ∞).',
  },
  {
    id: 'aq-3',
    topicId: 'quadratics',
    topicName: 'Quadratic Equations (Factoring)',
    difficulty: 'medium',
    question: 'Solve for x: $x^2 - 7x + 12 = 0$.',
    options: [
      { id: 'a', text: 'x = 3 and x = 4', isCorrect: true },
      { id: 'b', text: 'x = -3 and x = -4', isCorrect: false },
      { id: 'c', text: 'x = 2 and x = 6', isCorrect: false },
      { id: 'd', text: 'x = 1 and x = 12', isCorrect: false },
    ],
    correctAnswerId: 'a',
    explanation: 'Find two numbers whose product is 12 and sum is -7: (-3) and (-4). Thus (x - 3)(x - 4) = 0, giving x = 3, 4.',
  },
  {
    id: 'aq-4',
    topicId: 'quadratics',
    topicName: 'Quadratic Discriminant',
    difficulty: 'hard',
    question: 'If the discriminant $\\Delta = b^2 - 4ac < 0$, what does this guarantee about the parabola?',
    options: [
      { id: 'a', text: 'The parabola has two distinct real roots', isCorrect: false },
      { id: 'b', text: 'The parabola does not intersect the x-axis in the real plane', isCorrect: true },
      { id: 'c', text: 'The vertex of the parabola is strictly at the origin (0,0)', isCorrect: false },
      { id: 'd', text: 'The parabola opens downward towards negative infinity', isCorrect: false },
    ],
    correctAnswerId: 'b',
    explanation: 'A negative discriminant means no real solutions, which geometrically corresponds to a parabola that never crosses the x-axis.',
  },
];

export const AdaptiveQuizView: React.FC<AdaptiveQuizViewProps> = ({
  onCompleteQuiz,
  onBackToDashboard,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const q = ADAPTIVE_QUESTIONS_BANK[currentIdx];
  const isCorrect = selectedOptionId === q.correctAnswerId;

  const handleCheckAnswer = () => {
    if (!selectedOptionId) return;
    setHasCheckedAnswer(true);

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      // Adaptive adjustment upward
      if (currentDifficulty === 'easy') setCurrentDifficulty('medium');
      else if (currentDifficulty === 'medium') setCurrentDifficulty('hard');
    } else {
      // Adaptive adjustment downward or stay supportive
      if (currentDifficulty === 'hard') setCurrentDifficulty('medium');
      else if (currentDifficulty === 'medium') setCurrentDifficulty('easy');
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < ADAPTIVE_QUESTIONS_BANK.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOptionId(null);
      setHasCheckedAnswer(false);
    } else {
      // Finished quiz!
      setQuizFinished(true);
      try {
        confetti({ particleCount: 60, spread: 60 });
      } catch {}
      onCompleteQuiz(8, 'Functions & Quadratics');
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      {!quizFinished ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400">
                  Adaptive Checkpoint
                </span>
                <span className="text-xs text-slate-400">Targeting Weak Area</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{q.topicName}</h2>
            </div>

            {/* Adaptive Level Indicator */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-400">Dynamic Difficulty:</span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase ${
                  currentDifficulty === 'hard'
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
                    : currentDifficulty === 'medium'
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                }`}
              >
                {currentDifficulty}
              </span>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>
              Question {currentIdx + 1} of {ADAPTIVE_QUESTIONS_BANK.length}
            </span>
            <span>{correctCount} correct so far</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
              style={{ width: `${((currentIdx + 1) / ADAPTIVE_QUESTIONS_BANK.length) * 100}%` }}
            />
          </div>

          {/* Question Prompt */}
          <div className="mt-6">
            <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
              {q.question}
            </p>
          </div>

          {/* Options */}
          <div className="mt-6 space-y-3">
            {q.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let borderClass = 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/60';

              if (hasCheckedAnswer) {
                if (opt.id === q.correctAnswerId) {
                  borderClass = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-200';
                } else if (isSelected && !isCorrect) {
                  borderClass = 'border-rose-500 bg-rose-50/70 text-rose-950 dark:bg-rose-950/40 dark:text-rose-200';
                }
              } else if (isSelected) {
                borderClass = 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20';
              }

              return (
                <button
                  key={opt.id}
                  disabled={hasCheckedAnswer}
                  onClick={() => setSelectedOptionId(opt.id)}
                  className={`flex w-full items-center justify-between rounded-xl p-4 text-left border transition-all text-xs sm:text-sm font-medium ${borderClass}`}
                >
                  <span>{opt.text}</span>
                  {hasCheckedAnswer && opt.id === q.correctAnswerId && (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 ml-2" />
                  )}
                  {hasCheckedAnswer && isSelected && !isCorrect && (
                    <XCircle className="h-5 w-5 text-rose-600 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Pedagogical Explanation Block (Section 12 requirement) */}
          {hasCheckedAnswer && (
            <div
              className={`mt-6 rounded-xl p-4 border text-xs leading-relaxed ${
                isCorrect
                  ? 'border-emerald-200 bg-emerald-50/60 text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-300'
                  : 'border-rose-200 bg-rose-50/60 text-rose-900 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Great intuition! Difficulty elevated.</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 text-rose-600" />
                    <span>Misconception Explained:</span>
                  </>
                )}
              </div>
              <p>{q.explanation}</p>
            </div>
          )}

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={onBackToDashboard}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
            >
              Cancel Quiz
            </button>

            {!hasCheckedAnswer ? (
              <button
                id="quiz-check-btn"
                onClick={handleCheckAnswer}
                disabled={!selectedOptionId}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 disabled:opacity-40 transition-colors"
              >
                <span>Check Answer</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                id="quiz-next-btn"
                onClick={handleNextQuestion}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition-colors"
              >
                <span>{currentIdx < ADAPTIVE_QUESTIONS_BANK.length - 1 ? 'Next Question' : 'Complete Quiz & Update Mastery'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Finished & Mastery Gained Screen */
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-md dark:border-slate-800 dark:bg-slate-900 text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
            <Award className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>

          <div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              Checkpoint Mastered!
            </span>
            <h2 className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white">
              Adaptive Practice Complete
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Score: {correctCount} / {ADAPTIVE_QUESTIONS_BANK.length} ({Math.round((correctCount / ADAPTIVE_QUESTIONS_BANK.length) * 100)}%)
            </p>
          </div>

          {/* Mastery Gain Highlight (Section 12 requirement: Show mastery gained +8% in Functions) */}
          <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-5 dark:border-indigo-950 dark:bg-indigo-950/30 max-w-sm mx-auto">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
              Mastery Gained
            </span>
            <div className="mt-2 flex items-baseline justify-center gap-2">
              <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">+8%</span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">in Functions & Quadratics</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Overall Subject Mastery updated to 76%!
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onBackToDashboard}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors shadow-xs"
            >
              <span>Back to Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
