
import { Button } from "@/components/ui/button";
import { ChevronRight, BookOpen, CheckCircle, BookUser, BrainCog, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center">
              <BookUser className="text-primary-foreground h-5 w-5" />
            </div>
            <h1 className="text-xl font-semibold">TeachAssist</h1>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex space-x-6">
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How it works</a>
              <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Testimonials</a>
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button onClick={() => navigate("/dashboard")} variant="default" size="sm">
                Enter Platform
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 animate-fade-in">
            <div className="inline-block rounded-full bg-accent px-3 py-1 text-sm font-medium">
              AI-Powered Education
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-primary">Empower</span> your teaching with AI assistance
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Transform your teaching experience with our AI-powered platform. Automate grading, 
              personalize feedback, and unlock more time for what matters most: your students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button onClick={() => navigate("/dashboard")} size="lg" className="rounded-xl">
                Get Started <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl">
                See How It Works
              </Button>
            </div>
          </div>
          <div className="lg:col-span-6 animate-fade-in animation-delay-200">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
              <div className="absolute top-8 left-8 right-8 bottom-8 bg-card/80 backdrop-blur-md rounded-2xl border border-border shadow-xl p-6 md:p-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <BrainCog className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">AI Feedback Analysis</h3>
                      <p className="text-sm text-muted-foreground">Processing student assignments...</p>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-primary animate-pulse-subtle rounded-full"></div>
                  </div>
                  <div className="divide-y">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="py-3 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            <span className="text-xs font-medium">S{item}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">Student Assignment #{item}</span>
                            <span className="text-xs text-muted-foreground">
                              {item === 3 ? "Processing..." : "Analyzed"}
                            </span>
                          </div>
                        </div>
                        <div>
                          {item < 3 ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <Clock className="h-5 w-5 text-amber-500 animate-pulse" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features for Educators</h2>
            <p className="text-muted-foreground">
              Our platform offers a comprehensive set of tools designed specifically for teachers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Assignment Evaluation",
                description: "Upload assignments and tests to receive AI-generated feedback and insights",
                icon: FileIcon,
              },
              {
                title: "Personalized Feedback",
                description: "Track student performance with detailed analytics and recommendations",
                icon: ChartIcon,
              },
              {
                title: "AI Teaching Assistant",
                description: "Get help with research, grading and administrative tasks",
                icon: AiIcon,
              },
              {
                title: "Time-Saving Automation",
                description: "Automate repetitive tasks and focus more on teaching",
                icon: ClockIcon,
              },
              {
                title: "Student Insights",
                description: "Gain deeper understanding of student strengths and areas for improvement",
                icon: InsightIcon,
              },
              {
                title: "Resource Generation",
                description: "Create customized learning materials tailored to your class",
                icon: ResourceIcon,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-background rounded-xl border border-border p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/50 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to transform your teaching?</h2>
              <p className="text-lg mb-8">
                Join thousands of educators who have enhanced their teaching with TeachAssist. 
                Get started today and experience the difference.
              </p>
              <Button onClick={() => navigate("/dashboard")} size="lg" className="rounded-xl">
                Start Using TeachAssist <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <BookUser className="text-primary-foreground h-4 w-4" />
              </div>
              <span className="font-medium">TeachAssist</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact Us</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">About</a>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} TeachAssist. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Icons for feature section
function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 12h4" />
      <path d="M10 16h4" />
      <path d="M10 8h1" />
    </svg>
  );
}

function ChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  );
}

function AiIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
      <circle cx="7" cy="14" r="1" />
      <circle cx="17" cy="14" r="1" />
      <path d="M12 15v4" />
      <path d="M10 19h4" />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function InsightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12h5" />
      <path d="M17 12h5" />
      <path d="M12 2v5" />
      <path d="M12 17v5" />
      <path d="M12 12 2 2" />
      <path d="m12 12 10-10" />
      <path d="m12 12 10 10" />
      <path d="m12 12-10 10" />
    </svg>
  );
}

function ResourceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      <path d="M8 7h6" />
      <path d="M8 11h8" />
    </svg>
  );
}

export default Index;
