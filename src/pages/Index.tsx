import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Users, BookOpen, TrendingUp } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Calendar,
      title: "AI-Powered Generation",
      description: "Automatically create optimized timetables using advanced algorithms",
    },
    {
      icon: Users,
      title: "Faculty Management",
      description: "Efficiently manage faculty workloads and preferences",
    },
    {
      icon: BookOpen,
      title: "Course Planning",
      description: "Handle complex course structures and prerequisites",
    },
    {
      icon: TrendingUp,
      title: "Resource Optimization",
      description: "Maximize utilization of rooms and resources",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-16">
          <Logo size="lg" />
          <Link to="/login">
            <Button>Sign In</Button>
          </Link>
        </header>

        <div className="max-w-4xl mx-auto text-center space-y-8 mb-16">
          <h1 className="text-5xl font-heading font-bold tracking-tight">
            Streamline Academic Timetable Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ClassCraft is an AI-powered platform designed for higher education institutions
            to create conflict-free, optimized schedules for NEP 2020 compliant programs.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="gap-2">
                Get Started
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="gap-2">
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card rounded-lg p-6 border shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-heading font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
