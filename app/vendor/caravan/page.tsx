"use client"

import { useState } from "react"
import Step1 from "@/components/vendor/caravan/step1"
import Step2 from "@/components/vendor/caravan/step2"
import Step3 from "@/components/vendor/caravan/step3"
import Step4 from "@/components/vendor/caravan/step4"
import Step5 from "@/components/vendor/caravan/step5"
import Step6 from "@/components/vendor/caravan/step6"
import VendorBar from "@/components/vendor/caravan/vendorbar"

export default function CaravanRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 8

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div>
      <VendorBar />
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
        <Step5 
          onNext={handleNext} 
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      )}
      {currentStep === 6 && (
        <Step6 
          onNext={handleNext} 
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      )}
      {/* Add other steps here as we create them */}
    </div>
  )
} 