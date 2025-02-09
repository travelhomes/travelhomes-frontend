import React from 'react';
import { Bed, Users, Umbrella, ShowerHead as Shower, Tv, Tent, RefrigeratorIcon, Music, Twitch as Kitchen, Wifi, ChevronFirst as FirstAid, Bath } from 'lucide-react';

export function Amenities() {
  const amenities = [
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

  return (
    <div className="p-4" id="amenities">
      <h2 className="text-[20px] md:text-[24px] text-[#0B0907] font-bold mb-[2rem]">
        Amenities
      </h2>
      <div className="grid grid-cols-2 gap-2">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center gap-2 mb-[12px]">
            {amenity.icon}
            <span className="text-sm md:text-base">{amenity.label}</span>
          </div>
        ))}
      </div>
      <button className="mt-4 text-black border border-[#000000] py-[8px] md:py-[12px] px-[24px] md:px-[32px] rounded-[60px] text-sm md:text-base">
        See All 24 Amenities
      </button>
    </div>
  );
}