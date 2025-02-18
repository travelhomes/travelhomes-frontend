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

const features: Feature[] = [
  // Row 1
  { id: "washroom", name: "Washroom", icon: <Bath className="w-5 h-5" /> },
  { id: "hot-water", name: "Hot Water", icon: <Tv className="w-5 h-5" /> },
  { id: "fan", name: "Fan", icon: <Tv className="w-5 h-5" /> },
  { id: "driver", name: "Driver", icon: <Tv className="w-5 h-5" /> },
  
  // Row 2
  { id: "refrigerator", name: "Refrigerator", icon: <Tv className="w-5 h-5" /> },
  { id: "ac", name: "AC", icon: <Tv className="w-5 h-5" /> },
  { id: "camping-tent", name: "Camping Tent", icon: <Tv className="w-5 h-5" /> },
  { id: "table-chair", name: "Table & Chair", icon: <Tv className="w-5 h-5" /> },
  
  // Row 3
  { id: "drinking-water", name: "Drinking Water", icon: <Tv className="w-5 h-5" /> },
  { id: "bath", name: "Bath", icon: <Bath className="w-5 h-5" /> },
  { id: "microwave-oven", name: "Microwave Oven", icon: <Tv className="w-5 h-5" /> },
  { id: "indoor-games", name: "Indoor Games", icon: <Tv className="w-5 h-5" /> },
  { id: "bedsheet", name: "Bedsheet", icon: <Tv className="w-5 h-5" /> },
  
  // Row 4
  { id: "outdoor-games", name: "Outdoor Games", icon: <Tv className="w-5 h-5" /> },
  { id: "stove-induction", name: "Stove/Induction", icon: <Tv className="w-5 h-5" /> },
  { id: "kitchen-utensils", name: "Kitchen Utensils", icon: <Tv className="w-5 h-5" /> },
  { id: "others", name: "+ Others", icon: <Tv className="w-5 h-5" /> },
];

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
    <div className="py-8 px-[8em]">
      <div className="py-8 px-[7rem]">
        <div className="space-y-8">
          <div>
            <h2 className="text-[32px] text-center font-semibold text-[#112211]">
              Caravan Features
            </h2>
          </div>

          <div className="flex flex-col items-center">
            {/* Row 1 */}
            <div className="flex gap-x-16">
              {features.slice(0, 4).map((feature) => (
                <Feature key={feature.id} feature={feature} isSelected={selectedFeatures.includes(feature.id)} onToggle={toggleFeature} />
              ))}
            </div>
            
            {/* Row 2 */}
            <div className="flex gap-x-16">
              {features.slice(4, 8).map((feature) => (
                <Feature key={feature.id} feature={feature} isSelected={selectedFeatures.includes(feature.id)} onToggle={toggleFeature} />
              ))}
            </div>
            
            {/* Row 3 */}
            <div className="flex gap-x-16">
              {features.slice(8, 13).map((feature) => (
                <Feature key={feature.id} feature={feature} isSelected={selectedFeatures.includes(feature.id)} onToggle={toggleFeature} />
              ))}
            </div>
            
            {/* Row 4 */}
            <div className="flex gap-x-16">
              {features.slice(13).map((feature) => (
                <Feature key={feature.id} feature={feature} isSelected={selectedFeatures.includes(feature.id)} onToggle={toggleFeature} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-[11rem] flex justify-between items-center border-t border-[#E7E8E9] pt-6">
        <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
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
      className="flex flex-col items-center w-[120px] cursor-pointer transition-all group"
    >
      <div className={`flex items-center justify-center w-12 h-12 mb-2 border rounded-full
        ${isSelected ? "border-black bg-black" : "border-[#E7E8E9] group-hover:border-gray-300"}`}
      >
        <div className={isSelected ? "text-white" : "text-[#667085]"}>
          {feature.icon}
        </div>
      </div>
      <span className={`text-sm text-center
        ${isSelected ? "text-black font-medium" : "text-[#667085] group-hover:text-gray-800"}`}
      >
        {feature.name}
      </span>
    </div>
  );
} 