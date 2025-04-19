import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour TypeScript
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          level: number;
          xp: number;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          email: string;
          name?: string;
          avatar_url?: string;
          level?: number;
          xp?: number;
        };
        Update: {
          email?: string;
          name?: string;
          avatar_url?: string;
          level?: number;
          xp?: number;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          type: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          content: string;
          type: string;
        };
        Update: {
          content?: string;
          type?: string;
        };
      };
      objectives: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          status: string;
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          user_id: string;
          title: string;
          description?: string;
          status?: string;
        };
        Update: {
          title?: string;
          description?: string;
          status?: string;
          completed_at?: string;
        };
      };
      badges: {
        Row: {
          id: string;
          user_id: string;
          badge_type: string;
          unlocked_at: string;
          progress: number;
        };
        Insert: {
          user_id: string;
          badge_type: string;
          progress?: number;
        };
        Update: {
          progress?: number;
        };
      };
    };
  };
}; 