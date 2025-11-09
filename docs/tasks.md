# VoiceTales Implementation Tasks

**Source of Truth** for feature development and implementation order.

---

## 📋 Task Status Legend
- [ ] Not Started
- [🔄] In Progress
- [✅] Complete
- [🚫] Blocked

---

## Phase 1: MVP — Emotional Story Generator

### 1.1 Project Foundation & Setup ✅

#### 1.1.1 Design System Implementation ✅
- [✅] Install and configure fonts (Fredoka, Inter)
- [✅] Set up color palette in `index.css`
- [✅] Configure Tailwind with semantic tokens
- [✅] Create base component variants

**Reference:** `design-guidelines.md` lines 14-50

---

### 1.2 Authentication & User Management

#### 1.2.1 Enable Lovable Cloud
- [✅] Using external Supabase instead
- [✅] Database connection verified
- [✅] Ready for edge function deployment

#### 1.2.2 Database Schema: User Roles
- [✅] Create role enum and user_roles table

**SQL Migration:**
```sql
-- Create role enum
create type public.app_role as enum ('admin', 'user');

-- Create user_roles table
create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    role app_role not null default 'user',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique (user_id, role)
);

-- Enable RLS
alter table public.user_roles enable row level security;

-- Security definer function to check roles
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- RLS Policies
create policy "Users can view their own roles"
on public.user_roles
for select
to authenticated
using (user_id = auth.uid());

create policy "Admins can view all roles"
on public.user_roles
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can manage roles"
on public.user_roles
for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));
```

#### 1.2.3 Database Schema: User Profiles
- [✅] Create profiles table with trigger

**SQL Migration:**
```sql
-- Create profiles table
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  primary key (id)
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Auto-create profile on signup
create function public.handle_new_user()
returns trigger
language plpgsql
security definer 
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id, 
    new.email,
    new.raw_user_meta_data ->> 'full_name'
  );
  
  -- Assign default 'user' role
  insert into public.user_roles (user_id, role)
  values (new.id, 'user');
  
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS Policies
create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using (id = auth.uid());

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

create policy "Admins can view all profiles"
on public.profiles
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));
```

#### 1.2.4 Auth UI Implementation
- [✅] Create `/auth` page with login/signup flows
- [✅] Add email/password validation (zod schema)
- [✅] Implement auth state management
- [✅] Add error handling and user feedback
- [✅] Create protected route wrapper
- [✅] Add logout functionality to Navbar
- [✅] Redirect logic (authenticated → dashboard, unauthenticated → auth)

**Reference:** `supabase-adding-login-logout` context

**Component Structure:**
```
src/
├── pages/
│   └── Auth.tsx (login/signup page)
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   └── AuthLayout.tsx
│   └── ProtectedRoute.tsx
├── hooks/
│   └── useAuth.tsx (auth state + session management)
```

**Validation Schema Example:**
```typescript
import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email('Invalid email').max(255),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(2).max(100)
});
```

---

### 1.3 Story Management Database

#### 1.3.1 Stories Table
- [ ] Create stories table with emotional metadata

**SQL Migration:**
```sql
-- Create emotion enum
create type public.emotion_mode as enum (
  'calm', 
  'gentle', 
  'playful', 
  'adventure', 
  'heartfelt'
);

-- Create stories table
create table public.stories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  content text not null,
  emotion emotion_mode not null default 'gentle',
  
  -- Voice settings
  voice_profile_id uuid references public.voice_profiles(id) on delete set null,
  narrator_detected text,
  characters jsonb default '[]'::jsonb, -- Array of character names
  
  -- Music settings
  music_theme text,
  background_music_enabled boolean default true,
  sound_effects_enabled boolean default true,
  
  -- Audio output
  audio_url text, -- URL to generated audio file
  duration_seconds integer,
  
  -- Replay tracking
  replay_count integer default 0,
  max_free_replays integer default 3,
  
  -- Metadata
  word_count integer,
  status text default 'draft', -- draft, processing, completed, failed
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.stories enable row level security;

-- RLS Policies
create policy "Users can view their own stories"
on public.stories
for select
to authenticated
using (user_id = auth.uid());

create policy "Users can create their own stories"
on public.stories
for insert
to authenticated
with check (user_id = auth.uid());

create policy "Users can update their own stories"
on public.stories
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "Users can delete their own stories"
on public.stories
for delete
to authenticated
using (user_id = auth.uid());

create policy "Admins can view all stories"
on public.stories
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Indexes for performance
create index stories_user_id_idx on public.stories(user_id);
create index stories_created_at_idx on public.stories(created_at desc);
create index stories_emotion_idx on public.stories(emotion);
```

