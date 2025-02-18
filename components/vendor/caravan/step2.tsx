"use client";

import { useState } from "react";
import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";
import { CamperCategoryIcon } from "@/public/assets/CustomIcon";

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
    <div className="py-8 px-[8em]">
      <div className="py-8 px-[7rem]">
        <div className="space-y-8">
          <div>
            <h2 className="text-[32px] text-center font-semibold text-[#112211]">
              Choose a Camper Van Category
            </h2>
          </div>

          <div className="space-y-4">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-4 p-6 border rounded-lg cursor-pointer transition-all
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

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center border-t border-[#E7E8E9] pt-6">
        <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
        <StepNavigation
          onNext={onNext}
          onBack={onBack}
          isFirstStep={false}
          isNextDisabled={!selectedCategory}
        />
      </div>
    </div>
  );
}