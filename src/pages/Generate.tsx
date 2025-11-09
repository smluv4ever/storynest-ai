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
  content: z.string().trim().min(50, 'Story must be at least 50 characters').max(250000, 'Story is too long'),
  emotion: z.enum(['calm', 'gentle', 'playful', 'adventure', 'heartfelt']),
});

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
      const validated = storyInputSchema.parse({ title, content, emotion });
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

      toast.success('Story saved! Generation will be added in next phase.');
      
      // Reset form
      setTitle('');
      setContent('');
      setEmotion('gentle');
      setSelectedFile(null);

      // Navigate to library
      navigate('/library');
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
                  disabled={loading || !title.trim() || !content.trim()}
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
                Audio generation will be implemented in the next phase. For now, your story will be saved to your library.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
