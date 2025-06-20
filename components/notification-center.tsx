"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, X, Calendar, Users, AlertTriangle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function NotificationCenter() {
  const [notifications] = useState([
    {
      id: 1,
      type: "reminder",
      icon: Calendar,
      title: "Meeting in 15 minutes",
      description: "Team standup with Sarah and Mike",
      time: "2 min ago",
      urgent: true,
    },
    {
      id: 2,
      type: "update",
      icon: Users,
      title: "New team member added",
      description: "Alex joined the development team",
      time: "1 hour ago",
      urgent: false,
    },
    {
      id: 3,
      type: "warning",
      icon: AlertTriangle,
      title: "Schedule conflict detected",
      description: "Two meetings overlap at 3 PM",
      time: "2 hours ago",
      urgent: true,
    },
  ])

  const urgentCount = notifications.filter((n) => n.urgent).length

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
          <Bell className="w-5 h-5" />
          {urgentCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
              {urgentCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-slate-900/95 backdrop-blur-xl border-white/10" align="end">
        <Card className="border-0 bg-transparent">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-white flex items-center justify-between">
              <span>Notifications</span>
              <Badge variant="outline" className="border-cyan-400/50 text-cyan-400">
                {notifications.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-white/10 hover:bg-white/5 transition-colors ${
                    notification.urgent ? "border-l-4 border-l-red-500" : ""
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        notification.urgent ? "bg-red-500/20 text-red-400" : "bg-cyan-500/20 text-cyan-400"
                      }`}
                    >
                      <notification.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-white truncate">{notification.title}</h4>
                        <Button variant="ghost" size="icon" className="w-4 h-4 text-gray-400 hover:text-white">
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-400 mb-1">{notification.description}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-white/10">
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                View All Notifications
              </Button>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
