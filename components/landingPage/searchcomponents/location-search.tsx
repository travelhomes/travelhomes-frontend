"use client"

import * as React from "react"
import { Search } from "lucide-react"

interface Location {
  id: string
  name: string
}

const LOCATIONS: Location[] = [
  { id: "1", name: "Goa" },
  { id: "2", name: "Kerela" },
  { id: "3", name: "Delhi" },
]

interface LocationSearchProps {
  onLocationSelect: (location: string) => void;
}

export function LocationSearch({ onLocationSelect }: LocationSearchProps) {
  const [search, setSearch] = React.useState("")
  const [locations, setLocations] = React.useState<Location[]>(LOCATIONS)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)

    // Filter locations based on search
    const filtered = LOCATIONS.filter((location) => location.name.toLowerCase().includes(value.toLowerCase()))
    setLocations(filtered)
  }

  return (
    <div className="w-[400px] bg-white rounded-[32px] p-6 space-y-6">
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search location"
            value={search}
            onChange={handleSearch}
            className="w-full pl-4 pr-12 py-3 rounded-full bg-gray-100 border-none text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-black rounded-full flex items-center justify-center">
            <Search className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {locations.map((location) => (
          <button
            key={location.id}
            onClick={() => onLocationSelect(location.name)}
            className="w-full text-left px-2 py-2 text-lg font-medium hover:text-gray-600 transition-colors"
          >
            {location.name}
          </button>
        ))}
        {locations.length > 0 && <div className="h-px bg-gray-100 mx-2" />}
      </div>
    </div>
  )
}