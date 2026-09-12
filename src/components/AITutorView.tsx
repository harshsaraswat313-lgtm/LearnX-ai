import React, { useState, useRef, useEffect } from 'react';
import {
  BotMessageSquare,
  Sparkles,
  Send,
  HelpCircle,
  Lightbulb,
  Target,
  RefreshCw,
  BookOpen,
  ArrowRight,
  User,
  Sliders,
  CheckCircle2,
  Cpu,
  Network,
} from 'lucide-react';
import { aiService } from '../services/aiService';
import { ChatMessage, Topic, UserProfile } from '../types';
import { supabaseStorage } from '../services/supabaseStorage';
import aiTutorCompanion from '../assets/images/ai_tutor_companion_1789192044084.jpg';
import knowledgeMapVisual from '../assets/images/knowledge_network_visual_1789192026342.jpg';

interface AITutorViewProps {
  initialTopic?: string;
  topics: Topic[];
  user?: UserProfile;
}

export const AITutorView: React.FC<AITutorViewProps> = ({
  initialTopic = 'Functions',
  topics,
  user,
}) => {
  const [currentTopic, setCurrentTopic] = useState(initialTopic);
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Advanced'>('Beginner');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'tutor',
      text: `Hello Alex! I am your Socratic AI Tutor. We noticed you're working on **${currentTopic}** (specifically Domain & Range).

What is giving you the most hesitation when finding the domain of an algebraic fraction like $f(x) = \\frac{1}{\\sqrt{x - 4}}$?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedTopicData = topics.find((t) => t.name === currentTopic) || topics[2];

  const quickPrompts = [
    { label: 'Explain simply', text: `Can you explain ${currentTopic} simply using a real-world analogy?` },
    { label: 'Give me an example', text: `Can you give me a step-by-step example problem on ${currentTopic}?` },
    { label: 'Why did I get this wrong?', text: `Why is the domain of 1/√(x-4) not x ≥ 4? Where is my misconception?` },
    { label: 'Test me on this', text: `Test me with an intuitive conceptual question on ${currentTopic}!` },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (userText?: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userText) setInput('');
    setIsTyping(true);

    // Store user message in Supabase
    supabaseStorage.saveChatMessage({
      userId: user?.id || 'learner',
      role: 'user',
      content: textToSend,
      topic: currentTopic,
      difficulty,
    });

    try {
      const history = messages.map((m) => ({
        role: m.sender === 'user' ? ('user' as const) : ('model' as const),
        text: m.text,
      }));

      const reply = await aiService.sendTutorMessage(textToSend, currentTopic, history, difficulty);

      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, tutorMsg]);

      // Store tutor response in Supabase
      supabaseStorage.saveChatMessage({
        userId: user?.id || 'learner',
        role: 'assistant',
        content: reply,
        topic: currentTopic,
        difficulty,
      });
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `tutor-err-${Date.now()}`,
        sender: 'tutor',
        text: `I'm reflecting on your response. Let's think: what happens if the denominator equals zero in a fraction? Does division by zero make sense?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleTopicSwitch = (newTopicName: string) => {
    setCurrentTopic(newTopicName);
    setMessages([
      {
        id: `switch-${Date.now()}`,
        sender: 'tutor',
        text: `Switched focus to **${newTopicName}**. How comfortable do you feel with its fundamental definitions? Would you like a conceptual intuition check or a practice problem?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              Socratic Pedagogy
            </span>
            <span className="text-xs text-slate-400">• Never just dumps answers</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            LearnX Socratic AI Tutor
          </h1>
        </div>

        {/* Mode Selector & Topic Dropdown */}
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-xl bg-slate-100 p-1 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setDifficulty('Beginner')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                difficulty === 'Beginner'
                  ? 'bg-white text-indigo-600 shadow-xs dark:bg-slate-700 dark:text-white'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Beginner Mode
            </button>
            <button
              onClick={() => setDifficulty('Advanced')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                difficulty === 'Advanced'
                  ? 'bg-white text-indigo-600 shadow-xs dark:bg-slate-700 dark:text-white'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Advanced Mode
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Interface (Section 10 in prompt): Left Chat, Right Topic Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Chat Area (7 cols) */}
        <div className="lg:col-span-8 flex flex-col h-[650px] rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={aiTutorCompanion}
                  alt="LearnX AI Tutor"
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-xl object-cover ring-2 ring-indigo-500 shadow-xs"
                />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-white dark:bg-slate-900">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">LearnX Socratic Tutor</h3>
                  <span className="rounded bg-indigo-50 dark:bg-indigo-950 px-1.5 py-0.5 text-[9px] font-bold text-indigo-600 dark:text-indigo-400">
                    Active
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Target: {currentTopic} • Mode: {difficulty}
                </p>
              </div>
            </div>

            {/* Quick Topic Switcher */}
            <select
              value={currentTopic}
              onChange={(e) => handleTopicSwitch(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {topics.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((m) => {
              const isTutor = m.sender === 'tutor';
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 ${isTutor ? 'justify-start' : 'justify-end'}`}
                >
                  {isTutor && (
                    <img
                      src={aiTutorCompanion}
                      alt="Tutor"
                      referrerPolicy="no-referrer"
                      className="h-7 w-7 shrink-0 rounded-lg object-cover ring-1 ring-indigo-500/30"
                    />
                  )}

                  <div
                    className={`max-w-xl rounded-2xl p-4 text-xs leading-relaxed shadow-2xs ${
                      isTutor
                        ? 'border border-slate-200/80 bg-slate-50 text-slate-900 dark:border-slate-700/80 dark:bg-slate-800/80 dark:text-slate-100'
                        : 'bg-indigo-600 text-white'
                    }`}
                  >
                    <div className="whitespace-pre-line prose-xs dark:prose-invert">
                      {m.text}
                    </div>
                    <span
                      className={`mt-2 block text-[10px] ${
                        isTutor ? 'text-slate-400' : 'text-indigo-200 text-right'
                      }`}
                    >
                      {m.timestamp}
                    </span>
                  </div>

                  {!isTutor && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-700 text-xs font-bold dark:bg-slate-700 dark:text-white">
                      AM
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 pl-10">
                <Cpu className="h-4 w-4 animate-spin text-indigo-600" />
                <span>AI Tutor is formulating a Socratic question...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar (Section 10 requirement) */}
          <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-2 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1">
                Quick:
              </span>
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(qp.text)}
                  className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-700 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors"
                >
                  {qp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-slate-200 p-3 dark:border-slate-800 bg-white dark:bg-slate-900"
          >
            <input
              id="tutor-chat-input"
              type="text"
              placeholder={`Ask about ${currentTopic}, clarify a step, or test your reasoning...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-xs"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Right: Current Topic Notes & Key Concepts (Section 10 requirement) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Topic Notes & Cheat Sheet
                </h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                {selectedTopicData.category}
              </span>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">Core Definition:</span>
                <p className="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedTopicData.description}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 border border-slate-200/60 dark:bg-slate-800/60 dark:border-slate-700/60 font-mono text-[11px] text-indigo-900 dark:text-indigo-300">
                <p className="font-bold mb-1">Key Formulation:</p>
                <code>Domain: {'{ x ∈ ℝ | denominator ≠ 0 and radicand ≥ 0 }'}</code>
              </div>

              <div>
                <span className="font-bold text-slate-900 dark:text-white">Common Misconception:</span>
                <p className="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">
                  Students often assume square root means ≥ 0. But if the root is in the denominator, 0 is forbidden! Hence strictly &gt; 0.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Recommended Lessons:</span>
                <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                  {selectedTopicData.recommendedLessons.map((l, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Neural Concept Visual Card */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="relative h-32 overflow-hidden bg-slate-950">
              <img
                src={knowledgeMapVisual}
                alt="Neural Knowledge Mesh"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">
                    Knowledge Graph
                  </span>
                  <h4 className="text-xs font-bold text-white">Active Synaptic Link</h4>
                </div>
                <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[9px] font-bold text-indigo-300 border border-indigo-400/30">
                  Live Mesh
                </span>
              </div>
            </div>
            <div className="p-3 text-[11px] text-slate-500 dark:text-slate-400">
              <p>
                Mastering <span className="font-semibold text-slate-700 dark:text-slate-200">{currentTopic}</span> directly boosts your readiness for Quadratic Factoring & Polynomial Roots.
              </p>
            </div>
          </div>

          {/* Socratic Philosophy Notice */}
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 dark:border-indigo-950 dark:bg-indigo-950/30">
            <div className="flex items-start gap-2.5">
              <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-bold text-indigo-900 dark:text-indigo-300">Socratic Guardrail Active</p>
                <p className="text-indigo-700/80 dark:text-indigo-400 text-[11px] mt-0.5 leading-relaxed">
                  This tutor deliberately asks guiding questions to trigger neuroplastic retention rather than passively spoon-feeding answers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
