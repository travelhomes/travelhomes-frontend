'use client';

import Image from 'next/image';
import Link from 'next/link';
import Logo from "@/public/white logo.png";
import { Mail } from 'lucide-react';


const menuLinks = [
  { title: 'About', href: '/about' },
  { title: 'Why Host with us', href: '/host' },
  { title: 'Careers', href: '/careers' },
];

const supportLinks = [
  { title: 'Contact Us', href: '/contact' },
  { title: 'Blog', href: '/blog' },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white w-full">
      <div className="container mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[4rem] py-8 md:py-10 min-h-[319px] flex flex-col justify-between">
        {/* Main content with flex layout */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-6 lg:gap-8">
          {/* Logo and Description */}
          <div className="w-full md:w-[430px] flex flex-col">
            <Image
              src={Logo}
              alt="Travel Home Logo"
              width={120}
              height={40}
              className="mb-4 md:mb-6"
            />
            <p className="text-[#CACACA] text-sm leading-relaxed md:w-[360px]">
              Caravan trips blend adventure and comfort, as travelers embark on open-road journeys in well-equipped recreational vehicles like camper vans, RVs, motorhomes, and caravans.
            </p>
          </div>

          {/* Menu Column */}
          <div className="w-full md:w-[15%] flex flex-col">
            <h3 className="font-semibold mb-3 md:mb-4 text-lg">Menu</h3>
            <ul className="space-y-2 md:space-y-3">
              {menuLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="w-full md:w-[15%] flex flex-col">
            <h3 className="font-semibold mb-3 md:mb-4 text-lg">Support</h3>
            <ul className="space-y-2 md:space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="w-full md:w-1/4 flex flex-col">
            <h3 className="font-semibold mb-2 text-lg text-white">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-3 md:mb-4">
              Be the first one to know about discounts, offers and events. Unsubscribe whenever you like.
            </p>
            
            <div className="relative flex items-center w-full">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full py-2.5 md:py-3 pl-10 pr-24 bg-white border border-gray-700 text-black text-sm rounded-full focus:outline-none focus:border-gray-500"
              />
              <span className="absolute left-3 text-[#2A2A2A]">
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
              </span>
              <button className="absolute right-1 top-1 bottom-1 px-3 md:px-5 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-6 md:mt-0">
          <div className="h-[1px] bg-gray-700 my-5 md:my-6" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-sm">
            <p className="text-gray-400 order-2 md:order-1">
              Travel Home @ 2025 - 2030
            </p>
            <div className="flex items-center gap-4 md:gap-6 order-1 md:order-2">
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                T&C
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy ploicy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}