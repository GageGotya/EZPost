export type ContentStatus = 'draft' | 'scheduled' | 'published' | 'failed';
export type PlatformType = 'twitter' | 'linkedin' | 'instagram' | 'facebook' | 'tiktok';
export type BusinessType = 'retail' | 'tech' | 'food' | 'health' | 'finance' | 'other';
export type ContentTone = 'professional' | 'casual' | 'humorous' | 'formal';
export type PostFrequency = 'daily' | '3x_week' | 'weekly';

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      business_profiles: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          type: BusinessType;
          description: string | null;
          target_audience: string | null;
          keywords: string[] | null;
          tone: ContentTone;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          type: BusinessType;
          description?: string | null;
          target_audience?: string | null;
          keywords?: string[] | null;
          tone?: ContentTone;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          type?: BusinessType;
          description?: string | null;
          target_audience?: string | null;
          keywords?: string[] | null;
          tone?: ContentTone;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_preferences: {
        Row: {
          id: string;
          user_id: string;
          post_frequency: PostFrequency;
          platforms: PlatformType[];
          auto_schedule: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          post_frequency?: PostFrequency;
          platforms?: PlatformType[];
          auto_schedule?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          post_frequency?: PostFrequency;
          platforms?: PlatformType[];
          auto_schedule?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_credits: {
        Row: {
          id: string;
          user_id: string;
          available: number;
          used: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          available?: number;
          used?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          available?: number;
          used?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      social_posts: {
        Row: {
          id: string;
          user_id: string;
          platform: PlatformType;
          content: string;
          status: ContentStatus;
          scheduled_for: string | null;
          published_at: string | null;
          buffer_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          platform: PlatformType;
          content: string;
          status?: ContentStatus;
          scheduled_for?: string | null;
          published_at?: string | null;
          buffer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          platform?: PlatformType;
          content?: string;
          status?: ContentStatus;
          scheduled_for?: string | null;
          published_at?: string | null;
          buffer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      post_analytics: {
        Row: {
          id: string;
          post_id: string;
          likes: number;
          comments: number;
          shares: number;
          impressions: number;
          engagement_rate: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          likes?: number;
          comments?: number;
          shares?: number;
          impressions?: number;
          engagement_rate?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          likes?: number;
          comments?: number;
          shares?: number;
          impressions?: number;
          engagement_rate?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
} 