#### 1.3.2 Voice Profiles Table (for V1 voice cloning)
- [ ] Create voice_profiles table (foundation for V1)

**SQL Migration:**
```sql
create table public.voice_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  description text,
  
  -- Voice characteristics (for future cloning)
  accent text,
  tone text,
  pitch text,
  sample_audio_url text, -- For V1 voice cloning
  
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  unique(user_id, name)
);

alter table public.voice_profiles enable row level security;

-- RLS Policies
create policy "Users can view their own voice profiles"
on public.voice_profiles
for select
to authenticated
using (user_id = auth.uid());

create policy "Users can manage their own voice profiles"
on public.voice_profiles
for all
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());
```

---

### 1.4 Music & Audio Tracks Library

#### 1.4.1 Audio Tracks Table
- [ ] Create audio_tracks table for background music and SFX

**SQL Migration:**
```sql
create type public.audio_type as enum ('music', 'effect');

create table public.audio_tracks (
  id uuid primary key default gen_random_uuid(),
  type audio_type not null,
  name text not null,
  description text,
  
  -- File storage
  file_url text not null, -- Supabase Storage URL
  duration_seconds integer,
  
  -- Emotional matching
  emotion_tags emotion_mode[] not null, -- Array of emotions
  keywords text[] default '{}'::text[], -- e.g., ['forest', 'rain', 'night']
  
  -- Metadata
  source text default 'pixabay', -- Attribution
  license text,
  is_active boolean default true,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.audio_tracks enable row level security;

-- Public read access
create policy "Anyone can view active audio tracks"
on public.audio_tracks
for select
to authenticated
using (is_active = true);

-- Only admins can manage
create policy "Admins can manage audio tracks"
on public.audio_tracks
for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- Indexes
create index audio_tracks_emotion_tags_idx on public.audio_tracks using gin(emotion_tags);
create index audio_tracks_keywords_idx on public.audio_tracks using gin(keywords);
create index audio_tracks_type_idx on public.audio_tracks(type);
```

#### 1.4.2 Storage Buckets
- [ ] Create storage bucket for audio files

**SQL Migration:**
```sql
-- Create audio storage bucket
insert into storage.buckets (id, name, public)
values ('audio-tracks', 'audio-tracks', true);

-- RLS for audio-tracks bucket
create policy "Public can view audio tracks"
on storage.objects for select
to public
using (bucket_id = 'audio-tracks');

create policy "Admins can upload audio tracks"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'audio-tracks' 
  and public.has_role(auth.uid(), 'admin')
);

-- Create generated-audio bucket for user stories
insert into storage.buckets (id, name, public)
values ('generated-audio', 'generated-audio', false);

create policy "Users can view their own generated audio"
on storage.objects for select
to authenticated
using (
  bucket_id = 'generated-audio'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "System can create generated audio"
on storage.objects for insert
to authenticated
with check (bucket_id = 'generated-audio');
```

#### 1.4.3 Seed Initial Music Library
- [ ] Add 7 placeholder tracks per emotion mode (35 total)
- [ ] Download from Pixabay and upload to Supabase Storage
- [ ] Insert metadata into audio_tracks table

**Data Insert Example:**
```sql
-- Example: Calm mode tracks
insert into public.audio_tracks (type, name, description, file_url, emotion_tags, keywords, source)
values
  ('music', 'Lullaby Garden - Piano', 'Soft piano melody for bedtime', 
   'https://[supabase-url]/storage/v1/object/public/audio-tracks/calm/lullaby-garden.mp3',
   ARRAY['calm']::emotion_mode[], ARRAY['piano', 'night', 'sleep'], 'pixabay'),
  
  ('music', 'Moonlight Cradle', 'Gentle acoustic for calm moments',
   'https://[supabase-url]/storage/v1/object/public/audio-tracks/calm/moonlight-cradle.mp3',
   ARRAY['calm']::emotion_mode[], ARRAY['acoustic', 'peaceful'], 'pixabay');
   
-- Repeat for gentle, playful, adventure, heartfelt (7 each)
```

