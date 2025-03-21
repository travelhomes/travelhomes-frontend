import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center justify-between px-8">
        <h1 className="text-xl font-semibold">{title}</h1>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600" />
          </Button>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="rounded-full border-2 border-black px-6 py-2 text-sm font-medium"
            >
              + New Booking
            </Button>
            
            <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="/avatar-placeholder.jpg"
                alt="User avatar"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 