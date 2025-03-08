"use client"

import { useState } from "react"
import Step1 from "@/components/vendor/activity/step1"
import Step2 from "@/components/vendor/activity/step2"
import Step3 from "@/components/vendor/activity/step3"
import Step4 from "@/components/vendor/activity/step4"
import VendorBar from "@/components/vendor/caravan/vendorbar"

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
      {currentStep !== 9 && currentStep !== 10 && <VendorBar />}
      
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


    </div>
  )
} 