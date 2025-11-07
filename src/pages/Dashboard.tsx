import { Container } from "@/components/ui/container";
import { Navbar } from "@/components/layout/Navbar";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Container className="py-12">
        <h1 className="font-fredoka text-4xl font-bold mb-8">Dashboard</h1>
        <div className="bg-card rounded-2xl border-2 border-border p-12 text-center">
          <p className="text-muted-foreground font-inter">
            Dashboard coming soon! This is where you'll upload and manage your stories.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
