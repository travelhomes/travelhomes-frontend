"use client";
import React, { useState } from "react";
import { Star, X, Check, ArrowLeft, AlertCircle, Calendar as CalendarIcon, Users, MapPin, Save } from "lucide-react";
import Image from "next/image";
import CamperImage from "@/public/Rectangle 8.png"
import { ArrowRightIcon, EditIcon } from "@/public/assets/CustomIcon"
import { Calendar } from "@/components/landingPage/searchcomponents/calendar";
import { GuestCounter } from "@/components/landingPage/searchcomponents/guest-counter";
import { LocationSearch } from "@/components/landingPage/searchcomponents/location-search";
import { useRouter } from "next/navigation";

export default function Payment() {
  const router = useRouter();
  // Personal details form data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: ""
  });
  
  // Booking details data (date, guest, location)
  const [bookingDetails, setBookingDetails] = useState({
    date: "27-28 Jan",
    guests: "2",
    location: "Mumbai"
  });
  
  // State to track if booking details are being edited
  const [isEditingBooking, setIsEditingBooking] = useState(false);
  
  // State to track which component modal is open
  const [showCalendar, setShowCalendar] = useState(false);
  const [showGuestCounter, setShowGuestCounter] = useState(false);
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: ""
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Toggle edit mode for booking details
  const toggleEditBooking = () => {
    setIsEditingBooking(!isEditingBooking);
    
    // Close any open components when toggling edit mode
    setShowCalendar(false);
    setShowGuestCounter(false);
    setShowLocationSearch(false);
  };
  
  // Handle changes to booking details
  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Save booking details and exit edit mode
  const saveBookingDetails = () => {
    setIsEditingBooking(false);
    
    // Close any open components
    setShowCalendar(false);
    setShowGuestCounter(false);
    setShowLocationSearch(false);
  };
  
  // Handle date selection from Calendar component
  const handleDateSelect = (dates: Date[]) => {
    if (dates.length === 2) {
      const startDate = formatDate(dates[0]);
      const endDate = formatDate(dates[1]);
      
      setBookingDetails(prev => ({
        ...prev,
        date: `${startDate} - ${endDate}`
      }));
      
      setShowCalendar(false);
    }
  };
  
  // Format date helper
  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day} ${month}`;
  };
  
  // Handle guest count changes
  const handleGuestCountChange = (counts: { adults: number; children: number; infants: number }) => {
    const totalGuests = counts.adults + counts.children;
    
    setBookingDetails(prev => ({
      ...prev,
      guests: totalGuests.toString()
    }));
  };
  
  // Handle location selection
  const handleLocationSelect = (location: string) => {
    setBookingDetails(prev => ({
      ...prev,
      location
    }));
    
    setShowLocationSearch(false);
  };
  
  // Close all modals when clicking outside
  const handleClickOutside = () => {
    setShowCalendar(false);
    setShowGuestCounter(false);
    setShowLocationSearch(false);
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    
    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        }
        break;
        
      case "phone":
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!/^\+?[\d\s-]{10,}$/.test(value)) {
          error = "Please enter a valid phone number";
        }
        break;
        
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
        
      case "address":
        if (!value.trim()) {
          error = "Address is required";
        }
        break;
        
      case "city":
        if (!value.trim()) {
          error = "City is required";
        }
        break;
        
      case "state":
        if (!value.trim()) {
          error = "State is required";
        }
        break;
        
      case "postalCode":
        if (!value.trim()) {
          error = "Postal code is required";
        }
        break;
        
      default:
        break;
    }
    
    return error;
  };

  const validateForm = () => {
    const newErrors = Object.keys(formData).reduce((acc, field) => {
      const value = formData[field as keyof typeof formData];
      const error = validateField(field, value);
      return { ...acc, [field]: error };
    }, {} as Record<string, string>) as {
      name: string;
      phone: string;
      email: string;
      address: string;
      city: string;
      state: string;
      postalCode: string;
    };

    setErrors(newErrors);
    
    // Mark all fields as touched when submitting
    const allTouched = Object.keys(formData).reduce((acc, field) => {
      return { ...acc, [field]: true };
    }, {} as Record<string, boolean>);
    
    setTouched(allTouched);
    
    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error !== "");
    
    if (hasErrors) {
      setFormError("Error! This payment was not processed. Please fix the highlighted errors.");
    } else {
      setFormError("");
    }
    
    return !hasErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowSuccess(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate the field
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  return (
    <main className="min-h-screen py-[1rem] px-[1rem] md:px-[2rem] lg:px-[5rem] relative">
      <div className="mx-auto p-4 flex flex-col gap-4">
        <div className="flex flex-col-reverse lg:flex-row gap-6">
          {/* Left Column */}
          <div className="flex-1">
            <div className="hidden lg:block">
              <button
              onClick={() => router.back()}
                className="inline-flex items-center text-sm text-semibold hover:text-primary mb-3"
              >
                <ArrowRightIcon />
                <span className="ml-2">Back</span>
              </button>
            </div>

            {formError && (
              <div className="p-4 hidden md:block border rounded-[6px] bg-[#DA190B1F] text-[#DA190B] border-[#DA190B] mb-[24px]">
                {formError}
              </div>
            )}
            
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border-[1px]">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-2xl font-semibold text-[#1C2939]">
                  Booking Details
                </h1>
                <button 
                  onClick={isEditingBooking ? saveBookingDetails : toggleEditBooking}
                  className="flex items-center gap-1 text-[#1C2939] hover:text-gray-700 transition-colors"
                >
                  {isEditingBooking ? (
                    <>
                      <Save size={18} />
                      <span className="text-sm font-medium">Save</span>
                    </>
                  ) : (
                    <EditIcon />
                  )}
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h2 className="text-[#334054] mb-1 flex items-center gap-1">
                      <CalendarIcon size={16} className="text-gray-500" />
                      Date
                    </h2>
                    {isEditingBooking ? (
                      <button
                        onClick={() => {
                          setShowCalendar(!showCalendar);
                          setShowGuestCounter(false);
                          setShowLocationSearch(false);
                        }}
                        className="w-full px-3 py-1.5 border border-[#B0B0B0] rounded-[6px] outline-none text-[#717171] font-medium text-left flex justify-between items-center"
                      >
                        <span>{bookingDetails.date}</span>
                        <CalendarIcon size={16} className="text-gray-400" />
                      </button>
                    ) : (
                      <p className="text-[#717171] font-medium">{bookingDetails.date}</p>
                    )}
                  </div>
                  <div>
                    <h2 className="text-[#334054] mb-1 flex items-center gap-1">
                      <Users size={16} className="text-gray-500" />
                      Guest
                    </h2>
                    {isEditingBooking ? (
                      <button
                        onClick={() => {
                          setShowGuestCounter(!showGuestCounter);
                          setShowCalendar(false);
                          setShowLocationSearch(false);
                        }}
                        className="w-full px-3 py-1.5 border border-[#B0B0B0] rounded-[6px] outline-none text-[#717171] font-medium text-left flex justify-between items-center"
                      >
                        <span>{bookingDetails.guests} Guest{parseInt(bookingDetails.guests) !== 1 ? 's' : ''}</span>
                        <Users size={16} className="text-gray-400" />
                      </button>
                    ) : (
                      <p className="text-[#717171] font-medium">{bookingDetails.guests} Guest{parseInt(bookingDetails.guests) !== 1 ? 's' : ''}</p>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-[#334054] mb-1 flex items-center gap-1">
                    <MapPin size={16} className="text-gray-500" />
                    Location
                  </h2>
                  {isEditingBooking ? (
                    <button
                      onClick={() => {
                        setShowLocationSearch(!showLocationSearch);
                        setShowCalendar(false);
                        setShowGuestCounter(false);
                      }}
                      className="w-full px-3 py-1.5 border border-[#B0B0B0] rounded-[6px] outline-none text-[#717171] font-medium text-left flex justify-between items-center"
                    >
                      <span>{bookingDetails.location}</span>
                      <MapPin size={16} className="text-gray-400" />
                    </button>
                  ) : (
                    <p className="text-[#717171] font-medium">{bookingDetails.location}</p>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-xl font-semibold text-[#1C2939]">
                    Enter your details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#334054] mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Enter your name"
                        className={`w-full px-4 py-2 border ${touched.name && errors.name ? 'border-red-500' : 'border-[#B0B0B0]'} rounded-[8px] outline-none`}
                      />
                      {touched.name && errors.name && (
                        <div className="flex items-center mt-1 text-red-500 text-sm">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.name}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-[#334054] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="+91 52024 42423"
                        className={`w-full px-4 py-2 border ${touched.phone && errors.phone ? 'border-red-500' : 'border-[#B0B0B0]'} rounded-[8px] outline-none`}
                      />
                      {touched.phone && errors.phone && (
                        <div className="flex items-center mt-1 text-red-500 text-sm">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.phone}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#334054] mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Enter your email"
                      className={`w-[55%] px-4 py-2 border ${touched.email && errors.email ? 'border-red-500' : 'border-[#B0B0B0]'} rounded-[8px] outline-none`}
                    />
                    {touched.email && errors.email && (
                      <div className="flex items-center mt-1 text-red-500 text-sm">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#334054] mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Locality"
                      className={`w-full px-4 py-2 border ${touched.address && errors.address ? 'border-red-500' : 'border-[#B0B0B0]'} rounded-[8px] outline-none`}
                    />
                    {touched.address && errors.address && (
                      <div className="flex items-center mt-1 text-red-500 text-sm">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.address}
                      </div>
                    )}

                    <div className="flex gap-4 mt-3">
                      <div className="w-full">
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="City"
                          className={`w-full px-4 py-2 border ${touched.city && errors.city ? 'border-red-500' : 'border-[#B0B0B0]'} rounded-[8px] outline-none`}
                        />
                        {touched.city && errors.city && (
                          <div className="flex items-center mt-1 text-red-500 text-sm">
                            <AlertCircle size={14} className="mr-1" />
                            {errors.city}
                          </div>
                        )}
                      </div>

                      <div className="w-full">
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="State"
                          className={`w-full px-4 py-2 border ${touched.state && errors.state ? 'border-red-500' : 'border-[#B0B0B0]'} rounded-[8px] outline-none`}
                        />
                        {touched.state && errors.state && (
                          <div className="flex items-center mt-1 text-red-500 text-sm">
                            <AlertCircle size={14} className="mr-1" />
                            {errors.state}
                          </div>
                        )}
                      </div>

                      <div className="w-full">
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="Postal Code"
                          className={`w-full px-4 py-2 border ${touched.postalCode && errors.postalCode ? 'border-red-500' : 'border-[#B0B0B0]'} rounded-[8px] outline-none`}
                        />
                        {touched.postalCode && errors.postalCode && (
                          <div className="flex items-center mt-1 text-red-500 text-sm">
                            <AlertCircle size={14} className="mr-1" />
                            {errors.postalCode}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="md:w-[130px] w-full bg-black text-white py-3 rounded-[60px] transition-colors hover:bg-gray-800"
                  >
                    Proceed
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-[370px] h-fit rounded-[12px] shadow-sw">
            <div className="md:hidden block">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center text-sm text-semibold hover:text-primary mb-3"
              >
                <ArrowLeft className="w-4 h-4" />{" "}
                <span className="ml-2">Back</span>
              </button>
            </div>

            {formError && (
              <div className="p-4 block md:hidden border rounded-[6px] bg-[#DA190B1F] text-[#DA190B] border-[#DA190B] mb-[24px]">
                {formError}
              </div>
            )}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex gap-4 mb-6">
                <Image
                  src={CamperImage}
                  alt="Camper Van"
                  width={125}
                  height={110}
                  className=" h-[110px] rounded-lg"
                />
                <div>
                  <span className="text-[12px] text-[#717171]">Camper Van</span>
                  <h2 className="text-[18px] font-semibold text-[#1C2939]">
                    My Rolling Homes
                  </h2>
                  <div className="flex items-center gap-1 mt-[25px] text-[16px]">
                    <Star className="w-4 h-4 fill-current text-[#222222]" />
                    <span className="font-medium text-[#222222]">4.91</span>
                    <span className="text-[#5E5E5E]">• 337 reviews</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-b border-[#DDDDDD] py-4 mb-[24px]">
                <div className="flex items-center text-sm text-[#5E5E5E]">
                  <span>Your booking is protected by</span>
                  <span className="font-semibold text-[#131313] ml-1">
                    TravelHomes
                  </span>
                </div>
              </div>

              <h3 className="text-[22px] text-[#222222] font-semibold mb-4">
                Price details
              </h3>

              <div className="space-y-3 text-[#222222]">
                <div className="flex justify-between">
                  <span className="text-gray-600">500 x 5 nights</span>
                  <span>$2,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Long stay discount</span>
                  <span>-$2,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cleaning fee</span>
                  <span>$200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service fee</span>
                  <span>$0</span>
                </div>
                <div className="pt-[24px] border-t flex justify-between font-semibold">
                  <span>Total (USD)</span>
                  <span>$2,400</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Modal */}
      {isEditingBooking && showCalendar && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleClickOutside}
          />
          <div className="bg-white rounded-2xl p-6 relative z-10 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Select dates</h3>
              <button 
                onClick={() => setShowCalendar(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <Calendar onDateSelect={handleDateSelect} />
          </div>
        </div>
      )}

      {/* Guest Counter Modal */}
      {isEditingBooking && showGuestCounter && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleClickOutside}
          />
          <div className="bg-white rounded-2xl p-6 relative z-10 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Select guests</h3>
              <button 
                onClick={() => setShowGuestCounter(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <GuestCounter onGuestCountChange={handleGuestCountChange} />
            <div className="mt-4 flex justify-end">
              <button 
                onClick={() => setShowGuestCounter(false)}
                className="px-4 py-2 bg-black text-white rounded-full font-medium"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Location Search Modal */}
      {isEditingBooking && showLocationSearch && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleClickOutside}
          />
          <div className="bg-white rounded-2xl p-6 relative z-10 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Select location</h3>
              <button 
                onClick={() => setShowLocationSearch(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <LocationSearch onLocationSelect={handleLocationSelect} />
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowSuccess(false)}
          />
          <div className="bg-white rounded-2xl p-8 relative z-10 max-w-md w-full mx-4">
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-8 h-8 bg-[#E5E5E5] rounded-full p-2" />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Congrats!</h2>
              <p className="text-gray-600 mb-6">
                Your payment is processed successfully. You will receive a
                confirmation email shortly.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowSuccess(false)}
                  className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-50"
                >
                  Back To Home
                </button>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800"
                >
                  Booking Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
