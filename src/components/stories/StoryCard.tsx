import { Story } from '@/types/Story';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Music } from 'lucide-react';
import { PreviewPlayer } from '@/components/audio/PreviewPlayer';

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

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const formatDuration = (seconds: number | null) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
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

        {/* Audio Player - shown only for completed stories */}
        {story.status === 'completed' && (
          <PreviewPlayer 
            audioUrl={story.audio_url}
            backgroundMusicEnabled={story.background_music_enabled}
          />
        )}

        {/* Story Metadata */}
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
      </CardContent>
    </Card>
  );
}
