-- Create emotion enum
create type public.emotion_mode as enum (
  'calm', 
  'gentle', 
  'playful', 
  'adventure', 
  'heartfelt'
);

-- Create voice_profiles table first (referenced by stories)
create table public.voice_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  description text,
  
  -- Voice characteristics (for future cloning)
  accent text,
  tone text,
  pitch text,
  sample_audio_url text,
  
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  unique(user_id, name)
);

alter table public.voice_profiles enable row level security;

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
  characters jsonb default '[]'::jsonb,
  
  -- Music settings
  music_theme text,
  background_music_enabled boolean default true,
  sound_effects_enabled boolean default true,
  
  -- Audio output
  audio_url text,
  duration_seconds integer,
  
  -- Replay tracking
  replay_count integer default 0,
  max_free_replays integer default 3,
  
  -- Metadata
  word_count integer,
  status text default 'draft',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.stories enable row level security;

-- RLS Policies for voice_profiles
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

-- RLS Policies for stories
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

-- Add update trigger for stories
create trigger update_stories_updated_at
  before update on public.stories
  for each row execute procedure public.update_updated_at_column();

-- Indexes for performance
create index stories_user_id_idx on public.stories(user_id);
create index stories_created_at_idx on public.stories(created_at desc);
create index stories_emotion_idx on public.stories(emotion);