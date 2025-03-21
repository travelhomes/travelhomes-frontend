import { Button } from "@/components/ui/button";
import userImage from "@/public/user.png";
import Image from "next/image";
import { Bell } from "@/public/assets/CustomIcon"


interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="border-b bg-[#F9FAFB]">
      <div className="flex h-16 items-center justify-between px-8">
        <h1 className="text-[24px] font-semibold">{title}</h1>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
          >
<Bell />
          </Button>

          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
              <Image
                src={userImage}
                alt="User avatar"
                className="object-cover w-[36px] h-[36px]"

              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 