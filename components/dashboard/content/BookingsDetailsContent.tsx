import { Button } from "@/components/ui/button";
import { useState } from "react";

export function BookingsDetailsContent() {
  const [filter, setFilter] = useState("all");
  
  // Sample booking data
  const bookings = [
    {
      id: "BK-8765",
      clientName: "John Smith",
      serviceName: "Newtown Motorhome",
      serviceType: "Caravan",
      checkIn: "23 Nov, 2024",
      checkOut: "28 Nov, 2024",
      guests: 3,
      amount: "$1,250",
      status: "upcoming"
    },
    {
      id: "BK-8764",
      clientName: "Emma Johnson",
      serviceName: "RV Motor Newway",
      serviceType: "Caravan",
      checkIn: "15 Nov, 2024",
      checkOut: "20 Nov, 2024",
      guests: 2,
      amount: "$980",
      status: "active"
    },
    {
      id: "BK-8763",
      clientName: "Michael Brown",
      serviceName: "Asthetic CamperVan",
      serviceType: "Caravan",
      checkIn: "10 Nov, 2024",
      checkOut: "12 Nov, 2024",
      guests: 4,
      amount: "$750",
      status: "completed"
    },
    {
      id: "BK-8762",
      clientName: "Alex Wilson",
      serviceName: "Camper Trailer Highway",
      serviceType: "Caravan",
      checkIn: "05 Nov, 2024",
      checkOut: "08 Nov, 2024",
      guests: 2,
      amount: "$600",
      status: "completed"
    }
  ];
  
  // Filter bookings based on selected filter
  const filteredBookings = filter === "all" 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);

  return (
    <div className="p-4 space-y-6">
      {/* Header with title and new booking button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold mr-2">Bookings Details</h1>
        </div>
        
        <Button
          className="rounded-full bg-black hover:bg-black/90 text-white px-6 py-[25px] flex items-center gap-2"
        >
          <span className="text-lg font-bold">+</span>
          <span>New Booking</span>
        </Button>
      </div>
      
      {/* Filter tabs */}
      <div className="flex space-x-4 border-b">
        <button 
          className={`px-4 py-2 font-medium ${filter === "all" ? "border-b-2 border-black text-black" : "text-gray-500"}`}
          onClick={() => setFilter("all")}
        >
          All Bookings
        </button>
        <button 
          className={`px-4 py-2 font-medium ${filter === "upcoming" ? "border-b-2 border-black text-black" : "text-gray-500"}`}
          onClick={() => setFilter("upcoming")}
        >
          Upcoming
        </button>
        <button 
          className={`px-4 py-2 font-medium ${filter === "active" ? "border-b-2 border-black text-black" : "text-gray-500"}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button 
          className={`px-4 py-2 font-medium ${filter === "completed" ? "border-b-2 border-black text-black" : "text-gray-500"}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      
      {/* Bookings table */}
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.clientName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>{booking.serviceName}</div>
                  <div className="text-xs text-gray-400">{booking.serviceType}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.checkIn}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.checkOut}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.guests}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${booking.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                      booking.status === 'active' ? 'bg-green-100 text-green-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 