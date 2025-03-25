import { Button } from "@/components/ui/button";
import userImage from "@/public/user.png";
import Image from "next/image";
import { Bell } from "@/public/assets/CustomIcon"
import Link from "next/link";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className=" bg-[#F9FAFB]">
      <div className="flex h-16 items-center justify-between px-8">
        <h1 className="text-xl font-semibold">{title}</h1>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Bell />
          </Button>

          {/* Profile */}
          <div className="flex items-center gap-4">
            <Link href="/dashboard/profile?tab=personal" className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden cursor-pointer">
              <Image
                src={userImage}
                alt="User avatar"
                className="object-cover w-[36px] h-[36px]"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 