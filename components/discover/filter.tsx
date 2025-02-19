"use client";
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

interface FilterProps {
  activeTab: string;
}

export default function Filter({ activeTab }: FilterProps) {
  const [priceRange, setPriceRange] = useState([50, 1200]);
  const [departureTime, setDepartureTime] = useState([50, 1200]);
  const [rating, setRating] = useState<string | null>(null);
  const [sleeps, setSleeps] = useState<number[]>([]);
  const [seating, setSeating] = useState<number[]>([]);
  
  const renderCamperVanFilters = () => (
    <>
      {/* Price Range */}
      <div className="mb-8">
        <h3 className="text-gray-900 mb-4">Price</h3>
        <input
          type="range"
          min="50"
          max="1200"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([50, parseInt(e.target.value)])}
        />
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-600">${priceRange[0]}</span>
          <span className="text-sm text-gray-600">${priceRange[1]}</span>
        </div>
      </div>

      {/* Departure Time */}
      <div className="mb-8">
        <h3 className="text-gray-900 mb-4">Departure Time</h3>
        <input
          type="range"
          min="50"
          max="1200"
          value={departureTime[1]}
          onChange={(e) => setDepartureTime([50, parseInt(e.target.value)])}
        />
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-600">${departureTime[0]}</span>
          <span className="text-sm text-gray-600">${departureTime[1]}</span>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-8">
        <h3 className="text-gray-900 mb-4">Rating</h3>
        <div className="flex gap-2">
          {['0+', '1+', '2+', '3+', '4+'].map((value) => (
            <button
              key={value}
              onClick={() => setRating(value)}
              className={`px-4 py-2 rounded border ${
                rating === value
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* Sleeps */}
      <div className="mb-8">
        <h3 className="text-gray-900 mb-4">Sleeps</h3>
        <div className="space-y-2">
          {[2, 4, 6, 8].map((value) => (
            <label key={value} className="flex items-center">
              <input
                type="checkbox"
                checked={sleeps.includes(value)}
                onChange={() => {
                  setSleeps(prev => 
                    prev.includes(value) 
                      ? prev.filter(v => v !== value)
                      : [...prev, value]
                  );
                }}
                className="mr-2"
              />
              <span>{value}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Seating */}
      <div className="mb-8">
        <h3 className="text-gray-900 mb-4">Seating</h3>
        <div className="space-y-2">
          {[2, 4, 6, 8].map((value) => (
            <label key={value} className="flex items-center">
              <input
                type="checkbox"
                checked={seating.includes(value)}
                onChange={() => {
                  setSeating(prev => 
                    prev.includes(value) 
                      ? prev.filter(v => v !== value)
                      : [...prev, value]
                  );
                }}
                className="mr-2"
              />
              <span>{value}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Type */}
      <div className="mb-8">
        <h3 className="text-gray-900 mb-4">Type</h3>
        <div className="relative">
          <select className="w-full p-3 bg-[#F6F6F6] border border-gray-200 rounded-lg appearance-none pr-10 focus:outline-none focus:border-gray-300">
            <option>Luxe</option>
            <option>Standard</option>
            <option>Budget</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Category */}
      <div className="mb-8">
        <h3 className="text-gray-900 mb-4">Category</h3>
        <div className="relative">
          <select className="w-full p-3 bg-[#F6F6F6] border border-gray-200 rounded-lg appearance-none pr-10 focus:outline-none focus:border-gray-300">
            <option>Apartments</option>
            <option>Houses</option>
            <option>Hotels</option>
            <option>Villas</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Facilities */}
      <div className="mb-4">
        <h3 className="text-gray-900 mb-4">Facilities</h3>
        <div className="relative">
          <select className="w-full p-3 bg-[#F6F6F6] border border-gray-200 rounded-lg appearance-none pr-10 focus:outline-none focus:border-gray-300">
            <option>Select All</option>
            <option>WiFi</option>
            <option>Pool</option>
            <option>Gym</option>
            <option>Parking</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </>
  );

  const renderActivityFilters = () => (
    <>
      {/* Price Range */}
      <div className="mb-8">
        <h3 className="text-gray-900 mb-4">Price</h3>
        <input
          type="range"
          min="50"
          max="1200"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([50, parseInt(e.target.value)])}
        />
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-600">${priceRange[0]}</span>
          <span className="text-sm text-gray-600">${priceRange[1]}</span>
        </div>
      </div>

      {/* Category */}
      <div className="mb-8">
        <h3 className="text-gray-900 mb-4">Category</h3>
        <div className="relative">
          <select className="w-full p-3 bg-[#F6F6F6] border border-gray-200 rounded-lg appearance-none pr-10 focus:outline-none focus:border-gray-300">
            <option>Apartments</option>
            <option>Houses</option>
            <option>Hotels</option>
            <option>Villas</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </>
  );
  
  return (
    <div className={`${plusJakartaSans.className} min-h-screen pt-10 w-[509px]`}>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Filters</h2>
        
        {activeTab === 'activity' ? renderActivityFilters() : renderCamperVanFilters()}
      </div>
    </div>
  );
}
