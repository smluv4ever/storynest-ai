import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StoryUploader } from '@/components/stories/StoryUploader';
import { EmotionalDial } from '@/components/stories/EmotionalDial';
import { EmotionMode } from '@/types/Story';
import { toast } from 'sonner';
import { z } from 'zod';
import { Wand2 } from 'lucide-react';

const storyInputSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200, 'Title must be under 200 characters'),
  content: z.string().trim().max(250000, 'Story is too long'),
  emotion: z.enum(['calm', 'gentle', 'playful', 'adventure', 'heartfelt']),
  hasFile: z.boolean(),
}).refine(
  (data) => data.hasFile || data.content.length >= 50,
  { message: 'Either upload a file or enter at least 50 characters of story content', path: ['content'] }
);

export default function Generate() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState<EmotionMode>('gentle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please sign in to generate stories');
      navigate('/auth');
      return;
    }

    try {
      // Validate input
      const validated = storyInputSchema.parse({ 
        title, 
        content, 
        emotion,
        hasFile: !!selectedFile 
      });
      setLoading(true);

      // Calculate word count
      const wordCount = validated.content.trim().split(/\s+/).filter(Boolean).length;

      // Create story in database
      const { data: story, error } = await supabase
        .from('stories')
        .insert({
          user_id: user.id,
          title: validated.title,
          content: validated.content,
          emotion: validated.emotion,
          word_count: wordCount,
          status: 'draft',
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Story created! Generating audio...');

      // Call edge function to process story
      const { error: generateError } = await supabase.functions.invoke('generate-story-audio', {
        body: { storyId: story.id },
      });

      if (generateError) {
        console.error('Generation error:', generateError);
        toast.error('Audio generation failed, but story was saved');
      } else {
        toast.success('Story audio generated successfully!');
      }
      
      // Reset form
      setTitle('');
      setContent('');
      setEmotion('gentle');
      setSelectedFile(null);

      // Navigate to library
      setTimeout(() => navigate('/library'), 1000);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Failed to save story');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container max-w-4xl py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-fredoka flex items-center gap-2">
              <Wand2 className="h-8 w-8 text-primary" />
              Generate Story
            </CardTitle>
            <CardDescription>
              Create a magical audio story with expressive narration and adaptive music
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-8">
              {/* Story Input */}
              <StoryUploader
                title={title}
                content={content}
                onTitleChange={setTitle}
                onContentChange={setContent}
                onFileSelect={setSelectedFile}
              />

              {/* Emotional Dial */}
              <EmotionalDial value={emotion} onChange={setEmotion} />

              {/* Generate Button */}
              <div className="flex gap-3">
                <Button
                  type="submit"
                  size="lg"
                  disabled={
                    loading || 
                    !title.trim() || 
                    (!selectedFile && content.trim().split(/\s+/).filter(Boolean).length < 50)
                  }
                  className="flex-1"
                >
                  {loading ? 'Saving...' : 'Generate Story'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/library')}
                >
                  Cancel
                </Button>
              </div>

              {/* Info */}
              <p className="text-xs text-muted-foreground text-center">
                Mock AI processing simulates voice synthesis and music selection. Real AI integration coming in V1.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
