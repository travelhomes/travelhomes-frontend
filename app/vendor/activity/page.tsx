"use client"

import { useState } from "react"
import Step1 from "@/components/vendor/activity/step1"
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
    </div>
  )
} 