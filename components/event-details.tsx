"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, Edit, Trash2, Clock, Calendar, FileText, AlertTriangle } from "lucide-react"
import { useEvents, type Event } from "./event-context"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface EventDetailsProps {
  isOpen: boolean
  onClose: () => void
  event: Event | null
  onEdit: (event: Event) => void
}

export function EventDetails({ isOpen, onClose, event, onEdit }: EventDetailsProps) {
  const { deleteEvent, hasConflicts } = useEvents()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  if (!isOpen || !event) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const handleDelete = () => {
    deleteEvent(event.id)
    setShowDeleteDialog(false)
    onClose()
  }

  const conflicts = hasConflicts(event.date)

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Event Details</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Event Title and Color */}
            <div className="flex items-start gap-3">
              <div className={`w-4 h-4 rounded-full mt-1 flex-shrink-0 ${event.color}`} />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                {conflicts && (
                  <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
                    <AlertTriangle className="h-3 w-3" />
                    Time conflict detected
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Date and Time */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-medium">{formatDate(event.date)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gray-500" />
                <div className="flex items-center gap-2">
                  <span>{formatTime(event.time)}</span>
                  <Badge variant="outline" className="text-xs">
                    {event.duration}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Description */}
            {event.description && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="font-medium text-sm">Description</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed pl-6">{event.description}</p>
                </div>
              </>
            )}

            <Separator />

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button onClick={() => onEdit(event)} className="flex-1" variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                onClick={() => setShowDeleteDialog(true)}
                variant="outline"
                className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{event.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