---

### 1.5 Story Upload & Input UI

#### 1.5.1 Generate Page - Story Input
- [ ] Create `/generate` page
- [ ] Text input textarea (max 50,000 words)
- [ ] File upload: PDF, TXT, PNG, GIF, JPEG (max 10MB)
- [ ] Input validation with zod
- [ ] Character counter
- [ ] File type validation

**Component Structure:**
```
src/
├── pages/
│   └── Generate.tsx
├── components/
│   ├── stories/
│   │   ├── StoryUploader.tsx (file upload + text input)
│   │   ├── FileUploadZone.tsx
│   │   └── TextEditor.tsx
```

**Validation Schema:**
```typescript
const storyInputSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(50).max(250000), // ~50k words
  file: z.instanceof(File).optional().refine(
    (file) => !file || file.size <= 10 * 1024 * 1024,
    'File must be under 10MB'
  ).refine(
    (file) => !file || ['application/pdf', 'text/plain', 'image/png', 'image/jpeg', 'image/gif'].includes(file.type),
    'Invalid file type'
  )
});
```

#### 1.5.2 Emotional Dial Component
- [ ] Create EmotionalDial component
- [ ] 5 emotion modes with icons (🌙 Calm, ☀️ Gentle, 🌈 Playful, 🚀 Adventure, 💖 Heartfelt)
- [ ] Visual selection UI
- [ ] Persist selection in form state

**Component Reference:** `design-guidelines.md` lines 103-113

---

### 1.6 Story Generation (Mock for MVP)

#### 1.6.1 Mock AI Processing Edge Function
- [ ] Create edge function `generate-story-audio`
- [ ] Accept: story content, emotion, title
- [ ] Mock processing delay (3-5 seconds)
- [ ] Return placeholder audio URL
- [ ] Detect narrator and characters (simple regex for MVP)
- [ ] Return mock metadata

**Edge Function Structure:**
```typescript
// supabase/functions/generate-story-audio/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { storyId, content, emotion, title } = await req.json();
    
    // Mock processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simple narrator detection (MVP mock)
    const narratorMatch = content.match(/Narrator:\s*(.+)/i);
    const narrator = narratorMatch ? narratorMatch[1].trim() : 'Default Narrator';
    
    // Character detection (basic regex)
    const characterMatches = content.matchAll(/([A-Z][a-z]+):\s*/g);
    const characters = [...new Set([...characterMatches].map(m => m[1]))];
    
    // Return mock data
    return new Response(JSON.stringify({
      audioUrl: 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav', // placeholder
      narrator,
      characters,
      durationSeconds: 120,
      musicTheme: `${emotion}-theme-1`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
```

**Config:**
```toml
# supabase/config.toml
[functions.generate-story-audio]
verify_jwt = true
```

#### 1.6.2 Story Generation Flow
- [ ] Create `useStoryGeneration` hook
- [ ] Insert story record with status='processing'
- [ ] Call edge function
- [ ] Update story with audio URL and metadata
- [ ] Handle errors gracefully
- [ ] Show loading states ("Mixing voices and melodies...")

---

### 1.7 Audio Playback & Preview

#### 1.7.1 Preview Player Component
- [ ] Create PreviewPlayer component
- [ ] Play/pause controls
- [ ] Progress bar with time display
- [ ] Volume control
- [ ] Toggle: Voice-only vs Voice + Background Music
- [ ] Visual feedback while playing

**Component Structure:**
```
src/components/audio/
├── PreviewPlayer.tsx (main player)
├── MusicToggle.tsx (voice-only / voice+music switch)
├── VolumeControl.tsx
└── ProgressBar.tsx
```

**Player State Management:**
```typescript
interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  musicEnabled: boolean;
}
```

#### 1.7.2 Audio Mixer Logic (Client-side MVP)
- [ ] Create `audioMixer.ts` utility
- [ ] Layer voice audio with background music
- [ ] Volume balancing
- [ ] Crossfade transitions

**Reference:** `masterplan.md` - Smart Audio Mixer

---

### 1.8 Library Page

