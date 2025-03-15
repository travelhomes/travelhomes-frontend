"use client"

import { useState } from "react"
import StepProgress from "../StepProgress"
import StepNavigation from "../StepNavigation"
import VendorBar from "../caravan/vendorbar"
import Link from "next/link"
import { ArrowRightIcon } from "@/public/assets/CustomIcon"
import { Button } from "@/components/ui/button"

interface CategoryType {
  id: string
  name: string
  icon: React.ReactNode
}

const CategoryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#112211" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const categories: CategoryType[] = [
  { id: "villa", name: "Villa", icon: <CategoryIcon /> },
  { id: "cabin", name: "Cabin", icon: <CategoryIcon /> },
  { id: "castle", name: "Castle", icon: <CategoryIcon /> },
  { id: "cave", name: "Cave", icon: <CategoryIcon /> },
  { id: "farmhouse", name: "Farm House", icon: <CategoryIcon /> },
  { id: "camping-site", name: "Camping Site", icon: <CategoryIcon /> },
  { id: "hut", name: "Hut", icon: <CategoryIcon /> },
  { id: "heritage-homes", name: "Heritage Homes", icon: <CategoryIcon /> },
  { id: "tiny-homes", name: "Tiny Homes", icon: <CategoryIcon /> },
  { id: "tent-house", name: "Tent House", icon: <CategoryIcon /> },
  { id: "village-theme", name: "Village theme", icon: <CategoryIcon /> },
  { id: "tree-house", name: "Tree House", icon: <CategoryIcon /> }
]

interface Step2Props {
  onNext: () => void
  onBack: () => void
  currentStep: number
  totalSteps: number
}

export default function Step2({ onNext, onBack, currentStep, totalSteps }: Step2Props) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId)
      }
      if (prev.length < 5) {
        return [...prev, categoryId]
      }
      return prev
    })
  }

  const isNextDisabled = selectedCategories.length < 3 || selectedCategories.length > 5

  return (
    <div className="flex flex-col min-h-screen">
      <div className="hidden md:block">
        <VendorBar />
      </div>

      {/* Mobile: Top navigation with back button and progress bar */}
      <div className="flex md:hidden items-center justify-between px-4 sm:px-6 mt-10 mb-6">
        <Link href="" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
          <span className="mr-2">
            <ArrowRightIcon />
          </span>
        </Link>
        
        <div className="flex-grow flex justify-center">
          <StepProgress 
            currentStep={currentStep} 
            totalSteps={totalSteps} 
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow px-4 sm:px-6 md:px-8 lg:px-[8em] pb-24 md:pb-32">
        <div className="py-4 sm:py-6 md:py-8 px-0 sm:px-4 md:px-6 lg:px-[7rem]">
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="text-2xl md:text-[32px] text-center font-semibold text-[#112211]">
                Category Selection
              </h2>
              <p className="text-sm text-center text-[#112211] opacity-75 mt-2">
                (Select Minimum 3 and Maximum 5)
              </p>
            </div>

            <div className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all 
                      ${
                        selectedCategories.includes(category.id)
                          ? "border-2 border-black bg-[#FDFDFD]"
                          : "border-2 border-[#E7E8E9] hover:border-gray-300"
                      }`}
                  >
                    <div className="flex-shrink-0 mb-2">
                      {category.icon}
                    </div>
                    <span className="text-sm text-center text-[#112211]">
                      {category.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Full width Next button - fixed at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white px-4 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <Button
          onClick={onNext}
          disabled={isNextDisabled}
          className="w-full bg-black text-white hover:bg-black/90 rounded-[60px] py-[14px] px-[32px]"
        >
          Next
        </Button>
      </div>

      {/* Desktop: Original navigation with progress and next/back buttons - fixed at bottom */}
      <div className="hidden md:flex fixed bottom-0 left-0 right-0 bg-white justify-between items-center border-t border-[#E7E8E9] pt-6 pb-6 px-4 sm:px-6 md:px-8 lg:px-[7rem] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <StepProgress 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
        />
        <StepNavigation 
          onNext={onNext}
          onBack={onBack}
          isFirstStep={false}
          isNextDisabled={isNextDisabled}
        />
      </div>
    </div>
  )
} 