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
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
});

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
    timeDuration: "1-hour",
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
    <div className={`flex flex-col min-h-[50px]reen ${plusJakartaSans.className}`}>
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
          <div className="space-y-8 md:space-y-10">
            <div>
              <h2 className="text-2xl md:text-[32px] text-center font-semibold text-[#112211] mb-8">
                Pricing Details
              </h2>
            </div>

            <div className="space-y-8 max-w-[890px] mx-auto">
              {/* Price */}
              <div>
                <label className=" text-[#334054] block mb-3">
                  Regular Price (in Rupees)
                </label>
                    <div className="flex items-center font-extrabold">
                      <span className="text-[24px] mr-1">₹</span>
                      <span className="text-[24px]">{formData.price}</span>
                    </div>
              </div>

              {/* Person Capacity */}
              <div className="flex flex-row items-center justify-between border-b pb-5">
                <div>
                  <label className=" text-[#334054] block mb-[10px]">
                    Person Capacity
                  </label>
                  <p className="text-[14px] mb-[10px] text-[#667085]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline" 
                    onClick={handleDecrement}
                    className="w-8 h-8 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                  >
                    <Minus className="w-4 h-4 text-[#667085]" />
                  </Button>
                  <div className="w-8 text-center">{formData.personCapacity}</div>
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
                <label className=" text-[#334054] block mb-3">
                  Time Duration
                </label>
                <Select value={formData.timeDuration} onValueChange={handleSelectChange}>
                  <SelectTrigger className="border-[#E7E8E9] h-[50px] bg-white focus:ring-0 focus:border-[#B0B0B0]">
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
                <label className="text-[#334054] block mb-3">
                  Address
                </label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Locality"
                  className="border-[#E7E8E9] h-[50px] bg-white focus:ring-0 focus:border-[#B0B0B0] mb-4"
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <Input
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="border-[#E7E8E9] h-[50px] bg-white focus:ring-0 focus:border-[#B0B0B0]"
                  />
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="border-[#E7E8E9] h-[50px] bg-white focus:ring-0 focus:border-[#B0B0B0]"
                  />
                  <Input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="Pincode"
                    className="border-[#E7E8E9] h-[50px] bg-white focus:ring-0 focus:border-[#B0B0B0]"
                  />
                </div>
                
                {/* Google Map */}
                <div className="relative w-full h-[50px]60px] overflow-hidden rounded-md border border-[#E7E8E9] mt-4">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26356837.127240458!2d-113.70829262471046!3d36.25228826016936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sus!4v1689126069696!5m2!1sen!2sus" 
                    width="100%" 
                    height="160" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                  ></iframe>
                  <div className="absolute bottom-2 left-2 text-xs bg-white py-1 px-2 rounded shadow">
                    <a href="#" className="text-blue-600">View larger map</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Full width Next button - fixed at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white px-4 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-500">2/7 Completed</p>
          <Link href="" className="text-sm font-medium hover:underline">
            Back
          </Link>
        </div>
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