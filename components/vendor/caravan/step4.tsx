"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";
import VendorBar from "./vendorbar";
import Link from "next/link";
import { ArrowRightIcon } from "@/public/assets/CustomIcon";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
});

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
    <div className={`flex flex-col min-h-screen ${plusJakartaSans.className}`}>
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
      <div className="flex-grow px-4 sm:px-6 md:px-8 lg:px-[8em] pb-24 md:pb-32">
        <div className="py-4 sm:py-6 md:py-8 px-0 sm:px-4 md:px-6 lg:px-[7rem] flex justify-center">
          <div className="space-y-6 md:space-y-8 w-full max-w-[800px]">
            <div>
              <h2 className="text-2xl mb-[50px] md:text-[32px] text-center font-semibold text-[#112211]">
                Caravan Features
              </h2>
            </div>

            <div className="space-y-6">
              {/* Capacity Inputs Row */}
              <div className="flex flex-col gap-6">
                {/* Seating Capacity */}
                <div className="flex  md:flex-row md:justify-between md:items-center gap-2 md:gap-0 border-b border-[#EAECF0] pb-5">
                  <div className="md:flex-1 md:pr-4"> 
                    <label className="text font-medium text-[#000000] block mb-1">
                      Seating Capacity
                    </label>
                    <p className="text-[14px] text-[#334054]">
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
                <div className="flex  md:flex-row md:justify-between md:items-center gap-2 md:gap-0 border-b border-[#EAECF0] pb-5">
                  <div className="md:flex-1 md:pr-4"> 
                    <label className="text font-medium text-[#000000] block mb-1">
                      Sleeping Capacity
                    </label>
                    <p className="text-[14px] text-[#334054]">
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
                <label className="text-[#334054] block mb-5">
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
              <div className="mt-4 h-[300px] relative rounded-md overflow-hidden border border-[#E7E8E9]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5965665774604!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1679900095651!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
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