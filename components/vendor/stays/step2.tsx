"use client"

import { useState } from "react"
import StepProgress from "../StepProgress"
import StepNavigation from "../StepNavigation"

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
    <div className="fixed inset-0 flex flex-col">
      <div className="h-16"></div>

      <div className="flex-1 px-4 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="mt-6 mb-6">
            <h2 className="text-xl md:text-2xl text-center font-semibold text-[#112211]">
              Category Selection
            </h2>
            <p className="text-sm text-center text-[#112211] opacity-75 mt-2">
              (Select Minimum 3 and Maximum 5)
            </p>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-4 gap-4 px-[200px]">
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

          {/* Navigation */}
          <div className="border-t border-[#E7E8E9] pt-3 pb-3 px-4">
            <div className="flex justify-between items-center">
              <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
              <StepNavigation
                onNext={onNext}
                onBack={onBack}
                isFirstStep={false}
                isNextDisabled={isNextDisabled}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 