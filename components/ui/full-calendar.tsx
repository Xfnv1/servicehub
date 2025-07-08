"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarEvent {
  id: string
  title: string
  start: string
  end?: string
  backgroundColor?: string
  borderColor?: string
  textColor?: string
}

interface FullCalendarProps {
  className?: string
  events?: CalendarEvent[]
  onDateSelect?: (date: Date) => void
  onEventClick?: (event: CalendarEvent) => void
  view?: "month" | "week" | "day"
  selectable?: boolean
  editable?: boolean
  height?: string | number
}

export function FullCalendar({
  className,
  events = [],
  onDateSelect,
  onEventClick,
  view = "month",
  selectable = true,
  editable = false,
  height = "auto",
}: FullCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentView, setCurrentView] = useState(view)

  const today = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

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

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const previousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day)
    if (onDateSelect) {
      onDateSelect(clickedDate)
    }
  }

  const handleEventClick = (event: CalendarEvent) => {
    if (onEventClick) {
      onEventClick(event)
    }
  }

  const getEventsForDate = (day: number) => {
    const dateStr = new Date(currentYear, currentMonth, day).toISOString().split("T")[0]
    return events.filter((event) => {
      const eventDate = new Date(event.start).toISOString().split("T")[0]
      return eventDate === dateStr
    })
  }

  const isToday = (day: number) => {
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
  }

  const renderMonthView = () => {
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 border border-gray-200 bg-gray-50"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day)

      days.push(
        <div
          key={day}
          className={cn(
            "h-20 border border-gray-200 p-1 cursor-pointer hover:bg-gray-50 overflow-hidden",
            isToday(day) && "bg-blue-50",
          )}
          onClick={() => handleDateClick(day)}
        >
          <div className={cn("text-sm font-medium mb-1", isToday(day) ? "text-blue-600" : "text-gray-900")}>{day}</div>
          <div className="space-y-1">
            {dayEvents.slice(0, 1).map((event) => (
              <div
                key={event.id}
                className={cn(
                  "text-xs p-1 rounded cursor-pointer truncate",
                  "bg-blue-500 text-white hover:bg-blue-600",
                )}
                style={{
                  backgroundColor: event.backgroundColor || "#3b82f6",
                  color: event.textColor || "#ffffff",
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleEventClick(event)
                }}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 1 && <div className="text-xs text-gray-500">+{dayEvents.length - 1}</div>}
          </div>
        </div>,
      )
    }

    return (
      <div className="grid grid-cols-7 gap-0 min-h-0">
        {/* Day headers */}
        {dayNames.map((day) => (
          <div
            key={day}
            className="h-8 bg-gray-50 border border-gray-200 flex items-center justify-center text-sm font-medium text-gray-700"
          >
            {day}
          </div>
        ))}
        {/* Calendar days */}
        {days}
      </div>
    )
  }

  return (
    <div className={cn("w-full bg-white rounded-lg border overflow-hidden", className)} style={{ height }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={currentView === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentView("month")}
          >
            Mês
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
            Hoje
          </Button>
        </div>
      </div>

      {/* Calendar content */}
      <div className="overflow-hidden">{renderMonthView()}</div>
    </div>
  )
}
