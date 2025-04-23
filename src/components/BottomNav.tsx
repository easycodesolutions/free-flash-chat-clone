
import { Link, useLocation } from "react-router-dom";
import { Camera, MessageCircle, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/chat", icon: MessageCircle, label: "Chat" },
    { path: "/", icon: Camera, label: "Camera" },
    { path: "/stories", icon: Users, label: "Stories" },
    { path: "/profile", icon: User, label: "Profile" },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black py-2 px-4">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className={cn(
                "flex flex-col items-center p-2 transition-colors",
                isActive ? "text-snap-yellow" : "text-gray-400"
              )}
            >
              <item.icon className={cn("w-6 h-6", item.path === "/" ? "w-7 h-7" : "")} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
