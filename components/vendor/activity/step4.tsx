"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";
import { Textarea } from "@/components/ui/textarea";

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
    <div className="flex flex-col h-screen">

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-4 pb-20">
          <div className="mt-6 mb-8">
            <h2 className="text-xl md:text-2xl text-center font-semibold text-[#112211]">
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

      {/* Navigation */}
      <div className="border-t border-[#E7E8E9] mt-auto">
        <div className="max-w-[1200px] mx-auto px-4 py-3">
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
    </div>
  );
}
