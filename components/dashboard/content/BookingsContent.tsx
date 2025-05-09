import { Button } from "@/components/ui/button";
import { ChevronDown, Users, X } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface Booking {
  id: string;
  clientName: string;
  serviceName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  location?: string;
}

// Modal component that uses createPortal for better overlay
const BookingModal = ({ booking, onClose }: { booking: Booking; onClose: () => void }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div 
        className="fixed inset-0" 
        onClick={onClose}
      />
      <div className="flex items-center justify-center min-h-screen px-4">
        <div 
          className="bg-white w-[780px] rounded-xl p-8 h-[390px] relative z-[10000]"
          onClick={(e) => e.stopPropagation()}
        >
           <button 
              onClick={onClose}
              className="absolute right-4 p-[4px] bg-[#E5E5E5] rounded-[30px] top-4 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>
          
          <h2 className="text-2xl mb-[28px]">Trip Start</h2>
          
          <div className="grid grid-cols-3 gap-x-8 gap-y-6">
            <div>
              <label className="block text-[#212121] mb-3">Booking ID</label>
              <p className="text-[20px] text-[#2A2A2A]">{booking.id}</p>
            </div>
            
            <div>
              <label className="block text-[#212121] mb-3">Client Name</label>
              <p className="text-[20px] text-[#2A2A2A]">{booking.clientName}</p>
            </div>
            
            <div>
              <label className="block text-[#212121] mb-3">Service Name</label>
              <p className="text-[20px] text-[#2A2A2A] font-normal">₹ 9.5 / kWh</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-x-8 gap-y-6 mt-6">
            <div>
              <label className="block text-[#212121] mb-3">Check In</label>
              <p className="text-[20px] text-[#2A2A2A]">{booking.checkIn}</p>
            </div>
            
            <div>
              <label className="block text-[#212121] mb-3">Check Out</label>
              <p className="text-[20px] text-[#2A2A2A]">{booking.checkOut}</p>
            </div>
            
            <div>
              <label className="block text-[#212121] mb-3">No. of Guest</label>
              <p className="text-[20px] text-[#2A2A2A]">{booking.guests}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-[#212121] mb-3">Location</label>
            <p className="text-[20px] text-[#2A2A2A]">{booking.location || "Chhota govinpur janta market near shiva borwell, Jamshedpur, Jharkhand Pin - 831015"}</p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export function BookingsContent() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [filterDate] = useState("Today");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  
  // Sample booking data for list view
  const bookings: Booking[] = [
    {
      id: "CV042W4",
      clientName: "Badal Singh",
      serviceName: "XYX",
      checkIn: "20/2/2024, 10:30 pm",
      checkOut: "20/2/2024, 10:30 pm",
      guests: 7,
      location: "Chhota govinpur janta market near shiva borwell, Jamshedpur, Jharkhand Pin - 831015"
    },
    {
      id: "CV042E4",
      clientName: "Badal Singh",
      serviceName: "XYZ",
      checkIn: "20/2/2024, 10:30 pm",
      checkOut: "20/2/2024, 10:30 pm",
      guests: 7,
      location: "Chhota govinpur janta market near shiva borwell, Jamshedpur, Jharkhand Pin - 831015"
    },
    {
      id: "CV042E4",
      clientName: "Badal Singh",
      serviceName: "XYZ",
      checkIn: "20/2/2024, 10:30 pm",
      checkOut: "20/2/2024, 10:30 pm",
      guests: 7,
      location: "Chhota govinpur janta market near shiva borwell, Jamshedpur, Jharkhand Pin - 831015"
    },
    {
      id: "CV042E4",
      clientName: "Badal Singh",
      serviceName: "XYZ",
      checkIn: "20/2/2024, 10:30 pm",
      checkOut: "20/2/2024, 10:30 pm",
      guests: 7,
      location: "Chhota govinpur janta market near shiva borwell, Jamshedpur, Jharkhand Pin - 831015"
    },
    {
      id: "CV042E4",
      clientName: "Badal Singh",
      serviceName: "XYZ",
      checkIn: "20/2/2024, 10:30 pm",
      checkOut: "20/2/2024, 10:30 pm",
      guests: 7,
      location: "Chhota govinpur janta market near shiva borwell, Jamshedpur, Jharkhand Pin - 831015"
    },
    {
      id: "CV042E4",
      clientName: "Badal Singh",
      serviceName: "XYZ",
      checkIn: "20/2/2024, 10:30 pm",
      checkOut: "20/2/2024, 10:30 pm",
      guests: 7,
      location: "Chhota govinpur janta market near shiva borwell, Jamshedpur, Jharkhand Pin - 831015"
    },
    {
      id: "CV042344",
      clientName: "Badal Singh",
      serviceName: "XYZ",
      checkIn: "20/2/2024, 10:30 pm",
      checkOut: "20/2/2024, 10:30 pm",
      guests: 7,
      location: "Chhota govinpur janta market near shiva borwell, Jamshedpur, Jharkhand Pin - 831015"
    }
  ];

  // Get service color based on service name
  const getServiceColor = (serviceName: string) => {
    switch(serviceName) {
      case "XYX":
        return "bg-[#FFF2E2] text-[#B86B00]";
      case "XYZ":
        return "bg-[#F6E0FD] text-[#B127DC]";
      default:
        return "bg-[#E3FBE4] text-[#37B800]";
    }
  };

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowBookingModal(true);
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
  };

  return (
    <div className="bg-white rounded-xl h-[90vh]">
      {/* Header area with tabs and new booking button */}
      <div className="flex justify-between items-center mb-8 px-6 py-[1rem] border-b">
        <div className="flex border-gray-200">
          <button 
            className={`pb-[10px] px-4 font-medium text-base ${activeTab === "upcoming" ? "border-b-2 border-black text-[#0B0907] font-bold" : "text-[#6B6B6B]"}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Bookings
          </button>
          <button 
            className={`pb-[10px] px-4 font-medium text-base ${activeTab === "past" ? "border-b-2 border-black text-[#0B0907] font-bold" : "text-[#6B6B6B]"}`}
            onClick={() => setActiveTab("past")}
          >
            Past Booking
          </button>
          <button 
            className={`pb-[10px] px-4 font-medium text-base ${activeTab === "cancelled" ? "border-b-2 border-black text-[#0B0907] font-bold" : "text-[#6B6B6B]"}`}
            onClick={() => setActiveTab("cancelled")}
          >
            Cancelled Bookings
          </button>
        </div>
        
        <Button
          className="rounded-full bg-black hover:bg-black/90 text-white px-[24px] py-[20px] flex items-center gap-2"
        >
          <span className="font-medium">+</span>
          <span>New Booking</span>
        </Button>
      </div>
      
      {/* Filter dropdown */}
      <div className="mb-6 px-6">
        <button className="border border-gray-200 rounded-md px-4 py-2 flex items-center text-gray-700">
          {filterDate}
          <ChevronDown className="ml-2 w-4 h-4" />
        </button>
      </div>
      
      {/* Bookings table */}
      <div className="overflow-x-auto bg-white px-6 pb-6">
        <table className="w-full border-collapse rounded-[12px] overflow-hidden">
          <thead className="bg-[#F2F4F7] border border-[#EAECF0]">
            <tr>
              <th className="p-[12px] text-left text-[14px] font-medium text-[#334054]">Booking ID</th>
              <th className="p-[12px] text-left text-[14px] font-medium text-[#334054]">Client Name</th>
              <th className="p-[12px] text-left text-[14px] font-medium text-[#334054]">Service Name</th>
              <th className="p-[12px] text-left text-[14px] font-medium text-[#334054]">
                Check In
                <ChevronDown className="inline ml-1 w-4 h-4" />
              </th>
              <th className="p-[12px] text-left text-[14px] font-medium text-[#334054]">
                Check Out
                <ChevronDown className="inline ml-1 w-4 h-4" />
              </th>
              <th className="p-[12px] text-left text-[14px] font-medium text-[#334054]">No. of Guest</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAECF0]">
            {bookings.map((booking, index) => (
              <tr 
                key={index} 
                className={`border-x border-[#EAECF0] ${index === bookings.length - 1 ? "border-b" : ""} cursor-pointer hover:bg-gray-50`}
                onClick={() => handleBookingClick(booking)}
              >
                <td className="py-[14px] px-[12px] font-medium text-[#131313]">{booking.id}</td>
                <td className="py-[14px] px-[12px] text-[#485467]">{booking.clientName}</td>
                <td className="py-[14px] px-[12px]">
                  <span className={`px-2 py-1 rounded-md text-sm ${getServiceColor(booking.serviceName)}`}>
                    {booking.serviceName}
                  </span>
                </td>
                <td className="py-[14px] px-[12px] text-[#485467]">{booking.checkIn}</td>
                <td className="py-[14px] px-[12px] text-[#485467]">{booking.checkOut}</td>
                <td className="py-[14px] px-[12px]">
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

      {/* Render Booking Modal */}
      {showBookingModal && selectedBooking && (
        <BookingModal booking={selectedBooking} onClose={handleCloseModal} />
      )}
    </div>
  );
} 