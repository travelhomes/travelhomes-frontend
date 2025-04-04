"use client"
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Calendar as CalendarIcon, ChevronDown, Users, X, AlertCircle } from "lucide-react";
import { Calendar } from "@/components/landingPage/searchcomponents/calendar";
import { GuestCounter } from "@/components/landingPage/searchcomponents/guest-counter";

export function StickyPrice() {
  // State for managing the dates
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [formattedDates, setFormattedDates] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });

  // State for managing guests
  const [guestCounts, setGuestCounts] = useState({
    adults: 0,
    children: 0,
    infants: 0,
  });
  const [totalGuests, setTotalGuests] = useState("");

  // State for toggling dropdowns
  const [showCalendar, setShowCalendar] = useState(false);
  const [showGuestCounter, setShowGuestCounter] = useState(false);
  
  // State for validation errors
  const [errors, setErrors] = useState({
    dates: "",
    guests: ""
  });

  // Ref to prevent useEffect from running on initial render
  const isInitialMount = useRef(true);

  // Set default guest count only once on mount
  useEffect(() => {
    if (!isInitialMount.current) {
      isInitialMount.current = false;
      
      // No need to call handleGuestCountChange since we already set default values in useState
      const totalAdults = guestCounts.adults;
      if (totalAdults > 0) {
        setTotalGuests(`${totalAdults} Adult${totalAdults !== 1 ? 's' : ''}`);
      }
    }
  }, [guestCounts.adults]);

  // Handle date selection
  const handleDateSelect = (dates: Date[]) => {
    if (dates.length === 2) {
      setSelectedDates(dates);
      setFormattedDates({
        start: formatDate(dates[0]),
        end: formatDate(dates[1]),
      });
      setShowCalendar(false);
      setErrors(prev => ({ ...prev, dates: "" }));
    }
  };

  // Handle guest count changes
  const handleGuestCountChange = (counts: { adults: number; children: number; infants: number }) => {
    setGuestCounts(counts);
    
    // Format the guest text
    let guestText = "";
    
    if (counts.adults > 0) {
      guestText += `${counts.adults} Adult${counts.adults !== 1 ? 's' : ''}`;
    }
    
    if (counts.children > 0) {
      guestText += guestText ? `, ${counts.children} Child${counts.children !== 1 ? 'ren' : ''}` : `${counts.children} Child${counts.children !== 1 ? 'ren' : ''}`;
    }
    
    if (counts.infants > 0) {
      guestText += guestText ? `, ${counts.infants} Infant${counts.infants !== 1 ? 's' : ''}` : `${counts.infants} Infant${counts.infants !== 1 ? 's' : ''}`;
    }
    
    setTotalGuests(guestText || "Add guests");
    
    // Clear guest error if there are adults
    if (counts.adults > 0) {
      setErrors(prev => ({ ...prev, guests: "" }));
    }
  };

  // Format date helper
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Close dropdown when clicking outside
  const handleClickOutside = () => {
    if (showCalendar) setShowCalendar(false);
    if (showGuestCounter) setShowGuestCounter(false);
  };
  
  // Validate form before submission
  const handleReserveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newErrors = {
      dates: "",
      guests: ""
    };
    
    let hasErrors = false;
    
    // Validate dates
    if (selectedDates.length < 2) {
      newErrors.dates = "Please select check-in and check-out dates";
      hasErrors = true;
    }
    
    // Validate guests
    if (guestCounts.adults === 0) {
      newErrors.guests = "At least 1 adult is required";
      hasErrors = true;
    }
    
    setErrors(newErrors);
    
    if (hasErrors) {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="hidden lg:block">
        <div className="sticky top-[100px] transition-all duration-300 lg:col-span-1" id="sticky-price">
          <div className="bg-white rounded-3xl shadow-md p-6 space-y-4">
            {/* Date Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 relative">
              <div 
                className="flex items-center justify-between mb-4 cursor-pointer"
                onClick={() => {
                  setShowCalendar(!showCalendar);
                  setShowGuestCounter(false);
                }}
              >
                <div className="flex items-center gap-2">
                  <CalendarIcon className="text-gray-600" size={20} />
                  <span className="text-gray-600 font-medium">Date</span>
                </div>
                <ChevronDown className={`text-gray-600 transition-transform ${showCalendar ? 'rotate-180' : ''}`} size={20} />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-black font-medium">
                  {formattedDates.start || "Add dates"}
                </span>
                {formattedDates.start && formattedDates.end && (
                  <span className="text-gray-500 mx-2">→</span>
                )}
                <span className="text-black font-medium">
                  {formattedDates.end || (formattedDates.start ? "Add end date" : "")}
                </span>
              </div>
              
              {errors.dates && (
                <div className="flex items-center mt-2 text-red-500 text-sm">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.dates}
                </div>
              )}
            </div>

            {/* Guest Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 relative">
              <div 
                className="flex items-center justify-between mb-4 cursor-pointer"
                onClick={() => {
                  setShowGuestCounter(!showGuestCounter);
                  setShowCalendar(false);
                }}
              >
                <div className="flex items-center gap-2">
                  <Users className="text-gray-600" size={20} />
                  <span className="text-gray-600 font-medium">Guest</span>
                </div>
                <ChevronDown className={`text-gray-600 transition-transform ${showGuestCounter ? 'rotate-180' : ''}`} size={20} />
              </div>
              
              <div>
                <span className="text-black font-medium">
                  {totalGuests}
                </span>
              </div>
              
              {errors.guests && (
                <div className="flex items-center mt-2 text-red-500 text-sm">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.guests}
                </div>
              )}
            </div>

            {/* Price Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Pricing</span>
                <div className="flex items-center">
                  <span className="text-xl font-semibold">$440</span>
                  <span className="text-gray-600 ml-1">/night</span>
                </div>
              </div>
            </div>

            {/* Reserve Button */}
            <Link href="/payment" className="block">
              <button 
                className="w-full bg-black text-white rounded-full py-4 text-lg font-medium hover:bg-gray-900 transition-colors"
                onClick={handleReserveClick}
              >
                Reserve
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Dropdowns - Positioned fixed to avoid layout issues */}
      {showCalendar && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[100]">
          <div className="bg-white rounded-2xl shadow-xl max-w-[90vw] max-h-[90vh] overflow-y-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Select dates</h3>
              <button 
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                onClick={() => setShowCalendar(false)}
              >
                <X size={20} />
              </button>
            </div>
            <Calendar onDateSelect={handleDateSelect} />
          </div>
        </div>
      )}

      {showGuestCounter && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[100]">
          <div className="bg-white rounded-2xl shadow-xl max-w-[90vw] max-h-[90vh] overflow-y-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Select guests</h3>
              <button 
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                onClick={() => setShowGuestCounter(false)}
              >
                <X size={20} />
              </button>
            </div>
            <GuestCounter onGuestCountChange={handleGuestCountChange} activeTab="campervan" />
          </div>
        </div>
      )}

      {/* Mobile sticky price - displayed at the bottom of the screen on mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center z-50 lg:hidden">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-semibold">$440</span>
            <span className="text-gray-600 text-sm">/night</span>
          </div>
        </div>
        <Link href="/payment">
          <button 
            className="bg-black text-white rounded-full px-6 py-3 text-base font-medium"
            onClick={handleReserveClick}
          >
            Reserve
          </button>
        </Link>
      </div>
      
      {/* Click outside overlay */}
      {(showCalendar || showGuestCounter) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[50]" 
          onClick={handleClickOutside}
        />
      )}
    </>
  );
} 