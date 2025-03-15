"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";
import { Textarea } from "@/components/ui/textarea";
import VendorBar from "../caravan/vendorbar";
import Link from "next/link";
import { ArrowRightIcon } from "@/public/assets/CustomIcon";

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function Step4({ onNext, onBack, currentStep, totalSteps }: Step4Props) {
  const [includes] = useState([
    "Complete 3 hour rope thats fit your size",
    "Free foodie services"
  ]);

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
                Inclusion & Exclusion
              </h2>
            </div>

            <div className="space-y-6 max-w-[800px] mx-auto">
              {/* Above price includes */}
              <div>
                <label className="text-sm font-medium text-[#334054] block mb-4">
                  Above price includes
                </label>
                <div className="space-y-2 mb-4">
                  {includes.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <span className="text-sm text-[#667085]">{index + 1}.</span>
                      <span className="text-sm text-[#667085]">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Text here..."
                    className="min-h-[40px] border-[#E7E8E9] bg-white focus:ring-0 focus:border-[#B0B0B0] resize-none w-full"
                  />
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-xs text-[#667085] hover:text-black flex items-center h-7 px-2"
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add More
                    </Button>
                  </div>
                </div>
              </div>

              {/* Above price excludes */}
              <div>
                <label className="text-sm font-medium text-[#334054] block mb-4">
                  Above price excludes
                </label>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Text here..."
                    className="min-h-[40px] border-[#E7E8E9] bg-white focus:ring-0 focus:border-[#B0B0B0] resize-none w-full"
                  />
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-xs text-[#667085] hover:text-black flex items-center h-7 px-2"
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add More
                    </Button>
                  </div>
                </div>
              </div>

              {/* What expected from enjoyer */}
              <div>
                <label className="text-sm font-medium text-[#334054] block mb-4">
                  What expected from enjoyer
                </label>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Text here..."
                    className="min-h-[40px] border-[#E7E8E9] bg-white focus:ring-0 focus:border-[#B0B0B0] resize-none w-full"
                  />
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-xs text-[#667085] hover:text-black flex items-center h-7 px-2"
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add More
                    </Button>
                  </div>
                </div>
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
