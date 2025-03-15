"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";
import VendorBar from "./vendorbar";
import Link from "next/link";
import { ArrowRightIcon } from "@/public/assets/CustomIcon";
import { Button } from "@/components/ui/button";

interface Step7Props {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function Step7({ onNext, onBack, currentStep, totalSteps }: Step7Props) {
  const [formData, setFormData] = useState({
    brandName: "",
    legalCompanyName: "",
    gstNumber: "",
    businessEmailId: "",
    businessPhoneNumber: "",
    businessAddress: "",
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
      <div className="flex-grow px-4 sm:px-6 md:px-8 lg:px-[8em] pb-24 md:pb-32">
        <div className="py-4 sm:py-6 md:py-8 px-0 sm:px-4 md:px-6 lg:px-[7rem]">
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="text-2xl md:text-[32px] text-center font-semibold text-[#112211]">
                Business Details
              </h2>
            </div>

            <div className="w-full max-w-3xl mx-auto space-y-6">
              {/* Brand Name and Legal Company Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-600 block mb-2">
                    Brand Name
                  </label>
                  <Input
                    name="brandName"
                    value={formData.brandName}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 block mb-2">
                    Legal Company Name
                  </label>
                  <Input
                    name="legalCompanyName"
                    value={formData.legalCompanyName}
                    onChange={handleInputChange}
                    placeholder="Company Name"
                    className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                  />
                </div>
              </div>

              {/* GST Number and Business Email ID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-600 block mb-2">
                    GST Number
                  </label>
                  <Input
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                    placeholder="XXXXXXXX"
                    className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 block mb-2">
                    Business Email ID
                  </label>
                  <Input
                    name="businessEmailId"
                    value={formData.businessEmailId}
                    onChange={handleInputChange}
                    placeholder="example@mail.com"
                    className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                  />
                </div>
              </div>

              {/* Business Phone Number */}
              <div>
                <label className="text-sm text-gray-600 block mb-2">
                  Business Phone number
                </label>
                <div className="flex">
                  <div className="flex items-center border border-[#E7E8E9] rounded-l-md px-3 bg-white">
                    <span className="text-sm text-gray-600">+91</span>
                  </div>
                  <Input
                    name="businessPhoneNumber"
                    value={formData.businessPhoneNumber}
                    onChange={handleInputChange}
                    placeholder="XXXX-XXXX"
                    className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0] rounded-l-none"
                  />
                </div>
              </div>

              {/* Business Address */}
              <div>
                <label className="text-sm text-gray-600 block mb-2">
                  Business Address
                </label>
                <Input
                  name="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleInputChange}
                  placeholder="Locality"
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
