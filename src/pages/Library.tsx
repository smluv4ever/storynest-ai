import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Container } from '@/components/ui/container';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Story, EmotionMode } from '@/types/Story';
import { BookOpen, Wand2, ArrowUpDown, Search } from 'lucide-react';
import { toast } from 'sonner';
import { EmotionFilter } from '@/components/stories/EmotionFilter';
import { StoryCard } from '@/components/stories/StoryCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SortOption = 'newest' | 'oldest' | 'title';

export default function Library() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionMode | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');

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

  // Calculate emotion counts
  const emotionCounts = useMemo(() => {
    const counts: Record<EmotionMode | 'all', number> = {
      all: stories.length,
      calm: 0,
      gentle: 0,
      playful: 0,
      adventure: 0,
      heartfelt: 0,
    };
    
    stories.forEach((story) => {
      counts[story.emotion]++;
    });
    
    return counts;
  }, [stories]);

  // Filter and sort stories
  const filteredAndSortedStories = useMemo(() => {
    let filtered = selectedEmotion === 'all' 
      ? stories 
      : stories.filter(story => story.emotion === selectedEmotion);
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(story => 
        story.title.toLowerCase().includes(query) ||
        story.content.toLowerCase().includes(query)
      );
    }
    
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    
    return sorted;
  }, [stories, selectedEmotion, sortBy, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      <Container className="py-12">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="font-fredoka text-4xl font-bold">Your Library</h1>
            <Button onClick={() => navigate('/generate')} className="gap-2">
              <Wand2 className="h-4 w-4" />
              Create New Story
            </Button>
          </div>

          {/* Search Bar */}
          {stories.length > 0 && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search stories by title or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          )}

          {/* Filters and Sort */}
          {stories.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="w-full sm:w-auto">
                <EmotionFilter
                  selected={selectedEmotion}
                  onSelect={setSelectedEmotion}
                  counts={emotionCounts}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="title">Title (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
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
        ) : filteredAndSortedStories.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground font-inter mb-2">
                {searchQuery.trim() ? 'No stories match your search.' : 'No stories found with this filter.'}
              </p>
              <p className="text-sm text-muted-foreground">
                {searchQuery.trim() ? 'Try a different search term.' : 'Try a different emotion filter!'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
