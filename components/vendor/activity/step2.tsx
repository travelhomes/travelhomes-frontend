"use client";

import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function Step2({ onNext, onBack, currentStep, totalSteps }: Step2Props) {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-16"></div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-4 pb-20">
          <div className="mt-6 mb-8">
            <h2 className="text-xl md:text-2xl text-center font-semibold text-[#112211]">
              Step 2
            </h2>
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
