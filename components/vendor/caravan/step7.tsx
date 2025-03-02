"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";

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
    <div className="fixed inset-0 flex flex-col">
      {/* Space for app bar */}
      <div className="h-16"></div>

      <div className="flex-1 px-4 md:px-20 lg:px-40 overflow-auto">
        <div className="h-full flex flex-col">
       

          <div className="mt-2 mb-8">
            <h2 className="text-xl md:text-2xl text-center font-semibold text-[#112211]">
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
