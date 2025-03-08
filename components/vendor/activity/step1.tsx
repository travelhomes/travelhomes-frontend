"use client"

import { useState } from "react"
import StepProgress from "../StepProgress"
import StepNavigation from "../StepNavigation"

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
    <div className="flex flex-col h-screen">

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-4 pb-20">
          <div className="mt-6 mb-8">
            <h2 className="text-xl md:text-2xl text-center font-semibold text-[#112211]">
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

      {/* Navigation */}
      <div className="border-t border-[#E7E8E9] mt-auto">
        <div className="max-w-[1200px] mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
            <StepNavigation
              onNext={onNext}
              onBack={onBack}
              isFirstStep={true}
              isNextDisabled={selectedActivities.length < 3}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 