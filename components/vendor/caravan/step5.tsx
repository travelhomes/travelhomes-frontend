"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";

interface Step5Props {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function Step5({ onNext, onBack, currentStep, totalSteps }: Step5Props) {
  const [price, setPrice] = useState("5,934");

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and commas
    const value = e.target.value.replace(/[^0-9,]/g, '');
    setPrice(value);
  };

  return (
    <div className="fixed inset-0 flex flex-col">
      {/* Space for app bar */}
      <div className="h-16"></div>

      <div className="flex-1 px-4 md:px-20 lg:px-40 overflow-hidden h-full">
        <div className="h-full flex flex-col">
          <div className="mt-6 mb-8">
            <h2 className="text-xl md:text-2xl text-center font-semibold text-[#112211]">
              Pricing Details
            </h2>
          </div>

          <div className="w-full space-y-6 px-[10rem]">
            {/* Regular Price */}
            <div>
              <label className="text-sm font-medium text-[#334054] block mb-2">
                Regular Price (in Rupees)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 font-medium">₹</span>
                <Input
                  value={price}
                  onChange={handlePriceChange}
                  className="pl-8 border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0] font-medium"
                />
              </div>
            </div>

            {/* Above price includes */}
            <div>
              <label className="text-sm font-medium text-[#334054] block mb-2">
                Above price includes
              </label>
              <Input
                placeholder="Text here..."
                className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0] w-full"
              />
              <div className="flex justify-end mt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-gray-600 hover:text-black flex items-center h-7 px-2"
                >
                  <Plus className="h-3 w-3 mr-1" /> Add More
                </Button>
              </div>
            </div>

            {/* Below price includes */}
            <div>
              <label className="text-sm font-medium text-[#334054] block mb-2">
                Below price excludes
              </label>
              <Input
                placeholder="Text here..."
                className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0] w-full"
              />
              <div className="flex justify-end mt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-gray-600 hover:text-black flex items-center h-7 px-2"
                >
                  <Plus className="h-3 w-3 mr-1" /> Add More
                </Button>
              </div>
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