"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Save, Plus, Sparkles, Brain, Calendar, Clock, Palette } from "lucide-react"
import { useEvents, type Event } from "./event-context"
import { eventColors } from "./theme-config"

interface EventFormProps {
  isOpen: boolean
  onClose: () => void
  selectedDate?: string
  editingEvent?: Event | null
}

export function EventForm({ isOpen, onClose, selectedDate, editingEvent }: EventFormProps) {
  const { addEvent, updateEvent } = useEvents()
  const [formData, setFormData] = useState({
    title: "",
    date: selectedDate || new Date().toISOString().split("T")[0],
    time: "09:00",
    duration: "1h",
    description: "",
    color: "bg-gradient-to-r from-blue-500 to-cyan-500",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [aiSuggestions] = useState([
    "Team standup meeting",
    "Client presentation prep",
    "Code review session",
    "Project planning",
    "Design workshop",
  ])

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title,
        date: editingEvent.date,
        time: editingEvent.time,
        duration: editingEvent.duration,
        description: editingEvent.description || "",
        color: editingEvent.color || "bg-gradient-to-r from-blue-500 to-cyan-500",
      })
    } else if (selectedDate) {
      setFormData((prev) => ({ ...prev, date: selectedDate }))
    }
  }, [editingEvent, selectedDate])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.date) {
      newErrors.date = "Date is required"
    }

    if (!formData.time) {
      newErrors.time = "Time is required"
    }

    if (!formData.duration.trim()) {
      newErrors.duration = "Duration is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (editingEvent) {
      updateEvent(editingEvent.id, formData)
    } else {
      addEvent(formData)
    }

    handleClose()
  }

  const handleClose = () => {
    setFormData({
      title: "",
      date: selectedDate || new Date().toISOString().split("T")[0],
      time: "09:00",
      duration: "1h",
      description: "",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    })
    setErrors({})
    onClose()
  }

  const handleAISuggestion = (suggestion: string) => {
    setFormData((prev) => ({ ...prev, title: suggestion }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-slate-900/95 border-white/10">
        <CardHeader className="border-b border-white/10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center space-x-3 text-white">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center">
                {editingEvent ? <Save className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-white" />}
              </div>
              <span>{editingEvent ? "Edit Event" : "Create New Event"}</span>
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={handleClose} className="text-gray-400 hover:text-white">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* AI Suggestions */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-purple-400" />
                <Label className="text-sm font-medium text-gray-300">AI Suggestions</Label>
              </div>
              <div className="flex flex-wrap gap-2">
                {aiSuggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleAISuggestion(suggestion)}
                    className="text-xs border-white/20 text-gray-300 hover:bg-white/10 hover:text-white hover:border-cyan-400/50"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-300 flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Event Title *</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter event title..."
                className={`bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-cyan-400/50 ${
                  errors.title ? "border-red-500" : ""
                }`}
              />
              {errors.title && <p className="text-sm text-red-400">{errors.title}</p>}
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-gray-300">
                  Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                  className={`bg-white/5 border-white/10 text-white focus:border-cyan-400/50 ${
                    errors.date ? "border-red-500" : ""
                  }`}
                />
                {errors.date && <p className="text-sm text-red-400">{errors.date}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="text-gray-300 flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>Time *</span>
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                  className={`bg-white/5 border-white/10 text-white focus:border-cyan-400/50 ${
                    errors.time ? "border-red-500" : ""
                  }`}
                />
                {errors.time && <p className="text-sm text-red-400">{errors.time}</p>}
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-gray-300">
                Duration *
              </Label>
              <Select
                value={formData.duration}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, duration: value }))}
              >
                <SelectTrigger
                  className={`bg-white/5 border-white/10 text-white focus:border-cyan-400/50 ${
                    errors.duration ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  <SelectItem value="15m">15 minutes</SelectItem>
                  <SelectItem value="30m">30 minutes</SelectItem>
                  <SelectItem value="45m">45 minutes</SelectItem>
                  <SelectItem value="1h">1 hour</SelectItem>
                  <SelectItem value="1h 30m">1.5 hours</SelectItem>
                  <SelectItem value="2h">2 hours</SelectItem>
                  <SelectItem value="3h">3 hours</SelectItem>
                  <SelectItem value="4h">4 hours</SelectItem>
                  <SelectItem value="All day">All day</SelectItem>
                </SelectContent>
              </Select>
              {errors.duration && <p className="text-sm text-red-400">{errors.duration}</p>}
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <Label className="text-gray-300 flex items-center space-x-2">
                <Palette className="w-4 h-4 text-pink-400" />
                <span>Event Color</span>
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {eventColors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, color: color.value }))}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      formData.color === color.value
                        ? "border-white/50 scale-105"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div className={`w-full h-6 ${color.class} rounded-md mb-2`} />
                    <p className="text-xs text-gray-300">{color.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-300">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Add event description, notes, or agenda..."
                rows={4}
                className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-cyan-400/50 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0 hover:from-cyan-600 hover:to-purple-600"
              >
                {editingEvent ? "Update Event" : "Create Event"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
