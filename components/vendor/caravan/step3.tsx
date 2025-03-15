"use client";

import { useState } from "react";
import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";
import { Bath, Tv } from 'lucide-react';
import VendorBar from "./vendorbar";
import Link from "next/link";
import { ArrowRightIcon } from "@/public/assets/CustomIcon";
import { Button } from "@/components/ui/button";

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

interface Feature {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export default function Step3({ onNext, onBack, currentStep, totalSteps }: Step3Props) {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => {
      if (prev.includes(featureId)) {
        return prev.filter(id => id !== featureId);
      } else {
        return [...prev, featureId];
      }
    });
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
                Caravan Features
              </h2>
            </div>

            <div className="flex flex-col items-center justify-start space-y-5">
              {/* Row 1 */}
              <div className="flex flex-wrap justify-center gap-3">
                <Feature feature={{ id: "washroom", name: "Washroom", icon: <Bath className="w-5 h-5" /> }} 
                  isSelected={selectedFeatures.includes("washroom")} 
                  onToggle={toggleFeature} />
                <Feature feature={{ id: "hot-water", name: "Hot Water", icon: <Tv className="w-5 h-5" /> }} 
                  isSelected={selectedFeatures.includes("hot-water")} 
                  onToggle={toggleFeature} />
                <Feature feature={{ id: "fan", name: "Fan", icon: <Tv className="w-5 h-5" /> }} 
                  isSelected={selectedFeatures.includes("fan")} 
                  onToggle={toggleFeature} />
                <Feature feature={{ id: "driver", name: "Driver", icon: <Tv className="w-5 h-5" /> }} 
                  isSelected={selectedFeatures.includes("driver")} 
                  onToggle={toggleFeature} />
              </div>
              
              {/* Row 2 */}
              <div className="flex flex-wrap justify-center gap-3">
                <Feature feature={{ id: "refrigerator", name: "Refrigerator", icon: <Tv className="w-5 h-5" /> }} 
                  isSelected={selectedFeatures.includes("refrigerator")} 
                  onToggle={toggleFeature} />
                <Feature feature={{ id: "ac", name: "AC", icon: <Tv className="w-5 h-5" /> }} 
                  isSelected={selectedFeatures.includes("ac")} 
                  onToggle={toggleFeature} />
                <Feature feature={{ id: "camping-tent", name: "Camping Tent", icon: <Tv className="w-5 h-5" /> }} 
                  isSelected={selectedFeatures.includes("camping-tent")} 
                  onToggle={toggleFeature} />
                <Feature feature={{ id: "table-chair", name: "Table & Chair", icon: <Tv className="w-5 h-5" /> }} 
                  isSelected={selectedFeatures.includes("table-chair")} 
                  onToggle={toggleFeature} />
              </div>
              
              {/* Row 3 */}
              <div className="flex flex-wrap justify-center gap-3">
                <Feature feature={{ id: "drinking-water", name: "Drinking Water", icon: <Tv className="w-5 h-5" /> }} 
                  isSelected={selectedFeatures.includes("drinking-water")} 
                  onToggle={toggleFeature} />
                <Feature feature={{ id: "bath", name: "Bath", icon: <Bath className="w-5 h-5" /> }} 
                  isSelected={selectedFeatures.includes("bath")} 
                  onToggle={toggleFeature} />
                <Feature feature={{ id: "microwave-oven", name: "Microwave Oven", icon: <Tv className="w-5 h-5" /> }} 
                  isSelected={selectedFeatures.includes("microwave-oven")} 
                  onToggle={toggleFeature} />
                <Feature feature={{ id: "indoor-games", name: "Indoor Games", icon: <Tv className="w-5 h-5" /> }} 
                  isSelected={selectedFeatures.includes("indoor-games")} 
                  onToggle={toggleFeature} />
                <Feature feature={{ id: "bedsheet", name: "Bedsheet", icon: <Tv className="w-5 h-5" /> }} 
                  isSelected={selectedFeatures.includes("bedsheet")} 
                  onToggle={toggleFeature} />
              </div>
              
              {/* Row 4 */}
              <div className="flex flex-wrap justify-center gap-3">
                <Feature feature={{ id: "outdoor-games", name: "Outdoor Games", icon: <Tv className="w-5 h-5" /> }} 
                  isSelected={selectedFeatures.includes("outdoor-games")} 
                  onToggle={toggleFeature} />
                <Feature feature={{ id: "stove-induction", name: "Stove/Induction", icon: <Tv className="w-5 h-5" /> }} 
                  isSelected={selectedFeatures.includes("stove-induction")} 
                  onToggle={toggleFeature} />
                <Feature feature={{ id: "kitchen-utensils", name: "Kitchen Utensils", icon: <Tv className="w-5 h-5" /> }} 
                  isSelected={selectedFeatures.includes("kitchen-utensils")} 
                  onToggle={toggleFeature} />
                <Feature feature={{ id: "others", name: "+ Others", icon: <Tv className="w-5 h-5" /> }} 
                  isSelected={selectedFeatures.includes("others")} 
                  onToggle={toggleFeature} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Full width Next button - fixed at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white px-4 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <Button
          onClick={onNext}
          disabled={selectedFeatures.length === 0}
          className="w-full bg-black text-white hover:bg-black/90 rounded-[60px] py-[14px] px-[32px] disabled:opacity-50 disabled:cursor-not-allowed"
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
          isNextDisabled={selectedFeatures.length === 0}
        />
      </div>
    </div>
  );
}

// Feature component
function Feature({ 
  feature, 
  isSelected, 
  onToggle 
}: { 
  feature: Feature; 
  isSelected: boolean; 
  onToggle: (id: string) => void; 
}) {
  return (
    <div
      onClick={() => onToggle(feature.id)}
      className="flex flex-col items-center cursor-pointer transition-all group"
    >
      <div className={`flex items-center justify-center gap-2 px-3 py-2 rounded-full border
        ${isSelected ? "border-black bg-black" : "border-[#E7E8E9] group-hover:border-gray-300"}`}
      >
        <div className={isSelected ? "text-white" : "text-[#667085]"}>
          {feature.icon}
        </div>
        <span className={`text-xs whitespace-nowrap
          ${isSelected ? "text-white font-medium" : "text-[#667085] group-hover:text-gray-800"}`}
        >
          {feature.name}
        </span>
      </div>
    </div>
  );
} 