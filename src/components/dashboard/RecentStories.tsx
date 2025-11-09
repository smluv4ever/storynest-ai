import { Story } from '@/types/Story';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

interface RecentStoriesProps {
  stories: Story[];
}

export function RecentStories({ stories }: RecentStoriesProps) {
  const navigate = useNavigate();

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (stories.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-fredoka">Recent Stories</CardTitle>
          <CardDescription>Your latest generated stories</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">No stories yet</p>
          <Button onClick={() => navigate('/generate')}>
            Create Your First Story
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-fredoka">Recent Stories</CardTitle>
          <CardDescription>Your latest generated stories</CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate('/library')}>
          View All
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
              onClick={() => navigate('/library')}
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <span className="text-3xl shrink-0">{emotionEmojis[story.emotion]}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{story.title}</h4>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
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
                </div>
              </div>
              <Badge variant={statusColors[story.status]} className="shrink-0">
                {story.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
