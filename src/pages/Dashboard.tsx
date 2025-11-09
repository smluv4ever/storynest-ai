import { useEffect, useState } from 'react';
import { Container } from "@/components/ui/container";
import { Navbar } from "@/components/layout/Navbar";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Story } from '@/types/Story';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { RecentStories } from '@/components/dashboard/RecentStories';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const { user } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscriptionTier] = useState<'free' | 'pro' | 'premium'>('free'); // TODO: Get from actual subscription

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
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      
      // Map the data to ensure proper types
      const mappedStories: Story[] = (data || []).map(story => ({
        ...story,
        characters: (story.characters as any[])?.filter((c): c is string => typeof c === 'string') || [],
        status: (story.status as 'draft' | 'processing' | 'completed' | 'failed') || 'draft'
      }));
      
      setStories(mappedStories);
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const totalStories = stories.length;
  const totalListeningMinutes = Math.floor(
    stories.reduce((sum, story) => sum + (story.duration_seconds || 0), 0) / 60
  );
  const wordsUsed = stories.reduce((sum, story) => sum + (story.word_count || 0), 0);
  const wordsLimit = subscriptionTier === 'free' ? 50000 : subscriptionTier === 'pro' ? 500000 : Infinity;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <Container className="py-12 space-y-8">
          <Skeleton className="h-12 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Container className="py-12 space-y-8">
        <div>
          <h1 className="font-fredoka text-4xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Here's an overview of your story collection.
          </p>
        </div>

        <StatsCards
          totalStories={totalStories}
          totalListeningMinutes={totalListeningMinutes}
          wordsUsed={wordsUsed}
          wordsLimit={wordsLimit}
          subscriptionTier={subscriptionTier}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentStories stories={stories} />
          </div>
          <div>
            <QuickActions subscriptionTier={subscriptionTier} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
