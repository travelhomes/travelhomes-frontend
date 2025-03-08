"use client"

import { useState } from "react"
import Step1 from "@/components/vendor/stays/step1"
import Step2 from "@/components/vendor/stays/step2"
import Step3 from "@/components/vendor/stays/step3"
import VendorBar from "@/components/vendor/caravan/vendorbar"

export default function StaysRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 11

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div>
      {currentStep !== 10 && currentStep !== 11 && <VendorBar />}
      
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
    </div>
  )
} 