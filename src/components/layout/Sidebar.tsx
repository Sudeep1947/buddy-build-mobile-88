import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Upload,
  Users,
  BookOpen,
  Building,
  Calendar,
  FileText,
  Settings,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    title: "Data Management",
    items: [
      { title: "Import Data", href: "/data/import", icon: Upload },
      { title: "Faculty", href: "/faculty", icon: Users },
      { title: "Courses", href: "/courses", icon: BookOpen },
      { title: "Resources", href: "/resources", icon: Building },
    ],
  },
  {
    title: "Timetables",
    items: [
      { title: "Generate Timetable", href: "/generate", icon: Calendar },
      { title: "Active Schedules", href: "/timetables", icon: FileText },
    ],
  },
  {
    title: "Administration",
    items: [{ title: "Settings", href: "/settings", icon: Settings }],
  },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 border-r bg-card transition-transform duration-300 lg:sticky lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b lg:hidden">
          <span className="font-heading font-semibold text-lg">Menu</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)] lg:h-screen">
          <nav className="flex flex-col gap-1 p-4">
            {navigationItems.map((item, index) =>
              "items" in item ? (
                <div key={index} className="mb-4">
                  <h3 className="mb-2 px-4 text-sm font-semibold text-muted-foreground">
                    {item.title}
                  </h3>
                  <div className="space-y-1">
                    {item.items.map((subItem) => (
                      <NavLink
                        key={subItem.href}
                        to={subItem.href}
                        className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        activeClassName="bg-accent text-accent-foreground"
                        onClick={() => onClose()}
                      >
                        <subItem.icon className="h-4 w-4" />
                        {subItem.title}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  activeClassName="bg-accent text-accent-foreground"
                  onClick={() => onClose()}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </NavLink>
              )
            )}
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
};
