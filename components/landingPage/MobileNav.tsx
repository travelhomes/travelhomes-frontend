'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, BlackSearchIcon, WishlistIcon, ChatIcon, ProfileIcon } from '@/public/assets/CustomIcon';
import React from 'react';

const navItems = [
  { label: 'Home', href: '/', Icon: HomeIcon },
  { label: 'Search', href: '/search', Icon: BlackSearchIcon },
  { label: 'Wishlist', href: '/wishlist', Icon: WishlistIcon },
  { label: 'Chat', href: '/chat', Icon: ChatIcon },
  { label: 'Profile', href: '/user', Icon: ProfileIcon },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              {React.createElement(item.Icon, {
                className: `${
                  isActive ? 'text-black' : 'text-gray-500'
                } mb-1 w-6 h-6`
              })}
              <span className={`text-xs ${
                isActive ? 'text-black' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}