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
  // Common state
  const [priceRange, setPriceRange] = useState([50, 1200]);
  const [rating, setRating] = useState<string | null>("1+");
  
  // Campervan specific state
  const [sleepsRange, setSleepsRange] = useState([2, 16]);
  const [seatingRange, setSeatingRange] = useState([2, 16]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  
  // Stay specific state
  const [departureTimeRange, setDepartureTimeRange] = useState([50, 1200]);
  
  // Categories
  const categoryOptions = [
    "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"
  ];

  const facilityOptions = [
    "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"
  ];

  // Custom Range Slider component
  const RangeSlider = ({ min, max, label, value, onChange }: { min: number, max: number, label: string, value: number[], onChange: (newValue: number[]) => void }) => (
    <div className="mb-8">
      <h3 className="text-gray-700 mb-4 text-base font-medium">{label}</h3>
      <input
        type="range"
        min={min}
        max={max}
        value={value[1]}
        onChange={(e) => onChange([min, parseInt(e.target.value)])}
        className="w-full"
      />
      <div className="flex justify-between mt-1">
        <span className="text-sm text-gray-600">{label === 'Price' || label === 'Departure Time' ? '$' : ''}{value[0]}</span>
        <span className="text-sm text-gray-600">{label === 'Price' || label === 'Departure Time' ? '$' : ''}{value[1]}</span>
      </div>
    </div>
  );

  const RangeSliderDeparture = ({ min, max, label, value, onChange }: { min: number, max: number, label: string, value: number[], onChange: (newValue: number[]) => void }) => (
    <div className="mb-8 border-t border-[#D6D6D6] pt-4">
      <h3 className="text-gray-700 mb-4 text-base font-medium">{label}</h3>
      <input
        type="range"
        min={min}
        max={max}
        value={value[1]}
        onChange={(e) => onChange([min, parseInt(e.target.value)])}
        className="w-full"
      />
      <div className="flex justify-between mt-1">
        <span className="text-sm text-gray-600">{label === 'Price' || label === 'Departure Time' ? '$' : ''}{value[0]}</span>
        <span className="text-sm text-gray-600">{label === 'Price' || label === 'Departure Time' ? '$' : ''}{value[1]}</span>
      </div>
    </div>
  );

  // Rating Selector component
  const RatingSelector = () => (
    <div className="mb-8  border-t border-[#D6D6D6] pt-4">
      <h3 className="text-gray-700 mb-4 text-base font-medium">Rating</h3>
      <div className="flex gap-2">
        {['0+', '1+', '2+', '3+', '4+'].map((value) => (
          <button
            key={value}
            onClick={() => setRating(value)}
            className={`w-12 h-10 rounded border flex items-center justify-center ${
              rating === value
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );

  // Category Checkbox component for Campervan tab
  const CategoryCheckboxes = ({ options, title }: { options: string[], title: string }) => (
    <div className="mb-8 border-t border-[#D6D6D6] pt-4">
      <h3 className="text-gray-700 mb-4 text-base font-medium">{title}</h3>
      <div className="space-y-3">
        {options.map((option, index) => (
          <label key={index} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 border border-gray-300 rounded mr-3 checked:bg-black"
              checked={selectedCategories.includes(option)}
              onChange={() => {
                if (selectedCategories.includes(option)) {
                  setSelectedCategories(selectedCategories.filter(c => c !== option));
                } else {
                  setSelectedCategories([...selectedCategories, option]);
                }
              }}
            />
            <span className="text-gray-600">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  // Dropdown component for Facilities in Campervan tab
  const Dropdown = ({ label, options }: { label: string, options: string[] }) => (
    <div className="mb-8 border-t border-[#D6D6D6] pt-4">
      <h3 className="text-gray-700 mb-4 text-base font-medium">{label}</h3>
      <div className="relative">
        <select className="w-full p-3 bg-white border border-gray-300 rounded-md appearance-none pr-10 focus:outline-none focus:ring-1 focus:ring-black">
          <option>Select All</option>
          {options.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );

  // Campervan filters - preserved as it was
  const renderCamperVanFilters = () => (
    <>
      <RangeSlider 
        min={50} 
        max={1200} 
        label="Price" 
        value={priceRange} 
        onChange={setPriceRange} 
      />
      <RatingSelector />
      <RangeSlider 
        min={2} 
        max={16} 
        label="Sleeps" 
        value={sleepsRange} 
        onChange={setSleepsRange} 
      />
      <RangeSlider 
        min={2} 
        max={16} 
        label="Seating" 
        value={seatingRange} 
        onChange={setSeatingRange} 
      />
      <CategoryCheckboxes options={categoryOptions} title="Category" />
      <Dropdown label="Facilities" options={facilityOptions} />
    </>
  );

  // Stay filters - updated to match the image exactly
  const renderStayFilters = () => (
    <>
      <RangeSlider 
        min={50} 
        max={1200} 
        label="Price" 
        value={priceRange} 
        onChange={setPriceRange}
      />
      <RangeSliderDeparture 
        min={50} 
        max={1200} 
        label="Departure Time" 
        value={departureTimeRange}
        onChange={setDepartureTimeRange}
      />
      <RatingSelector />
      
      <div className="border-t border-[#D6D6D6] pt-4">
        <h3 className="text-gray-700 mb-4 text-base font-medium">Type</h3>
      </div>
      <div>
        <h3 className="text-gray-700 mb-4 text-base font-medium">Category</h3>
      </div>
      <div className="space-y-3 mb-8">
        {categoryOptions.map((option, index) => (
          <label key={index} className="flex items-center cursor-pointer ">
            <input
              type="checkbox"
              className="w-5 h-5 border border-gray-300 rounded mr-3 checked:bg-black"
              checked={selectedCategories.includes(option)}
              onChange={() => {
                if (selectedCategories.includes(option)) {
                  setSelectedCategories(selectedCategories.filter(c => c !== option));
                } else {
                  setSelectedCategories([...selectedCategories, option]);
                }
              }}
            />
            <span className="text-gray-600">{option}</span>
          </label>
        ))}
      </div>
      
      <div className="border-t border-[#D6D6D6] pt-4">
        <h3 className="text-gray-700 mb-4 text-base font-medium">Category</h3>
      </div>
      <div className="space-y-3 mb-8">
        {categoryOptions.map((option, index) => (
          <label key={index} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 border border-gray-300 rounded mr-3 checked:bg-black"
              checked={selectedCategories.includes(option)}
              onChange={() => {
                if (selectedCategories.includes(option)) {
                  setSelectedCategories(selectedCategories.filter(c => c !== option));
                } else {
                  setSelectedCategories([...selectedCategories, option]);
                }
              }}
            />
            <span className="text-gray-600">{option}</span>
          </label>
        ))}
      </div>
      
      <div className="border-t border-[#D6D6D6] pt-4">
        <h3 className="text-gray-700 mb-4 text-base font-medium">Facilities</h3>
      </div>
      <div>
        <h3 className="text-gray-700 mb-4 text-base font-medium">Category</h3>
      </div>
      <div className="space-y-3 mb-8">
        {facilityOptions.map((option, index) => (
          <label key={index} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 border border-gray-300 rounded mr-3 checked:bg-black"
              checked={selectedFacilities.includes(option)}
              onChange={() => {
                if (selectedFacilities.includes(option)) {
                  setSelectedFacilities(selectedFacilities.filter(f => f !== option));
                } else {
                  setSelectedFacilities([...selectedFacilities, option]);
                }
              }}
            />
            <span className="text-gray-600">{option}</span>
          </label>
        ))}
      </div>
    </>
  );

  // Activity filters - preserved as it was in the original code
  const renderActivityFilters = () => (
    <>
      <RangeSlider 
        min={50} 
        max={1200} 
        label="Price" 
        value={priceRange} 
        onChange={setPriceRange} 
      />
      <CategoryCheckboxes options={categoryOptions} title="Category" />
    </>
  );
  
  return (
    <div className={`${plusJakartaSans.className} min-h-screen pt-10 w-[509px]`}>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Filters</h2>
        
        {activeTab === 'campervan' && renderCamperVanFilters()}
        {activeTab === 'uniquestay' && renderStayFilters()}
        {activeTab === 'activity' && renderActivityFilters()}
      </div>
    </div>
  );
}
