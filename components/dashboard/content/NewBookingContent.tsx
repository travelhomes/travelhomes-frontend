import { Button } from "@/components/ui/button";
import { useState } from "react";

export function NewBookingContent() {
  const [step, setStep] = useState(1);
  const [selectedPropertyType, setSelectedPropertyType] = useState("caravan");
  
  // Sample properties
  const properties = [
    { id: "prop1", name: "Newtown Motorhome", type: "caravan", image: "/properties/caravan1.jpg" },
    { id: "prop2", name: "RV Motor Newway", type: "caravan", image: "/properties/caravan2.jpg" },
    { id: "prop3", name: "Asthetic CamperVan", type: "caravan", image: "/properties/caravan3.jpg" },
    { id: "prop4", name: "Luxury Beach House", type: "stays", image: "/properties/stay1.jpg" },
    { id: "prop5", name: "Mountain View Cabin", type: "stays", image: "/properties/stay2.jpg" },
    { id: "prop6", name: "Hiking Expedition", type: "activities", image: "/properties/activity1.jpg" },
  ];
  
  const filteredProperties = properties.filter(
    property => property.type === selectedPropertyType
  );

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-semibold">Add New Booking</h1>
      </div>
      
      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-black text-white' : 'bg-gray-200'}`}>
            1
          </div>
          <div className={`h-1 w-16 ${step >= 2 ? 'bg-black' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-black text-white' : 'bg-gray-200'}`}>
            2
          </div>
          <div className={`h-1 w-16 ${step >= 3 ? 'bg-black' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-black text-white' : 'bg-gray-200'}`}>
            3
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm font-medium">
          <span>Select Property</span>
          <span>Guest Information</span>
          <span>Booking Details</span>
        </div>
      </div>
      
      {/* Step content */}
      {step === 1 && (
        <div>
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4">Select Property Type</h2>
            <div className="flex space-x-4">
              <button 
                className={`px-4 py-2 rounded-md ${selectedPropertyType === 'caravan' ? 'bg-black text-white' : 'bg-gray-100'}`}
                onClick={() => setSelectedPropertyType('caravan')}
              >
                Caravans
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${selectedPropertyType === 'stays' ? 'bg-black text-white' : 'bg-gray-100'}`}
                onClick={() => setSelectedPropertyType('stays')}
              >
                Stays
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${selectedPropertyType === 'activities' ? 'bg-black text-white' : 'bg-gray-100'}`}
                onClick={() => setSelectedPropertyType('activities')}
              >
                Activities
              </button>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-medium mb-4">Select a Property</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProperties.map(property => (
                <div 
                  key={property.id}
                  className="border rounded-lg overflow-hidden hover:shadow-md cursor-pointer"
                  onClick={() => setStep(2)}
                >
                  <div className="h-48 bg-gray-200">
                    {/* Placeholder for property image */}
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400">{property.name}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{property.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{property.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div>
          <h2 className="text-lg font-medium mb-4">Guest Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg border">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md" 
                placeholder="Enter guest's full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                className="w-full p-2 border rounded-md" 
                placeholder="Enter guest's email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input 
                type="tel" 
                className="w-full p-2 border rounded-md" 
                placeholder="Enter guest's phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-md" 
                min="1"
                placeholder="Enter number of guests"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
              <textarea 
                className="w-full p-2 border rounded-md" 
                rows={3}
                placeholder="Enter any special requests or notes"
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <Button 
              className="bg-gray-200 hover:bg-gray-300 text-black"
              onClick={() => setStep(1)}
            >
              Back
            </Button>
            <Button 
              className="bg-black hover:bg-black/90 text-white"
              onClick={() => setStep(3)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
      
      {step === 3 && (
        <div>
          <h2 className="text-lg font-medium mb-4">Booking Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg border">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
              <input 
                type="date" 
                className="w-full p-2 border rounded-md" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
              <input 
                type="date" 
                className="w-full p-2 border rounded-md" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <input 
                  type="number" 
                  className="w-full p-2 pl-7 border rounded-md" 
                  placeholder="Enter booking price"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
              <select className="w-full p-2 border rounded-md">
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="partial">Partial Payment</option>
              </select>
            </div>
          </div>
          
          <div className="mt-8 bg-white p-6 rounded-lg border">
            <h3 className="font-medium mb-4">Booking Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Property:</span>
                <span className="font-medium">Newtown Motorhome</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Guest:</span>
                <span className="font-medium">Guest Name</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-in:</span>
                <span className="font-medium">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-out:</span>
                <span className="font-medium">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Guests:</span>
                <span className="font-medium">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Price:</span>
                <span className="font-medium">$0.00</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <Button 
              className="bg-gray-200 hover:bg-gray-300 text-black"
              onClick={() => setStep(2)}
            >
              Back
            </Button>
            <Button 
              className="bg-black hover:bg-black/90 text-white"
            >
              Create Booking
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 