import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24 bg-background">
      <Container>
        <div className="rounded-3xl bg-gradient-warm p-12 md:p-16 text-center space-y-8 shadow-soft-lg">
          <h2 className="font-fredoka text-4xl sm:text-5xl font-bold text-primary-foreground">
            Ready to bring your stories to life?
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto font-inter">
            Join thousands of families creating magical story moments with StoryNest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              variant="outline"
              className="bg-background/95 hover:bg-background text-foreground border-0 text-lg px-8 py-6 rounded-2xl shadow-soft-md font-fredoka group"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="bg-transparent hover:bg-background/10 text-primary-foreground border-2 border-background/50 text-lg px-8 py-6 rounded-2xl font-fredoka"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};
