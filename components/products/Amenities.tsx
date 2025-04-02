import React, { useState, useEffect } from 'react';
import { Bed, Users, Umbrella, ShowerHead as Shower, Tv, Tent, RefrigeratorIcon, Music, Twitch as Kitchen, Wifi, ChevronFirst as FirstAid, Bath, X, Coffee, Utensils, Car, MapPin, Flame, Plug, ParkingCircle, Fan, Gamepad2, BatteryFull, Shield, PanelTop, ThermometerSun } from 'lucide-react';

export function Amenities() {
  const [showModal, setShowModal] = useState(false);

  // Featured amenities shown on the main page
  const featuredAmenities = [
    { icon: <Bed size={24} />, label: '2 Beds' },
    { icon: <Users size={24} />, label: '5 Seatings' },
    { icon: <Umbrella size={24} />, label: 'Awnings' },
    { icon: <Shower size={24} />, label: 'Shower' },
    { icon: <Tent size={24} />, label: 'Outdoor Tent' },
    { icon: <Tv size={24} />, label: 'TV Screen' },
    { icon: <RefrigeratorIcon size={24} />, label: 'Refrigerator' },
    { icon: <Music size={24} />, label: 'Music system' },
    { icon: <Kitchen size={24} />, label: 'Kitchenette' },
    { icon: <Wifi size={24} />, label: 'Free Wi-Fi' },
    { icon: <FirstAid size={24} />, label: 'First aid kit' },
    { icon: <Bath size={24} />, label: 'Toilet' },
  ];

  // All amenities including additional ones
  const allAmenities = [
    ...featuredAmenities,
    { icon: <Coffee size={24} />, label: 'Coffee Maker' },
    { icon: <Utensils size={24} />, label: 'Cooking Utensils' },
    { icon: <Car size={24} />, label: 'Driver Included' },
    { icon: <MapPin size={24} />, label: 'GPS Navigation' },
    { icon: <Flame size={24} />, label: 'Propane Stove' },
    { icon: <Plug size={24} />, label: 'Power Outlets' },
    { icon: <ParkingCircle size={24} />, label: 'Dedicated Parking' },
    { icon: <Fan size={24} />, label: 'Ceiling Fan' },
    { icon: <Gamepad2 size={24} />, label: 'Board Games' },
    { icon: <BatteryFull size={24} />, label: 'Solar Battery' },
    { icon: <Shield size={24} />, label: 'Safety Equipment' },
    { icon: <PanelTop size={24} />, label: 'Privacy Blinds' },
  ];

  // Group amenities by category for the modal
  const amenitiesCategories = [
    {
      category: "Essentials",
      items: allAmenities.slice(0, 8)
    },
    {
      category: "Kitchen & Dining",
      items: allAmenities.slice(8, 16)
    },
    {
      category: "Entertainment & Comfort",
      items: allAmenities.slice(16, 24)
    }
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
    <div className="p-4" id="amenities">
      <h2 className="text-[20px] md:text-[24px] text-[#0B0907] font-bold mb-[2rem]">
        Amenities
      </h2>
      <div className="grid grid-cols-2 gap-2">
        {featuredAmenities.map((amenity, index) => (
          <div key={index} className="flex items-center gap-2 mb-[12px]">
            {amenity.icon}
            <span className="text-sm md:text-base">{amenity.label}</span>
          </div>
        ))}
      </div>
      <button 
        className="mt-4 text-black border border-[#000000] py-[8px] md:py-[12px] px-[24px] md:px-[32px] rounded-[60px] text-sm md:text-base"
        onClick={() => setShowModal(true)}
      >
        See All 24 Amenities
      </button>

      {/* All Amenities Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4"
          onClick={handleOutsideClick}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto p-6">
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              <X size={24} />
            </button>
            
            <h3 className="text-2xl font-bold mb-6">All Amenities</h3>
            
            <div className="space-y-8">
              {amenitiesCategories.map((category, catIndex) => (
                <div key={catIndex}>
                  <h4 className="text-lg font-semibold mb-4 text-gray-800">{category.category}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.items.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="text-gray-700">{amenity.icon}</div>
                        <span className="text-gray-700">{amenity.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}