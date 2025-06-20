"use client"

import type React from "react"

import { useState } from "react"
import { type Event, useEvents } from "./event-context"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"

interface CalendarDayProps {
  day: number
  dateString: string
  events: Event[]
  isToday: boolean
  isSelected: boolean
  isCurrentMonth: boolean
  onClick: () => void
  onEventClick?: (event: Event) => void
}

export function CalendarDay({
  day,
  dateString,
  events,
  isToday,
  isSelected,
  isCurrentMonth,
  onClick,
  onEventClick,
}: CalendarDayProps) {
  const { hasConflicts } = useEvents()
  const [isHovered, setIsHovered] = useState(false)

  const conflicts = hasConflicts(dateString)
  const maxVisibleEvents = 2

  const handleEventClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation()
    onEventClick?.(event)
  }

  return (
    <button
      className={`
        h-24 sm:h-32 p-2 border rounded-lg cursor-pointer transition-all duration-200
        text-left focus:outline-none focus:ring-2 focus:ring-blue-500
        ${!isCurrentMonth ? "text-gray-400 bg-gray-50" : "bg-white"}
        ${isToday && isCurrentMonth ? "bg-blue-50 border-blue-300 ring-2 ring-blue-200" : "border-gray-200"}
        ${isSelected ? "ring-2 ring-blue-500 bg-blue-50" : ""}
        ${isHovered ? "shadow-lg" : "hover:shadow-md"}
        ${events.length > 0 && isCurrentMonth ? "border-l-4 border-l-blue-400" : ""}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="gridcell"
      aria-label={`${day}, ${events.length} events`}
      aria-selected={isSelected}
      aria-current={isToday ? "date" : undefined}
    >
      <div className="flex items-start justify-between mb-1">
        <span
          className={`
            text-sm font-medium
            ${isToday && isCurrentMonth ? "text-blue-700 font-bold" : ""}
            ${!isCurrentMonth ? "text-gray-400" : "text-gray-700"}
          `}
        >
          {day}
        </span>
        {conflicts && isCurrentMonth && <AlertTriangle className="h-3 w-3 text-red-500 flex-shrink-0" />}
      </div>

      {isCurrentMonth && (
        <div className="space-y-1 overflow-hidden">
          {events.slice(0, maxVisibleEvents).map((event) => (
            <Badge
              key={event.id}
              variant="secondary"
              className={`
                text-xs px-1 py-0 h-4 w-full justify-start truncate block cursor-pointer
                ${event.color} text-white border-0 hover:opacity-90 transition-opacity
                ${conflicts && events.filter((e) => e.time === event.time).length > 1 ? "ring-1 ring-red-400" : ""}
              `}
              onClick={(e) => handleEventClick(event, e)}
            >
              <span className="truncate">
                {event.time && <span className="font-mono text-xs mr-1">{event.time.slice(0, 5)}</span>}
                {event.title}
              </span>
            </Badge>
          ))}

          {events.length > maxVisibleEvents && (
            <Badge
              variant="outline"
              className="text-xs px-1 py-0 h-4 w-full justify-center bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                onClick()
              }}
            >
              +{events.length - maxVisibleEvents} more
            </Badge>
          )}
        </div>
      )}
    </button>
  )
}
