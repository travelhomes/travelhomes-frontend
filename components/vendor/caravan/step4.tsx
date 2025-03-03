"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function Step4({ onNext, onBack, currentStep, totalSteps }: Step4Props) {
  const [formData, setFormData] = useState({
    seatingCapacity: 1,
    sleepingCapacity: 1,
    address: "",
    state: "",
    city: "",
    pincode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIncrement = (field: 'seatingCapacity' | 'sleepingCapacity') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field] + 1
    }));
  };

  const handleDecrement = (field: 'seatingCapacity' | 'sleepingCapacity') => {
    setFormData(prev => ({
      ...prev,
      [field]: Math.max(1, prev[field] - 1)
    }));
  };

  return (
    <div className="fixed inset-0 flex flex-col">
      {/* Space for app bar */}
      <div className="h-16"></div>

      <div className="flex-1 px-4 md:px-20 lg:px-40 overflow-hidden h-full">
        <div className="h-full flex flex-col">
          <div className="mt-6 mb-8">
            <h2 className="text-xl md:text-2xl text-center font-semibold text-[#112211]">
              Caravan Features
            </h2>
          </div>

          <div className="space-y-6 px-[10rem]" >
            {/* Capacity Inputs Row */}
            <div className="flex flex-col gap-6">
              {/* Seating Capacity */}
              <div className="flex justify-between items-center">
                <div className="flex-1 pr-4"> 
                  <label className="text-sm font-medium text-[#334054] block mb-1">
                    Seating Capacity
                  </label>
                  <p className="text-xs text-[#667085]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleDecrement('seatingCapacity')}
                    className="w-8 h-8 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    name="seatingCapacity"
                    value={formData.seatingCapacity}
                    onChange={handleInputChange}
                    className="w-12 text-center border-[#E7E8E9] h-9 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                    min={1}
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleIncrement('seatingCapacity')}
                    className="w-8 h-8 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Sleeping Capacity */}
              <div className="flex justify-between items-center">
                <div className="flex-1 pr-4">
                  <label className="text-sm font-medium text-[#334054] block mb-1">
                    Sleeping Capacity
                  </label>
                  <p className="text-xs text-[#667085]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleDecrement('sleepingCapacity')}
                    className="w-8 h-8 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    name="sleepingCapacity"
                    value={formData.sleepingCapacity}
                    onChange={handleInputChange}
                    className="w-12 text-center border-[#E7E8E9] h-9 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                    min={1}
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleIncrement('sleepingCapacity')}
                    className="w-8 h-8 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="mt-4">
              <label className="text-sm font-medium text-[#334054] block mb-2">
                Address
              </label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Location"
                className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
              />
            </div>

            {/* State, City, Pincode */}
            <div className="grid grid-cols-3 gap-4">
              <Input
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State"
                className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
              />
              <Input
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
              />
              <Input
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Pincode"
                className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
              />
            </div>

            {/* Map Section */}
            <div className="mt-4 h-[180px] relative rounded-md overflow-hidden border border-[#E7E8E9]">
              <Image 
                src="https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7C40.7128,-74.0060&key=YOUR_API_KEY_HERE"
                alt="Location Map"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-[#E7E8E9] pt-3 pb-3 px-4">
        <div className="flex justify-between items-center">
          <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
          <StepNavigation
            onNext={onNext}
            onBack={onBack}
            isFirstStep={false}
            isNextDisabled={false}
          />
        </div>
      </div>
    </div>
  );
}