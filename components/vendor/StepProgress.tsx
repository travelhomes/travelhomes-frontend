"use client";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-sm font-medium text-[#112211]">
        {currentStep === 1 ? 'NaN' : Math.max(0, currentStep - 1)}/{totalSteps} Completed
      </div>
      <div className="flex gap-2">
        {[...Array(totalSteps)].map((_, index) => (
          <div
            key={index}
            className={`h-[3px] w-8 rounded-full transition-all duration-300 ease-in-out
              ${index + 1 <= currentStep ? 'bg-black' : 'bg-[#E7E8E9]'}`}
          />
        ))}
      </div>
    </div>
  );
} 