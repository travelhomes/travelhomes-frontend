"use client";

import Logo from "@/public/mainlogo.png";
import { ListIcon } from "@/public/assets/CustomIcon";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import userImage from "@/public/user.png";

export default function Appbar() {
  const { user, logout, isAuthenticated } = useAuth();

  // Get first name from full name
  const firstName = user?.name ? user.name.split(" ")[0] : "";

  return (
    <nav className="w-full border-gray-200 hidden md:block pt-2">
      <div className="mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo area */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src={Logo} alt="Logo" />
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/vendor">
              <button className="px-[20px] bg-white cursor-pointer py-[12px] text-sm font-medium text-gray-700 border border-gray-300 rounded-[60px]">
                <span className="flex items-center">
                  <ListIcon />
                  <span className="ml-2 text-[#131313]">List your offering</span>
                </span>
              </button>
            </Link>

            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 focus:outline-none">
                  <div className="flex items-center space-x-2 px-[20px] py-[12px] text-sm font-medium text-[#131313] rounded-[60px] hover:bg-gray-100">
                    <Image
                      src={userImage}
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <span>Hi {firstName}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[300px]">
                  <Link href="/user">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  <Link href="/user/trips">
                    <DropdownMenuItem>Trips</DropdownMenuItem>
                  </Link>
                  <Link href="/wishlist">
                    <DropdownMenuItem>Wishlist</DropdownMenuItem>
                  </Link>

                  <Link href="/user/settings">
                    <DropdownMenuItem>Account Settings</DropdownMenuItem>
                  </Link>

                  <Link href="/chat">
                    <DropdownMenuItem>Chat</DropdownMenuItem>
                  </Link>
                  <Link href="/help">
                    <DropdownMenuItem>Help</DropdownMenuItem>
                  </Link>

                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login">
                <button className="px-[20px] cursor-pointer py-[12px] text-sm font-medium text-black bg-white rounded-[60px]">
Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
