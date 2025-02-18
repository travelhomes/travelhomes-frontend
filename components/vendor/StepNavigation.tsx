"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/public/assets/CustomIcon";

interface StepNavigationProps {
  onNext: () => void;
  onBack: () => void;
  isFirstStep?: boolean;
  isNextDisabled?: boolean;
}

export default function StepNavigation({ 
  onNext, 
  onBack, 
  isFirstStep = false,
  isNextDisabled = false
}: StepNavigationProps) {
  return (
    <div className="flex gap-5 items-center justify-center">
      {!isFirstStep && (
        <div className="flex gap-2 items-center justify-center">
          <ArrowRightIcon />
          <button 
            onClick={onBack}
            className="border-none text-black hover:bg-transparent py-[14px]"
          >
            Back
          </button>
        </div>
      )}

      <Button
        onClick={onNext}
        disabled={isNextDisabled}
        className="bg-black text-white hover:bg-black/90 rounded-[60px] py-[14px] px-[32px] disabled:opacity-50 disabled:cursor-not-allowed"
      >
       Next
      </Button>
    </div>
  );
} 