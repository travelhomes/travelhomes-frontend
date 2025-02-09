"use client"
import { useState, useEffect } from 'react';

export function StickyPrice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Show sticky price after scrolling past the main price section
      setIsVisible(scrollPosition > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 md:hidden">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="line-through text-gray-400">$500</span>
            <span className="text-xl font-semibold">$440</span>
            <span className="text-gray-600">night</span>
          </div>
        </div>
        <button className="bg-black text-white rounded-full px-6 py-3 text-base font-medium">
          Reserve
        </button>
      </div>
    </div>
  );
} 