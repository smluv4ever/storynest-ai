-- Seed Music Library with 50 music tracks (10 per emotion mode) + 100 sound effects
-- Run this in Supabase SQL Editor to populate the audio_tracks table
-- These use placeholder URLs - replace with actual Pixabay downloads uploaded to Storage

INSERT INTO public.audio_tracks (type, name, description, file_url, emotion_tags, keywords, source, license, duration_seconds)
VALUES
  -- CALM tracks (🌙) - 10 tracks
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
  
  ('music', 'Night Rain', 'Soft rain sounds with gentle piano',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/calm/night-rain.mp3',
   ARRAY['calm']::emotion_mode[], ARRAY['rain', 'piano', 'relaxing'], 'pixabay', 'Public Domain', 205),
  
  ('music', 'Ocean Lullaby', 'Gentle waves with soft strings',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/calm/ocean-lullaby.mp3',
   ARRAY['calm']::emotion_mode[], ARRAY['ocean', 'waves', 'lullaby'], 'pixabay', 'Public Domain', 185),
  
  ('music', 'Sleepy Hollow', 'Minimalist ambient for deep sleep',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/calm/sleepy-hollow.mp3',
   ARRAY['calm']::emotion_mode[], ARRAY['ambient', 'sleep', 'minimal'], 'pixabay', 'Public Domain', 220),

  -- GENTLE tracks (☀️) - 10 tracks
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
  
  ('music', 'Morning Dew', 'Fresh acoustic with light percussion',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/gentle/morning-dew.mp3',
   ARRAY['gentle']::emotion_mode[], ARRAY['acoustic', 'morning', 'fresh'], 'pixabay', 'Public Domain', 165),
  
  ('music', 'Peaceful Day', 'Calm guitar with birds chirping',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/gentle/peaceful-day.mp3',
   ARRAY['gentle']::emotion_mode[], ARRAY['guitar', 'birds', 'peaceful'], 'pixabay', 'Public Domain', 178),
  
  ('music', 'Meadow Walk', 'Soft flute with nature ambience',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/gentle/meadow-walk.mp3',
   ARRAY['gentle']::emotion_mode[], ARRAY['flute', 'meadow', 'nature'], 'pixabay', 'Public Domain', 188),

  -- PLAYFUL tracks (🌈) - 10 tracks
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
  
  ('music', 'Silly Symphony', 'Fun kazoo and percussion',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/playful/silly-symphony.mp3',
   ARRAY['playful']::emotion_mode[], ARRAY['kazoo', 'silly', 'fun'], 'pixabay', 'Public Domain', 142),
  
  ('music', 'Happy Feet', 'Tap dancing rhythm with piano',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/playful/happy-feet.mp3',
   ARRAY['playful']::emotion_mode[], ARRAY['tap', 'rhythm', 'happy'], 'pixabay', 'Public Domain', 138),
  
  ('music', 'Carnival Joy', 'Festive calliope and bells',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/playful/carnival-joy.mp3',
   ARRAY['playful']::emotion_mode[], ARRAY['carnival', 'festive', 'calliope'], 'pixabay', 'Public Domain', 152),

  -- ADVENTURE tracks (🚀) - 10 tracks
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
  
  ('music', 'Pirate Voyage', 'Nautical theme with accordion',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/adventure/pirate-voyage.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['pirate', 'nautical', 'accordion'], 'pixabay', 'Public Domain', 198),
  
  ('music', 'Castle Quest', 'Medieval orchestral with horns',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/adventure/castle-quest.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['medieval', 'castle', 'horns'], 'pixabay', 'Public Domain', 235),
  
  ('music', 'Wild Frontier', 'Western-style adventure theme',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/adventure/wild-frontier.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['western', 'frontier', 'adventure'], 'pixabay', 'Public Domain', 212),

  -- HEARTFELT tracks (💖) - 10 tracks
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
   ARRAY['heartfelt']::emotion_mode[], ARRAY['harp', 'chime', 'precious'], 'pixabay', 'Public Domain', 175),
  
  ('music', 'Tender Touch', 'Gentle acoustic with warmth',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/heartfelt/tender-touch.mp3',
   ARRAY['heartfelt']::emotion_mode[], ARRAY['acoustic', 'tender', 'warm'], 'pixabay', 'Public Domain', 192),
  
  ('music', 'Together Always', 'Uplifting cello and piano duet',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/heartfelt/together-always.mp3',
   ARRAY['heartfelt']::emotion_mode[], ARRAY['cello', 'piano', 'together'], 'pixabay', 'Public Domain', 188),
  
  ('music', 'Sweet Dreams', 'Comforting lullaby with strings',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/heartfelt/sweet-dreams.mp3',
   ARRAY['heartfelt']::emotion_mode[], ARRAY['lullaby', 'comforting', 'strings'], 'pixabay', 'Public Domain', 182),

  -- SOUND EFFECTS - 30 effects for dynamic story moments
  ('effect', 'Door Creak Open', 'Old wooden door opening slowly',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/door-creak-open.mp3',
   ARRAY['adventure', 'heartfelt']::emotion_mode[], ARRAY['door', 'creak', 'open', 'wooden'], 'pixabay', 'Public Domain', 3),
  
  ('effect', 'Door Creak Close', 'Old wooden door closing',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/door-creak-close.mp3',
   ARRAY['adventure', 'heartfelt']::emotion_mode[], ARRAY['door', 'creak', 'close', 'wooden'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Footsteps Wood', 'Walking on wooden floor',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/footsteps-wood.mp3',
   ARRAY['gentle', 'adventure', 'heartfelt']::emotion_mode[], ARRAY['footsteps', 'walking', 'wood', 'floor'], 'pixabay', 'Public Domain', 4),
  
  ('effect', 'Footsteps Grass', 'Walking through grass',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/footsteps-grass.mp3',
   ARRAY['gentle', 'adventure']::emotion_mode[], ARRAY['footsteps', 'grass', 'walking', 'outdoor'], 'pixabay', 'Public Domain', 3),
  
  ('effect', 'Thunder Rumble', 'Deep thunder sound',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/thunder-rumble.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['thunder', 'storm', 'weather', 'rain'], 'pixabay', 'Public Domain', 5),
  
  ('effect', 'Rain Light', 'Gentle rainfall',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/rain-light.mp3',
   ARRAY['calm', 'gentle']::emotion_mode[], ARRAY['rain', 'gentle', 'weather', 'water'], 'pixabay', 'Public Domain', 8),
  
  ('effect', 'Rain Heavy', 'Heavy downpour',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/rain-heavy.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['rain', 'heavy', 'storm', 'downpour'], 'pixabay', 'Public Domain', 6),
  
  ('effect', 'Birds Chirping', 'Morning birds singing',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/birds-chirping.mp3',
   ARRAY['gentle', 'playful']::emotion_mode[], ARRAY['birds', 'chirping', 'morning', 'nature'], 'pixabay', 'Public Domain', 7),
  
  ('effect', 'Owl Hoot', 'Owl hooting at night',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/owl-hoot.mp3',
   ARRAY['calm', 'adventure']::emotion_mode[], ARRAY['owl', 'night', 'hoot', 'bird'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Water Splash', 'Water splashing',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/water-splash.mp3',
   ARRAY['playful', 'adventure']::emotion_mode[], ARRAY['water', 'splash', 'swim', 'pool'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Stream Flowing', 'Gentle stream water',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/stream-flowing.mp3',
   ARRAY['calm', 'gentle']::emotion_mode[], ARRAY['stream', 'water', 'flowing', 'nature'], 'pixabay', 'Public Domain', 8),
  
  ('effect', 'Wind Howl', 'Strong wind blowing',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/wind-howl.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['wind', 'howl', 'weather', 'storm'], 'pixabay', 'Public Domain', 5),
  
  ('effect', 'Wind Gentle', 'Soft breeze',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/wind-gentle.mp3',
   ARRAY['calm', 'gentle']::emotion_mode[], ARRAY['wind', 'breeze', 'gentle', 'soft'], 'pixabay', 'Public Domain', 6),
  
  ('effect', 'Fire Crackling', 'Campfire or fireplace',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/fire-crackling.mp3',
   ARRAY['calm', 'gentle', 'heartfelt']::emotion_mode[], ARRAY['fire', 'crackling', 'campfire', 'fireplace'], 'pixabay', 'Public Domain', 8),
  
  ('effect', 'Clock Ticking', 'Clock ticking sound',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/clock-ticking.mp3',
   ARRAY['gentle', 'adventure']::emotion_mode[], ARRAY['clock', 'ticking', 'time', 'tick'], 'pixabay', 'Public Domain', 5),
  
  ('effect', 'Bell Ring', 'Single bell chime',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/bell-ring.mp3',
   ARRAY['gentle', 'playful', 'heartfelt']::emotion_mode[], ARRAY['bell', 'chime', 'ring', 'ding'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Horse Neigh', 'Horse neighing',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/horse-neigh.mp3',
   ARRAY['adventure', 'playful']::emotion_mode[], ARRAY['horse', 'neigh', 'animal', 'farm'], 'pixabay', 'Public Domain', 3),
  
  ('effect', 'Dog Bark', 'Dog barking',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/dog-bark.mp3',
   ARRAY['playful', 'adventure']::emotion_mode[], ARRAY['dog', 'bark', 'pet', 'animal'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Cat Meow', 'Cat meowing',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/cat-meow.mp3',
   ARRAY['gentle', 'playful']::emotion_mode[], ARRAY['cat', 'meow', 'pet', 'animal'], 'pixabay', 'Public Domain', 1),
  
  ('effect', 'Waves Ocean', 'Ocean waves crashing',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/waves-ocean.mp3',
   ARRAY['calm', 'adventure']::emotion_mode[], ARRAY['waves', 'ocean', 'sea', 'beach'], 'pixabay', 'Public Domain', 8),
  
  ('effect', 'Leaves Rustling', 'Leaves rustling in wind',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/leaves-rustling.mp3',
   ARRAY['calm', 'gentle']::emotion_mode[], ARRAY['leaves', 'rustling', 'wind', 'nature'], 'pixabay', 'Public Domain', 5),
  
  ('effect', 'Crow Caw', 'Crow cawing',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/crow-caw.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['crow', 'caw', 'bird', 'raven'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Crickets Night', 'Nighttime crickets',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/crickets-night.mp3',
   ARRAY['calm', 'gentle']::emotion_mode[], ARRAY['crickets', 'night', 'insects', 'evening'], 'pixabay', 'Public Domain', 8),
  
  ('effect', 'Magic Sparkle', 'Magical sparkle sound',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/magic-sparkle.mp3',
   ARRAY['playful', 'adventure']::emotion_mode[], ARRAY['magic', 'sparkle', 'fantasy', 'twinkle'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Sword Clash', 'Swords clashing',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/sword-clash.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['sword', 'clash', 'fight', 'metal'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Page Turn', 'Book page turning',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/page-turn.mp3',
   ARRAY['gentle', 'heartfelt']::emotion_mode[], ARRAY['page', 'turn', 'book', 'paper'], 'pixabay', 'Public Domain', 1),
  
  ('effect', 'Giggle Child', 'Child giggling',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/giggle-child.mp3',
   ARRAY['playful', 'heartfelt']::emotion_mode[], ARRAY['giggle', 'laugh', 'child', 'happy'], 'pixabay', 'Public Domain', 3),
  
  ('effect', 'Knock Door', 'Knocking on door',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/knock-door.mp3',
   ARRAY['gentle', 'adventure']::emotion_mode[], ARRAY['knock', 'door', 'tap', 'entrance'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Car Horn', 'Car horn beep',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/car-horn.mp3',
   ARRAY['playful', 'adventure']::emotion_mode[], ARRAY['car', 'horn', 'beep', 'vehicle'], 'pixabay', 'Public Domain', 1),
  
  ('effect', 'Bicycle Bell', 'Bicycle bell ringing',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/bicycle-bell.mp3',
   ARRAY['playful', 'gentle']::emotion_mode[], ARRAY['bicycle', 'bell', 'bike', 'ring'], 'pixabay', 'Public Domain', 1),
  
  -- Additional 70 sound effects (31-100)
  ('effect', 'Train Whistle', 'Steam train whistle blowing',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/train-whistle.mp3',
   ARRAY['adventure', 'playful']::emotion_mode[], ARRAY['train', 'whistle', 'locomotive', 'steam'], 'pixabay', 'Public Domain', 3),
  
  ('effect', 'Airplane Fly', 'Airplane flying overhead',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/airplane-fly.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['airplane', 'fly', 'plane', 'sky'], 'pixabay', 'Public Domain', 5),
  
  ('effect', 'School Bell', 'School bell ringing',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/school-bell.mp3',
   ARRAY['playful', 'gentle']::emotion_mode[], ARRAY['school', 'bell', 'ring', 'recess'], 'pixabay', 'Public Domain', 3),
  
  ('effect', 'Applause', 'Crowd applauding',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/applause.mp3',
   ARRAY['playful', 'heartfelt']::emotion_mode[], ARRAY['applause', 'clapping', 'crowd', 'cheer'], 'pixabay', 'Public Domain', 4),
  
  ('effect', 'Baby Laugh', 'Baby laughing',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/baby-laugh.mp3',
   ARRAY['playful', 'heartfelt']::emotion_mode[], ARRAY['baby', 'laugh', 'giggle', 'infant'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Balloon Pop', 'Balloon popping',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/balloon-pop.mp3',
   ARRAY['playful', 'adventure']::emotion_mode[], ARRAY['balloon', 'pop', 'burst', 'party'], 'pixabay', 'Public Domain', 1),
  
  ('effect', 'Bees Buzzing', 'Bees buzzing around',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/bees-buzzing.mp3',
   ARRAY['gentle', 'adventure']::emotion_mode[], ARRAY['bees', 'buzzing', 'insects', 'honey'], 'pixabay', 'Public Domain', 6),
  
  ('effect', 'Boat Horn', 'Ship horn blast',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/boat-horn.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['boat', 'horn', 'ship', 'foghorn'], 'pixabay', 'Public Domain', 3),
  
  ('effect', 'Bubbles Popping', 'Soap bubbles popping',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/bubbles-popping.mp3',
   ARRAY['playful', 'calm']::emotion_mode[], ARRAY['bubbles', 'pop', 'soap', 'bath'], 'pixabay', 'Public Domain', 3),
  
  ('effect', 'Camera Shutter', 'Camera taking photo',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/camera-shutter.mp3',
   ARRAY['gentle', 'playful']::emotion_mode[], ARRAY['camera', 'photo', 'shutter', 'click'], 'pixabay', 'Public Domain', 1),
  
  ('effect', 'Cartoon Boing', 'Bouncy spring sound',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/cartoon-boing.mp3',
   ARRAY['playful']::emotion_mode[], ARRAY['boing', 'spring', 'bounce', 'cartoon'], 'pixabay', 'Public Domain', 1),
  
  ('effect', 'Cartoon Whistle', 'Sliding whistle sound',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/cartoon-whistle.mp3',
   ARRAY['playful']::emotion_mode[], ARRAY['whistle', 'slide', 'cartoon', 'funny'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Cash Register', 'Cash register ding',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/cash-register.mp3',
   ARRAY['playful', 'gentle']::emotion_mode[], ARRAY['cash', 'register', 'ding', 'shop'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Chain Rattle', 'Metal chains rattling',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/chain-rattle.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['chain', 'rattle', 'metal', 'clink'], 'pixabay', 'Public Domain', 3),
  
  ('effect', 'Choir Singing', 'Angelic choir vocals',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/choir-singing.mp3',
   ARRAY['heartfelt', 'calm']::emotion_mode[], ARRAY['choir', 'singing', 'angelic', 'voices'], 'pixabay', 'Public Domain', 6),
  
  ('effect', 'Coin Drop', 'Coin dropping on surface',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/coin-drop.mp3',
   ARRAY['playful', 'gentle']::emotion_mode[], ARRAY['coin', 'drop', 'money', 'clink'], 'pixabay', 'Public Domain', 1),
  
  ('effect', 'Cough', 'Person coughing',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/cough.mp3',
   ARRAY['gentle', 'heartfelt']::emotion_mode[], ARRAY['cough', 'sick', 'throat', 'person'], 'pixabay', 'Public Domain', 1),
  
  ('effect', 'Cow Moo', 'Cow mooing',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/public/audio-tracks/effects/cow-moo.mp3',
   ARRAY['gentle', 'playful']::emotion_mode[], ARRAY['cow', 'moo', 'farm', 'animal'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Drum Roll', 'Snare drum roll',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/drum-roll.mp3',
   ARRAY['playful', 'adventure']::emotion_mode[], ARRAY['drum', 'roll', 'snare', 'suspense'], 'pixabay', 'Public Domain', 3),
  
  ('effect', 'Duck Quack', 'Duck quacking',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/duck-quack.mp3',
   ARRAY['playful', 'gentle']::emotion_mode[], ARRAY['duck', 'quack', 'bird', 'pond'], 'pixabay', 'Public Domain', 1),
  
  ('effect', 'Elephant Trumpet', 'Elephant trumpeting',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/elephant-trumpet.mp3',
   ARRAY['adventure', 'playful']::emotion_mode[], ARRAY['elephant', 'trumpet', 'animal', 'wild'], 'pixabay', 'Public Domain', 3),
  
  ('effect', 'Fireworks Burst', 'Fireworks exploding',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/fireworks-burst.mp3',
   ARRAY['playful', 'adventure']::emotion_mode[], ARRAY['fireworks', 'burst', 'explosion', 'celebration'], 'pixabay', 'Public Domain', 4),
  
  ('effect', 'Frog Croak', 'Frog croaking',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/frog-croak.mp3',
   ARRAY['gentle', 'playful']::emotion_mode[], ARRAY['frog', 'croak', 'pond', 'animal'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Glass Break', 'Glass shattering',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/glass-break.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['glass', 'break', 'shatter', 'crash'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Gong', 'Large gong strike',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/gong.mp3',
   ARRAY['adventure', 'gentle']::emotion_mode[], ARRAY['gong', 'strike', 'metal', 'resonant'], 'pixabay', 'Public Domain', 5),
  
  ('effect', 'Hammer Nail', 'Hammering a nail',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/hammer-nail.mp3',
   ARRAY['gentle', 'adventure']::emotion_mode[], ARRAY['hammer', 'nail', 'build', 'construction'], 'pixabay', 'Public Domain', 3),
  
  ('effect', 'Harp Glissando', 'Harp upward sweep',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/harp-glissando.mp3',
   ARRAY['heartfelt', 'playful']::emotion_mode[], ARRAY['harp', 'glissando', 'sweep', 'magical'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Heartbeat', 'Human heartbeat rhythm',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/heartbeat.mp3',
   ARRAY['heartfelt', 'adventure']::emotion_mode[], ARRAY['heartbeat', 'pulse', 'rhythm', 'heart'], 'pixabay', 'Public Domain', 4),
  
  ('effect', 'Helicopter', 'Helicopter flying',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/helicopter.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['helicopter', 'rotor', 'fly', 'aircraft'], 'pixabay', 'Public Domain', 6),
  
  ('effect', 'Hiccup', 'Person hiccuping',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/hiccup.mp3',
   ARRAY['playful', 'gentle']::emotion_mode[], ARRAY['hiccup', 'person', 'funny', 'sound'], 'pixabay', 'Public Domain', 1),
  
  ('effect', 'Ice Cream Truck', 'Ice cream truck jingle',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/ice-cream-truck.mp3',
   ARRAY['playful', 'gentle']::emotion_mode[], ARRAY['ice cream', 'truck', 'jingle', 'music'], 'pixabay', 'Public Domain', 5),
  
  ('effect', 'Keyboard Typing', 'Computer keyboard typing',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/keyboard-typing.mp3',
   ARRAY['gentle']::emotion_mode[], ARRAY['keyboard', 'typing', 'computer', 'keys'], 'pixabay', 'Public Domain', 4),
  
  ('effect', 'Kiss', 'Kissing sound',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/kiss.mp3',
   ARRAY['heartfelt', 'playful']::emotion_mode[], ARRAY['kiss', 'smooch', 'love', 'affection'], 'pixabay', 'Public Domain', 1),
  
  ('effect', 'Laser Zap', 'Sci-fi laser sound',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/laser-zap.mp3',
   ARRAY['adventure', 'playful']::emotion_mode[], ARRAY['laser', 'zap', 'scifi', 'beam'], 'pixabay', 'Public Domain', 1),
  
  ('effect', 'Lion Roar', 'Lion roaring',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/lion-roar.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['lion', 'roar', 'animal', 'wild'], 'pixabay', 'Public Domain', 3),
  
  ('effect', 'Match Strike', 'Striking a match',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/match-strike.mp3',
   ARRAY['gentle', 'adventure']::emotion_mode[], ARRAY['match', 'strike', 'fire', 'light'], 'pixabay', 'Public Domain', 1),
  
  ('effect', 'Monkey Chatter', 'Monkey chattering',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/monkey-chatter.mp3',
   ARRAY['playful', 'adventure']::emotion_mode[], ARRAY['monkey', 'chatter', 'jungle', 'animal'], 'pixabay', 'Public Domain', 3),
  
  ('effect', 'Motorcycle Rev', 'Motorcycle engine revving',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/motorcycle-rev.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['motorcycle', 'rev', 'engine', 'vehicle'], 'pixabay', 'Public Domain', 3),
  
  ('effect', 'Mouse Squeak', 'Mouse squeaking',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/mouse-squeak.mp3',
   ARRAY['playful', 'gentle']::emotion_mode[], ARRAY['mouse', 'squeak', 'animal', 'rodent'], 'pixabay', 'Public Domain', 1),
  
  ('effect', 'Paper Crumple', 'Paper being crumpled',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/paper-crumple.mp3',
   ARRAY['gentle']::emotion_mode[], ARRAY['paper', 'crumple', 'wrinkle', 'crush'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Pig Oink', 'Pig oinking',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/pig-oink.mp3',
   ARRAY['playful', 'gentle']::emotion_mode[], ARRAY['pig', 'oink', 'farm', 'animal'], 'pixabay', 'Public Domain', 1),
  
  ('effect', 'Phone Ring Old', 'Vintage telephone ringing',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/phone-ring-old.mp3',
   ARRAY['gentle', 'adventure']::emotion_mode[], ARRAY['phone', 'ring', 'telephone', 'vintage'], 'pixabay', 'Public Domain', 4),
  
  ('effect', 'Piano Keys', 'Piano keys playing scale',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/piano-keys.mp3',
   ARRAY['gentle', 'heartfelt']::emotion_mode[], ARRAY['piano', 'keys', 'scale', 'music'], 'pixabay', 'Public Domain', 3),
  
  ('effect', 'Popcorn Popping', 'Popcorn popping',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/popcorn-popping.mp3',
   ARRAY['playful', 'gentle']::emotion_mode[], ARRAY['popcorn', 'pop', 'cooking', 'snack'], 'pixabay', 'Public Domain', 5),
  
  ('effect', 'Robot Voice', 'Robotic speech sound',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/robot-voice.mp3',
   ARRAY['adventure', 'playful']::emotion_mode[], ARRAY['robot', 'voice', 'mechanical', 'scifi'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Rocket Launch', 'Rocket taking off',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/rocket-launch.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['rocket', 'launch', 'space', 'blast'], 'pixabay', 'Public Domain', 6),
  
  ('effect', 'Rooster Crow', 'Rooster crowing',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/rooster-crow.mp3',
   ARRAY['gentle', 'playful']::emotion_mode[], ARRAY['rooster', 'crow', 'morning', 'farm'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Running Feet', 'Running footsteps',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/running-feet.mp3',
   ARRAY['adventure', 'playful']::emotion_mode[], ARRAY['running', 'feet', 'footsteps', 'chase'], 'pixabay', 'Public Domain', 4),
  
  ('effect', 'Saw Cutting', 'Saw cutting wood',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/saw-cutting.mp3',
   ARRAY['gentle', 'adventure']::emotion_mode[], ARRAY['saw', 'cutting', 'wood', 'tool'], 'pixabay', 'Public Domain', 5),
  
  ('effect', 'Scissors Snip', 'Scissors cutting',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/scissors-snip.mp3',
   ARRAY['gentle', 'playful']::emotion_mode[], ARRAY['scissors', 'snip', 'cut', 'craft'], 'pixabay', 'Public Domain', 1),
  
  ('effect', 'Seagull Cry', 'Seagull calling',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/seagull-cry.mp3',
   ARRAY['adventure', 'gentle']::emotion_mode[], ARRAY['seagull', 'cry', 'bird', 'beach'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Sheep Baa', 'Sheep bleating',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/sheep-baa.mp3',
   ARRAY['gentle', 'playful']::emotion_mode[], ARRAY['sheep', 'baa', 'bleat', 'farm'], 'pixabay', 'Public Domain', 1),
  
  ('effect', 'Siren Police', 'Police siren wailing',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/siren-police.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['siren', 'police', 'emergency', 'wail'], 'pixabay', 'Public Domain', 5),
  
  ('effect', 'Sneeze', 'Person sneezing',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/sneeze.mp3',
   ARRAY['gentle', 'playful']::emotion_mode[], ARRAY['sneeze', 'person', 'achoo', 'sick'], 'pixabay', 'Public Domain', 1),
  
  ('effect', 'Snoring', 'Person snoring',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/snoring.mp3',
   ARRAY['calm', 'playful']::emotion_mode[], ARRAY['snoring', 'sleep', 'snore', 'person'], 'pixabay', 'Public Domain', 4),
  
  ('effect', 'Spaceship Whoosh', 'Spaceship passing by',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/spaceship-whoosh.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['spaceship', 'whoosh', 'scifi', 'fly'], 'pixabay', 'Public Domain', 3),
  
  ('effect', 'Splash Big', 'Large splash in water',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/splash-big.mp3',
   ARRAY['adventure', 'playful']::emotion_mode[], ARRAY['splash', 'water', 'big', 'dive'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Spring Bounce', 'Metal spring bouncing',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/spring-bounce.mp3',
   ARRAY['playful']::emotion_mode[], ARRAY['spring', 'bounce', 'metal', 'coil'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Stairs Creaking', 'Creaky stairs',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/stairs-creaking.mp3',
   ARRAY['adventure', 'gentle']::emotion_mode[], ARRAY['stairs', 'creak', 'wood', 'steps'], 'pixabay', 'Public Domain', 3),
  
  ('effect', 'Stomach Growl', 'Stomach rumbling',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/stomach-growl.mp3',
   ARRAY['playful', 'gentle']::emotion_mode[], ARRAY['stomach', 'growl', 'hungry', 'rumble'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Trumpet Fanfare', 'Royal trumpet fanfare',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/trumpet-fanfare.mp3',
   ARRAY['adventure', 'heartfelt']::emotion_mode[], ARRAY['trumpet', 'fanfare', 'royal', 'announcement'], 'pixabay', 'Public Domain', 3),
  
  ('effect', 'Typewriter', 'Manual typewriter typing',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/typewriter.mp3',
   ARRAY['gentle']::emotion_mode[], ARRAY['typewriter', 'typing', 'vintage', 'keys'], 'pixabay', 'Public Domain', 4),
  
  ('effect', 'Vacuum Cleaner', 'Vacuum cleaner running',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/vacuum-cleaner.mp3',
   ARRAY['gentle']::emotion_mode[], ARRAY['vacuum', 'cleaner', 'cleaning', 'appliance'], 'pixabay', 'Public Domain', 6),
  
  ('effect', 'Violin Screech', 'Violin screeching',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/violin-screech.mp3',
   ARRAY['adventure', 'playful']::emotion_mode[], ARRAY['violin', 'screech', 'strings', 'bad'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Waterfall', 'Waterfall flowing',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/waterfall.mp3',
   ARRAY['calm', 'adventure']::emotion_mode[], ARRAY['waterfall', 'water', 'flowing', 'nature'], 'pixabay', 'Public Domain', 8),
  
  ('effect', 'Whale Song', 'Whale singing underwater',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/whale-song.mp3',
   ARRAY['calm', 'heartfelt']::emotion_mode[], ARRAY['whale', 'song', 'ocean', 'underwater'], 'pixabay', 'Public Domain', 7),
  
  ('effect', 'Whip Crack', 'Whip cracking',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/whip-crack.mp3',
   ARRAY['adventure']::emotion_mode[], ARRAY['whip', 'crack', 'snap', 'leather'], 'pixabay', 'Public Domain', 1),
  
  ('effect', 'Wolf Howl', 'Wolf howling at moon',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/wolf-howl.mp3',
   ARRAY['adventure', 'calm']::emotion_mode[], ARRAY['wolf', 'howl', 'night', 'animal'], 'pixabay', 'Public Domain', 4),
  
  ('effect', 'Wood Chop', 'Axe chopping wood',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/wood-chop.mp3',
   ARRAY['adventure', 'gentle']::emotion_mode[], ARRAY['wood', 'chop', 'axe', 'cut'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Yawn', 'Person yawning',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/yawn.mp3',
   ARRAY['calm', 'gentle']::emotion_mode[], ARRAY['yawn', 'tired', 'sleepy', 'person'], 'pixabay', 'Public Domain', 2),
  
  ('effect', 'Zip Zipper', 'Zipper zipping',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/zip-zipper.mp3',
   ARRAY['gentle']::emotion_mode[], ARRAY['zipper', 'zip', 'clothing', 'fasten'], 'pixabay', 'Public Domain', 1),
  
  ('effect', 'Zombie Groan', 'Zombie groaning',
   'https://rlrgntjscgoiblvrhzht.supabase.co/storage/v1/object/public/audio-tracks/effects/zombie-groan.mp3',
   ARRAY['adventure', 'playful']::emotion_mode[], ARRAY['zombie', 'groan', 'undead', 'monster'], 'pixabay', 'Public Domain', 3);
