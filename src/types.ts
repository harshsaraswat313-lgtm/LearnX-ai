export type LearningLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type SubjectId = 'math' | 'physics' | 'cs' | 'biology';

export type MasteryStatus = 'strong' | 'developing' | 'weak';

export interface Topic {
  id: string;
  subjectId: SubjectId;
  name: string;
  category: string;
  mastery: number; // 0 to 100
  status: MasteryStatus;
  description: string;
  whyItMatters: string;
  estimatedHours: number;
  recommendedLessons: string[];
  prerequisites: string[];
}

export interface DiagnosticQuestion {
  id: string;
  topicId: string;
  topicName: string;
  question: string;
  codeOrFormula?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    misconception?: string;
  }[];
  explanation: string;
}

export interface RoadmapMilestone {
  id: string;
  phase: string;
  title: string;
  topicId: string;
  topicName: string;
  estimatedTime: string;
  status: 'completed' | 'in_progress' | 'next' | 'locked';
  description: string;
}

export interface RoadmapLesson {
  id: string;
  week: number;
  order: number;
  title: string;
  topicId: string;
  topicName: string;
  durationMinutes: number;
  completed: boolean;
  type: 'concept' | 'practice' | 'quiz' | 'checkpoint';
  description: string;
  summaryPoints: string[];
  interactivePractice?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  subjectId?: SubjectId;
  subject?: SubjectId;
  subjectName: string;
  learningLevel?: LearningLevel;
  level?: LearningLevel;
  targetGoal?: string;
  goal?: string;
  dailyStudyMinutes: number;
  overallMastery: number;
  todayGoalActivities: number;
  todayCompletedActivities: number;
  currentStreak: number;
  totalStudyHours: number;
  lessonsCompleted: number;
  quizAccuracy: number;
  topicsMastered: number;
  joinedDate: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
}

export interface TutorChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  level?: LearningLevel;
  topic?: string;
  interactiveQuestion?: {
    question: string;
    options: string[];
    answeredIndex?: number;
    correctIndex?: number;
    explanation?: string;
  };
}

export interface AdaptiveQuizQuestion {
  id: string;
  topicId: string;
  topicName: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  correctAnswerId: string;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  misconceptionExplanation: string;
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  unlockedDate?: string;
  progress: number;
  maxProgress: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  timestamp: string;
  icon: string;
  type: 'quiz' | 'lesson' | 'mastery' | 'streak';
}
