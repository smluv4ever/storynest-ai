import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out StoryNest",
    features: [
      "3 story generations per month",
      "All 5 emotional modes",
      "Voice + music playback",
      "3 free replays per story",
      "Basic library access",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Storyteller",
    price: "$9.99",
    period: "per month",
    description: "For families who love stories",
    features: [
      "Unlimited story generations",
      "All emotional modes",
      "Voice + music + sound effects",
      "Unlimited story replays",
      "Full library with sorting",
      "Priority audio processing",
      "Download audio files",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Educator",
    price: "$24.99",
    period: "per month",
    description: "For teachers and classrooms",
    features: [
      "Everything in Storyteller",
      "Voice cloning (up to 5 voices)",
      "Character voice assignment",
      "Classroom sharing features",
      "Analytics dashboard",
      "Bulk story upload",
      "Custom music library",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-24 bg-gradient-hero">
          <Container>
            <div className="text-center mb-16 space-y-4">
              <h1 className="font-fredoka text-5xl sm:text-6xl font-bold">
                Choose Your{" "}
                <span className="bg-gradient-warm bg-clip-text text-transparent">
                  Story Plan
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-inter">
                Start free, upgrade anytime. All plans include our magical voice & music experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`p-8 space-y-6 relative ${
                    plan.highlighted
                      ? "border-primary shadow-soft-lg scale-105"
                      : "border-border"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-warm text-primary-foreground px-4 py-1 rounded-full text-sm font-fredoka font-semibold">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <h3 className="font-fredoka text-2xl font-bold">{plan.name}</h3>
                    <p className="text-muted-foreground font-inter text-sm">
                      {plan.description}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-fredoka text-5xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground font-inter">/{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="font-inter text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full rounded-xl font-fredoka ${
                      plan.highlighted
                        ? "bg-gradient-warm hover:opacity-90"
                        : ""
                    }`}
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Card>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-muted-foreground font-inter">
                All plans include a 14-day free trial. No credit card required to start.
              </p>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
