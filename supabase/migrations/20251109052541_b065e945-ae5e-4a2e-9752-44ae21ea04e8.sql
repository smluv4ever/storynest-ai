-- Create audio type enum
create type public.audio_type as enum ('music', 'effect');

-- Create audio_tracks table
create table public.audio_tracks (
  id uuid primary key default gen_random_uuid(),
  type audio_type not null,
  name text not null,
  description text,
  
  -- File storage
  file_url text not null,
  duration_seconds integer,
  
  -- Emotional matching
  emotion_tags emotion_mode[] not null,
  keywords text[] default '{}'::text[],
  
  -- Metadata
  source text default 'pixabay',
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

-- Create storage buckets
insert into storage.buckets (id, name, public)
values ('audio-tracks', 'audio-tracks', true);

insert into storage.buckets (id, name, public)
values ('generated-audio', 'generated-audio', false);

-- RLS for audio-tracks bucket (public)
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

-- RLS for generated-audio bucket (user-specific)
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