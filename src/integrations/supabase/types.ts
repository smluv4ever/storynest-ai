export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      audio_tracks: {
        Row: {
          created_at: string
          description: string | null
          duration_seconds: number | null
          emotion_tags: Database["public"]["Enums"]["emotion_mode"][]
          file_url: string
          id: string
          is_active: boolean | null
          keywords: string[] | null
          license: string | null
          name: string
          source: string | null
          type: Database["public"]["Enums"]["audio_type"]
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          emotion_tags: Database["public"]["Enums"]["emotion_mode"][]
          file_url: string
          id?: string
          is_active?: boolean | null
          keywords?: string[] | null
          license?: string | null
          name: string
          source?: string | null
          type: Database["public"]["Enums"]["audio_type"]
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          emotion_tags?: Database["public"]["Enums"]["emotion_mode"][]
          file_url?: string
          id?: string
          is_active?: boolean | null
          keywords?: string[] | null
          license?: string | null
          name?: string
          source?: string | null
          type?: Database["public"]["Enums"]["audio_type"]
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      stories: {
        Row: {
          audio_url: string | null
          background_music_enabled: boolean | null
          characters: Json | null
          content: string
          created_at: string
          duration_seconds: number | null
          emotion: Database["public"]["Enums"]["emotion_mode"]
          id: string
          max_free_replays: number | null
          music_theme: string | null
          narrator_detected: string | null
          replay_count: number | null
          sound_effects_enabled: boolean | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
          voice_profile_id: string | null
          word_count: number | null
        }
        Insert: {
          audio_url?: string | null
          background_music_enabled?: boolean | null
          characters?: Json | null
          content: string
          created_at?: string
          duration_seconds?: number | null
          emotion?: Database["public"]["Enums"]["emotion_mode"]
          id?: string
          max_free_replays?: number | null
          music_theme?: string | null
          narrator_detected?: string | null
          replay_count?: number | null
          sound_effects_enabled?: boolean | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
          voice_profile_id?: string | null
          word_count?: number | null
        }
        Update: {
          audio_url?: string | null
          background_music_enabled?: boolean | null
          characters?: Json | null
          content?: string
          created_at?: string
          duration_seconds?: number | null
          emotion?: Database["public"]["Enums"]["emotion_mode"]
          id?: string
          max_free_replays?: number | null
          music_theme?: string | null
          narrator_detected?: string | null
          replay_count?: number | null
          sound_effects_enabled?: boolean | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          voice_profile_id?: string | null
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "stories_voice_profile_id_fkey"
            columns: ["voice_profile_id"]
            isOneToOne: false
            referencedRelation: "voice_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      voice_profiles: {
        Row: {
          accent: string | null
          created_at: string
          description: string | null
          id: string
          is_default: boolean | null
          name: string
          pitch: string | null
          sample_audio_url: string | null
          tone: string | null
          user_id: string
        }
        Insert: {
          accent?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_default?: boolean | null
          name: string
          pitch?: string | null
          sample_audio_url?: string | null
          tone?: string | null
          user_id: string
        }
        Update: {
          accent?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_default?: boolean | null
          name?: string
          pitch?: string | null
          sample_audio_url?: string | null
          tone?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      audio_type: "music" | "effect"
      emotion_mode: "calm" | "gentle" | "playful" | "adventure" | "heartfelt"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      audio_type: ["music", "effect"],
      emotion_mode: ["calm", "gentle", "playful", "adventure", "heartfelt"],
    },
  },
} as const
