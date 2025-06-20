"use client"

import { useState, useCallback, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  CalendarDays,
  Plus,
  Zap,
  Brain,
  Target,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarGrid } from "./calendar-grid"
import { EventList } from "./event-list"
import { WeekView } from "./week-view"
import { EventForm } from "./event-form"
import { EventDetails } from "./event-details"
import { SmartSuggestions } from "./smart-suggestions"
import type { Event } from "./event-context"

type ViewMode = "month" | "week" | "day"

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("month")
  const [showEventForm, setShowEventForm] = useState(false)
  const [showEventDetails, setShowEventDetails] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isAIMode, setIsAIMode] = useState(false)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const navigateMonth = useCallback((direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }, [])

  const goToToday = useCallback(() => {
    setCurrentDate(new Date())
    setSelectedDate(null)
  }, [])

  const handleAddEvent = () => {
    setEditingEvent(null)
    setShowEventForm(true)
  }

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event)
    setShowEventForm(true)
    setShowEventDetails(false)
  }

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    setShowEventDetails(true)
  }

  const handleCloseEventForm = () => {
    setShowEventForm(false)
    setEditingEvent(null)
  }

  const handleCloseEventDetails = () => {
    setShowEventDetails(false)
    setSelectedEvent(null)
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return

      switch (event.key) {
        case "ArrowLeft":
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            navigateMonth("prev")
          }
          break
        case "ArrowRight":
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            navigateMonth("next")
          }
          break
        case "t":
        case "T":
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            goToToday()
          }
          break
        case "n":
        case "N":
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            handleAddEvent()
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [navigateMonth, goToToday])

  return (
    <div className="space-y-6">
      {/* Main Calendar Card */}
      <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
        <CardHeader className="border-b border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-white">
                    <time
                      dateTime={`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`}
                    >
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </time>
                  </CardTitle>
                  <p className="text-sm text-gray-400">Quantum Time Management</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* AI Mode Toggle */}
              <Button
                variant={isAIMode ? "default" : "outline"}
                size="sm"
                onClick={() => setIsAIMode(!isAIMode)}
                className={`${
                  isAIMode
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
                    : "border-white/20 text-white hover:bg-white/10"
                }`}
              >
                <Brain className="w-4 h-4 mr-2" />
                AI Mode
              </Button>

              {/* Add Event Button */}
              <Button
                onClick={handleAddEvent}
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0 hover:from-cyan-600 hover:to-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>

              {/* View Toggle */}
              <div className="flex bg-white/10 rounded-lg p-1 backdrop-blur-sm">
                {(["month", "week", "day"] as ViewMode[]).map((mode) => (
                  <Button
                    key={mode}
                    variant={viewMode === mode ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode(mode)}
                    className={`px-3 py-1 capitalize ${
                      viewMode === mode
                        ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {mode === "month" && <CalendarIcon className="w-4 h-4 mr-1" />}
                    {mode === "week" && <CalendarDays className="w-4 h-4 mr-1" />}
                    {mode === "day" && <Target className="w-4 h-4 mr-1" />}
                    {mode}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={goToToday}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Today
              </Button>

              {/* Navigation */}
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateMonth("prev")}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateMonth("next")}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Badge variant="outline" className="border-cyan-400/50 text-cyan-400 bg-cyan-400/10">
              <Zap className="w-3 h-3 mr-1" />
              12 Events This Month
            </Badge>
            <Badge variant="outline" className="border-purple-400/50 text-purple-400 bg-purple-400/10">
              <TrendingUp className="w-3 h-3 mr-1" />
              87% Completion Rate
            </Badge>
            <Badge variant="outline" className="border-green-400/50 text-green-400 bg-green-400/10">
              <Target className="w-3 h-3 mr-1" />3 Goals Achieved
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {viewMode === "month" ? (
            <CalendarGrid
              currentDate={currentDate}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              onEventClick={handleEventClick}
            />
          ) : (
            <WeekView
              currentDate={currentDate}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              onEventClick={handleEventClick}
            />
          )}
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      {isAIMode && <SmartSuggestions />}

      {/* Event Sidebar */}
      <EventList selectedDate={selectedDate} onEventClick={handleEventClick} onAddEvent={handleAddEvent} />

      {/* Modals */}
      <EventForm
        isOpen={showEventForm}
        onClose={handleCloseEventForm}
        selectedDate={selectedDate}
        editingEvent={editingEvent}
      />

      <EventDetails
        isOpen={showEventDetails}
        onClose={handleCloseEventDetails}
        event={selectedEvent}
        onEdit={handleEditEvent}
      />

      {/* Keyboard Shortcuts */}
      <div className="text-center text-xs text-gray-500">
        <p>⌘+← / ⌘+→ Navigate • ⌘+T Today • ⌘+N New Event</p>
      </div>
    </div>
  )
}
