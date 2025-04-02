"use client"
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function Inclusions() {
  const [showModal, setShowModal] = useState(false);

  // Main inclusions shown on the page
  const featuredInclusions = [
    "Toilet will have consumables like toothpaste, soap, shampoo, air freshener, etc.",
    "Blankets, bed sheets, and pillows for everyone.",
    "The kitchen will have an LPG cylinder, basic spices, salt, oil, tea, sugar, basic kitchen utensils, and crockeries.",
  ];
  
  // All inclusions including additional ones
  const allInclusions = [
    ...featuredInclusions,
    "However, customers have to bring their groceries for the kitchen or heat and eat packed food items can be provided at MRP if requested by customers before the journey begins.",
    "Complimentary welcome kit with local snacks and refreshments.",
    "24/7 roadside assistance and emergency support throughout your journey.",
    "One-time interior cleaning service for trips longer than 5 days.",
    "Complimentary first tank of fuel for your adventure.",
    "Detailed route maps and travel guides for popular destinations.",
    "Basic camping equipment for outdoor experiences.",
  ];

  // Disable body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <div className="p-4 border-b w-full md:w-[65%]">
      <div className="mb-8" id="inclusions">
        <h2 className="text-xl font-bold mb-4">Inclusions</h2>
        <ul className="space-y-2">
          {featuredInclusions.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>{item}</span>
            </li>
          ))}
          <li className="flex items-start gap-2">
            <span className="text-gray-400">•</span>
            <span>
              However, customers have to bring their groceries for the kitchen or heat and eat packed food items can be provided at MRP if...
              <button 
                onClick={() => setShowModal(true)}
                className="ml-1 font-medium text-black hover:underline"
              >
                read more
              </button>
            </span>
          </li>
        </ul>
      </div>

      {/* Inclusions Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4"
          onClick={handleOutsideClick}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6">
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              <X size={24} />
            </button>
            
            <h3 className="text-2xl font-bold mb-6">All Inclusions</h3>
            
            <ul className="space-y-4">
              {allInclusions.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-gray-400 font-bold">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
  
  