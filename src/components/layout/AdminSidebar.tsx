import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  BedDouble, 
  Compass, 
  UserCog, 
  BarChart3, 
  FileText, 
  Settings 
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Calendar, label: "Bookings Table", path: "/admin/bookings" },
    { icon: Calendar, label: "Booking Management", path: "/admin/booking-management" },
    { icon: BedDouble, label: "Rooms", path: "/admin/rooms" },
    { icon: FileText, label: "Content", path: "/admin/content" },
  ];

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-sidebar">
      <div className="p-6 border-b border-sidebar-border">
        <h2 className="font-montserrat text-xl font-bold text-sidebar-foreground">
          Admin Panel
        </h2>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.path}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-11",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              onClick={() => navigate(item.path)}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
};
