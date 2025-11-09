import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Story } from '@/types/Story';
import { ReplayIndicator } from '@/components/stories/ReplayIndicator';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PreviewPlayerProps {
  audioUrl: string | null;
  backgroundMusicEnabled?: boolean;
  story?: Story;
  onPlayStateChange?: (isPlaying: boolean) => void;
  onReplayRequested?: () => void;
}

export function PreviewPlayer({ 
  audioUrl, 
  backgroundMusicEnabled = true,
  story,
  onPlayStateChange,
  onReplayRequested
}: PreviewPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(backgroundMusicEnabled);

  // Placeholder audio for stories without generated audio yet
  const placeholderAudio = 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav';
  const effectiveAudioUrl = audioUrl || placeholderAudio;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onPlayStateChange]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      onPlayStateChange?.(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        onPlayStateChange?.(true);
      } catch (error) {
        console.error('Playback error:', error);
      }
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleReplay = async () => {
    if (!story) return;
    
    const replaysRemaining = story.max_free_replays - story.replay_count;
    
    if (replaysRemaining <= 0) {
      toast.error('No free replays remaining', {
        description: 'Upgrade to Premium for unlimited regenerations'
      });
      return;
    }

    try {
      // Increment replay count
      const { error } = await supabase
        .from('stories')
        .update({ replay_count: story.replay_count + 1 })
        .eq('id', story.id);

      if (error) throw error;

      toast.success('Regenerating story...', {
        description: `${replaysRemaining - 1} free replays remaining`
      });

      onReplayRequested?.();
    } catch (error) {
      console.error('Replay error:', error);
      toast.error('Failed to regenerate story');
    }
  };

  const formatTime = (seconds: number) => {
    if (!isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!audioUrl) {
    return (
      <div className="text-center py-4 text-sm text-muted-foreground">
        Audio generation in progress... Player will be available once complete.
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 p-4 bg-card border rounded-lg">
      <audio ref={audioRef} src={effectiveAudioUrl} preload="metadata" />
      
      {/* Replay Indicator - Full version */}
      {story && <ReplayIndicator story={story} />}
      
      {/* Progress Bar */}
      <div className="space-y-2">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSeek}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <Button
          variant="default"
          size="icon"
          onClick={togglePlay}
          className="h-12 w-12 rounded-full"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </Button>

        {/* Volume Control */}
        <div className="flex items-center gap-2 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="h-8 w-8"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-24"
          />
        </div>

        {/* Music Toggle */}
        <div className="flex items-center gap-2">
          <Switch
            id="music-toggle"
            checked={musicEnabled}
            onCheckedChange={setMusicEnabled}
          />
          <Label htmlFor="music-toggle" className="text-sm cursor-pointer">
            Background Music
          </Label>
        </div>

        {/* Replay Button */}
        {story && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleReplay}
            disabled={story.max_free_replays - story.replay_count <= 0}
            className="gap-2 ml-auto"
          >
            <RotateCcw className="h-4 w-4" />
            Regenerate
          </Button>
        )}
      </div>

      {/* Info */}
      {!audioUrl && (
        <p className="text-xs text-muted-foreground text-center">
          Playing placeholder audio (real audio generation coming in V1)
        </p>
      )}
    </div>
  );
}
