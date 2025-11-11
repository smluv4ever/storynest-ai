import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Heart, Wand2, Volume2, Repeat, Palette } from "lucide-react";
const benefits = [{
  icon: Volume2,
  title: "Expressive AI Voices",
  description: "Characters come alive with human-like emotion, tone, and personality tailored to your story."
}, {
  icon: Music,
  title: "Adaptive Soundscapes",
  description: "Background music and effects automatically match your story's emotional tone and atmosphere."
}, {
  icon: Repeat,
  title: "Story Replay Mode",
  description: "Each replay brings subtle variations in emotion and pacing—just like a real storyteller."
}, {
  icon: Palette,
  title: "Emotional Dial",
  description: "Fine-tune the energy from calm bedtime stories to exciting adventures with one simple control."
}, {
  icon: Wand2,
  title: "Smart Character Detection",
  description: "AI automatically identifies narrators and characters, assigning perfect voices to each role."
}, {
  icon: Heart,
  title: "Voice Cloning",
  description: "Record your own voice or a loved one's to create personalized, heartfelt narrations."
}];
export const Benefits = () => {
  return <section className="py-24 bg-background">
      <Container>
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-fredoka text-4xl sm:text-5xl font-bold">
            Why families love{" "}
            <span className="bg-gradient-warm bg-clip-text text-transparent">StoryNest</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-inter">Each story burst to life with expressive voices and captivating music</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return <Card key={index} className="border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-soft-md rounded-2xl bg-card">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-warm flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-fredoka text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground font-inter leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>;
        })}
        </div>
      </Container>
    </section>;
};