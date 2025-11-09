import { Story } from '@/types/Story';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Crown } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ReplayIndicatorProps {
  story: Story;
  compact?: boolean;
}

export function ReplayIndicator({ story, compact = false }: ReplayIndicatorProps) {
  const replaysRemaining = story.max_free_replays - story.replay_count;
  const hasReplaysLeft = replaysRemaining > 0;
  
  if (compact) {
    return (
      <Badge 
        variant={hasReplaysLeft ? "outline" : "secondary"}
        className="gap-1"
      >
        <RotateCcw className="h-3 w-3" />
        {replaysRemaining} replays left
      </Badge>
    );
  }

  if (!hasReplaysLeft) {
    return (
      <Alert className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
        <Crown className="h-4 w-4 text-primary" />
        <AlertDescription className="flex items-center justify-between gap-4">
          <div>
            <p className="font-medium text-sm">No free replays remaining</p>
            <p className="text-xs text-muted-foreground mt-1">
              Upgrade to Premium for unlimited regenerations with subtle variations
            </p>
          </div>
          <Button size="sm" className="shrink-0">
            Upgrade
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <RotateCcw className="h-4 w-4 text-muted-foreground" />
      <span className="text-muted-foreground">
        <span className="font-medium text-foreground">{replaysRemaining}</span>
        {' '}free {replaysRemaining === 1 ? 'replay' : 'replays'} remaining
      </span>
    </div>
  );
}
