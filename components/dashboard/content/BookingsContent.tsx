import { Button } from "@/components/ui/button";
import { ChevronDown, Users } from "lucide-react";
import { useState } from "react";

interface Booking {
  id: string;
  clientName: string;
  serviceName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export function BookingsContent() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [filterDate, setFilterDate] = useState("Today");
  
  // Sample booking data
  const bookings: Booking[] = [
    {
      id: "CV042W4",
      clientName: "Badal Singh",
      serviceName: "XYX",
      checkIn: "20/2/2024, 10:30 pm",
      checkOut: "20/2/2024, 10:30 pm",
      guests: 7
    },
    {
      id: "CV042E4",
      clientName: "Badal Singh",
      serviceName: "XYZ",
      checkIn: "20/2/2024, 10:30 pm",
      checkOut: "20/2/2024, 10:30 pm",
      guests: 7
    },
    {
      id: "CV042E4",
      clientName: "Badal Singh",
      serviceName: "XYZ",
      checkIn: "20/2/2024, 10:30 pm",
      checkOut: "20/2/2024, 10:30 pm",
      guests: 7
    },
    {
      id: "CV042E4",
      clientName: "Badal Singh",
      serviceName: "XYZ",
      checkIn: "20/2/2024, 10:30 pm",
      checkOut: "20/2/2024, 10:30 pm",
      guests: 7
    },
    {
      id: "CV042E4",
      clientName: "Badal Singh",
      serviceName: "XYZ",
      checkIn: "20/2/2024, 10:30 pm",
      checkOut: "20/2/2024, 10:30 pm",
      guests: 7
    },
    {
      id: "CV042E4",
      clientName: "Badal Singh",
      serviceName: "XYZ",
      checkIn: "20/2/2024, 10:30 pm",
      checkOut: "20/2/2024, 10:30 pm",
      guests: 7
    },
    {
      id: "CV042344",
      clientName: "Badal Singh",
      serviceName: "XYZ",
      checkIn: "20/2/2024, 10:30 pm",
      checkOut: "20/2/2024, 10:30 pm",
      guests: 7
    }
  ];

  // Get service color based on service name
  const getServiceColor = (serviceName: string) => {
    switch(serviceName) {
      case "XYX":
        return "bg-[#FFF2E2] text-[#996A13]";
      case "XYZ":
        return "bg-[#EAECFB] text-[#404EED]";
      default:
        return "bg-[#E3F4E6] text-[#12B76A]";
    }
  };
  
  return (
    <div className="bg-white rounded-xl h-full px-6 py-6">
      {/* Header area with tabs and new booking button */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex border-b border-gray-200">
          <button 
            className={`pb-4 px-4 font-medium text-base ${activeTab === "upcoming" ? "border-b-2 border-black text-black" : "text-[#7A757D]"}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Bookings
          </button>
          <button 
            className={`pb-4 px-4 font-medium text-base ${activeTab === "past" ? "border-b-2 border-black text-black" : "text-[#7A757D]"}`}
            onClick={() => setActiveTab("past")}
          >
            Past Booking
          </button>
          <button 
            className={`pb-4 px-4 font-medium text-base ${activeTab === "cancelled" ? "border-b-2 border-black text-black" : "text-[#7A757D]"}`}
            onClick={() => setActiveTab("cancelled")}
          >
            Cancelled Bookings
          </button>
        </div>
        
        <Button
          className="rounded-full bg-black hover:bg-black/90 text-white px-6 py-2 flex items-center gap-2"
        >
          <span className="font-medium">+</span>
          <span>New Booking</span>
        </Button>
      </div>
      
      {/* Filter dropdown */}
      <div className="mb-6">
        <button className="border border-gray-200 rounded-md px-4 py-2 flex items-center text-gray-700">
          {filterDate}
          <ChevronDown className="ml-2 w-4 h-4" />
        </button>
      </div>
      
      {/* Bookings table */}
      <div className="overflow-x-auto bg-white rounded-lg">
        <table className="w-full">
          <thead className="bg-[#F9FAFB] border-b border-t border-[#EAECF0]">
            <tr>
              <th className="py-4 px-4 text-left font-medium text-[#667085]">Booking ID</th>
              <th className="py-4 px-4 text-left font-medium text-[#667085]">Client Name</th>
              <th className="py-4 px-4 text-left font-medium text-[#667085]">Service Name</th>
              <th className="py-4 px-4 text-left font-medium text-[#667085]">
                Check In
                <ChevronDown className="inline ml-1 w-4 h-4" />
              </th>
              <th className="py-4 px-4 text-left font-medium text-[#667085]">
                Check Out
                <ChevronDown className="inline ml-1 w-4 h-4" />
              </th>
              <th className="py-4 px-4 text-left font-medium text-[#667085]">No. of Guest</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className="border-b border-[#EAECF0]">
                <td className="py-4 px-4 font-medium text-[#131313]">{booking.id}</td>
                <td className="py-4 px-4 text-[#485467]">{booking.clientName}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-md text-sm ${getServiceColor(booking.serviceName)}`}>
                    {booking.serviceName}
                  </span>
                </td>
                <td className="py-4 px-4 text-[#485467]">{booking.checkIn}</td>
                <td className="py-4 px-4 text-[#485467]">{booking.checkOut}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-[#485467] mr-2" />
                    <span className="text-[#485467]">{booking.guests}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 