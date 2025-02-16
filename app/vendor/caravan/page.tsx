"use client"

import { useState } from "react"
import Step1 from "@/components/vendor/caravan/step1"
import VendorBar from "@/components/vendor/caravan/vendorbar"

export default function CaravanRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 6

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
  }

//   const handleBack = () => {
//     setCurrentStep((prev) => Math.max(prev - 1, 1))
//   }

  return (
    <div>
        <VendorBar />
        {currentStep === 1 && <Step1 onNext={handleNext} />}
        {/* Add other steps here as we create them */}
    </div>
  )
} 