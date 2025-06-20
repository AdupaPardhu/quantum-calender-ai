"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Event {
  id: string
  title: string
  date: string
  time: string
  duration: string
  description?: string
  color?: string
}

// Initial static event data
const initialEvents: Event[] = [
  {
    id: "1",
    title: "Team Meeting",
    date: "2025-01-22",
    time: "14:00",
    duration: "1h",
    description: "Weekly team sync meeting",
    color: "bg-blue-500",
  },
  {
    id: "2",
    title: "Project Review",
    date: "2025-01-22",
    time: "14:00",
    duration: "30m",
    description: "Review project progress and milestones",
    color: "bg-red-500",
  },
  {
    id: "3",
    title: "Client Presentation",
    date: "2025-01-15",
    time: "10:00",
    duration: "2h",
    description: "Present quarterly results to client",
    color: "bg-green-500",
  },
  {
    id: "4",
    title: "Code Review",
    date: "2025-01-15",
    time: "15:30",
    duration: "45m",
    description: "Review pull requests and code quality",
    color: "bg-purple-500",
  },
  {
    id: "5",
    title: "Daily Standup",
    date: new Date().toISOString().split("T")[0],
    time: "09:30",
    duration: "15m",
    description: "Daily team standup meeting",
    color: "bg-cyan-500",
  },
]

interface EventContextType {
  events: Event[]
  getEventsForDate: (date: string) => Event[]
  hasConflicts: (date: string) => boolean
  addEvent: (event: Omit<Event, "id">) => void
  updateEvent: (id: string, event: Partial<Event>) => void
  deleteEvent: (id: string) => void
  getEventById: (id: string) => Event | undefined
}

const EventContext = createContext<EventContextType | undefined>(undefined)

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(initialEvents)

  const getEventsForDate = (date: string): Event[] => {
    return events.filter((event) => event.date === date)
  }

  const hasConflicts = (date: string): boolean => {
    const dayEvents = getEventsForDate(date)
    if (dayEvents.length <= 1) return false

    // Check for time conflicts
    const timeSlots = new Set()
    for (const event of dayEvents) {
      if (timeSlots.has(event.time)) {
        return true
      }
      timeSlots.add(event.time)
    }
    return false
  }

  const addEvent = (eventData: Omit<Event, "id">) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    }
    setEvents((prev) => [...prev, newEvent])
  }

  const updateEvent = (id: string, eventData: Partial<Event>) => {
    setEvents((prev) => prev.map((event) => (event.id === id ? { ...event, ...eventData } : event)))
  }

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id))
  }

  const getEventById = (id: string): Event | undefined => {
    return events.find((event) => event.id === id)
  }

  const value = {
    events,
    getEventsForDate,
    hasConflicts,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
  }

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>
}

export function useEvents() {
  const context = useContext(EventContext)
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventProvider")
  }
  return context
}