#### 1.8.1 Story Library UI
- [ ] Create `/library` page
- [ ] Grid layout of story cards
- [ ] Display: title, emotion, thumbnail, duration
- [ ] Playback controls on each card
- [ ] Filter by emotion
- [ ] Sort by date created

**Component Structure:**
```
src/
├── pages/
│   └── Library.tsx
├── components/
│   └── stories/
│       ├── StoryCard.tsx
│       ├── StoryGrid.tsx
│       └── EmotionFilter.tsx
```

#### 1.8.2 Story Replay Tracking
- [ ] Track replay_count on story record
- [ ] Display "X of 3 free replays used"
- [ ] Disable replay button after 3 (show upgrade CTA)
- [ ] "Reuse Voice" button to copy voice settings to new story

---

### 1.9 Dashboard Page

#### 1.9.1 User Dashboard
- [ ] Create `/dashboard` page
- [ ] Display user stats: total stories, total listening time
- [ ] Recent stories list
- [ ] Quick action: "Create New Story"
- [ ] Settings link

**Component Structure:**
```
src/pages/Dashboard.tsx
src/components/dashboard/
├── StatsCards.tsx
├── RecentStories.tsx
└── QuickActions.tsx
```

---

### 1.10 Navigation & Routing

#### 1.10.1 Update Routes
- [ ] Add `/auth` route
- [ ] Add `/generate` route
- [ ] Update `/library` route
- [ ] Update `/dashboard` route
- [ ] Protect routes with auth wrapper
- [ ] Add 404 page

**Routes Structure:**
```typescript
// src/App.tsx or routing config
const routes = [
  { path: '/', element: <Index /> },
  { path: '/auth', element: <Auth /> },
  { path: '/dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
  { path: '/generate', element: <ProtectedRoute><Generate /></ProtectedRoute> },
  { path: '/library', element: <ProtectedRoute><Library /></ProtectedRoute> },
  { path: '*', element: <NotFound /> }
];
```

#### 1.10.2 Update Navbar
- [ ] Add login/logout buttons
- [ ] Show user avatar/name when logged in
- [ ] Active route highlighting
- [ ] Mobile responsive menu

---

## Phase 2: V1 — Personalization & Emotional Depth

### 2.1 Voice Cloning Integration

#### 2.1.1 Voice Cloning Page
- [ ] Create `/voice-cloning` page
- [ ] Record audio sample UI (browser MediaRecorder API)
- [ ] Upload existing audio file
- [ ] Voice preview playback
- [ ] Save voice profile

**Component Structure:**
```
src/
├── pages/
│   └── VoiceCloning.tsx
├── components/
│   └── voice/
│       ├── VoiceRecorder.tsx
│       ├── VoiceSampleUpload.tsx
│       └── VoiceProfileCard.tsx
```

#### 2.1.2 ElevenLabs Integration (or alternative TTS with cloning)
- [ ] Research and select voice cloning API (ElevenLabs, Play.ht, Resemble.ai)
- [ ] Add API key secret
- [ ] Create edge function `clone-voice`
- [ ] Store cloned voice ID in voice_profiles table
- [ ] Update story generation to use cloned voices

**Edge Function Example:**
```typescript
// supabase/functions/clone-voice/index.ts
// Integrate with chosen voice cloning API
// Accept audio sample, return voice_id
```

#### 2.1.3 Link Voice Profiles to Stories
- [ ] Voice profile selector in story generation flow
- [ ] Default voice per user
- [ ] "Reuse Voice" functionality in library

---

### 2.2 Story Replay Modes

#### 2.2.1 Replay Variations
- [ ] Generate 3 subtle variations per story
- [ ] Different voice expressions (emphasis, pacing)
- [ ] Store replay variants as separate audio files
- [ ] UI to select which replay to listen to

#### 2.2.2 Billing Integration for Additional Replays
- [ ] Integrate Stripe (using Lovable Stripe integration)
- [ ] Create subscription product: "Unlimited Replays"
- [ ] Create one-time product: "+10 Replays"
- [ ] Paywall after 3 free replays
- [ ] Purchase flow in Library page

**Stripe Products:**
- Subscription: $9.99/month - Unlimited story generation + replays
- One-time: $4.99 - 10 additional replay credits

**Database Schema Addition:**
```sql
-- Add to profiles table
alter table public.profiles
add column replay_credits integer default 0,
add column subscription_status text default 'free', -- free, active, cancelled
add column subscription_id text;
```

