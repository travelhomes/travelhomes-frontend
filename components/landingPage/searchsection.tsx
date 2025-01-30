"use client"
import React, { useState, useRef, useEffect } from 'react';
import { LocationIcon, CheckInIcon, CheckOutIcon, GuestIcon, SearchIcon } from "@/public/assets/CustomIcon"
import { GuestCounter } from './searchcomponents/guest-counter';
import { LocationSearch } from './searchcomponents/location-search';
import { Calendar } from './searchcomponents/calendar';
import TimePicker from './searchcomponents/time-picker';

export default function SearchFilter() {
  const [isGuestCounterOpen, setGuestCounterOpen] = useState(false);
  const [isLocationSearchOpen, setLocationSearchOpen] = useState(false);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  
  // Refs for the buttons and popups
  const guestButtonRef = useRef<HTMLButtonElement>(null);
  const locationButtonRef = useRef<HTMLButtonElement>(null);
  const checkInButtonRef = useRef<HTMLButtonElement>(null);
  const checkOutButtonRef = useRef<HTMLButtonElement>(null);
  const guestPopupRef = useRef<HTMLDivElement>(null);
  const locationPopupRef = useRef<HTMLDivElement>(null);
  const calendarPopupRef = useRef<HTMLDivElement>(null);

  const [selectedLocation, setSelectedLocation] = useState("Thailand");
  const [dateRange, setDateRange] = useState<{ checkIn?: Date; checkOut?: Date }>({});
  const [guestCount, setGuestCount] = useState({
    adults: 0,
    children: 0,
    infants: 0
  });

  // Close all popups
  const closeAllPopups = () => {
    setGuestCounterOpen(false);
    setLocationSearchOpen(false);
    setCalendarOpen(false);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Guest Counter popup
      if (isGuestCounterOpen && 
          !guestPopupRef.current?.contains(event.target as Node) && 
          !guestButtonRef.current?.contains(event.target as Node)) {
        setGuestCounterOpen(false);
      }
      
      // Location Search popup
      if (isLocationSearchOpen && 
          !locationPopupRef.current?.contains(event.target as Node) && 
          !locationButtonRef.current?.contains(event.target as Node)) {
        setLocationSearchOpen(false);
      }
      
      // Calendar popup
      if (isCalendarOpen && 
          !calendarPopupRef.current?.contains(event.target as Node) && 
          !checkInButtonRef.current?.contains(event.target as Node) && 
          !checkOutButtonRef.current?.contains(event.target as Node)) {
        setCalendarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isGuestCounterOpen, isLocationSearchOpen, isCalendarOpen]);

  const toggleGuestCounter = () => {
    closeAllPopups();
    setGuestCounterOpen(true);
  };

  const toggleLocationSearch = () => {
    closeAllPopups();
    setLocationSearchOpen(true);
  };

  const toggleCalendar = () => {
    closeAllPopups();
    setCalendarOpen(true);
  };

  const formatDateRange = () => {
    if (!dateRange.checkIn || !dateRange.checkOut) return "Add dates";
    return `${dateRange.checkIn.toLocaleDateString()} - ${dateRange.checkOut.toLocaleDateString()}`;
  };

  const formatGuestCount = () => {
    const total = guestCount.adults + guestCount.children + guestCount.infants;
    if (total === 0) return "Add guests";
    return `${total} guest${total > 1 ? 's' : ''}`;
  };

  return (
    <div className="hidden md:block relative">
      <div className="flex items-center gap-2 bg-[#F6F6F6] px-[2rem] py-[18px] rounded-[20px]">
        <div className="flex items-center gap-2 flex-1">
          <div className="flex flex-col flex-1 relative">
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <span className="inline-block w-4 h-4 mb-[12px]">
                <LocationIcon />
              </span>
              Location
            </div>
            <button 
              ref={locationButtonRef}
              onClick={toggleLocationSearch} 
              className="bg-transparent text-gray-900 text-base font-medium focus:outline-none ml-2 text-left"
            >
              {selectedLocation}
            </button>
            {isLocationSearchOpen && (
              <div 
                ref={locationPopupRef}
                className="absolute top-full left-0 mt-2 z-50 shadow-lg"
              >
                <LocationSearch onLocationSelect={(location) => {
                  setSelectedLocation(location);
                  toggleLocationSearch();
                }} />
              </div>
            )}
          </div>

          <div className="w-px h-12 bg-[#D6D6D6]" />

          <div className="flex flex-col flex-1 ml-[20px] relative">
            <div className="text-sm text-gray-500 mb-1 flex items-center gap-2">
              <CheckInIcon />
              Check in
            </div>
            <button 
              ref={checkInButtonRef}
              onClick={toggleCalendar}
              className="bg-transparent text-gray-900 text-base font-medium focus:outline-none ml-1 text-left "
            >
              {formatDateRange()}
            </button>
          </div>

          <div className="w-px h-12 bg-[#D6D6D6]" />

          <div className="flex flex-col flex-1 ml-[20px]">
            <label className="text-sm text-gray-500 mb-1 flex items-center gap-2">
              <CheckOutIcon />
              Check out
            </label>
            <button 
              ref={checkOutButtonRef}
              onClick={toggleCalendar}
              className="bg-transparent text-gray-900 text-base font-medium focus:outline-none ml-1 text-left"
            >
              {formatDateRange()}
            </button>
          </div>

          <div className="w-px h-12 bg-[#D6D6D6]" />

          <div className="flex flex-col flex-1 ml-[20px] relative">
            <label className="text-sm text-gray-500 mb-1 flex items-center gap-2">
              <GuestIcon />
              Guests
            </label>
            <button 
              ref={guestButtonRef}
              onClick={toggleGuestCounter} 
                  className="bg-transparent text-left text-gray-900 text-base font-medium focus:outline-none ml-1"
            >
              {formatGuestCount()}
            </button>
            {isGuestCounterOpen && (
              <div 
                ref={guestPopupRef}
                className="absolute top-full right-0 mt-2 z-50 shadow-lg"
              >
                <GuestCounter 
                  onGuestCountChange={(counts) => {
                    setGuestCount(counts);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <button className="bg-black text-white p-4 rounded-full hover:bg-gray-800 transition-colors">
          <SearchIcon />
        </button>
      </div>

      {isCalendarOpen && (
        <div 
          ref={calendarPopupRef}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 shadow-lg bg-white rounded-lg"
        >
          <Calendar 
            onDateSelect={(dates) => {
              setDateRange({
                checkIn: dates[0],
                checkOut: dates[1]
              });
            }}
          />
        </div>
      )}
    </div>
  );
}