"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SimpleCalendarProps {
  className?: string
  selected?: Date
  onSelect?: (date: Date) => void
  disabled?: (date: Date) => boolean
  mode?: "single" | "multiple"
}

export function SimpleCalendar({ className, selected, onSelect, disabled, mode = "single" }: SimpleCalendarProps) {
  const [currentDate, setCurrentDate] = useState(selected || new Date())

  const today = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()

  const daysInMonth = lastDayOfMonth.getDate()
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  const previousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day)
    if (disabled && disabled(clickedDate)) return
    if (onSelect) {
      onSelect(clickedDate)
    }
  }

  const isSelected = (day: number) => {
    if (!selected) return false
    const date = new Date(currentYear, currentMonth, day)
    return (
      date.getDate() === selected.getDate() &&
      date.getMonth() === selected.getMonth() &&
      date.getFullYear() === selected.getFullYear()
    )
  }

  const isToday = (day: number) => {
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
  }

  const isDisabled = (day: number) => {
    if (!disabled) return false
    const date = new Date(currentYear, currentMonth, day)
    return disabled(date)
  }

  return (
    <div className={cn("p-4 bg-white rounded-lg border", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="sm" onClick={previousMonth} className="h-8 w-8 p-0 bg-transparent">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <Button variant="outline" size="sm" onClick={nextMonth} className="h-8 w-8 p-0 bg-transparent">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before the first day of the month */}
        {Array.from({ length: firstDayOfWeek }, (_, i) => (
          <div key={`empty-${i}`} className="h-8" />
        ))}

        {/* Days of the month */}
        {daysArray.map((day) => (
          <button
            key={day}
            onClick={() => handleDateClick(day)}
            disabled={isDisabled(day)}
            className={cn(
              "h-8 w-8 text-sm rounded-md transition-colors",
              "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500",
              {
                "bg-blue-500 text-white hover:bg-blue-600": isSelected(day),
                "bg-blue-100 text-blue-600": isToday(day) && !isSelected(day),
                "text-gray-400 cursor-not-allowed hover:bg-transparent": isDisabled(day),
                "text-gray-900": !isSelected(day) && !isToday(day) && !isDisabled(day),
              },
            )}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  )
}
