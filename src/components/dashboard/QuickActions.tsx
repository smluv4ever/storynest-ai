import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, BookOpen, Settings, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickActionsProps {
  subscriptionTier: 'free' | 'pro' | 'premium';
}

export function QuickActions({ subscriptionTier }: QuickActionsProps) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-fredoka">Quick Actions</CardTitle>
        <CardDescription>Jump to your most used features</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          size="lg"
          className="h-auto flex-col gap-2 py-6"
          onClick={() => navigate('/generate')}
        >
          <Sparkles className="h-6 w-6" />
          <div className="text-center">
            <div className="font-semibold">Create Story</div>
            <div className="text-xs opacity-80">Generate new audio story</div>
          </div>
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="h-auto flex-col gap-2 py-6"
          onClick={() => navigate('/library')}
        >
          <BookOpen className="h-6 w-6" />
          <div className="text-center">
            <div className="font-semibold">Story Library</div>
            <div className="text-xs opacity-80">Browse your collection</div>
          </div>
        </Button>

        {subscriptionTier === 'free' && (
          <Button
            variant="default"
            size="lg"
            className="h-auto flex-col gap-2 py-6 bg-gradient-to-r from-primary to-accent"
            onClick={() => navigate('/pricing')}
          >
            <Crown className="h-6 w-6" />
            <div className="text-center">
              <div className="font-semibold">Upgrade</div>
              <div className="text-xs opacity-80">Unlock premium features</div>
            </div>
          </Button>
        )}

        <Button
          variant="outline"
          size="lg"
          className="h-auto flex-col gap-2 py-6"
          onClick={() => navigate('/library')}
        >
          <Settings className="h-6 w-6" />
          <div className="text-center">
            <div className="font-semibold">Settings</div>
            <div className="text-xs opacity-80">Manage your account</div>
          </div>
        </Button>
      </CardContent>
    </Card>
  );
}
