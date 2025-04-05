"use client"
import { useState, useEffect, useCallback } from 'react';

export function StickyNav() {
  const [activeSection, setActiveSection] = useState("Overview");

  // Get the height of the sticky nav for offset calculations
  const getStickyNavHeight = useCallback(() => {
    const stickyNav = document.querySelector('.sticky');
    return stickyNav ? stickyNav.getBoundingClientRect().height : 70; // Default to 70px if not found
  }, []);

  // Function to handle smooth scrolling to sections with proper offset
  const handleClick = (item: string) => {
    const sectionId = item.toLowerCase().replace(/\s+/g, '').replace(/&/g, '');
    const element = document.getElementById(sectionId);
    
    if (element) {
      // Get the current scroll position
      const currentScrollPosition = window.scrollY;
      
      // Get the element's position relative to the top of the document
      const elementPosition = element.getBoundingClientRect().top + currentScrollPosition;
      
      // Calculate the offset (sticky nav height + extra padding)
      const offset = getStickyNavHeight() + 20;
      
      // Scroll to the element with the offset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      
      setActiveSection(item);
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "overview",
        "amenities",
        "inclusions",
        "exclusions",
        "policy&rules",
        "reviews",
        "ownerdetails"
      ];
      
      // Get the sticky nav height for offset calculations
      const offset = getStickyNavHeight() + 30;
      
      // Find the section that's currently visible
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section is visible, accounting for the sticky header
          return rect.top <= offset && rect.bottom >= offset;
        }
        return false;
      });
      
      if (current) {
        // Convert section ID back to display format
        const displayName = current === "policy&rules" 
          ? "Policy & Rules" 
          : current.charAt(0).toUpperCase() + current.slice(1);
        
        setActiveSection(displayName);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [getStickyNavHeight]);

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
                ? "text-black border-b-2 pb-2 border-[#131313]"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
} 