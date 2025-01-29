'use client';

import Image from 'next/image';
import Link from 'next/link';
import Logo from "@/public/white logo.png";

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
    <footer className="bg-black text-white">
      <div className="container mx-auto px-6 py-10">
        {/* Mobile Layout */}
        <div className="md:hidden space-y-8">
          <div className="space-y-6">
            <Image
              src={Logo}
              alt="Travel Home Logo"
              width={120}
              height={40}
              className="mb-4"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Caravan trips blend adventure and comfort, as travelers embark on epic road journeys in well-equipped recreational vehicles like camper vans, RVs, motorhomes and caravans. These versatile vehicles grant you the freedom to explore diverse destinations at your own pace.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-lg">Menu</h3>
              <ul className="space-y-3">
                {menuLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Support</h3>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-col md:flex-row md:justify-between gap-8 pb-12">
          <div className="md:w-[65%] lg:w-2/3">
            <Image
              src={Logo}
              alt="Travel Home Logo"
              width={120}
              height={40}
              className="mb-6"
            />
            <p className="text-gray-400 max-w-md">
              Caravan trips blend adventure and comfort, as travelers embark on epic road journeys in well-equipped recreational vehicles like camper vans, RVs, motorhomes and caravans. These versatile vehicles grant you the freedom to explore diverse destinations at your own pace.
            </p>
          </div>

          <div className="md:w-1/4">
            <h3 className="font-semibold mb-4">Menu</h3>
            <ul className="space-y-3">
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

          <div className="md:w-1/4">
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
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
        </div>

        <div className="h-[1px] bg-gray-700 my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-gray-400">
            Travel Home © 2023 - 2030
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              T&C
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}