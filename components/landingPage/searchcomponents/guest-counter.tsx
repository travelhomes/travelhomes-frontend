"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface GuestType {
  id: string
  name: string
  count: number
}

interface GuestCounterProps {
  onGuestCountChange: (counts: { adults: number; children: number; infants: number }) => void;
}

export function GuestCounter({ onGuestCountChange }: GuestCounterProps) {
  const [guests, setGuests] = React.useState<GuestType[]>([
    { id: "adults", name: "Adults", count: 0 },
    { id: "children", name: "Children", count: 0 },
    { id: "infants", name: "Infants", count: 0 },
  ])

  const updateCount = (id: string, increment: boolean) => {
    setGuests((prev) =>
      prev.map((guest) =>
        guest.id === id ? { ...guest, count: increment ? guest.count + 1 : Math.max(0, guest.count - 1) } : guest,
      ),
    )
  }

  React.useEffect(() => {
    const counts = guests.reduce((acc, guest) => ({
      ...acc,
      [guest.id]: guest.count
    }), {} as Record<string, number>)
    
    onGuestCountChange(counts as { adults: number; children: number; infants: number })
  }, [guests, onGuestCountChange])

  return (
    <div className="w-[400px] bg-white rounded-[32px] p-6">
      <div className="space-y-6">
        {guests.map((guest) => (
          <div key={guest.id} className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">{guest.name}</h3>
              <p className="text-sm text-gray-400">Ages 13 or below</p>
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => updateCount(guest.id, false)}
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center transition-colors",
                  guest.count === 0
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200",
                )}
                disabled={guest.count === 0}
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="text-xl font-medium w-4 text-center">{guest.count}</span>
              <button
                onClick={() => updateCount(guest.id, true)}
                className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}