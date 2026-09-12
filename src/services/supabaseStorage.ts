import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserProfile, Topic, RoadmapMilestone, ChatMessage } from '../types';

export interface SupabaseSyncStatus {
  connected: boolean;
  tableStatus: Record<string, 'ready' | 'missing' | 'error' | 'pending'>;
  lastSyncedAt?: string;
  error?: string;
}

class SupabaseStorageService {
  private lastSyncTime: string | null = null;

  /**
   * Check if Supabase client is active
   */
  public isReady(): boolean {
    return Boolean(isSupabaseConfigured && supabase);
  }

  /**
   * Test presence and accessibility of all database tables in Supabase
   */
  public async testTables(): Promise<SupabaseSyncStatus> {
    if (!this.isReady() || !supabase) {
      return {
        connected: false,
        tableStatus: {},
        error: 'Supabase client is not configured',
      };
    }

    const tables = ['profiles', 'topics', 'assessments', 'roadmaps', 'quiz_attempts', 'chat_messages'];
    const tableStatus: Record<string, 'ready' | 'missing' | 'error' | 'pending'> = {};

    for (const table of tables) {
      try {
        const { error } = await supabase.from(table).select('*').limit(1);
        if (!error) {
          tableStatus[table] = 'ready';
        } else if (error.code === 'PGRST205' || error.message?.includes('schema cache') || error.code === '42P01') {
          tableStatus[table] = 'missing';
        } else {
          console.warn(`Supabase table "${table}" check notice:`, error.message);
          tableStatus[table] = 'error';
        }
      } catch (err: any) {
        tableStatus[table] = 'error';
      }
    }

    const hasAnyReady = Object.values(tableStatus).some((s) => s === 'ready');
    return {
      connected: true,
      tableStatus,
      lastSyncedAt: this.lastSyncTime || undefined,
    };
  }

