"use client"

import { useState } from "react"
import Step1 from "@/components/vendor/stays/step1"

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