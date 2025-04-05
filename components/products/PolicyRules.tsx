"use client"
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function PolicyRules() {
  const [showModal, setShowModal] = useState(false);

  // Main policies shown on the page
  const featuredPolicies = [
    "No cancellation is allowed",
    "Fuel Cost Extra",
    "State Border Tax Extra",
  ];
  
  // All policies including additional ones
  const allPolicies = [
    ...featuredPolicies,
    "Toll Extra",
    "No smoking inside the van at any time.",
    "Security deposit of ₹10,000 is required at the time of pickup.",
    "Late return fees apply at ₹500 per hour.",
    "Pets are allowed with an additional cleaning fee of ₹1,500.",
    "The driver must be at least 25 years old with a valid driver's license.",
    "Maximum occupancy is 5 people including the driver.",
    "Unlimited mileage within the agreed-upon travel radius.",
    "The vehicle must be returned with the same fuel level as at pickup.",
    "All personal belongings must be removed upon return.",
    "Damages beyond normal wear and tear will be charged accordingly.",
    "Off-road driving is strictly prohibited unless explicitly permitted.",
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
    <div className="p-4 border-b w-full md:w-[65%]" id="policy&rules">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Policy & Rules</h2>
        <ul className="space-y-2">
          {featuredPolicies.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>{item}</span>
            </li>
          ))}
          <li className="flex items-start gap-2">
            <span className="text-gray-400">•</span>
            <span>
              Toll Extra, No smoking inside the van at any time...
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

      {/* Policy & Rules Modal */}
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
            
            <h3 className="text-2xl font-bold mb-6">All Policies & Rules</h3>
            
            <ul className="space-y-4">
              {allPolicies.map((item, index) => (
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