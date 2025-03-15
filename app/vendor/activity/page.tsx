"use client"

import { useState } from "react"
import Step1 from "@/components/vendor/activity/step1"
import Step2 from "@/components/vendor/activity/step2"
import Step3 from "@/components/vendor/activity/step3"
import Step4 from "@/components/vendor/activity/step4"
import Step6 from "@/components/vendor/caravan/step6"
import Step7 from "@/components/vendor/caravan/step7"
import Step8 from "@/components/vendor/caravan/step8"
import Step9 from "@/components/vendor/caravan/step9"
import Step10 from "@/components/vendor/caravan/step10"
import Step11 from "@/components/vendor/caravan/step11"

export default function ActivityRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 10

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div>
      
      {currentStep === 1 && (
        <Step1 
          onNext={handleNext} 
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      )}

      {currentStep === 2 && (
        <Step2 
          onNext={handleNext} 
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      )}

      {currentStep === 3 && (
        <Step3 
          onNext={handleNext} 
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      )}

      {currentStep === 4 && (
        <Step4 
          onNext={handleNext} 
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      )}

      {currentStep === 5 && (
        <Step6 
          onNext={handleNext} 
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      )}

      {currentStep === 6 && (
        <Step7 
          onNext={handleNext} 
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      )}

      {currentStep === 7 && (
        <Step8 
          onNext={handleNext}
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      )}

      {currentStep === 8 && (
        <Step9 
          onNext={handleNext}
        />
      )}

      {currentStep === 9 && (
        <Step10 
          onNext={handleNext}
        />
      )}

      {currentStep === 10 && (
        <Step11 
          onBack={handleBack} currentStep={0} totalSteps={0}        />
      )}
    </div>
  )
} 