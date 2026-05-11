import { createClient } from '@supabase/supabase-js';

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url && url !== 'your_supabase_url_here' && url.startsWith('https://');
};

// Lazy initialization to avoid build errors
let supabaseInstance: ReturnType<typeof createClient> | null = null;

export const getSupabase = () => {
  if (!supabaseInstance && typeof window !== 'undefined') {
    if (isSupabaseConfigured()) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    } else {
      // Return a mock client for demo mode
      console.warn('Supabase not configured. Using demo mode.');
      return null;
    }
  }
  return supabaseInstance;
};

// For backward compatibility
export const supabase = getSupabase();

// Types for database tables
export interface Project {
  id: string;
  title: string;
  description: string;
  short_description: string;
  image_url: string;
  gallery_images: string[];
  category: string;
  date: string;
  platform: string[];
  tech_stack: string[];
  github_url?: string;
  live_url?: string;
  featured: boolean;
  created_at: string;
  order_index: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: string;
  proficiency: number;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  bio?: string;
  profile_picture_url?: string;
  job_title?: string;
  location?: string;
  website?: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  created_at: string;
  updated_at: string;
}
