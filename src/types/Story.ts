export type EmotionMode = 'calm' | 'gentle' | 'playful' | 'adventure' | 'heartfelt';

export interface Story {
  id: string;
  user_id: string;
  title: string;
  content: string;
  emotion: EmotionMode;
  
  // Voice settings
  voice_profile_id: string | null;
  narrator_detected: string | null;
  characters: string[];
  
  // Music settings
  music_theme: string | null;
  background_music_enabled: boolean;
  sound_effects_enabled: boolean;
  
  // Audio output
  audio_url: string | null;
  duration_seconds: number | null;
  
  // Replay tracking
  replay_count: number;
  max_free_replays: number;
  
  // Metadata
  word_count: number | null;
  status: 'draft' | 'processing' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface VoiceProfile {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  accent: string | null;
  tone: string | null;
  pitch: string | null;
  sample_audio_url: string | null;
  is_default: boolean;
  created_at: string;
}

export type AudioType = 'music' | 'effect';

export interface AudioTrack {
  id: string;
  type: AudioType;
  name: string;
  description: string | null;
  file_url: string;
  duration_seconds: number | null;
  emotion_tags: EmotionMode[];
  keywords: string[];
  source: string;
  license: string | null;
  is_active: boolean;
  created_at: string;
}
