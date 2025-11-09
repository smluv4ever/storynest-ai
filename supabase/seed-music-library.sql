-- Seed Music Library with 35 tracks (7 per emotion mode)
-- Run this in Supabase SQL Editor to populate the audio_tracks table
-- These use placeholder URLs - replace with actual Pixabay downloads uploaded to Storage

INSERT INTO public.audio_tracks (type, name, description, file_url, emotion_tags, keywords, source, license, duration_seconds)
VALUES
  -- CALM tracks (🌙) - 7 tracks
  ('music', 'Lullaby Garden', 'Soft piano melody for peaceful bedtime', 
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/calm/lullaby-garden.mp3',
   ARRAY['calm']::emotion_mode[], ARRAY['piano', 'night', 'sleep', 'peaceful'], 'pixabay', 'Public Domain', 180),
  
  ('music', 'Moonlight Cradle', 'Gentle acoustic guitar for calm moments',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/calm/moonlight-cradle.mp3',
   ARRAY['calm']::emotion_mode[], ARRAY['acoustic', 'guitar', 'soothing'], 'pixabay', 'Public Domain', 195),
  
  ('music', 'Starlight Whisper', 'Ambient synth for deep relaxation',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/calm/starlight-whisper.mp3',
   ARRAY['calm']::emotion_mode[], ARRAY['ambient', 'synth', 'meditation'], 'pixabay', 'Public Domain', 210),
  
  ('music', 'Dreamy Clouds', 'Soft harp and strings',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/calm/dreamy-clouds.mp3',
   ARRAY['calm']::emotion_mode[], ARRAY['harp', 'strings', 'dreamy'], 'pixabay', 'Public Domain', 165),
  
  ('music', 'Silent Night Sky', 'Minimalist piano with nature sounds',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/calm/silent-night-sky.mp3',
   ARRAY['calm']::emotion_mode[], ARRAY['piano', 'nature', 'minimal'], 'pixabay', 'Public Domain', 190),
  
  ('music', 'Peaceful Waters', 'Flowing water with soft bells',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/calm/peaceful-waters.mp3',
   ARRAY['calm']::emotion_mode[], ARRAY['water', 'bells', 'calm'], 'pixabay', 'Public Domain', 200),
  
  ('music', 'Twilight Breeze', 'Gentle wind chimes and flute',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/calm/twilight-breeze.mp3',
   ARRAY['calm']::emotion_mode[], ARRAY['wind', 'chimes', 'flute'], 'pixabay', 'Public Domain', 175),

  -- GENTLE tracks (☀️) - 7 tracks
  ('music', 'Sunny Morning', 'Uplifting acoustic melody',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/gentle/sunny-morning.mp3',
   ARRAY['gentle']::emotion_mode[], ARRAY['morning', 'uplifting', 'acoustic'], 'pixabay', 'Public Domain', 185),
  
  ('music', 'Warm Embrace', 'Soft piano and strings',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/gentle/warm-embrace.mp3',
   ARRAY['gentle']::emotion_mode[], ARRAY['piano', 'strings', 'warm'], 'pixabay', 'Public Domain', 170),
  
  ('music', 'Garden Path', 'Light folk guitar',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/gentle/garden-path.mp3',
   ARRAY['gentle']::emotion_mode[], ARRAY['folk', 'guitar', 'garden'], 'pixabay', 'Public Domain', 160),
  
  ('music', 'Afternoon Light', 'Balanced instrumental mix',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/gentle/afternoon-light.mp3',
   ARRAY['gentle']::emotion_mode[], ARRAY['afternoon', 'balanced', 'instrumental'], 'pixabay', 'Public Domain', 195),
  
  ('music', 'Gentle Breeze', 'Soft woodwinds and strings',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/gentle/gentle-breeze.mp3',
   ARRAY['gentle']::emotion_mode[], ARRAY['woodwinds', 'breeze', 'gentle'], 'pixabay', 'Public Domain', 180),
  
  ('music', 'Cozy Afternoon', 'Warm acoustic plucks',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/gentle/cozy-afternoon.mp3',
   ARRAY['gentle']::emotion_mode[], ARRAY['acoustic', 'cozy', 'afternoon'], 'pixabay', 'Public Domain', 175),
  
  ('music', 'Soft Sunlight', 'Delicate piano with nature',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/gentle/soft-sunlight.mp3',
   ARRAY['gentle']::emotion_mode[], ARRAY['piano', 'sunlight', 'nature'], 'pixabay', 'Public Domain', 190),

  -- PLAYFUL tracks (🌈) - 7 tracks
  ('music', 'Sunny Parade', 'Upbeat ukulele and claps',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/playful/sunny-parade.mp3',
   ARRAY['playful']::emotion_mode[], ARRAY['ukulele', 'upbeat', 'happy'], 'pixabay', 'Public Domain', 140),
  
  ('music', 'Rainbow Dance', 'Cheerful xylophone melody',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/playful/rainbow-dance.mp3',
   ARRAY['playful']::emotion_mode[], ARRAY['xylophone', 'cheerful', 'dance'], 'pixabay', 'Public Domain', 135),
  
  ('music', 'Giggle Grove', 'Bouncy piano and percussion',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/playful/giggle-grove.mp3',
   ARRAY['playful']::emotion_mode[], ARRAY['piano', 'bouncy', 'fun'], 'pixabay', 'Public Domain', 150),
  
  ('music', 'Skip and Hop', 'Energetic folk instruments',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/playful/skip-and-hop.mp3',
   ARRAY['playful']::emotion_mode[], ARRAY['folk', 'energetic', 'playful'], 'pixabay', 'Public Domain', 145),
  
  ('music', 'Bubble Pop', 'Quirky synth and bells',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/playful/bubble-pop.mp3',
   ARRAY['playful']::emotion_mode[], ARRAY['synth', 'quirky', 'bells'], 'pixabay', 'Public Domain', 130),
  
  ('music', 'Tickle Time', 'Light whistling and guitar',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/playful/tickle-time.mp3',
   ARRAY['playful']::emotion_mode[], ARRAY['whistling', 'guitar', 'light'], 'pixabay', 'Public Domain', 155),
  
  ('music', 'Joyful Jump', 'Happy accordion and tambourine',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/playful/joyful-jump.mp3',
   ARRAY['playful']::emotion_mode[], ARRAY['accordion', 'tambourine', 'joyful'], 'pixabay', 'Public Domain', 148),

  -- ADVENTURE tracks (🚀) - 7 tracks
  ('music', 'Forest Quest', 'Cinematic drums and strings',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/adventure/forest-quest.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['cinematic', 'drums', 'epic'], 'pixabay', 'Public Domain', 220),
  
  ('music', 'Mountain Climb', 'Bold orchestral theme',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/adventure/mountain-climb.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['orchestral', 'bold', 'mountain'], 'pixabay', 'Public Domain', 230),
  
  ('music', 'Ocean Voyage', 'Sweeping strings with percussion',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/adventure/ocean-voyage.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['strings', 'ocean', 'voyage'], 'pixabay', 'Public Domain', 210),
  
  ('music', 'Dragon Flight', 'Dynamic brass and timpani',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/adventure/dragon-flight.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['brass', 'dragon', 'dynamic'], 'pixabay', 'Public Domain', 240),
  
  ('music', 'Jungle Explorer', 'Tribal drums with nature sounds',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/adventure/jungle-explorer.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['tribal', 'drums', 'jungle'], 'pixabay', 'Public Domain', 215),
  
  ('music', 'Space Journey', 'Electronic epic with synth',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/adventure/space-journey.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['electronic', 'space', 'epic'], 'pixabay', 'Public Domain', 225),
  
  ('music', 'Hero March', 'Triumphant orchestral march',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/adventure/hero-march.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['march', 'triumphant', 'hero'], 'pixabay', 'Public Domain', 205),

  -- HEARTFELT tracks (💖) - 7 tracks
  ('music', 'Home Again', 'Warm cello with soft piano',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/heartfelt/home-again.mp3',
   ARRAY['heartfelt']::emotion_mode[], ARRAY['cello', 'piano', 'home'], 'pixabay', 'Public Domain', 200),
  
  ('music', 'Family Circle', 'Tender acoustic guitar',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/heartfelt/family-circle.mp3',
   ARRAY['heartfelt']::emotion_mode[], ARRAY['acoustic', 'family', 'tender'], 'pixabay', 'Public Domain', 185),
  
  ('music', 'Love Story', 'Emotional violin and piano',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/heartfelt/love-story.mp3',
   ARRAY['heartfelt']::emotion_mode[], ARRAY['violin', 'emotional', 'love'], 'pixabay', 'Public Domain', 195),
  
  ('music', 'Childhood Memories', 'Nostalgic music box melody',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/heartfelt/childhood-memories.mp3',
   ARRAY['heartfelt']::emotion_mode[], ARRAY['music box', 'nostalgic', 'memories'], 'pixabay', 'Public Domain', 170),
  
  ('music', 'Forever Friends', 'Uplifting strings with hope',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/heartfelt/forever-friends.mp3',
   ARRAY['heartfelt']::emotion_mode[], ARRAY['strings', 'friendship', 'hope'], 'pixabay', 'Public Domain', 190),
  
  ('music', 'Grateful Heart', 'Sincere piano solo',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/heartfelt/grateful-heart.mp3',
   ARRAY['heartfelt']::emotion_mode[], ARRAY['piano', 'sincere', 'grateful'], 'pixabay', 'Public Domain', 180),
  
  ('music', 'Precious Moments', 'Delicate harp with soft chime',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/heartfelt/precious-moments.mp3',
   ARRAY['heartfelt']::emotion_mode[], ARRAY['harp', 'chime', 'precious'], 'pixabay', 'Public Domain', 175);
