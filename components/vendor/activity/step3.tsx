"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VendorBar from "../caravan/vendorbar";
import Link from "next/link";
import { ArrowRightIcon } from "@/public/assets/CustomIcon";

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function Step3({ onNext, onBack, currentStep, totalSteps }: Step3Props) {
  const [formData, setFormData] = useState({
    price: "5,934",
    personCapacity: 1,
    timeDuration: "",
    address: "",
    state: "",
    city: "",
    pincode: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and commas
    const value = e.target.value.replace(/[^0-9,]/g, '');
    setFormData(prev => ({ ...prev, price: value }));
  };

  const handleIncrement = () => {
    setFormData(prev => ({
      ...prev,
      personCapacity: prev.personCapacity + 1
    }));
  };

  const handleDecrement = () => {
    setFormData(prev => ({
      ...prev,
      personCapacity: Math.max(1, prev.personCapacity - 1)
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      timeDuration: value
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="hidden md:block">
        <VendorBar />
      </div>

      {/* Mobile: Top navigation with back button and progress bar */}
      <div className="flex md:hidden items-center justify-between px-4 sm:px-6 mt-10 mb-6">
        <Link href="" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
          <span className="mr-2">
            <ArrowRightIcon />
          </span>
        </Link>
        
        <div className="flex-grow flex justify-center">
          <StepProgress 
            currentStep={currentStep} 
            totalSteps={totalSteps} 
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow px-4 sm:px-6 md:px-8 lg:px-[8em] pb-24 md:pb-32 overflow-y-auto">
        <div className="py-4 sm:py-6 md:py-8 px-0 sm:px-4 md:px-6 lg:px-[7rem]">
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="text-2xl md:text-[32px] text-center font-semibold text-[#112211]">
                Activity Details
              </h2>
            </div>

            <div className="space-y-6 max-w-[800px] mx-auto">
              {/* Price */}
              <div>
                <label className="text-sm font-medium text-[#334054] block mb-2">
                  Price (in Rupees)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]">₹</span>
                  <Input
                    name="price"
                    value={formData.price}
                    onChange={handlePriceChange}
                    placeholder="5,954"
                    className="pl-8 border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                  />
                </div>
              </div>

              {/* Person Capacity */}
              <div>
                <label className="text-sm font-medium text-[#334054] block mb-2">
                  Person Capacity
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleDecrement}
                    className="w-8 h-8 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                  >
                    <Minus className="w-4 h-4 text-[#667085]" />
                  </Button>
                  <Input
                    type="number"
                    name="personCapacity"
                    value={formData.personCapacity}
                    onChange={handleInputChange}
                    className="w-12 text-center border-[#E7E8E9] h-9 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                    min={1}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleIncrement}
                    className="w-8 h-8 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                  >
                    <Plus className="w-4 h-4 text-[#667085]" />
                  </Button>
                </div>
              </div>

              {/* Time Duration */}
              <div>
                <label className="text-sm font-medium text-[#334054] block mb-2">
                  Time Duration
                </label>
                <Select value={formData.timeDuration} onValueChange={handleSelectChange}>
                  <SelectTrigger className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-hour">1 Hour</SelectItem>
                    <SelectItem value="2-hours">2 Hours</SelectItem>
                    <SelectItem value="3-hours">3 Hours</SelectItem>
                    <SelectItem value="half-day">Half Day (4 Hours)</SelectItem>
                    <SelectItem value="full-day">Full Day (8 Hours)</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
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
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Full width Next button - fixed at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white px-4 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <Button
          onClick={onNext}
          className="w-full bg-black text-white hover:bg-black/90 rounded-[60px] py-[14px] px-[32px]"
        >
          Next
        </Button>
      </div>

      {/* Desktop: Original navigation with progress and next/back buttons - fixed at bottom */}
      <div className="hidden md:flex fixed bottom-0 left-0 right-0 bg-white justify-between items-center border-t border-[#E7E8E9] pt-6 pb-6 px-4 sm:px-6 md:px-8 lg:px-[7rem] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <StepProgress 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
        />
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