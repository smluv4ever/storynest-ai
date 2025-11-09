import { EmotionMode } from '@/types/Story';

interface EmotionalDialProps {
  value: EmotionMode;
  onChange: (emotion: EmotionMode) => void;
}

const emotions: { mode: EmotionMode; emoji: string; label: string; description: string }[] = [
  { mode: 'calm', emoji: '🌙', label: 'Calm', description: 'Lullaby bedtime feel' },
  { mode: 'gentle', emoji: '☀️', label: 'Gentle', description: 'Balanced, warm tone' },
  { mode: 'playful', emoji: '🌈', label: 'Playful', description: 'Expressive, fun' },
  { mode: 'adventure', emoji: '🚀', label: 'Adventure', description: 'Cinematic, dynamic' },
  { mode: 'heartfelt', emoji: '💖', label: 'Heartfelt', description: 'Emotional sincerity' },
];

export function EmotionalDial({ value, onChange }: EmotionalDialProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Story Emotion</label>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {emotions.map((emotion) => (
          <button
            key={emotion.mode}
            type="button"
            onClick={() => onChange(emotion.mode)}
            className={`
              flex flex-col items-center p-4 rounded-lg border-2 transition-all
              hover:scale-105 hover:shadow-md
              ${value === emotion.mode 
                ? 'border-primary bg-primary/10 shadow-lg' 
                : 'border-border bg-card hover:border-primary/50'
              }
            `}
          >
            <span className="text-3xl mb-2">{emotion.emoji}</span>
            <span className="font-medium text-sm">{emotion.label}</span>
            <span className="text-xs text-muted-foreground text-center mt-1">
              {emotion.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
