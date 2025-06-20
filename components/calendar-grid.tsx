"use client"

import { useEvents } from "./event-context"
import { CalendarDay } from "./calendar-day"

interface CalendarGridProps {
  currentDate: Date
  selectedDate: string | null
  onDateSelect: (date: string | null) => void
  onEventClick?: (event: any) => void
}

export function CalendarGrid({ currentDate, selectedDate, onDateSelect, onEventClick }: CalendarGridProps) {
  const { getEventsForDate } = useEvents()

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const isToday = (year: number, month: number, day: number) => {
    const today = new Date()
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
  }

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)

  const days = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(
      <div key={`empty-${i}`} className="h-24 sm:h-32 border border-white/5 rounded-xl bg-white/5 backdrop-blur-sm" />,
    )
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = formatDate(year, month, day)
    const dayEvents = getEventsForDate(dateString)
    const isCurrentDay = isToday(year, month, day)
    const isSelected = selectedDate === dateString

    days.push(
      <CalendarDay
        key={day}
        day={day}
        dateString={dateString}
        events={dayEvents}
        isToday={isCurrentDay}
        isSelected={isSelected}
        isCurrentMonth={true}
        onClick={() => onDateSelect(isSelected ? null : dateString)}
        onEventClick={onEventClick}
      />,
    )
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="w-full space-y-4">
      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div key={day} className="p-3 text-center text-sm font-medium text-gray-400 uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">{days}</div>
    </div>
  )
}
