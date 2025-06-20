"use client"

import type React from "react"

import { useEvents, type Event } from "./event-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, AlertTriangle, Plus, Trash2 } from "lucide-react"

interface EventListProps {
  selectedDate: string | null
  onEventClick: (event: Event) => void
  onAddEvent: () => void
}

export function EventList({ selectedDate, onEventClick, onAddEvent }: EventListProps) {
  const { getEventsForDate, hasConflicts, events, deleteEvent } = useEvents()

  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : []
  const conflicts = selectedDate ? hasConflicts(selectedDate) : false

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getUpcomingEvents = () => {
    const today = new Date()
    const todayString = today.toISOString().split("T")[0]

    return events
      .filter((event) => event.date >= todayString)
      .sort((a, b) => {
        if (a.date === b.date) {
          return a.time.localeCompare(b.time)
        }
        return a.date.localeCompare(b.date)
      })
      .slice(0, 5)
  }

  const handleQuickDelete = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm(`Delete "${event.title}"?`)) {
      deleteEvent(event.id)
    }
  }

  return (
    <div className="space-y-4">
      {selectedDate ? (
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {formatDate(selectedDate)}
              </CardTitle>
              <Button size="sm" onClick={onAddEvent}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {conflicts && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertTriangle className="h-4 w-4" />
                Time conflicts detected
              </div>
            )}
          </CardHeader>
          <CardContent>
            {selectedEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`
                      p-3 rounded-lg border-l-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors
                      ${event.color?.replace("bg-", "border-l-")}
                    `}
                    onClick={() => onEventClick(event)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.time}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {event.duration}
                          </Badge>
                        </div>
                        {event.description && (
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{event.description}</p>
                        )}
                        {conflicts && selectedEvents.filter((e) => e.time === event.time).length > 1 && (
                          <div className="mt-2 text-xs text-red-600 flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            Conflicts with other events at this time
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={(e) => handleQuickDelete(event, e)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No events scheduled</p>
                <Button onClick={onAddEvent} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
              <Button size="sm" onClick={onAddEvent}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {events.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No events available</p>
                <Button onClick={onAddEvent} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Event
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {getUpcomingEvents().map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => onEventClick(event)}
                  >
                    <div className={`w-3 h-3 rounded-full mt-1 ${event.color}`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{event.title}</h4>
                      <div className="text-sm text-gray-600">{formatDate(event.date)}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{event.time}</span>
                        <Badge variant="outline" className="text-xs">
                          {event.duration}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={(e) => handleQuickDelete(event, e)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
