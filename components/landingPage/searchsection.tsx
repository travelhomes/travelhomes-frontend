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

const dummyLocations = [
  "Bangkok",
  "Phuket",
  "Manali",
  "Shimla",
  "Goa",
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Kolkata"
];

const dummyActivities = [
  "Trekking",
  "Hiking",
  "Mountain Climbing",
  "Rock Climbing",
  "Trail Running",
  "Mountain Biking",
  "Camping",
  "Fishing",
  "Kayaking",
  "Canoeing",
  "Bird Watching",
  "Photography",
  "Wildlife Safari",
  "River Rafting",
  "Zip Lining"
];

export default function SearchFilter({ activeTab = 'campervan' }) {
  const [isGuestCounterOpen, setGuestCounterOpen] = useState(false);
  const [isLocationSearchOpen, setLocationSearchOpen] = useState(false);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [isActivitySearchOpen, setActivitySearchOpen] = useState(false);
  const [isTimePickerOpen, setTimePickerOpen] = useState(false);
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

  const [fromLocationInput, setFromLocationInput] = useState("");
  const [toLocationInput, setToLocationInput] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
  const [toSuggestions, setToSuggestions] = useState<string[]>([]);
  const [isFromLocationSearchOpen, setFromLocationSearchOpen] = useState(false);
  const [isToLocationSearchOpen, setToLocationSearchOpen] = useState(false);

  const fromLocationPopupRef = useRef<HTMLDivElement>(null);
  const toLocationPopupRef = useRef<HTMLDivElement>(null);

  const [selectedLocation, setSelectedLocation] = useState("Thailand");
  const [dateTimeRange, setDateTimeRange] = useState<DateTimeRange>({});
  const [guestCount, setGuestCount] = useState({
    adults: 0,
    children: 0,
    infants: 0
  });

  const [activityInput, setActivityInput] = useState("Trekking");
  const [activitySuggestions, setActivitySuggestions] = useState<string[]>([]);

  // Close all popups
  const closeAllPopups = () => {
    setGuestCounterOpen(false);
    setFromLocationSearchOpen(false);
    setToLocationSearchOpen(false);
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

      // From Location Search popup
      if (isFromLocationSearchOpen && 
          !fromLocationPopupRef.current?.contains(event.target as Node)) {
        setFromLocationSearchOpen(false);
      }
      
      // To Location Search popup
      if (isToLocationSearchOpen && 
          !toLocationPopupRef.current?.contains(event.target as Node)) {
        setToLocationSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFromLocationSearchOpen, isToLocationSearchOpen, isGuestCounterOpen, isCalendarOpen, isActivitySearchOpen, isTimePickerOpen, isLocationSearchOpen]);

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

  const handleCheckInOutClick = (type: 'checkIn' | 'checkOut') => {
    // If there's no date selected, open calendar first
    if (!dateTimeRange[type]?.date) {
      setTimePickerType(type);
      setCalendarOpen(true);
      return;
    }
    
    // If date is selected but no time, open time picker
    if (dateTimeRange[type]?.date && !dateTimeRange[type]?.time) {
      setTimePickerType(type);
      setTimePickerOpen(true);
      return;
    }
    
    // If both date and time are selected, open calendar for editing
    setTimePickerType(type);
    setCalendarOpen(true);
  };

  const formatDateTime = (dateTime?: { date: Date; time?: string }) => {
    if (!dateTime?.date) return "Add date";
    const formattedDate = dateTime.date.toLocaleDateString();
    if (dateTime.time) {
      return `${formattedDate}, ${dateTime.time}`;
    }
    return formattedDate;
  };

  const handleTimeSelect = (timeWithPeriod: string, type: 'checkIn' | 'checkOut') => {
    setDateTimeRange(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        time: timeWithPeriod
      }
    }));
    
    // We don't close the picker automatically now as users can set both times at once
    // The picker will be closed when the user clicks "Done" button
  };

  const formatGuestCount = () => {
    const total = guestCount.adults + guestCount.children + guestCount.infants;
    if (total === 0) return "Add guests";
    return `${total} guest${total > 1 ? 's' : ''}`;
  };

  const handleActivitySearch = (input: string) => {
    const value = input.toLowerCase();
    const filtered = dummyActivities.filter(activity => 
      activity.toLowerCase().includes(value)
    );
    setActivityInput(input);
    setActivitySuggestions(filtered);
  };

  const selectActivity = (activity: string) => {
    setActivityInput(activity);
    setActivitySuggestions([]);
    setActivitySearchOpen(false);
  };

  const handleLocationSearch = (input: string, type: 'from' | 'to') => {
    const value = input.toLowerCase();
    const filtered = dummyLocations.filter(location => 
      location.toLowerCase().includes(value)
    );
    
    if (type === 'from') {
      setFromLocationInput(input);
      setFromSuggestions(filtered);
    } else {
      setToLocationInput(input);
      setToSuggestions(filtered);
    }
  };

  const selectLocation = (location: string, type: 'from' | 'to') => {
    if (type === 'from') {
      setFromLocationInput(location);
      setFromSuggestions([]);
      setFromLocationSearchOpen(false);
    } else {
      setToLocationInput(location);
      setToSuggestions([]);
      setToLocationSearchOpen(false);
    }
  };

  return (
    <div className="hidden md:block relative">
      <div className="flex h-[100px] items-center gap-2 bg-[#F6F6F6] px-[2rem] py-[18px] rounded-[20px]">
        <div className="flex items-center gap-2 flex-1">
          {activeTab === 'campervan' ? (
            <>
              <div className="flex flex-col flex-1 relative">
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <span className="inline-block w-4 h-4 mb-[12px]">
                    <LocationIcon />
                  </span>
                  Location From
                </div>
                <input
                  type="text"
                  value={fromLocationInput}
                  onChange={(e) => handleLocationSearch(e.target.value, 'from')}
                  onFocus={() => setFromLocationSearchOpen(true)}
                  placeholder="Enter location"
                  className="bg-transparent text-[#211C16] text-[20px] font-medium focus:outline-none ml-2 w-full"
                />
                {isFromLocationSearchOpen && fromSuggestions.length > 0 && (
                  <div 
                    ref={fromLocationPopupRef}
                    className="absolute top-full left-0 mt-2 z-50 bg-white rounded-lg shadow-lg w-full"
                  >
                    {fromSuggestions.map((location) => (
                      <button
                        key={location}
                        onClick={() => selectLocation(location, 'from')}
                        className="w-full  text-left px-4 py-2 hover:bg-gray-100"
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-px h-12 bg-[#D6D6D6]" />

              <div className="flex flex-col flex-1 relative">
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <span className="inline-block w-4 h-4 mb-[12px]">
                    <LocationIcon />
                  </span>
                  Location To
                </div>
                <input
                  type="text"
                  value={toLocationInput}
                  onChange={(e) => handleLocationSearch(e.target.value, 'to')}
                  onFocus={() => setToLocationSearchOpen(true)}
                  placeholder="Enter location"
                  className="bg-transparent text-[#211C16] text-[20px] font-medium focus:outline-none ml-2 w-full"
                />
                {isToLocationSearchOpen && toSuggestions.length > 0 && (
                  <div 
                    ref={toLocationPopupRef}
                    className="absolute top-full left-0 mt-2 z-50 bg-white rounded-lg shadow-lg w-full"
                  >
                    {toSuggestions.map((location) => (
                      <button
                        key={location}
                        onClick={() => selectLocation(location, 'to')}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
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
                className="bg-transparent text-[#211C16] text-[20px] font-medium focus:outline-none ml-2 text-left"
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
                    setLocationSearchOpen(false);
                  }} />
                </div>
              )}
            </div>
          )}

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
                  className="bg-transparent text-[20px] font-medium focus:outline-none ml-1 text-left"
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
                <input
                  type="text"
                  value={activityInput}
                  onChange={(e) => handleActivitySearch(e.target.value)}
                  onFocus={() => setActivitySearchOpen(true)}
                  placeholder="Enter activity"
                  className="bg-transparent text-[#211C16] text-[20px] font-medium focus:outline-none ml-1 w-full"
                />
                {isActivitySearchOpen && activitySuggestions.length > 0 && (
                  <div 
                    ref={activityPopupRef}
                    className="absolute top-full left-0 mt-2 z-50 bg-white rounded-lg shadow-lg w-full"
                  >
                    {activitySuggestions.map((activity) => (
                      <button
                        key={activity}
                        onClick={() => selectActivity(activity)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
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
                  onClick={() => handleCheckInOutClick('checkIn')}
                  className="bg-transparent text-[#211C16] text-[20px] font-medium focus:outline-none ml-1 text-left"
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
                  onClick={() => handleCheckInOutClick('checkOut')}
                  className="bg-transparent text-[#211C16] text-[20px] font-medium focus:outline-none ml-1 text-left"
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
              className="bg-transparent text-left text-[#211C16] text-[20px] font-medium focus:outline-none ml-1"
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
            checkInTime={dateTimeRange.checkIn?.time || null}
            checkOutTime={dateTimeRange.checkOut?.time || null}
            onTimeSelect={handleTimeSelect}
            onClose={() => {
              setTimePickerOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}