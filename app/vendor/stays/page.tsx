"use client"

import { useState } from "react"
import Step1 from "@/components/vendor/stays/step1"
import Step2 from "@/components/vendor/stays/step2"
import Step3 from "@/components/vendor/stays/step3"
import Step4 from "@/components/vendor/stays/step4"
import Step5 from "@/components/vendor/stays/step5"
import VendorBar from "@/components/vendor/caravan/vendorbar"

export default function StaysRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [stayType, setStayType] = useState<"entire" | "individual">("entire")
  const totalSteps = 11

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleStayTypeChange = (type: "entire" | "individual") => {
    setStayType(type)
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

      {currentStep === 4 && (
        <Step4 
          onNext={handleNext} 
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
          stayType={stayType}
          onStayTypeChange={handleStayTypeChange}
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
    </div>
  )
} 