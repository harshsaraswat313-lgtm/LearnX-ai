import React, { useState } from 'react';
import {
  BrainCircuit,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Play,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  BotMessageSquare,
  ShieldCheck,
  X,
  Network,
} from 'lucide-react';
import { Topic } from '../types';
import knowledgeMapVisual from '../assets/images/knowledge_network_visual_1789192026342.jpg';
import aiTutorCompanion from '../assets/images/ai_tutor_companion_1789192044084.jpg';

interface KnowledgeMapViewProps {
  topics: Topic[];
  onStartTopicLesson: (topicId: string) => void;
  onOpenTutorForTopic: (topicName: string) => void;
}

export const KnowledgeMapView: React.FC<KnowledgeMapViewProps> = ({
  topics,
  onStartTopicLesson,
  onOpenTutorForTopic,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(topics[2] || topics[0]); // default to Functions

  const getStatusBadge = (status: Topic['status'], mastery: number) => {
    switch (status) {
      case 'strong':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Strong ({mastery}%)
          </span>
        );
      case 'developing':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Developing ({mastery}%)
          </span>
        );
      case 'weak':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            Needs Attention ({mastery}%)
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            Knowledge Gap Topology
          </span>
          <span className="text-xs text-slate-400">• Subject: Mathematics</span>
        </div>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Knowledge Map & Gap Analysis
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
          Visualizing your competency across prerequisites. Click any concept node to inspect why it matters, view recommended micro-lessons, or consult the AI Tutor.
        </p>
      </div>

      {/* Visual Neural Mesh Hero Showcase */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-950 p-6 sm:p-7 text-white shadow-lg dark:border-slate-800">
        <img
          src={knowledgeMapVisual}
          alt="Neural Topology Graph"
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-luminosity filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-indigo-950/70" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-400/30">
                <BrainCircuit className="h-3.5 w-3.5 text-indigo-400" />
                Adaptive Prerequisite Mesh
              </span>
              <span className="text-xs text-slate-400">4 Mastered • 2 Critical Gaps</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Neural Dependency Graph
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every prerequisite is mathematically weighted. Remediating yellow and red nodes unlocks downstream advanced concepts 3x faster than linear reading.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenTutorForTopic(selectedTopic?.name || 'Functions')}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-500 transition-colors"
            >
              <img
                src={aiTutorCompanion}
                alt="AI Tutor"
                referrerPolicy="no-referrer"
                className="h-4 w-4 rounded-full object-cover ring-1 ring-white/50"
              />
              <span>Analyze Gaps with Tutor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map Nodes + Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Map Nodes */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Concept Nodes ({topics.length})
            </span>
            <span className="text-xs font-semibold text-slate-500">Click to inspect</span>
          </div>

          {topics.map((t) => {
            const isSelected = selectedTopic?.id === t.id;
            return (
              <button
                key={t.id}
                id={`knowledge-node-${t.id}`}
                onClick={() => setSelectedTopic(t)}
                className={`flex w-full items-center justify-between rounded-2xl p-4 sm:p-5 text-left border transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/40 shadow-sm ring-2 ring-indigo-500/20 dark:bg-indigo-950/30 dark:border-indigo-500'
                    : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-sm ${
                      t.status === 'strong'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : t.status === 'developing'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {t.name.slice(0, 2).toUpperCase()}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">{t.name}</h3>
                      <span className="text-[11px] text-slate-400">({t.category})</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{t.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-2">
                  {getStatusBadge(t.status, t.mastery)}
                  <ArrowRight className="h-4 w-4 text-slate-300 hidden sm:block" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Selected Topic Inspection Drawer (Section 8 in prompt) */}
        <div className="lg:col-span-5">
          {selectedTopic ? (
            <div className="sticky top-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Topic Breakdown
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                    {selectedTopic.name}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{selectedTopic.category}</p>
                </div>
                {getStatusBadge(selectedTopic.status, selectedTopic.mastery)}
              </div>

              {/* Current Mastery Meter */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500">Current Mastery</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedTopic.mastery}%</span>
                </div>
                <div className="mt-2 h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      selectedTopic.status === 'strong'
                        ? 'bg-emerald-500'
                        : selectedTopic.status === 'developing'
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${selectedTopic.mastery}%` }}
                  />
                </div>
              </div>

              {/* Why This Topic Matters (prompt requirement) */}
              <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                  Why This Topic Matters
                </h4>
                <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedTopic.whyItMatters}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>Estimated Learning Time: ~{selectedTopic.estimatedHours} Hours</span>
                </div>
              </div>

              {/* Recommended Lessons (prompt requirement) */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Recommended Lessons
                </h4>
                <div className="space-y-2">
                  {selectedTopic.recommendedLessons.map((lesson, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg border border-slate-100 p-2.5 dark:border-slate-800 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{lesson}</span>
                      </div>
                      <span className="text-[10px] font-medium text-slate-400">15-20m</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  id="knowledge-start-learning-btn"
                  onClick={() => onStartTopicLesson(selectedTopic.id)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-colors"
                >
                  <Play className="h-3.5 w-3.5 fill-white" />
                  <span>Start Learning {selectedTopic.name}</span>
                </button>

                <button
                  onClick={() => onOpenTutorForTopic(selectedTopic.name)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors"
                >
                  <BotMessageSquare className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Ask AI Tutor About Misconceptions</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-xs text-slate-400 dark:border-slate-800">
              Select any topic from the map to view detailed recommendations.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
