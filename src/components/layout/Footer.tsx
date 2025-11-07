import { Container } from "@/components/ui/container";
import { BookOpen, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-muted py-12 border-t border-border">
      <Container>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-warm flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-fredoka text-xl font-bold">StoryNest</span>
            </div>
            <p className="text-sm text-muted-foreground font-inter">
              Bringing stories to life with warmth, wonder, and adaptive soundscapes.
            </p>
          </div>

          <div>
            <h4 className="font-fredoka font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-inter">
              <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Examples</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-fredoka font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-inter">
              <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-fredoka font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-inter">
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground font-inter">
            © 2024 StoryNest. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground font-inter flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-accent fill-accent" /> for storytellers everywhere
          </p>
        </div>
      </Container>
    </footer>
  );
};
