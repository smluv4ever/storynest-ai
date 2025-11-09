import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Container } from '@/components/ui/container';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Story } from '@/types/Story';
import { BookOpen, Clock, Music, Wand2 } from 'lucide-react';
import { toast } from 'sonner';

const emotionEmojis: Record<string, string> = {
  calm: '🌙',
  gentle: '☀️',
  playful: '🌈',
  adventure: '🚀',
  heartfelt: '💖',
};

const statusColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  draft: 'outline',
  processing: 'secondary',
  completed: 'default',
  failed: 'destructive',
};

export default function Library() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStories();
    }
  }, [user]);

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStories((data || []) as Story[]);
    } catch (error) {
      console.error('Error fetching stories:', error);
      toast.error('Failed to load stories');
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      <Container className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-fredoka text-4xl font-bold">Your Library</h1>
          <Button onClick={() => navigate('/generate')} className="gap-2">
            <Wand2 className="h-4 w-4" />
            Create New Story
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading stories...</p>
          </div>
        ) : stories.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground font-inter mb-4">
                Your story library is empty. Generate your first story to get started!
              </p>
              <Button onClick={() => navigate('/generate')}>
                Create Your First Story
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <Card key={story.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-fredoka line-clamp-2">
                        {story.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {new Date(story.created_at).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <span className="text-3xl">{emotionEmojis[story.emotion]}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={statusColors[story.status]}>
                      {story.status}
                    </Badge>
                    {story.music_theme && (
                      <Badge variant="outline" className="gap-1">
                        <Music className="h-3 w-3" />
                        {story.music_theme}
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {story.content}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {story.word_count?.toLocaleString()} words
                    </span>
                    {story.duration_seconds && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDuration(story.duration_seconds)}
                      </span>
                    )}
                  </div>

                  {story.narrator_detected && (
                    <p className="text-xs text-muted-foreground">
                      Narrator: {story.narrator_detected}
                    </p>
                  )}

                  {story.characters && story.characters.length > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Characters: {story.characters.join(', ')}
                    </p>
                  )}

                  <div className="pt-2">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      disabled={story.status !== 'completed'}
                    >
                      {story.status === 'completed' ? 'Play Story' : 'Processing...'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
