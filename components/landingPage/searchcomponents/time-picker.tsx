"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TimePickerProps {
  onChange?: (hour: number, minute: number, period: "AM" | "PM") => void
}

export default function TimePicker({ onChange }: TimePickerProps) {
  const [selectedHour, setSelectedHour] = useState(1)
  const [selectedMinute, setSelectedMinute] = useState(0)
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">("AM")
  const [hourOffset, setHourOffset] = useState(-60)
  const [minuteOffset, setMinuteOffset] = useState(-60)
  const [periodOffset, setPeriodOffset] = useState(-60)
  const hourRef = useRef<HTMLDivElement>(null)
  const minuteRef = useRef<HTMLDivElement>(null)
  const periodRef = useRef<HTMLDivElement>(null)

  const hours = Array.from({ length: 12 }, (_, i) => i + 1)
  const minutes = Array.from({ length: 60 }, (_, i) => i)
  const periods = ["AM", "PM"]

  useEffect(() => {
    onChange?.(selectedHour, selectedMinute, selectedPeriod)
  }, [selectedHour, selectedMinute, selectedPeriod, onChange])

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>, type: "hour" | "minute" | "period") => {
    e.preventDefault()
    e.stopPropagation()
    const itemHeight = 60
    const direction = e.deltaY > 0 ? -1 : 1

    if (type === "hour") {
      const maxOffset = -hours.length * itemHeight
      const newOffset = Math.min(-itemHeight, Math.max(maxOffset, hourOffset + direction * itemHeight))
      setHourOffset(newOffset)
      const selectedIndex = Math.abs(Math.round(newOffset / itemHeight)) % 12
      setSelectedHour(hours[selectedIndex] || 12)
    } else if (type === "minute") {
      const maxOffset = -minutes.length * itemHeight
      const newOffset = Math.min(-itemHeight, Math.max(maxOffset, minuteOffset + direction * itemHeight))
      setMinuteOffset(newOffset)
      const selectedIndex = Math.abs(Math.round(newOffset / itemHeight)) % 60
      setSelectedMinute(minutes[selectedIndex] || 0)
    } else {
      const maxOffset = -periods.length * itemHeight
      const newOffset = Math.min(-itemHeight, Math.max(maxOffset, periodOffset + direction * itemHeight))
      setPeriodOffset(newOffset)
      const selectedIndex = Math.abs(Math.round(newOffset / itemHeight)) % 2
      setSelectedPeriod(periods[selectedIndex] as "AM" | "PM")
    }
  }

  const preventScroll = (e: React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div
      className="w-full max-w-sm mx-auto bg-white rounded-lg p-6"
      onWheel={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onTouchStart={preventScroll}
      onTouchMove={preventScroll}
    >
      <div className="flex gap-4 items-center justify-center">
        {/* Hours Column */}
        <div
          ref={hourRef}
          className="relative h-[180px] w-[100px] overflow-hidden"
          onWheel={(e) => handleWheel(e, "hour")}
        >
          <div
            className="absolute w-full transition-transform duration-150"
            style={{ transform: `translateY(${hourOffset}px)` }}
          >
            {[...hours, ...hours, ...hours].map((hour, index) => (
              <div
                key={index}
                className={cn(
                  "h-[60px] flex items-center justify-center text-2xl transition-all",
                  hour === selectedHour && Math.floor(index / 12) === 1
                    ? "bg-gray-200 text-gray-900 font-medium"
                    : "text-gray-400",
                )}
              >
                {hour.toString().padStart(2, "0")}
              </div>
            ))}
          </div>
          {/* Selection Highlight */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="h-[60px] mt-[60px] border-y border-gray-200" />
          </div>
        </div>

        {/* Minutes Column */}
        <div
          ref={minuteRef}
          className="relative h-[180px] w-[100px] overflow-hidden"
          onWheel={(e) => handleWheel(e, "minute")}
        >
          <div
            className="absolute w-full transition-transform duration-150"
            style={{ transform: `translateY(${minuteOffset}px)` }}
          >
            {[...minutes, ...minutes, ...minutes].map((minute, index) => (
              <div
                key={index}
                className={cn(
                  "h-[60px] flex items-center justify-center text-2xl transition-all",
                  minute === selectedMinute && Math.floor(index / 60) === 1
                    ? "bg-gray-200 text-gray-900 font-medium"
                    : "text-gray-400",
                )}
              >
                {minute.toString().padStart(2, "0")}
              </div>
            ))}
          </div>
          {/* Selection Highlight */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="h-[60px] mt-[60px] border-y border-gray-200" />
          </div>
        </div>

        {/* Period Column (AM/PM) */}
        <div
          ref={periodRef}
          className="relative h-[180px] w-[100px] overflow-hidden"
          onWheel={(e) => handleWheel(e, "period")}
        >
          <div
            className="absolute w-full transition-transform duration-150"
            style={{ transform: `translateY(${periodOffset}px)` }}
          >
            {[...periods, ...periods, ...periods].map((period, index) => (
              <div
                key={index}
                className={cn(
                  "h-[60px] flex items-center justify-center text-2xl transition-all",
                  period === selectedPeriod && Math.floor(index / 2) === 1
                    ? "bg-gray-200 text-gray-900 font-medium"
                    : "text-gray-400",
                )}
              >
                {period}
              </div>
            ))}
          </div>
          {/* Selection Highlight */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="h-[60px] mt-[60px] border-y border-gray-200" />
          </div>
        </div>
      </div>
    </div>
  )
}

