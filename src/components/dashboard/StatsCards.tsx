import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, Sparkles, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface StatsCardsProps {
  totalStories: number;
  totalListeningMinutes: number;
  wordsUsed: number;
  wordsLimit: number;
  subscriptionTier: 'free' | 'pro' | 'premium';
}

const tierInfo = {
  free: { 
    label: 'Free', 
    color: 'default' as const,
    wordsLimit: 50000,
    replaysPerStory: 3
  },
  pro: { 
    label: 'Pro', 
    color: 'secondary' as const,
    wordsLimit: 500000,
    replaysPerStory: 10
  },
  premium: { 
    label: 'Premium', 
    color: 'default' as const,
    wordsLimit: Infinity,
    replaysPerStory: Infinity
  }
};

export function StatsCards({
  totalStories,
  totalListeningMinutes,
  wordsUsed,
  wordsLimit,
  subscriptionTier
}: StatsCardsProps) {
  const tier = tierInfo[subscriptionTier];
  const wordsPercentage = wordsLimit === Infinity ? 0 : (wordsUsed / wordsLimit) * 100;
  const formatNumber = (num: number) => num.toLocaleString();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Subscription Tier Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Subscription</CardTitle>
          <Trophy className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Badge variant={tier.color} className="text-lg px-3 py-1">
              {tier.label}
            </Badge>
            {subscriptionTier !== 'premium' && (
              <p className="text-xs text-muted-foreground">
                {tier.replaysPerStory} replays per story
              </p>
            )}
            {subscriptionTier === 'premium' && (
              <p className="text-xs text-muted-foreground">
                Unlimited everything ✨
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Total Stories Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Stories</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-fredoka">{totalStories}</div>
          <p className="text-xs text-muted-foreground">
            Stories generated
          </p>
        </CardContent>
      </Card>

      {/* Listening Time Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Listening Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-fredoka">
            {Math.floor(totalListeningMinutes / 60)}h {totalListeningMinutes % 60}m
          </div>
          <p className="text-xs text-muted-foreground">
            Total audio duration
          </p>
        </CardContent>
      </Card>

      {/* Words Usage Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Words Used</CardTitle>
          <Sparkles className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-fredoka">
            {formatNumber(wordsUsed)}
            {wordsLimit !== Infinity && (
              <span className="text-sm text-muted-foreground font-normal">
                {' '}/ {formatNumber(wordsLimit)}
              </span>
            )}
          </div>
          {wordsLimit !== Infinity ? (
            <div className="space-y-1 mt-2">
              <Progress value={wordsPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {formatNumber(wordsLimit - wordsUsed)} words remaining
              </p>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              Unlimited usage ✨
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
