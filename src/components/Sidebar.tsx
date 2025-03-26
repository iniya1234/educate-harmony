
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  FileText,
  Bot,
  BookOpen,
  Settings,
  LogOut
} from "lucide-react";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <h1
          className={cn(
            "font-bold text-xl text-primary transition-opacity duration-200",
            collapsed ? "opacity-0 hidden" : "opacity-100"
          )}
        >
          TeachAssist
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="rounded-full hover:bg-sidebar-accent"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <ul className="space-y-2">
          {[
            { path: "/dashboard", name: "Dashboard", icon: LayoutDashboard },
            { path: "/assignments", name: "Assignments", icon: FileText },
            { path: "/teacher-ai", name: "Teacher AI", icon: Bot },
            { path: "/resources", name: "Resources", icon: BookOpen },
          ].map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-3 rounded-lg transition-all",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                    collapsed ? "justify-center" : "justify-start"
                  )
                }
              >
                <item.icon
                  className={cn("h-5 w-5", collapsed ? "mx-0" : "mr-3")}
                />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-sidebar-accent"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-sidebar-accent text-destructive hover:text-destructive"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
          
          {!collapsed && (
            <div className="flex items-center mt-2 px-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <span className="text-xs font-bold">JS</span>
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">John Smith</p>
                <p className="text-xs text-muted-foreground">Science Teacher</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
