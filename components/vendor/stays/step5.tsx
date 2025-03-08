"use client";

import { useState } from "react";
import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";
import { Bath, Tv } from 'lucide-react';

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
    <div className="fixed inset-0 flex flex-col">
      {/* Top spacing area */}
      <div className="h-16"></div>

      <div className="flex-1 px-4 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="mt-6 mb-6">
            <h2 className="text-xl md:text-2xl text-center font-semibold text-[#112211]">
               Features
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

      {/* Navigation */}
      <div className="border-t border-[#E7E8E9] pt-3 pb-3 px-4">
        <div className="flex justify-between items-center">
          <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
          <StepNavigation
            onNext={onNext}
            onBack={onBack}
            isFirstStep={false}
            isNextDisabled={selectedFeatures.length === 0}
          />
        </div>
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