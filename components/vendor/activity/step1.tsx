"use client"

import { useState } from "react"
import StepProgress from "../StepProgress"
import StepNavigation from "../StepNavigation"
import VendorBar from "../caravan/vendorbar"
import Link from "next/link"
import { ArrowRightIcon } from "@/public/assets/CustomIcon"
import { Button } from "@/components/ui/button"
import { Plus_Jakarta_Sans } from "next/font/google"

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
});

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
    <div className={`flex flex-col min-h-screen ${plusJakartaSans.className}`}>
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
              <h2 className="text-2xl md:text-[32px] mb-[50px] text-center font-semibold text-[#112211]">
                Types of Activity
              </h2>
            </div>

            <div className="flex flex-col items-center justify-start space-y-5">
              {/* Row 1 */}
              <div className="flex flex-wrap justify-center gap-3">
                {activities.slice(0, 5).map((activity) => (
                  <Activity 
                    key={activity.id}
                    activity={activity}
                    isSelected={selectedActivities.includes(activity.id)}
                    onToggle={toggleActivity}
                  />
                ))}
              </div>

              {/* Row 2 */}
              <div className="flex flex-wrap justify-center gap-3">
                {activities.slice(5, 10).map((activity) => (
                  <Activity 
                    key={activity.id}
                    activity={activity}
                    isSelected={selectedActivities.includes(activity.id)}
                    onToggle={toggleActivity}
                  />
                ))}
              </div>

              {/* Row 3 */}
              <div className="flex flex-wrap justify-center gap-3">
                {activities.slice(10, 15).map((activity) => (
                  <Activity 
                    key={activity.id}
                    activity={activity}
                    isSelected={selectedActivities.includes(activity.id)}
                    onToggle={toggleActivity}
                  />
                ))}
              </div>

              {/* Row 4 */}
              <div className="flex flex-wrap justify-center gap-3">
                {activities.slice(15).map((activity) => (
                  <Activity 
                    key={activity.id}
                    activity={activity}
                    isSelected={selectedActivities.includes(activity.id)}
                    onToggle={toggleActivity}
                  />
                ))}
              </div>
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
          disabled={selectedActivities.length < 3}
          className="w-full bg-black text-white hover:bg-black/90 rounded-[60px] py-[14px] px-[32px] disabled:opacity-50 disabled:cursor-not-allowed"
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
          isNextDisabled={selectedActivities.length < 3}
        />
      </div>
    </div>
  )
}

// Activity component
function Activity({ 
  activity, 
  isSelected, 
  onToggle 
}: { 
  activity: ActivityType; 
  isSelected: boolean; 
  onToggle: (id: string) => void; 
}) {
  return (
    <div
      onClick={() => onToggle(activity.id)}
      className="flex flex-col items-center cursor-pointer transition-all group"
    >
      <div className={`flex items-center justify-center gap-2 px-3 py-2 rounded-full border
        ${isSelected ? "border-black bg-black" : "border-[#E7E8E9] group-hover:border-gray-300"}`}
      >
        <div className={isSelected ? "text-white" : "text-[#667085]"}>
          <span className="text-xl">{activity.icon}</span>
        </div>
        <span className={`px-2 whitespace-nowrap
          ${isSelected ? "text-white font-medium" : "text-[#667085] group-hover:text-gray-800"}`}
        >
          {activity.name}
        </span>
      </div>
    </div>
  );
} 