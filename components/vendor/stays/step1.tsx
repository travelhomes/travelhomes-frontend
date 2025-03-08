"use client"

import { useState } from "react"
import StepProgress from "../StepProgress"
import StepNavigation from "../StepNavigation"
import VendorBar from "../caravan/vendorbar"

interface PropertyType {
  id: string
  name: string
  icon: React.ReactNode
}

const PropertyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#112211" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const propertyTypes: PropertyType[] = [
  { id: "villa", name: "Villa", icon: <PropertyIcon /> },
  { id: "cabin", name: "Cabin", icon: <PropertyIcon /> },
  { id: "castle", name: "Castle", icon: <PropertyIcon /> },
  { id: "cave", name: "Cave", icon: <PropertyIcon /> },
  { id: "farmhouse", name: "Farm House", icon: <PropertyIcon /> },
  { id: "camping-site", name: "Camping Site", icon: <PropertyIcon /> },
  { id: "hut", name: "Hut", icon: <PropertyIcon /> },
  { id: "heritage-homes", name: "Heritage Homes", icon: <PropertyIcon /> },
  { id: "tiny-homes", name: "Tiny Homes", icon: <PropertyIcon /> },
  { id: "tent-house", name: "Tent House", icon: <PropertyIcon /> },
  { id: "village-theme", name: "Village theme", icon: <PropertyIcon /> },
  { id: "tree-house", name: "Tree House", icon: <PropertyIcon /> },
  { id: "container-homes", name: "Container Homes", icon: <PropertyIcon /> },
  { id: "cruise", name: "Cruise", icon: <PropertyIcon /> }
]

interface Step1Props {
  onNext: () => void
  onBack: () => void
  currentStep: number
  totalSteps: number
}

export default function Step1({ onNext, onBack, currentStep, totalSteps }: Step1Props) {
  const [selectedType, setSelectedType] = useState<string>("")

  return (
    <div className="fixed inset-0 flex flex-col">
      <VendorBar />

      <div className="flex-1 px-4 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="mt-6 mb-6">
            <h2 className="text-xl md:text-2xl text-center font-semibold text-[#112211]">
              Types of Property
            </h2>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-4 gap-4 px-[200px]">
              {propertyTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all 
                    ${
                      selectedType === type.id
                        ? "border-2 border-black bg-[#FDFDFD]"
                        : "border-2 border-[#E7E8E9] hover:border-gray-300"
                    }`}
                >
                  <div className="flex-shrink-0 mb-2">
                    {type.icon}
                  </div>
                  <span className="text-sm text-center text-[#112211]">
                    {type.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="border-t border-[#E7E8E9] pt-3 pb-3 px-4">
            <div className="flex justify-between items-center">
              <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
              <StepNavigation
                onNext={onNext}
                onBack={onBack}
                isFirstStep={currentStep === 1}
                isNextDisabled={!selectedType}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 