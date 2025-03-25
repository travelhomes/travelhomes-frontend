import { Button } from "@/components/ui/button";
import { GuestUser } from "@/public/assets/CustomIcon";
import { EyeIcon, ListFilter, ClipboardList, Wallet, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface TripData {
    id: string;
    clientName: string;
    serviceName: string;
    serviceColor: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    location?: string;
}

// Modal component that uses createPortal for better overlay
const TripModal = ({ trip, onClose }: { trip: TripData; onClose: () => void }) => {
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
              <p className="text-[20px] text-[#2A2A2A]">{trip.id}</p>
            </div>
            
            <div>
              <label className="block text-[#212121] mb-3">Client Name</label>
              <p className="text-[20px] text-[#2A2A2A]">{trip.clientName}</p>
            </div>
            
            <div>
              <label className="block text-[#212121] mb-3">Service Name</label>
              <p className="text-[20px] text-[#2A2A2A] font-normal">₹ 9.5 / kWh</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-x-8 gap-y-6 mt-6">
            <div>
              <label className="block text-[#212121] mb-3">Check In</label>
              <p className="text-[20px] text-[#2A2A2A]">{trip.checkIn}</p>
            </div>
            
            <div>
              <label className="block text-[#212121] mb-3">Check Out</label>
              <p className="text-[20px] text-[#2A2A2A]">{trip.checkOut}</p>
            </div>
            
            <div>
              <label className="block text-[#212121] mb-3">No. of Guest</label>
              <p className="text-[20px] text-[#2A2A2A]">{trip.guests}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-[#212121] mb-3">Location</label>
            <p className="text-[20px] text-[#2A2A2A]">{trip.location}</p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export function DashboardContent() {
    const [tripStartingFilter, setTripStartingFilter] = useState("Today");
    const [showTripModal, setShowTripModal] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState<TripData | null>(null);

    // Sample data for trip tables
    const tripData = [
        {
            id: "CV042W4",
            clientName: "Badal Singh",
            serviceName: "XYZ",
            serviceColor: "bg-[#FFF2E2] text-[#B86B00]",
            checkIn: "20/2/2024, 10:30 pm",
            checkOut: "20/2/2024, 10:30 pm",
            guests: 7,
            location: "Chhota govinpur janta market near shiva borwell, Jamshedpur, Jharkhand Pin - 831015"
        },
        {
            id: "CV042E4",
            clientName: "Badal Singh",
            serviceName: "XYZ",
            serviceColor: "bg-[#F6E0FD] text-[#B127DC]",
            checkIn: "20/2/2024, 10:30 pm",
            checkOut: "20/2/2024, 10:30 pm",
            guests: 7,
            location: "Chhota govinpur janta market near shiva borwell, Jamshedpur, Jharkhand Pin - 831015"
        },
        {
            id: "CV042344",
            clientName: "Badal Singh",
            serviceName: "XYZ",
            serviceColor: "bg-[#E3FBE4] text-[#37B800]",
            checkIn: "20/2/2024, 10:30 pm",
            checkOut: "20/2/2024, 10:30 pm",
            guests: 7,
            location: "Chhota govinpur janta market near shiva borwell, Jamshedpur, Jharkhand Pin - 831015"
        }
    ];
    
    const handleTripClick = (trip: TripData) => {
        setSelectedTrip(trip);
        setShowTripModal(true);
    };

    const handleCloseModal = () => {
        setShowTripModal(false);
    };

    return (
        <div className="space-y-8 bg-[#F9FAFB]">
            {/* Page Header with Title and Button */}
            <div className="bg-[#FFFFFF] rounded-[24px]" >
                <div className="flex justify-between items-center py-[16px] px-[20px] border-b border-[#EAECF0]">
                    <h1 className="text-[20px] text-[#101828]">Overview</h1>
                    <Button className="rounded-full bg-[#131313] hover:bg-black/90 text-white px-[24px] py-[20px] flex items-center gap-2">
                        <span className="text-xl font-bold">+</span>
                        <span>New Booking</span>
                    </Button>
                </div>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-[20px]">
                    {/* Impression Card */}
                    <div className="bg-[#FDEBE0] rounded-lg p-6 flex items-start">
                        <div className="h-[48px] w-[48px] rounded-full bg-[#F8DBCB] flex items-center justify-center mr-4">
                            <EyeIcon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                            <h3 className="text-sm text-[#485467]">Impression</h3>
                            <p className="text-2xl font-bold mt-[10px]">1246</p>
                        </div>
                    </div>

                    {/* Total Days of Bookings Card */}
                    <div className="bg-[#E3FBE4] rounded-lg p-6 flex items-start">
                        <div className="h-[48px] w-[48px] rounded-full bg-[#D8F4D9] flex items-center justify-center mr-4">
                            <ListFilter className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                            <h3 className="text-sm text-[#485467]">Total Days of Bookings</h3>
                            <p className="text-2xl font-bold mt-[10px]">532</p>
                        </div>
                    </div>

                    {/* Listed Properties Card */}
                    <div className="bg-[#F6E0FD] rounded-lg p-6 flex items-start">
                        <div className="w-[48px] h-[48px] rounded-full bg-[#F4D2FF] flex items-center justify-center mr-4">
                            <ClipboardList className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                            <h3 className="text-sm text-[#485467] ">Listed Properties</h3>
                            <p className="text-2xl font-bold mt-[10px]">48</p>
                        </div>
                    </div>

                    {/* Total Earning Card */}
                    <div className="bg-[#F2EFFF] rounded-lg p-6 flex items-start">
                        <div className="w-[48px] h-[48px] rounded-full bg-[#E1DBFF] flex items-center justify-center mr-4">
                            <Wallet className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                            <h3 className="text-sm text-[#485467]">Total Earning</h3>
                            <p className="text-2xl font-bold mt-[10px]">243K</p>
                        </div>
                    </div>

                    {/* Clicked Card */}
                    <div className="bg-[#F0EFFF] rounded-lg p-6 flex items-start">
                        <div className="w-[48px] h-[48px] rounded-full bg-[#DDDBFF] flex items-center justify-center mr-4">
                            <Sparkles className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                            <h3 className="text-sm text-[#485467]">Clicked</h3>
                            <p className="text-2xl font-bold mt-[10px]">1246</p>
                        </div>
                    </div>
                </div>

                {/* Trip Starting Section */}
                <div className="space-y-4 p-[20px]">
                    <div className="flex justify-between items-center">
                        <div className="flex justify-center items-center">
                            <h2 className="text-[18px] text-[#131313] font-bold mr-[20px]">Trip Starting</h2>
                                <div className="relative">
                                    <select
                                        value={tripStartingFilter}
                                        onChange={(e) => setTripStartingFilter(e.target.value)}
                                        className="appearance-none bg-white border border-gray-200 rounded-md px-4 py-2 pr-8 text-sm"
                                    >
                                        <option>Today</option>
                                        <option>Tomorrow</option>
                                        <option>This Week</option>
                                        <option>This Month</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                </div>
                            </div>
                        </div>

                            <div>
                                <Link href="/dashboard/bookings" className="text-sm font-medium hover:underline">
                                    View All
                                </Link>
                            </div>

                    </div>

                    {/* Trip Starting Table */}
                    <div className="bg-white rounded-lg border overflow-hidden">
                        <div className="grid grid-cols-12 gap-4 py-4 px-4 bg-[#F2F4F7] border-b text-sm font-bold text-[#334054]">
                            <div className="col-span-2">Booking ID</div>
                            <div className="col-span-2">Client Name</div>
                            <div className="col-span-2">Service Name</div>
                            <div className="col-span-2">Check In</div>
                            <div className="col-span-2">Check Out</div>
                            <div className="col-span-2">No. of Guest</div>
                        </div>

                        {tripData.map((trip) => (
                            <div 
                                key={trip.id} 
                                className="grid grid-cols-12 gap-4 py-4 px-4 border-b items-center cursor-pointer hover:bg-gray-50" 
                                onClick={() => handleTripClick(trip)}
                            >
                                <div className="col-span-2 text-[#4F59E5] font-bold">{trip.id}</div>
                                <div className="col-span-2 text-[#485467]">{trip.clientName}</div>
                                <div className="col-span-2">
                                    <span className={`px-[11px] py-[5px] rounded-full text-[14px] font-medium ${trip.serviceColor}`}>
                                        {trip.serviceName}
                                    </span>
                                </div>
                                <div className="col-span-2 text-[#485467]">{trip.checkIn}</div>
                                <div className="col-span-2 text-[#485467]">{trip.checkOut}</div>
                                <div className="col-span-2 flex items-center">
                                    <span className="flex items-center gap-1">
                                    <span className="mr-[10px]">
                                        <GuestUser />
                                        </span>

                                        {trip.guests}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trip Ending Section */}
                <div className="space-y-4 p-[20px]">
                    <div className="flex justify-between items-center">
                        <div className="flex justify-center items-center">
                            <h2 className="text-[18px] text-[#131313] font-bold mr-[20px]">Trip Ending</h2>
                                <div className="relative">
                                    <select
                                        value={tripStartingFilter}
                                        onChange={(e) => setTripStartingFilter(e.target.value)}
                                        className="appearance-none bg-white border border-gray-200 rounded-md px-4 py-2 pr-8 text-sm"
                                    >
                                        <option>Today</option>
                                        <option>Tomorrow</option>
                                        <option>This Week</option>
                                        <option>This Month</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                </div>
                            </div>
                        </div>

                            <div>
                                <Link href="/dashboard/bookings" className="text-sm font-medium hover:underline">
                                    View All
                                </Link>
                            </div>

                    </div>

                    {/* Trip Ending Table */}
                    <div className="bg-white rounded-lg border overflow-hidden">
                        <div className="grid grid-cols-12 gap-4 py-4 px-4 bg-[#F2F4F7] border-b text-sm font-bold text-[#334054]">
                            <div className="col-span-2">Booking ID</div>
                            <div className="col-span-2">Client Name</div>
                            <div className="col-span-2">Service Name</div>
                            <div className="col-span-2">Check In</div>
                            <div className="col-span-2">Check Out</div>
                            <div className="col-span-2">No. of Guest</div>
                        </div>

                        {tripData.map((trip) => (
                            <div 
                                key={trip.id} 
                                className="grid grid-cols-12 gap-4 py-4 px-4 border-b items-center cursor-pointer hover:bg-gray-50"
                                onClick={() => handleTripClick(trip)}
                            >
                                <div className="col-span-2 text-[#4F59E5] font-bold">{trip.id}</div>
                                <div className="col-span-2 text-[#485467]">{trip.clientName}</div>
                                <div className="col-span-2">
                                    <span className={`px-[11px] py-[5px] rounded-full text-[14px] font-medium ${trip.serviceColor}`}>
                                        {trip.serviceName}
                                    </span>
                                </div>
                                <div className="col-span-2 text-[#485467]">{trip.checkIn}</div>
                                <div className="col-span-2 text-[#485467]">{trip.checkOut}</div>
                                <div className="col-span-2 flex items-center">
                                    <span className="flex items-center gap-1">
                                    <span className="mr-[10px]">
                                        <GuestUser />
                                        </span>

                                        {trip.guests}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Render Trip Modal */}
            {showTripModal && selectedTrip && (
                <TripModal trip={selectedTrip} onClose={handleCloseModal} />
            )}
        </div>
    );
} 