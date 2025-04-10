
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";

interface MainLayoutProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function MainLayout({ title, subtitle }: MainLayoutProps) {
  const location = useLocation();
  const [pageKey, setPageKey] = useState(location.pathname);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle page transitions
  useEffect(() => {
    if (location.pathname !== pageKey) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setPageKey(location.pathname);
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, pageKey]);
  
  // Extract page title from route
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (title) return title;
    
    if (path === "/") return "Home";
    if (path === "/dashboard") return "Dashboard";
    if (path === "/assignments") return "Assignments";
    if (path === "/teacher-ai") return "Teacher AI";
    if (path === "/resources") return "Resources";
    
    return path.split("/").pop()?.split("-").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ") || "Page";
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getPageTitle()} subtitle={subtitle} />
        <main className="flex-1 overflow-auto">
          <div
            className={cn(
              "min-h-full transition-opacity duration-300",
              isAnimating ? "opacity-0" : "opacity-100"
            )}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
