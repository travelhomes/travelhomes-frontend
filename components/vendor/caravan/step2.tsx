"use client";

import { useState } from "react";
import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";
import { CamperCategoryIcon, ArrowRightIcon } from "@/public/assets/CustomIcon";
import VendorBar from "./vendorbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

interface CategoryOption {
  id: string;
  title: string;
  description: string;
}

const categories: CategoryOption[] = [
  {
    id: "caravan",
    title: "Caravan",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "campervan",
    title: "Campervan",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "camper-trailer",
    title: "Camper Trailer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "motorhome",
    title: "Motorhome",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "rv",
    title: "RV",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export default function Step2({ onNext, onBack, currentStep, totalSteps }: Step2Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  return (
    <>
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

      <div className="py-4 px-4 sm:px-6 md:px-8 lg:px-[8em]">
        <div className="py-4 sm:py-6 md:py-8 px-0 sm:px-4 md:px-6 lg:px-[7rem]">
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="text-2xl md:text-[32px] text-center font-semibold text-[#112211]">
                Choose a Camper Van Category
              </h2>
            </div>

            <div className="space-y-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-4 p-4 md:p-6 border rounded-lg cursor-pointer transition-all
                    ${
                      selectedCategory === category.id
                        ? "border-black"
                        : "border-[#E7E8E9] hover:border-gray-300"
                    }`}
                >
                  <div className="flex-shrink-0">
                    <CamperCategoryIcon />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-base font-medium text-[#112211]">
                      {category.title}
                    </h3>
                    <p className="text-sm text-[#667085] mt-1">
                      {category.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Full width Next button */}
        <div className="md:hidden mt-8 px-4 sm:px-6 pb-6">
          <Button
            onClick={onNext}
            disabled={!selectedCategory}
            className="w-full bg-black text-white hover:bg-black/90 rounded-[60px] py-[14px] px-[32px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </Button>
        </div>

        {/* Desktop: Original navigation with progress and next/back buttons */}
        <div className="hidden md:flex mt-8 justify-between items-center border-t border-[#E7E8E9] pt-6 px-4 sm:px-6 md:px-8 lg:px-[7rem]">
          <StepProgress 
            currentStep={currentStep} 
            totalSteps={totalSteps} 
          />
          <StepNavigation 
            onNext={onNext}
            onBack={onBack}
            isFirstStep={false}
            isNextDisabled={!selectedCategory}
          />
        </div>
      </div>
    </>
  );
}