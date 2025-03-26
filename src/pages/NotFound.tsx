
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle, ChevronLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background p-4">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-full"
          >
            <Home className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">TeachAssist</h1>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto text-center space-y-6 animate-fade-in">
          <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-4 w-20 h-20 mx-auto flex items-center justify-center">
            <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
          </div>
          
          <div>
            <h1 className="text-4xl font-bold mb-2">404</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Oops! Page not found
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                onClick={() => navigate("/")}
                className="rounded-xl"
              >
                <Home className="mr-2 h-4 w-4" />
                Return to Home
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate(-1)}
                className="rounded-xl"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground pt-6 border-t border-border">
            The page at <span className="font-mono bg-muted px-1 py-0.5 rounded">{location.pathname}</span> doesn't exist or has been moved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
