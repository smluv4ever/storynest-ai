import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { BookOpen, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-warm flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-fredoka text-2xl font-bold">StoryNest</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="font-inter text-foreground/70 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/pricing" className="font-inter text-foreground/70 hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link to="/dashboard" className="font-inter text-foreground/70 hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link to="/library" className="font-inter text-foreground/70 hover:text-foreground transition-colors">
              Library
            </Link>
            <Button className="bg-gradient-warm hover:opacity-90 rounded-xl font-fredoka">
              Get Started
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <Menu className="w-6 h-6" />
          </Button>
        </div>

        {isOpen && <div className="md:hidden py-4 space-y-4 border-t border-border">
            <Link to="/" className="block font-inter text-foreground/70 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/pricing" className="block font-inter text-foreground/70 hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link to="/dashboard" className="block font-inter text-foreground/70 hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link to="/library" className="block font-inter text-foreground/70 hover:text-foreground transition-colors">
              Library
            </Link>
            <Button className="w-full bg-gradient-warm hover:opacity-90 rounded-xl font-fredoka">
              Get Started
            </Button>
          </div>}
      </Container>
    </nav>;
};