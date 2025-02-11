"use client"
import React, { useState, useRef, useEffect } from 'react';
import { LocationIcon, CheckInIcon, CheckOutIcon, GuestIcon, SearchIcon, ActivelyIcon } from "@/public/assets/CustomIcon"
import { GuestCounter } from './searchcomponents/guest-counter';
import { LocationSearch } from './searchcomponents/location-search';
import { Calendar } from './searchcomponents/calendar';
import { TimeSelector } from './searchcomponents/time-selector';

interface DateTimeRange {
  checkIn?: {
    date: Date;
    time?: string;
    period?: 'AM' | 'PM';
  };
  checkOut?: {
    date: Date;
    time?: string;
    period?: 'AM' | 'PM';
  };
}

export default function SearchFilter({ activeTab = 'campervan' }) {
  const [isGuestCounterOpen, setGuestCounterOpen] = useState(false);
  const [isLocationSearchOpen, setLocationSearchOpen] = useState(false);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [isActivitySearchOpen, setActivitySearchOpen] = useState(false);
  const [isTimePickerOpen, setTimePickerOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState("Tracking");
  const [timePickerType, setTimePickerType] = useState<'checkIn' | 'checkOut'>('checkIn');
  
  // Refs for the buttons and popups
  const guestButtonRef = useRef<HTMLButtonElement>(null);
  const locationButtonRef = useRef<HTMLButtonElement>(null);
  const checkInButtonRef = useRef<HTMLButtonElement>(null);
  const checkOutButtonRef = useRef<HTMLButtonElement>(null);
  const activityButtonRef = useRef<HTMLButtonElement>(null);
  const timePickerRef = useRef<HTMLDivElement>(null);
  const guestPopupRef = useRef<HTMLDivElement>(null);
  const locationPopupRef = useRef<HTMLDivElement>(null);
  const calendarPopupRef = useRef<HTMLDivElement>(null);
  const activityPopupRef = useRef<HTMLDivElement>(null);

  const [selectedLocation, setSelectedLocation] = useState("Thailand");
  const [dateTimeRange, setDateTimeRange] = useState<DateTimeRange>({});
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
    setActivitySearchOpen(false);
    setTimePickerOpen(false);
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

      // Activity popup
      if (isActivitySearchOpen && 
          !activityPopupRef.current?.contains(event.target as Node) && 
          !activityButtonRef.current?.contains(event.target as Node)) {
        setActivitySearchOpen(false);
      }

      // Time picker popup
      if (isTimePickerOpen && 
          !timePickerRef.current?.contains(event.target as Node)) {
        setTimePickerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isGuestCounterOpen, isLocationSearchOpen, isCalendarOpen, isActivitySearchOpen, isTimePickerOpen]);

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

  const toggleActivitySearch = () => {
    closeAllPopups();
    setActivitySearchOpen(true);
  };

  const formatDateTime = (dateTime?: { date: Date; time?: string; period?: 'AM' | 'PM' }) => {
    if (!dateTime?.date) return "Add date";
    const formattedDate = dateTime.date.toLocaleDateString();
    if (dateTime.time && dateTime.period) {
      return `${formattedDate}, ${dateTime.time}${dateTime.period}`;
    }
    return formattedDate;
  };

  const handleTimeSelect = (time: string, period: 'AM' | 'PM') => {
    setDateTimeRange(prev => ({
      ...prev,
      [timePickerType]: {
        ...prev[timePickerType],
        time,
        period
      }
    }));
    setTimePickerOpen(false);
  };

  const showTimePicker = (type: 'checkIn' | 'checkOut') => {
    if (activeTab !== 'campervan') return;
    setTimePickerType(type);
    setTimePickerOpen(true);
  };

  const formatGuestCount = () => {
    const total = guestCount.adults + guestCount.children + guestCount.infants;
    if (total === 0) return "Add guests";
    return `${total} guest${total > 1 ? 's' : ''}`;
  };

  const activities = [
    "Tracking",
    "Hiking",
    "Camping",
    "Fishing",
    "Kayaking",
    "Rock Climbing"
  ];

  return (
    <div className="hidden md:block relative">
      <div className="flex h-[100px] items-center gap-2 bg-[#F6F6F6] px-[2rem] py-[18px] rounded-[20px]">
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

          {activeTab === 'activity' ? (
            <>
              <div className="flex flex-col flex-1 ml-[20px] relative">
                <div className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                  <CheckInIcon />
                  Date
                </div>
                <button 
                  ref={checkInButtonRef}
                  onClick={toggleCalendar}
                  className="bg-transparent text-gray-900 text-base font-medium focus:outline-none ml-1 text-left"
                >
                  {dateTimeRange.checkIn?.date ? dateTimeRange.checkIn.date.toLocaleDateString() : "Add date"}
                </button>
              </div>

              <div className="w-px h-12 bg-[#D6D6D6]" />

              <div className="flex flex-col flex-1 ml-[20px] relative">
                <div className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                  <ActivelyIcon />
                  Activity
                </div>
                <button 
                  ref={activityButtonRef}
                  onClick={toggleActivitySearch}
                  className="bg-transparent text-gray-900 text-base font-medium focus:outline-none ml-1 text-left"
                >
                  {selectedActivity}
                </button>
                {isActivitySearchOpen && (
                  <div 
                    ref={activityPopupRef}
                    className="absolute top-full left-0 mt-2 z-50 shadow-lg bg-white rounded-lg p-4 w-[200px]"
                  >
                    {activities.map((activity) => (
                      <button
                        key={activity}
                        onClick={() => {
                          setSelectedActivity(activity);
                          setActivitySearchOpen(false);
                        }}
                        className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded-lg"
                      >
                        {activity}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col flex-1 ml-[20px] relative">
                <div className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                  <CheckInIcon />
                  Check in
                </div>
                <button 
                  ref={checkInButtonRef}
                  onClick={() => {
                    if (dateTimeRange.checkIn?.date && activeTab === 'campervan') {
                      showTimePicker('checkIn');
                    } else {
                      toggleCalendar();
                    }
                  }}
                  className="bg-transparent text-gray-900 text-base font-medium focus:outline-none ml-1 text-left"
                >
                  {formatDateTime(dateTimeRange.checkIn)}
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
                  onClick={() => {
                    if (dateTimeRange.checkOut?.date && activeTab === 'campervan') {
                      showTimePicker('checkOut');
                    } else {
                      toggleCalendar();
                    }
                  }}
                  className="bg-transparent text-gray-900 text-base font-medium focus:outline-none ml-1 text-left"
                >
                  {formatDateTime(dateTimeRange.checkOut)}
                </button>
              </div>
            </>
          )}

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
              if (activeTab === 'activity') {
                setDateTimeRange({
                  checkIn: { date: dates[0] }
                });
              } else {
                setDateTimeRange({
                  checkIn: { date: dates[0] },
                  checkOut: { date: dates[1] }
                });
                if (activeTab === 'campervan') {
                  setTimePickerType('checkIn');
                  setTimePickerOpen(true);
                }
              }
              setCalendarOpen(false);
            }}
          />
        </div>
      )}

      {isTimePickerOpen && activeTab === 'campervan' && (
        <div 
          ref={timePickerRef}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50"
        >
          <TimeSelector 
            onTimeSelect={handleTimeSelect}
            onClose={() => {
              setTimePickerOpen(false);
              if (timePickerType === 'checkIn' && dateTimeRange.checkOut?.date) {
                setTimePickerType('checkOut');
                setTimePickerOpen(true);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}