"use client"
import React, { useState } from "react"; // Import React
import { CarIcon, HomeIcon, RocketIcon } from "@/public/assets/CustomIcon";

export function Header() {
  const [activeButton, setActiveButton] = useState<string>("camperVan"); 
  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return ( // Add return statement
    <div className="hidden md:block">
      <div className="flex items-center justify-start my-[2.5rem] ">
        <div className="flex items-center space-x-4"> 
          <button 
            className={`flex items-center space-x-2 bg-[#F6F6F6] text-[#131313]  ${activeButton === 'camperVan' ? 'bg-black text-white ' : ''} px-4 py-2 rounded-full`} 
            onClick={() => handleButtonClick('camperVan')}
          >
            <div className="bg-white p-1.5 rounded-full">
              <CarIcon />
            </div>
            <span className="text-sm font-medium pr-1">Camper Van</span>
          </button>

          <button 
            className={`flex items-center space-x-2 bg-[#F6F6F6] text-[#131313]  ${activeButton === 'home' ? 'bg-black text-white' : '#F6F6F6'} px-4 py-2 rounded-full`} 
            onClick={() => handleButtonClick('home')}
          >
            <div className="bg-white p-1.5 rounded-full">
              <HomeIcon />
            </div>
            <span className="text-sm font-medium pr-1">Unique Stays</span>
          </button>

          <button 
            className={`flex items-center space-x-2 bg-[#F6F6F6] text-[#131313]  ${activeButton === 'rocket' ? 'bg-black text-white' : '#F6F6F6 text-[#131313]'} px-4 py-2 rounded-full`} 
            onClick={() => handleButtonClick('rocket')}
          >
            <div className="bg-white p-1.5 rounded-full">
              <RocketIcon />
            </div>
            <span className="text-sm font-medium pr-1">Activity</span> {/* Corrected label */}
          </button>
        </div>
      </div>
    </div>
  );
}
