import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { BookOpen, Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

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
            {user && (
              <>
                <Link to="/dashboard" className="font-inter text-foreground/70 hover:text-foreground transition-colors">
                  Dashboard
                </Link>
                <Link to="/generate" className="font-inter text-foreground/70 hover:text-foreground transition-colors">
                  Generate
                </Link>
                <Link to="/library" className="font-inter text-foreground/70 hover:text-foreground transition-colors">
                  Library
                </Link>
              </>
            )}
            {user ? (
              <Button onClick={handleSignOut} variant="outline" className="rounded-xl font-fredoka">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <Button asChild className="bg-gradient-warm hover:opacity-90 rounded-xl font-fredoka">
                <Link to="/auth">Get Started</Link>
              </Button>
            )}
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
            {user && (
              <>
                <Link to="/dashboard" className="block font-inter text-foreground/70 hover:text-foreground transition-colors">
                  Dashboard
                </Link>
                <Link to="/generate" className="block font-inter text-foreground/70 hover:text-foreground transition-colors">
                  Generate
                </Link>
                <Link to="/library" className="block font-inter text-foreground/70 hover:text-foreground transition-colors">
                  Library
                </Link>
              </>
            )}
            {user ? (
              <Button onClick={handleSignOut} variant="outline" className="w-full rounded-xl font-fredoka">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <Button asChild className="w-full bg-gradient-warm hover:opacity-90 rounded-xl font-fredoka">
                <Link to="/auth">Get Started</Link>
              </Button>
            )}
          </div>}
      </Container>
    </nav>;
};