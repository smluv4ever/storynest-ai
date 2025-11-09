import { EmotionMode } from '@/types/Story';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const emotionOptions: { value: EmotionMode | 'all'; label: string; emoji: string }[] = [
  { value: 'all', label: 'All', emoji: '✨' },
  { value: 'calm', label: 'Calm', emoji: '🌙' },
  { value: 'gentle', label: 'Gentle', emoji: '☀️' },
  { value: 'playful', label: 'Playful', emoji: '🌈' },
  { value: 'adventure', label: 'Adventure', emoji: '🚀' },
  { value: 'heartfelt', label: 'Heartfelt', emoji: '💖' },
];

interface EmotionFilterProps {
  selected: EmotionMode | 'all';
  onSelect: (emotion: EmotionMode | 'all') => void;
  counts?: Record<EmotionMode | 'all', number>;
}

export function EmotionFilter({ selected, onSelect, counts }: EmotionFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {emotionOptions.map((option) => {
        const isSelected = selected === option.value;
        const count = counts?.[option.value] || 0;
        
        return (
          <Button
            key={option.value}
            variant={isSelected ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSelect(option.value)}
            className="gap-2"
          >
            <span>{option.emoji}</span>
            <span>{option.label}</span>
            {counts && count > 0 && (
              <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
                {count}
              </Badge>
            )}
          </Button>
        );
      })}
    </div>
  );
}
