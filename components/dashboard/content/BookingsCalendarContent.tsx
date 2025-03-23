import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";

interface BookingEntry {
  id: string;
  guestName: string;
  startDate: string;
  endDate: string;
  color: string;
  property: string;
  dateRange: number[];
}

export function BookingsCalendarContent() {
  const [currentMonth, setCurrentMonth] = useState("November, 2024");
  
  // Mock data for properties and bookings
  const properties = [
    { id: "prop1", name: "Newtown Motorhome" },
    { id: "prop2", name: "RV Motor Newway" },
    { id: "prop3", name: "Asthetic CamperVan" },
    { id: "prop4", name: "RV Motor Newway" },
    { id: "prop5", name: "Camper Trailer Newon" },
    { id: "prop6", name: "Camper Trailer Highway" },
    { id: "prop7", name: "Newtown Motorhome" },
    { id: "prop8", name: "Camper Trailer Newon" },
  ];
  
  // Sample booking data
  const bookings: BookingEntry[] = [
    {
      id: "booking1",
      guestName: "Badal Singh",
      startDate: "04/11",
      endDate: "08/11",
      color: "bg-[#FFF2E2]",
      property: "prop1",
      dateRange: [4, 5, 6, 7, 8]
    },
    {
      id: "booking2",
      guestName: "Badal Singh",
      startDate: "04/11",
      endDate: "08/11",
      color: "bg-[#DDE7FF]",
      property: "prop2",
      dateRange: [15,16,17]
    },
    {
      id: "booking3",
      guestName: "Badal Singh",
      startDate: "04/11",
      endDate: "08/11",
      color: "bg-[#E0DDFF]",
      property: "prop4",
      dateRange: [7, 8, 9, 10, 11, 12]
    },
    {
      id: "booking4",
      guestName: "Ayush Raj",
      startDate: "01/11",
      endDate: "11/11",
      color: "bg-[#FCE1F9]",
      property: "prop6",
      dateRange: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    },
    {
      id: "booking5",
      guestName: "Abhishek Kumar",
      startDate: "10/11",
      endDate: "12/11",
      color: "bg-[#D6F5D6]",
      property: "prop8",
      dateRange: [10, 11, 12, 13]
    }
  ];
  
  // Generate array of days (1-15) for the calendar header
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  
  // Function to get booking for a specific property and day
  const getBookingForCell = (propertyId: string, day: number) => {
    return bookings.find(booking => 
      booking.property === propertyId && booking.dateRange.includes(day)
    );
  };
  
  // Check if a day is the first day of a booking range
  const isFirstDayOfBooking = (propertyId: string, day: number) => {
    const booking = getBookingForCell(propertyId, day);
    if (!booking) return false;
    return booking.dateRange[0] === day;
  };
  
  // Check if a day is the last day of a booking range
  const isLastDayOfBooking = (propertyId: string, day: number) => {
    const booking = getBookingForCell(propertyId, day);
    if (!booking) return false;
    const lastIndex = booking.dateRange.length - 1;
    return booking.dateRange[lastIndex] === day;
  };
  
  // Get the grid column span for a booking starting on this day
  const getColSpan = (propertyId: string, day: number) => {
    const booking = getBookingForCell(propertyId, day);
    if (!booking || !isFirstDayOfBooking(propertyId, day)) return 1;
    return booking.dateRange.length;
  };

  // Format day number with leading zero
  const formatDay = (day: number) => day < 10 ? `0${day}` : `${day}`;

  return (
    <div className="bg-white rounded-[12px] h-[90vh]">
      {/* Header with month selector and new booking button - combined in one row */}
      <div className="flex justify-between items-center py-[16px] px-[20px] border-b border-[#EAECF0]">
        <div className="flex items-center gap-4">
          <button 
            className="flex items-center text-lg font-semibold "
          >
            {currentMonth}
            <ChevronDown className="ml-2 h-5 w-5" />
          </button>
        </div>
        
        <Button
          className="rounded-full bg-black hover:bg-black/90 text-white px-6 py-[25px] flex items-center gap-2"
        >
          <span className="text-lg font-bold">+</span>
          <span>New Booking</span>
        </Button>
      </div>
      
      {/* Calendar view with horizontal scrolling */}
      <div className="p-[20px]">
      <div className="overflow-x-auto bg-white rounded-lg border border-[#F2F4F7]">
        <table className="w-full border-collapse table-fixed" style={{ minWidth: "1300px" }}>
          <colgroup>
            <col style={{ width: "250px" }} />
            {days.map(day => (
              <col key={`col-${day}`} style={{ width: "70px" }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th className="py-4 bg-[#FBFBFB] px-4 text-left font-medium text-[#131313] border-b border-r border-[#F2F4F7] whitespace-nowrap">
                Names
              </th>
              {days.map(day => (
                <th 
                  key={`header-${day}`}
                  className="py-4 bg-[#FBFBFB] px-4 text-center font-medium text-gray-600 border-b border-r border-[#F2F4F7] last:border-r-0"
                >
                  {formatDay(day)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {properties.map(property => (
              <tr key={property.id}>
                <td className="text-[#485467] p-[20px] border-b border-r border-[#F2F4F7] whitespace-nowrap">
                  {property.name}
                </td>
                
                {days.map(day => {
                  const booking = getBookingForCell(property.id, day);
                  const isFirstDay = isFirstDayOfBooking(property.id, day);
                  const colSpan = getColSpan(property.id, day);
                  
                  // Skip cells that are part of a multi-day booking but not the first day
                  if (booking && !isFirstDay) return null;
                  
                  return booking && isFirstDay ? (
                    <td 
                      key={`${property.id}-${day}`}
                      className={`${booking.color} p-2 h-14 border-b border-r border-[#F2F4F7] last:border-r-0`}
                      colSpan={colSpan}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{booking.guestName}</span>
                        {booking.startDate && (
                          <div className="text-xs flex items-center gap-1">
                            <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 2V5" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M16 2V5" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M3.5 9.09H20.5" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>{booking.startDate} - {booking.endDate}</span>
                          </div>
                        )}
                      </div>
                    </td>
                  ) : (
                    <td 
                      key={`${property.id}-${day}`}
                      className="h-14 text-center text-gray-500 border-b border-r border-[#F2F4F7] last:border-r-0"
                    >
                      <div className="text-sm">{formatDay(day)}</div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      </div>
    </div>
  );
} 