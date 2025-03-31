"use client"

import * as React from "react"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CalendarProps {
  onDateSelect: (dates: Date[]) => void;
  className?: string
}

export function Calendar({ onDateSelect, className }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDates, setSelectedDates] = useState<Date[]>([])

  // Get today's date with time set to midnight for comparison
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    // Only allow going to past month if it contains today's date
    if (newDate.getMonth() === today.getMonth() && newDate.getFullYear() === today.getFullYear()) {
      setCurrentDate(newDate)
    }
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatMonth = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(date)
  }

  const generateCalendarDays = (date: Date) => {
    const daysInMonth = getDaysInMonth(date)
    const firstDay = getFirstDayOfMonth(date)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(date.getFullYear(), date.getMonth(), i))
    }

    return days
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isDateDisabled = (date: Date) => {
    return date.getTime() < today.getTime()
  }

  const isInRange = (date: Date) => {
    if (selectedDates.length !== 2) return false
    const [start, end] = selectedDates.sort((a, b) => a.getTime() - b.getTime())
    return date.getTime() > start.getTime() && date.getTime() < end.getTime()
  }

  const isSelected = (date: Date) => {
    return selectedDates.some((selectedDate) => selectedDate.toDateString() === date.toDateString())
  }

  const isStartDate = (date: Date) => {
    if (selectedDates.length !== 2) return false
    const [start] = selectedDates.sort((a, b) => a.getTime() - b.getTime())
    return date.toDateString() === start.toDateString()
  }

  const isEndDate = (date: Date) => {
    if (selectedDates.length !== 2) return false
    const [, end] = selectedDates.sort((a, b) => a.getTime() - b.getTime())
    return date.toDateString() === end.toDateString()
  }

  const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)

  React.useEffect(() => {
    if (selectedDates.length === 2) {
      onDateSelect(selectedDates.sort((a, b) => a.getTime() - b.getTime()))
    }
  }, [selectedDates, onDateSelect])

  return (
    <div className={cn("p-4 z rounded-xl z-20 bg-white", className)}>
      <div className="grid grid-cols-2 gap-8">
        {/* Current Month */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              className="p-0 hover:bg-transparent" 
              onClick={prevMonth}
              disabled={currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-sm font-medium">{formatMonth(currentDate)}</h2>
            <div className="w-4" />
          </div>
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="text-xs text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays(currentDate).map((date, i) => (
              <div key={i} className="aspect-square flex items-center justify-center relative">
                {date && (
                  <>
                    {isInRange(date) && (
                      <div className="absolute inset-0 bg-[#F0F0F0]" />
                    )}
                    {isStartDate(date) && (
                      <div className="absolute inset-0 bg-[#F0F0F0] right-0" />
                    )}
                    {isEndDate(date) && (
                      <div className="absolute inset-0 bg-[#F0F0F0] left-0" />
                    )}
                    <button
                      onClick={() => {
                        if (isDateDisabled(date)) return;
                        setSelectedDates((prev) => {
                          const dateString = date.toDateString()
                          const isDateSelected = prev.some((selectedDate) => selectedDate.toDateString() === dateString)

                          if (isDateSelected) {
                            return prev.filter((selectedDate) => selectedDate.toDateString() !== dateString)
                          } else {
                            if (prev.length === 2) return [date]
                            return [...prev, date]
                          }
                        })
                      }}
                      disabled={isDateDisabled(date)}
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors z-10",
                        isToday(date) && "bg-gray-100 text-black font-medium",
                        isSelected(date) && "bg-black text-white font-medium",
                        isDateDisabled(date) && "text-gray-300 cursor-not-allowed",
                        !isToday(date) && !isSelected(date) && !isDateDisabled(date) && "hover:bg-gray-100",
                      )}
                    >
                      {date.getDate()}
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Next Month */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="w-4" />
            <h2 className="text-sm font-medium">{formatMonth(nextMonthDate)}</h2>
            <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="text-xs text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays(nextMonthDate).map((date, i) => (
              <div key={i} className="aspect-square flex items-center justify-center relative">
                {date && (
                  <>
                    {isInRange(date) && (
                      <div className="absolute inset-0 bg-[#F0F0F0]" />
                    )}
                    {isStartDate(date) && (
                      <div className="absolute inset-0 bg-[#F0F0F0] right-0" />
                    )}
                    {isEndDate(date) && (
                      <div className="absolute inset-0 bg-[#F0F0F0] left-0" />
                    )}
                    <button
                      onClick={() => {
                        if (isDateDisabled(date)) return;
                        setSelectedDates((prev) => {
                          const dateString = date.toDateString()
                          const isDateSelected = prev.some((selectedDate) => selectedDate.toDateString() === dateString)

                          if (isDateSelected) {
                            return prev.filter((selectedDate) => selectedDate.toDateString() !== dateString)
                          } else {
                            if (prev.length === 2) return [date]
                            return [...prev, date]
                          }
                        })
                      }}
                      disabled={isDateDisabled(date)}
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors z-10",
                        isToday(date) && "bg-gray-100 text-black font-medium",
                        isSelected(date) && "bg-black text-white font-medium",
                        isDateDisabled(date) && "text-gray-300 cursor-not-allowed",
                        !isToday(date) && !isSelected(date) && !isDateDisabled(date) && "hover:bg-gray-100",
                      )}
                    >
                      {date.getDate()}
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

