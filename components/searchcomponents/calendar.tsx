"use client"

import * as React from "react"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CalendarProps {
  className?: string
}

export function Calendar({ className }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDates, setSelectedDates] = useState<Date[]>([])

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
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

  const isSelected = (date: Date) => {
    return selectedDates.some((selectedDate) => selectedDate.toDateString() === date.toDateString())
  }

  const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)

  return (
    <div className={cn("p-4 rounded-xl bg-white", className)}>
      <div className="grid grid-cols-2 gap-8">
        {/* Current Month */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-sm font-medium">{formatMonth(currentDate)}</h2>
            <div className="w-4" /> {/* Spacer for alignment */}
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
              <div key={i} className="aspect-square flex items-center justify-center">
                {date && (
                  <button
                    onClick={() => {
                      setSelectedDates((prev) => {
                        const dateString = date.toDateString()
                        const isDateSelected = prev.some((selectedDate) => selectedDate.toDateString() === dateString)

                        if (isDateSelected) {
                          return prev.filter((selectedDate) => selectedDate.toDateString() !== dateString)
                        } else {
                          return [...prev, date]
                        }
                      })
                    }}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors",
                      isToday(date) && "bg-primary text-primary-foreground",
                      isSelected(date) && "bg-black text-white",
                      !isToday(date) && !isSelected(date) && "hover:bg-muted",
                    )}
                  >
                    {date.getDate()}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Next Month */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="w-4" /> {/* Spacer for alignment */}
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
              <div key={i} className="aspect-square flex items-center justify-center">
                {date && (
                  <button
                    onClick={() => {
                      setSelectedDates((prev) => {
                        const dateString = date.toDateString()
                        const isDateSelected = prev.some((selectedDate) => selectedDate.toDateString() === dateString)

                        if (isDateSelected) {
                          return prev.filter((selectedDate) => selectedDate.toDateString() !== dateString)
                        } else {
                          return [...prev, date]
                        }
                      })
                    }}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors",
                      isToday(date) && "bg-primary text-primary-foreground",
                      isSelected(date) && "bg-black text-white",
                      !isToday(date) && !isSelected(date) && "hover:bg-muted",
                    )}
                  >
                    {date.getDate()}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

