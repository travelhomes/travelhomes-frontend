import React from 'react';
import {LocationIcon , CheckInIcon , CheckOutIcon , GuestIcon , SearchIcon } from "@/public/assets/CustomIcon"


export default function SearchFilter (){
  return (
    <div className="hidden md:block">
    <div className="flex items-center gap-2 bg-[#F6F6F6] px-[2rem] py-[18px] rounded-[20px]">
      <div className="flex items-center gap-2 flex-1">
        <div className="flex flex-col flex-1">
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span className="inline-block w-4 h-4 mb-[12px]">
              <LocationIcon />
            </span>
             Location
          </div>
          <input 
            type="text" 
            placeholder="Thailand" 
            className="bg-transparent text-gray-900 text-base font-medium focus:outline-none ml-2"
            defaultValue="Thailand"
          />
        </div>

        <div className="w-px h-12 bg-[#D6D6D6]" />

        <div className="flex flex-col flex-1 ml-[20px]">
        <div className="text-sm text-gray-500 flex items-center gap-2">
            <span className="inline-block w-4 h-4 mb-[12px] ">
              <CheckInIcon />
            </span>
            Check in
          </div>
          <input 
            type="text" 
            placeholder="Add date" 
            className="bg-transparent text-gray-900 text-base font-medium focus:outline-none ml-1"
            defaultValue="01/02/2025"
          />
        </div>

        <div className="w-px h-12 bg-[#D6D6D6]" />

        <div className="flex flex-col flex-1 ml-[20px]">
          <label className="text-sm text-gray-500 mb-1 flex items-center gap-2">
            <CheckOutIcon />
            Check out
          </label>
          <input 
            type="text" 
            placeholder="Add date" 
            className="bg-transparent text-gray-900 text-base font-medium focus:outline-none ml-1"
            defaultValue="04/02/205"
          />
        </div>

        <div className="w-px h-12 bg-[#D6D6D6]" />

        <div className="flex flex-col flex-1 ml-[20px]">
          <label className="text-sm text-gray-500 mb-1 flex items-center gap-2">
           <GuestIcon />
            Guests
          </label>
          <input 
            type="text" 
            placeholder="Add guests" 
            className="bg-transparent text-gray-900 text-base font-medium focus:outline-none ml-1"
            defaultValue="Adults"
          />
        </div>
      </div>

      <button className="bg-black text-white p-4 rounded-full hover:bg-gray-800 transition-colors">
        <SearchIcon />
      </button>
    </div>
    </div>  
  );
};
