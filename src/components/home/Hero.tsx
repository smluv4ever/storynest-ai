import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image.png";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center py-12">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">New: Adaptive Soundscapes</span>
            </div>
            
            <h1 className="font-fredoka text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Stories that{" "}
              <span className="bg-gradient-warm bg-clip-text text-transparent">
                speak & sing
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl font-inter">
              Upload your story, and StoryNest brings it to life with expressive voices and adaptive soundscapes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-gradient-warm hover:opacity-90 transition-opacity text-lg px-8 py-6 rounded-2xl shadow-soft-md font-fredoka"
              >
                Create Your First Talking Story
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 rounded-2xl border-2 font-fredoka hover:bg-card/50"
              >
                Listen to Examples
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-warm opacity-20 blur-3xl rounded-full"></div>
            <img 
              src={heroImage} 
              alt="Magical storybook library with floating books and musical notes" 
              className="relative rounded-3xl shadow-soft-lg w-full h-auto animate-float"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
