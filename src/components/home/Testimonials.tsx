import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Parent of two",
    content: "My kids request StoryNest every bedtime now. The voices are so expressive, and the background music makes it feel like we're in the story together.",
    emoji: "🌙",
  },
  {
    name: "Michael Chen",
    role: "Elementary Teacher",
    content: "I use StoryNest to bring classroom readings to life. The emotional dial helps me adjust the energy for different lessons—calm for reflection, adventure for exploration.",
    emoji: "📚",
  },
  {
    name: "Emma Rodriguez",
    role: "Busy mom of three",
    content: "Being able to clone my voice means the kids can hear me reading even when I'm traveling. It's like a piece of home wherever they are.",
    emoji: "💖",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-calm">
      <Container>
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-fredoka text-4xl sm:text-5xl font-bold text-background">
            Stories from our community
          </h2>
          <p className="text-xl text-background/80 max-w-2xl mx-auto font-inter">
            Discover how families and educators are using StoryNest to create magical moments.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="border-0 shadow-soft-lg rounded-2xl bg-card hover:scale-105 transition-transform duration-300"
            >
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{testimonial.emoji}</div>
                  <div>
                    <h4 className="font-fredoka font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground font-inter">{testimonial.role}</p>
                  </div>
                </div>
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                  <p className="text-muted-foreground font-inter leading-relaxed pl-6">
                    {testimonial.content}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
