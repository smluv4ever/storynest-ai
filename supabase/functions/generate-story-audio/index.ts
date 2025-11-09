import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.80.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GenerateRequest {
  storyId: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        },
      }
    );

    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    const { storyId }: GenerateRequest = await req.json();

    if (!storyId) {
      throw new Error('Story ID is required');
    }

    console.log(`[generate-story-audio] Processing story: ${storyId} for user: ${user.id}`);

    // Fetch the story
    const { data: story, error: fetchError } = await supabaseClient
      .from('stories')
      .select('*')
      .eq('id', storyId)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !story) {
      throw new Error('Story not found or unauthorized');
    }

    // Update status to processing
    await supabaseClient
      .from('stories')
      .update({ status: 'processing' })
      .eq('id', storyId);

    console.log(`[generate-story-audio] Story emotion: ${story.emotion}, word count: ${story.word_count}`);

    // MOCK: Simulate AI processing delay (2-3 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));

    // MOCK: Simulate voice synthesis
    console.log('[generate-story-audio] Mock: Generating expressive narration...');
    
    // MOCK: Detect narrator and characters from content
    const narratorDetected = story.content.includes('"') ? 'Third-person narrator' : 'First-person narrator';
    const characters = extractMockCharacters(story.content);
    
    // MOCK: Select music theme based on emotion
    const musicTheme = getMusicThemeForEmotion(story.emotion);
    
    // MOCK: Calculate estimated duration (rough estimate: 150 words per minute)
    const estimatedDuration = Math.ceil((story.word_count || 500) / 150 * 60);

    console.log(`[generate-story-audio] Mock results - Narrator: ${narratorDetected}, Characters: ${characters.length}, Duration: ${estimatedDuration}s`);

    // Update story with mock results
    const { error: updateError } = await supabaseClient
      .from('stories')
      .update({
        status: 'completed',
        narrator_detected: narratorDetected,
        characters: characters,
        music_theme: musicTheme,
        duration_seconds: estimatedDuration,
        // In real implementation, this would be the URL to generated audio in storage
        audio_url: null, // Will be added in V1 with real AI
      })
      .eq('id', storyId);

    if (updateError) {
      throw updateError;
    }

    console.log(`[generate-story-audio] Successfully completed story: ${storyId}`);

    return new Response(
      JSON.stringify({
        success: true,
        storyId,
        message: 'Story processed successfully (mock)',
        details: {
          narrator: narratorDetected,
          characters,
          musicTheme,
          duration: estimatedDuration,
        },
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('[generate-story-audio] Error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error instanceof Error && error.message === 'Unauthorized' ? 401 : 500,
      }
    );
  }
});

// Helper functions for mock processing
function extractMockCharacters(content: string): string[] {
  // Simple mock: extract quoted dialogue as character indicators
  const quotes = content.match(/"([^"]+)"/g) || [];
  const uniqueCharacters = new Set<string>();
  
  // Mock character names based on story patterns
  if (quotes.length > 0) uniqueCharacters.add('Character 1');
  if (quotes.length > 3) uniqueCharacters.add('Character 2');
  if (quotes.length > 6) uniqueCharacters.add('Character 3');
  
  return Array.from(uniqueCharacters);
}

function getMusicThemeForEmotion(emotion: string): string {
  const themes: Record<string, string> = {
    calm: 'Lullaby Garden',
    gentle: 'Cozy Afternoon',
    playful: 'Sunny Parade',
    adventure: 'Forest Quest',
    heartfelt: 'Home Again',
  };
  
  return themes[emotion] || 'Gentle Breeze';
}
