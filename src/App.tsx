import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { OnboardingModal } from './components/OnboardingModal';
import { DiagnosticView } from './components/DiagnosticView';
import { DashboardView } from './components/DashboardView';
import { KnowledgeMapView } from './components/KnowledgeMapView';
import { RoadmapView } from './components/RoadmapView';
import { AITutorView } from './components/AITutorView';
import { AdaptiveQuizView } from './components/AdaptiveQuizView';
import { ProgressView } from './components/ProgressView';
import { AchievementsView } from './components/AchievementsView';
import { ProfileView } from './components/ProfileView';

import {
  INITIAL_USER,
  TOPICS_DATA,
  ROADMAP_MILESTONES,
  ACHIEVEMENTS_DATA,
} from './lib/demoData';
import { UserProfile, Topic, RoadmapMilestone, Achievement } from './types';
import { supabaseStorage } from './services/supabaseStorage';

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('learnx_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // App State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<string>('landing');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [topics, setTopics] = useState<Topic[]>(TOPICS_DATA);
  const [milestones, setMilestones] = useState<RoadmapMilestone[]>(ROADMAP_MILESTONES);
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS_DATA);

  // Modals & Drawers
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTutorTopic, setActiveTutorTopic] = useState('Functions');

  // Synchronize dark mode class on document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('learnx_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('learnx_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Handler: 1-Click Demo Mode (Section 20 requirement)
  const handleTryDemo = () => {
    setUser(INITIAL_USER);
    setTopics(TOPICS_DATA);
    setMilestones(ROADMAP_MILESTONES);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  // Handler: Reset Demo State to clean slate
  const handleResetDemo = () => {
    setUser(INITIAL_USER);
    setTopics(TOPICS_DATA);
    setMilestones(ROADMAP_MILESTONES);
    setCurrentView('dashboard');
  };

  // Handler: Start Learning from Landing Page
  const handleStartLearning = () => {
    if (isAuthenticated) {
      setCurrentView('dashboard');
    } else {
      setIsOnboardingModalOpen(true);
    }
  };

  // Handler: Onboarding Completion -> Launch Diagnostic (Section 6 & 7)
  const handleOnboardingComplete = (prefs: {
    subject: any;
    subjectName: string;
    level: any;
    goal: string;
    dailyMinutes: number;
  }) => {
    const updatedUser: UserProfile = {
      ...user,
      subjectId: prefs.subject,
      subjectName: prefs.subjectName,
      learningLevel: prefs.level,
      targetGoal: prefs.goal,
      dailyStudyMinutes: prefs.dailyMinutes,
    };
    setUser(updatedUser);
    supabaseStorage.saveProfile(updatedUser);

    setIsOnboardingModalOpen(false);
    setIsAuthenticated(true);
    setCurrentView('diagnostic');
  };

  // Handler: Diagnostic Submission & Mastery Recalibration (Section 7 & 21)
  const handleDiagnosticComplete = (results: {
    overallMastery: number;
    topicMasteries: Record<string, number>;
    strongAreas: string[];
    weakAreas: string[];
  }) => {
    const updatedUser = {
      ...user,
      overallMastery: results.overallMastery,
    };
    setUser(updatedUser);

    // Update topic masteries & statuses
    const updatedTopics = topics.map((t) => {
      const score = results.topicMasteries[t.name] ?? t.mastery;
      let status: Topic['status'] = 'weak';
      if (score >= 70) status = 'strong';
      else if (score >= 40) status = 'developing';
      return {
        ...t,
        mastery: score,
        status,
      };
    });
    setTopics(updatedTopics);

    // Persist diagnostic & recalculated topics to Supabase
    supabaseStorage.saveAssessment({
      userId: user.id,
      subjectId: user.subjectId,
      overallMastery: results.overallMastery,
      topicMasteries: results.topicMasteries,
      strongAreas: results.strongAreas,
      weakAreas: results.weakAreas,
    });
    supabaseStorage.saveTopics(user.id, updatedTopics);
    supabaseStorage.saveProfile(updatedUser);

    // Unlock First Diagnostic Achievement
    setAchievements((prev) =>
      prev.map((a) =>
        a.id === 'ach-1' ? { ...a, unlocked: true, unlockedDate: 'Today' } : a
      )
    );
  };

  // Handler: Lesson Start
  const handleStartLesson = (lessonId?: string) => {
    setCurrentView('ai-tutor');
    setActiveTutorTopic('Functions');
  };

  // Handler: Mark Lesson Done in Roadmap
  const handleCompleteLesson = (milestoneId: string) => {
    let nextMilestones = milestones;
    setMilestones((prev) => {
      const idx = prev.findIndex((m) => m.id === milestoneId);
      if (idx === -1) return prev;
      const updated = [...prev];
      updated[idx] = { ...updated[idx], status: 'completed' };
      if (idx + 1 < updated.length && updated[idx + 1].status === 'next') {
        updated[idx + 1] = { ...updated[idx + 1], status: 'in_progress' };
      }
      nextMilestones = updated;
      return updated;
    });

    const updatedUser = {
      ...user,
      lessonsCompleted: user.lessonsCompleted + 1,
      overallMastery: Math.min(100, user.overallMastery + 4),
      todayCompletedActivities: Math.min(user.todayGoalActivities, user.todayCompletedActivities + 1),
    };
    setUser(updatedUser);

    // Persist milestone & user progress to Supabase
    supabaseStorage.saveProfile(updatedUser);
    supabaseStorage.saveRoadmap(user.id, user.subjectId, `${user.subjectName} Adaptive Path`, nextMilestones);
  };

  // Handler: Complete Adaptive Quiz -> Gain Mastery (Section 12)
  const handleCompleteQuiz = (masteryGained: number, topicName: string) => {
    const updatedUser = {
      ...user,
      overallMastery: Math.min(100, user.overallMastery + masteryGained),
      quizAccuracy: Math.min(100, user.quizAccuracy + 3),
      todayCompletedActivities: Math.min(user.todayGoalActivities, user.todayCompletedActivities + 1),
    };
    setUser(updatedUser);

    // Elevated Functions & Quadratics
    const updatedTopics = topics.map((t) => {
      if (t.id === 'functions' || t.id === 'quadratics') {
        const newMastery = Math.min(100, t.mastery + 12);
        return {
          ...t,
          mastery: newMastery,
          status: (newMastery >= 70 ? 'strong' : 'developing') as Topic['status'],
        };
      }
      return t;
    });
    setTopics(updatedTopics);

    // Persist quiz attempt & elevated topics to Supabase
    supabaseStorage.saveQuizAttempt({
      userId: user.id,
      topicName,
      score: 100,
      totalQuestions: 3,
      masteryGained,
    });
    supabaseStorage.saveTopics(user.id, updatedTopics);
    supabaseStorage.saveProfile(updatedUser);

    // Unlock Perfect Quiz Score or Topic Master badge
    setAchievements((prev) =>
      prev.map((a) =>
        a.id === 'ach-4' ? { ...a, unlocked: true, unlockedDate: 'Today' } : a
      )
    );
  };

  // Handler: Open AI Tutor directly for a specific topic
  const handleOpenAITutorForTopic = (topicName?: string) => {
    if (topicName) setActiveTutorTopic(topicName);
    setCurrentView('ai-tutor');
  };

  // Handler: Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('landing');
  };

  const isAppView = isAuthenticated && currentView !== 'landing';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onStartLearning={handleStartLearning}
        onTryDemo={handleTryDemo}
        onNavigateHome={() => setCurrentView(isAuthenticated ? 'dashboard' : 'landing')}
        isAuthenticated={isAuthenticated}
        user={user}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      {/* Main Content Area */}
      {isAppView ? (
        <div className="flex flex-1 overflow-hidden">
          {/* Persistent Sidebar (Section 17) */}
          <Sidebar
            currentView={currentView}
            setCurrentView={setCurrentView}
            user={user}
            onLogout={handleLogout}
            onResetDemo={handleResetDemo}
            isMobileOpen={isMobileSidebarOpen}
            setIsMobileOpen={setIsMobileSidebarOpen}
          />

          {/* App View Body */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12">
            {currentView === 'dashboard' && (
              <DashboardView
                user={user}
                topics={topics}
                onStartLesson={handleStartLesson}
                onOpenAITutor={handleOpenAITutorForTopic}
                onStartQuiz={() => setCurrentView('quiz')}
                onOpenKnowledgeMap={() => setCurrentView('knowledge-map')}
                onOpenRoadmap={() => setCurrentView('roadmap')}
              />
            )}

            {currentView === 'knowledge-map' && (
              <KnowledgeMapView
                topics={topics}
                onStartTopicLesson={(topicId) => {
                  setCurrentView('roadmap');
                }}
                onOpenTutorForTopic={handleOpenAITutorForTopic}
              />
            )}

            {currentView === 'roadmap' && (
              <RoadmapView
                milestones={milestones}
                onStartLesson={handleStartLesson}
                onCompleteLesson={handleCompleteLesson}
                onOpenQuiz={() => setCurrentView('quiz')}
              />
            )}

            {currentView === 'ai-tutor' && (
              <AITutorView initialTopic={activeTutorTopic} topics={topics} user={user} />
            )}

            {currentView === 'quiz' && (
              <AdaptiveQuizView
                onCompleteQuiz={handleCompleteQuiz}
                onBackToDashboard={() => setCurrentView('dashboard')}
              />
            )}

            {currentView === 'progress' && <ProgressView user={user} topics={topics} />}

            {currentView === 'achievements' && (
              <AchievementsView user={user} achievements={achievements} />
            )}

            {currentView === 'profile' && (
              <ProfileView
                user={user}
                topics={topics}
                milestones={milestones}
                onUpdateUser={(updated) => {
                  const newUser = { ...user, ...updated };
                  setUser(newUser);
                  supabaseStorage.saveProfile(newUser);
                }}
                onRetakeDiagnostic={() => setCurrentView('diagnostic')}
              />
            )}

            {currentView === 'diagnostic' && (
              <DiagnosticView
                onComplete={handleDiagnosticComplete}
                onExploreKnowledgeMap={() => setCurrentView('knowledge-map')}
                onViewRoadmap={() => setCurrentView('roadmap')}
              />
            )}
          </main>
        </div>
      ) : (
        /* Landing Page View */
        <main className="flex-1">
          <LandingPage
            onStartLearning={handleStartLearning}
            onTryDemo={handleTryDemo}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        </main>
      )}

      {/* Auth Modal (Sign Up, Login, Forgot Password, Demo 1-Click) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(loggedInUser, isNewUser) => {
          setUser(loggedInUser);
          setIsAuthenticated(true);
          if (isNewUser) {
            setIsOnboardingModalOpen(true);
          } else {
            setCurrentView('dashboard');
          }
        }}
        onStartDemo={handleTryDemo}
      />

      {/* Multi-step Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingModalOpen}
        onClose={() => setIsOnboardingModalOpen(false)}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
}
