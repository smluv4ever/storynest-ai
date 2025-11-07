import { Container } from "@/components/ui/container";
import { Navbar } from "@/components/layout/Navbar";

const Library = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Container className="py-12">
        <h1 className="font-fredoka text-4xl font-bold mb-8">Your Library</h1>
        <div className="bg-card rounded-2xl border-2 border-border p-12 text-center">
          <p className="text-muted-foreground font-inter">
            Your story library will appear here. Generate your first story to get started!
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Library;