---

### 2.3 Smart Audio Mixer (Advanced)

#### 2.3.1 Emotion-Based Music Selection
- [ ] Create edge function `select-background-music`
- [ ] Accept: emotion, story keywords
- [ ] Query audio_tracks table with emotion + keyword matching
- [ ] Return best matching track(s)

**Selection Algorithm:**
```typescript
// Prioritize:
// 1. Exact emotion match
// 2. Keyword overlap (story content analysis)
// 3. Randomize within top matches to avoid repetition
```

#### 2.3.2 Volume Balancing & Ducking
- [ ] Implement audio ducking (lower music during dialogue)
- [ ] User-adjustable balance slider (voice vs music volume)
- [ ] Persist preferences per user

---

### 2.4 Billing Dashboard

#### 2.4.1 Billing Page
- [ ] Create `/billing` page
- [ ] Display current plan, replay credits, usage stats
- [ ] Manage subscription (upgrade/cancel)
- [ ] Purchase replay credits
- [ ] Payment history

---

## Phase 3: V2 — Delight & Expansion

### 3.1 Expanded Emotion Library

- [ ] Add new emotion modes: "Mysterious 🕵️", "Silly 🤪", "Brave 🦁"
- [ ] Expand music library (10+ tracks per mode)
- [ ] Update UI to support new emotions

---

### 3.2 Offline Playback

- [ ] Download stories for offline listening
- [ ] IndexedDB for local audio storage
- [ ] Sync status indicator

---

### 3.3 Localization

- [ ] Multi-language support (Spanish, French, German)
- [ ] i18n implementation
- [ ] Multi-language voice narration

---

### 3.4 Parent Dashboard

- [ ] Listening time analytics per child
- [ ] Content moderation tools
- [ ] Favorite stories tracking
- [ ] Parental controls

---

## Testing & QA Checklist

### Functional Testing
- [ ] Auth: Sign up, login, logout, password reset
- [ ] Story generation: Upload, process, playback
- [ ] Emotional dial: All 5 modes generate correctly
- [ ] Audio player: Play, pause, volume, music toggle
- [ ] Replay tracking: Counter increments, paywall triggers
- [ ] RLS policies: Users can only access their own data
- [ ] Admin role: Can view all data, manage audio tracks

### Accessibility Testing
- [ ] Keyboard navigation for all interactive elements
- [ ] Screen reader compatibility
- [ ] WCAG AA contrast compliance
- [ ] Focus states visible
- [ ] "Quiet Mode" toggle disables all SFX

### Performance Testing
- [ ] Load time < 3s on 3G
- [ ] Audio playback latency < 1s
- [ ] File upload progress indicators
- [ ] Lighthouse score > 90

---

## Deployment & Monitoring

### Pre-launch Checklist
- [ ] Disable "Confirm email" in Supabase Auth settings (for faster testing)
- [ ] Configure CORS for edge functions
- [ ] Set up error logging (Sentry or similar)
- [ ] Test all RLS policies in production-like environment
- [ ] Verify Stripe webhooks (if V1 billing implemented)

### Launch
- [ ] Deploy to production
- [ ] Monitor error rates
- [ ] Track user sign-ups and story generation metrics

---

## Notes & Decisions

**Music Source:** Pixabay (royalty-free, no attribution required)
**Voice Cloning:** TBD - ElevenLabs likely candidate for V1
**Replay Billing:** Hard business rule - requires Stripe integration
**Admin Role:** Yes - for platform management

---

## Quick Reference

**Docs:**
- `masterplan.md` - Product vision and features
- `implementation-plan.md` - Phased roadmap
- `design-guidelines.md` - Design system and UX rules
- `app-flow-pages-and-roles.md` - Page structure and user journeys

**Key File Limits:**
- Story: 50,000 words max
- File upload: 10MB max
- Supported formats: PDF, TXT, PNG, GIF, JPEG

**Emotional Modes:**
1. 🌙 Calm - Lullaby bedtime feel
2. ☀️ Gentle - Balanced, warm tone
3. 🌈 Playful - Expressive, fun
4. 🚀 Adventure - Cinematic, dynamic
5. 💖 Heartfelt - Emotional sincerity
