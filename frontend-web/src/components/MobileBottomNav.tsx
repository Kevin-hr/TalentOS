import { Home, Briefcase, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileBottomNavProps {
  activeTab: "analyze" | "search" | "profile";
  onTabChange: (tab: any) => void;
}

export function MobileBottomNav({ activeTab, onTabChange }: MobileBottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#F3F4EF] border-t-2 border-black pb-[env(safe-area-inset-bottom)] z-50 shadow-[0_-4px_0_0_rgba(0,0,0,0.1)]">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => onTabChange("analyze")}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors active:scale-95",
            activeTab === "analyze" ? "text-[#1D4AFF]" : "text-gray-500 hover:text-gray-900"
          )}
        >
          <Home className={cn("w-6 h-6", activeTab === "analyze" && "fill-current")} />
          <span className="text-[10px] font-bold">诊断</span>
        </button>
        
        <button
          onClick={() => onTabChange("search")}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors active:scale-95",
            activeTab === "search" ? "text-[#F54E00]" : "text-gray-500 hover:text-gray-900"
          )}
        >
          <Briefcase className={cn("w-6 h-6", activeTab === "search" && "fill-current")} />
          <span className="text-[10px] font-bold">职位</span>
        </button>

        <button
          onClick={() => onTabChange("profile")}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors active:scale-95",
            activeTab === "profile" ? "text-black" : "text-gray-500 hover:text-gray-900"
          )}
        >
          <User className={cn("w-6 h-6", activeTab === "profile" && "fill-current")} />
          <span className="text-[10px] font-bold">我的</span>
        </button>
      </div>
    </nav>
  );
}
