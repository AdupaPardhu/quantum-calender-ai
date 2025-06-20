"use client"

import { useEvents, type Event } from "./event-context"
import { CalendarDay } from "./calendar-day"

interface WeekViewProps {
  currentDate: Date
  selectedDate: string | null
  onDateSelect: (date: string | null) => void
  onEventClick?: (event: Event) => void
}

export function WeekView({ currentDate, selectedDate, onDateSelect, onEventClick }: WeekViewProps) {
  const { getEventsForDate } = useEvents()

  const getWeekDates = (date: Date) => {
    const startOfWeek = new Date(date)
    const day = startOfWeek.getDay()
    startOfWeek.setDate(startOfWeek.getDate() - day)

    const weekDates = []
    for (let i = 0; i < 7; i++) {
      const weekDate = new Date(startOfWeek)
      weekDate.setDate(startOfWeek.getDate() + i)
      weekDates.push(weekDate)
    }
    return weekDates
  }

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return today.toDateString() === date.toDateString()
  }

  const weekDates = getWeekDates(currentDate)
  const weekDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="w-full">
      {/* Week header */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDates.map((date, index) => (
          <div key={index} className="text-center">
            <div className="text-sm font-medium text-gray-500 uppercase">{weekDayNames[index]}</div>
            <div className={`text-lg font-bold mt-1 ${isToday(date) ? "text-blue-600" : "text-gray-700"}`}>
              {date.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Week grid */}
      <div className="grid grid-cols-7 gap-2">
        {weekDates.map((date, index) => {
          const dateString = formatDate(date)
          const dayEvents = getEventsForDate(dateString)
          const isCurrentDay = isToday(date)
          const isSelected = selectedDate === dateString

          return (
            <CalendarDay
              key={index}
              day={date.getDate()}
              dateString={dateString}
              events={dayEvents}
              isToday={isCurrentDay}
              isSelected={isSelected}
              isCurrentMonth={true}
              onClick={() => onDateSelect(isSelected ? null : dateString)}
              onEventClick={onEventClick}
            />
          )
        })}
      </div>
    </div>
  )
}
