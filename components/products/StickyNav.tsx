"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function StickyNav() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("Overview");

  const handleClick = (item: string) => {
    router.push(`#${item.toLowerCase().replace(/\s+/g, '')}`);
    setActiveSection(item);
  };

  return (
    <nav className="overflow-x-auto">
      <div className="flex space-x-4 md:space-x-8 text-sm min-w-max py-4">
        {[
          "Overview",
          "Amenities",
          "Inclusions",
          "Exclusions",
          "Policy & Rules",
          "Reviews",
          "Owner Details"
        ].map((item) => (
          <button
            key={item}
            onClick={() => handleClick(item)}
            className={`${
              item === activeSection
                ? " text-black border-b-2 pb-2  border-[#131313]"
                : "text-gray-500 hover:text-black "
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
} 