  /**
   * Save or update user profile in Supabase (public.profiles)
   */
  public async saveProfile(user: UserProfile): Promise<{ success: boolean; error?: string }> {
    if (!this.isReady() || !supabase) {
      return { success: false, error: 'Supabase client unavailable' };
    }

    try {
      const payload = {
        id: user.id || 'default-user',
        name: user.name,
        email: user.email,
        subject_id: user.subjectId || 'math',
        subject_name: user.subjectName || 'Mathematics',
        learning_level: user.learningLevel || 'Intermediate',
        target_goal: user.targetGoal || 'Mastery',
        daily_study_minutes: user.dailyStudyMinutes || 30,
        overall_mastery: user.overallMastery || 0,
        lessons_completed: user.lessonsCompleted || 0,
        quiz_accuracy: user.quizAccuracy || 0,
        current_streak: user.currentStreak || 1,
        avatar: user.avatar || '',
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(payload, { onConflict: 'id' });

      if (error) {
        console.warn('Supabase saveProfile notice:', error.message);
        return { success: false, error: error.message };
      }

      this.lastSyncTime = new Date().toLocaleTimeString();
      return { success: true };
    } catch (err: any) {
      console.warn('Supabase saveProfile catch:', err?.message);
      return { success: false, error: err?.message };
    }
  }

  /**
   * Fetch user profile from Supabase (public.profiles)
   */
  public async fetchProfile(userId: string): Promise<Partial<UserProfile> | null> {
    if (!this.isReady() || !supabase) return null;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error || !data) return null;

      return {
        id: data.id,
        name: data.name,
        email: data.email,
        subjectId: data.subject_id,
        subjectName: data.subject_name,
        learningLevel: data.learning_level,
        targetGoal: data.target_goal,
        dailyStudyMinutes: data.daily_study_minutes,
        overallMastery: data.overall_mastery,
        lessonsCompleted: data.lessons_completed,
        quizAccuracy: data.quiz_accuracy,
        currentStreak: data.current_streak,
        avatar: data.avatar,
      };
    } catch (err) {
      return null;
    }
  }

  /**
   * Store diagnostic assessment results in Supabase (public.assessments)
   */
  public async saveAssessment(data: {
    userId: string;
    subjectId: string;
    overallMastery: number;
    topicMasteries: Record<string, number>;
    strongAreas: string[];
    weakAreas: string[];
  }): Promise<{ success: boolean; error?: string }> {
    if (!this.isReady() || !supabase) {
      return { success: false, error: 'Supabase client unavailable' };
    }

    try {
      const payload = {
        user_id: data.userId || 'default-user',
        subject_id: data.subjectId || 'math',
        overall_mastery: data.overallMastery,
        topic_masteries: data.topicMasteries,
        strong_areas: data.strongAreas,
        weak_areas: data.weakAreas,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('assessments').insert(payload);

      if (error) {
        console.warn('Supabase saveAssessment notice:', error.message);
        return { success: false, error: error.message };
      }

      this.lastSyncTime = new Date().toLocaleTimeString();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message };
    }
  }

  /**
   * Store topic masteries in Supabase (public.topics)
   */
  public async saveTopics(userId: string, topics: Topic[]): Promise<{ success: boolean; error?: string }> {
    if (!this.isReady() || !supabase) {
      return { success: false, error: 'Supabase client unavailable' };
    }

    try {
      const records = topics.map((t) => ({
        id: `${userId}-${t.id}`,
        user_id: userId,
        subject_id: 'math',
        name: t.name,
        category: t.category,
        mastery: t.mastery,
        status: t.status,
        prerequisites: t.prerequisites,
        why_it_matters: t.whyItMatters,
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase
        .from('topics')
        .upsert(records, { onConflict: 'id' });

      if (error) {
        console.warn('Supabase saveTopics notice:', error.message);
        return { success: false, error: error.message };
      }

      this.lastSyncTime = new Date().toLocaleTimeString();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message };
    }
  }

  /**
   * Store roadmap milestones in Supabase (public.roadmaps)
   */
  public async saveRoadmap(
    userId: string,
    subjectId: string,
    title: string,
    milestones: RoadmapMilestone[]
  ): Promise<{ success: boolean; error?: string }> {
    if (!this.isReady() || !supabase) {
      return { success: false, error: 'Supabase client unavailable' };
    }

    try {
      const payload = {
        user_id: userId,
        subject_id: subjectId,
        title,
        milestones: milestones as any,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('roadmaps').insert(payload);

      if (error) {
        console.warn('Supabase saveRoadmap notice:', error.message);
        return { success: false, error: error.message };
      }

      this.lastSyncTime = new Date().toLocaleTimeString();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message };
    }
  }

  /**
   * Store quiz attempts and score in Supabase (public.quiz_attempts)
   */
  public async saveQuizAttempt(data: {
    userId: string;
    topicName: string;
    score: number;
    totalQuestions: number;
    masteryGained: number;
  }): Promise<{ success: boolean; error?: string }> {
    if (!this.isReady() || !supabase) {
      return { success: false, error: 'Supabase client unavailable' };
    }

    try {
      const payload = {
        user_id: data.userId,
        topic_name: data.topicName,
        score: data.score,
        total_questions: data.totalQuestions,
        mastery_gained: data.masteryGained,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('quiz_attempts').insert(payload);

      if (error) {
        console.warn('Supabase saveQuizAttempt notice:', error.message);
        return { success: false, error: error.message };
      }

      this.lastSyncTime = new Date().toLocaleTimeString();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message };
    }
  }

  /**
   * Store an AI Tutor Chat message in Supabase (public.chat_messages)
   */
  public async saveChatMessage(data: {
    userId: string;
    role: 'user' | 'assistant';
    content: string;
    topic?: string;
    difficulty?: string;
  }): Promise<{ success: boolean; error?: string }> {
    if (!this.isReady() || !supabase) {
      return { success: false, error: 'Supabase client unavailable' };
    }

    try {
      const payload = {
        user_id: data.userId,
        role: data.role,
        content: data.content,
        topic: data.topic || 'General',
        difficulty: data.difficulty || 'adaptive',
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('chat_messages').insert(payload);

      if (error) {
        console.warn('Supabase saveChatMessage notice:', error.message);
        return { success: false, error: error.message };
      }

      this.lastSyncTime = new Date().toLocaleTimeString();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message };
    }
  }

  /**
   * Full Synchronizer: Commits entire active learner state to Supabase in one batch
   */
  public async syncAllToSupabase(params: {
    user: UserProfile;
    topics: Topic[];
    milestones: RoadmapMilestone[];
  }): Promise<{ success: boolean; errors: string[]; syncedTables: string[] }> {
    const errors: string[] = [];
    const syncedTables: string[] = [];

    // 1. Profile
    const profileRes = await this.saveProfile(params.user);
    if (profileRes.success) syncedTables.push('profiles');
    else if (profileRes.error) errors.push(`profiles: ${profileRes.error}`);

    // 2. Topics
    const topicsRes = await this.saveTopics(params.user.id, params.topics);
    if (topicsRes.success) syncedTables.push('topics');
    else if (topicsRes.error) errors.push(`topics: ${topicsRes.error}`);

    // 3. Roadmap
    const roadRes = await this.saveRoadmap(
      params.user.id,
      params.user.subjectId,
      `${params.user.subjectName} Adaptive Path`,
      params.milestones
    );
    if (roadRes.success) syncedTables.push('roadmaps');
    else if (roadRes.error) errors.push(`roadmaps: ${roadRes.error}`);

    return {
      success: errors.length === 0,
      errors,
      syncedTables,
    };
  }
}

export const supabaseStorage = new SupabaseStorageService();
