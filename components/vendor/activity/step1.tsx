"use client"

import { useState } from "react"
import StepProgress from "../StepProgress"
import StepNavigation from "../StepNavigation"
import VendorBar from "../caravan/vendorbar"
import Link from "next/link"
import { ArrowRightIcon } from "@/public/assets/CustomIcon"
import { Button } from "@/components/ui/button"

interface Step1Props {
  onNext: () => void
  onBack: () => void
  currentStep: number
  totalSteps: number
}

interface ActivityType {
  id: string
  name: string
  icon: string
}

const activities: ActivityType[] = [
  { id: "zip-lining", name: "Zip-lining", icon: "🎢" },
  { id: "safari-tour", name: "Safari Tour", icon: "🦁" },
  { id: "rock-climbing", name: "Rock Climbing", icon: "🧗‍♂️" },
  { id: "boat-cruising", name: "Boat Cruising", icon: "⛵" },
  { id: "wildlife-spotting", name: "Wildlife Spotting", icon: "🦒" },
  { id: "cultural-festivals", name: "Cultural Festivals", icon: "🎭" },
  { id: "camping", name: "Camping", icon: "⛺" },
  { id: "historical-site-visits", name: "Historical Site Visits", icon: "🏛️" },
  { id: "mountain-hikes", name: "Mountain Hikes", icon: "🏔️" },
  { id: "birdwatching", name: "Birdwatching", icon: "🦅" },
  { id: "water-activities", name: "Water Activities", icon: "🏊‍♂️" },
  { id: "temple-religious-visit", name: "Temple & Religious Visit", icon: "🕍" },
  { id: "national-park-tours", name: "National Park Tours", icon: "🌲" },
  { id: "jungle-expeditions", name: "Jungle Expeditions", icon: "🌴" },
  { id: "luxury-yacht-cruise", name: "Luxury Yacht Cruise", icon: "🛥️" },
  { id: "amusement-park", name: "Amusement Park", icon: "🎡" },
  { id: "sightseeing", name: "Sightseeing", icon: "🗺️" },
]

export default function Step1({ onNext, onBack, currentStep, totalSteps }: Step1Props) {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])

  const toggleActivity = (id: string) => {
    setSelectedActivities(prev => {
      if (prev.includes(id)) {
        return prev.filter(activityId => activityId !== id)
      }
      return [...prev, id]
    })
  }

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
      <div className="flex-grow px-4 sm:px-6 md:px-8 lg:px-[8em] pb-24 md:pb-32 overflow-y-auto">
        <div className="py-4 sm:py-6 md:py-8 px-0 sm:px-4 md:px-6 lg:px-[7rem]">
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="text-2xl md:text-[32px] text-center font-semibold text-[#112211]">
                Types of Activity
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-[1000px] mx-auto">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  onClick={() => toggleActivity(activity.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all ${
                    selectedActivities.includes(activity.id)
                      ? "border-2 border-black bg-black/5"
                      : "border border-[#E7E8E9] hover:border-gray-300"
                  }`}
                >
                  <span className="text-3xl mb-2">{activity.icon}</span>
                  <span className="text-sm text-center text-[#112211]">{activity.name}</span>
                </div>
              ))}
            </div>

            <div className="text-center mt-6 text-sm text-[#667085]">
              (Select minimum 3 activities)
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Full width Next button - fixed at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white px-4 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <Button
          onClick={onNext}
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
          isFirstStep={true}
          isNextDisabled={false}
        />
      </div>
    </div>
  )
} 