"use client";

import { useState } from "react";
import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="py-8 px-[8em]">
      <div className="py-8 px-[7rem]">
        <div className="space-y-8">
          <div>
            <h2 className="text-[32px] text-center font-semibold text-[#112211]">
              Caravan Features
            </h2>
          </div>

          <div className="space-y-8">
            {/* Capacity Inputs Row */}
            <div className="flex flex-col gap-8">
              {/* Seating Capacity */}
              <div className="flex justify-between items-center border-b border-[#EAECF0] pb-4">

                <div> 
                <label className="text-sm font-medium text-[#334054] block mb-2">
                  Seating Capacity
                </label>
                <p className="text-sm text-[#667085] mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleDecrement('seatingCapacity')}
                    className="w-10 h-10 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    name="seatingCapacity"
                    value={formData.seatingCapacity}
                    onChange={handleInputChange}
                    className="w-16 text-center border-[#E7E8E9] h-11 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                    min={1}
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleIncrement('seatingCapacity')}
                    className="w-10 h-10 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Sleeping Capacity */}
              <div className="flex justify-between items-center border-b border-[#EAECF0] pb-4">

                <div>
                <label className="text-sm font-medium text-[#334054] block mb-2">
                  Sleeping Capacity
                </label>
                <p className="text-sm text-[#667085] mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleDecrement('sleepingCapacity')}
                    className="w-10 h-10 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    name="sleepingCapacity"
                    value={formData.sleepingCapacity}
                    onChange={handleInputChange}
                    className="w-16 text-center border-[#E7E8E9] h-11 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                    min={1}
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleIncrement('sleepingCapacity')}
                    className="w-10 h-10 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-medium text-[#334054] block mb-2">
                Address
              </label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Location"
                className="border-[#E7E8E9] h-11 bg-white focus:ring-0 focus:border-[#B0B0B0]"
              />
            </div>

            {/* State, City, Pincode */}
            <div className="grid grid-cols-3 gap-4">
              <Input
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State"
                className="border-[#E7E8E9] h-11 bg-white focus:ring-0 focus:border-[#B0B0B0]"
              />
              <Input
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="border-[#E7E8E9] h-11 bg-white focus:ring-0 focus:border-[#B0B0B0]"
              />
              <Input
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Pincode"
                className="border-[#E7E8E9] h-11 bg-white focus:ring-0 focus:border-[#B0B0B0]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center border-t border-[#E7E8E9] pt-6">
        <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
        <StepNavigation
          onNext={onNext}
          onBack={onBack}
          isFirstStep={false}
          isNextDisabled={false}
        />
      </div>
    </div>
  );
} 