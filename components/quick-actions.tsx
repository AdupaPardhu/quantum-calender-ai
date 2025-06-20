"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, Users, Video, Coffee } from "lucide-react"

export function QuickActions() {
  const actions = [
    { icon: Plus, label: "Quick Event", color: "text-cyan-400" },
    { icon: Video, label: "Meeting", color: "text-purple-400" },
    { icon: Users, label: "Team Sync", color: "text-green-400" },
    { icon: Coffee, label: "Break", color: "text-orange-400" },
  ]

  return (
    <Card className="backdrop-blur-xl bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Calendar className="w-4 h-4 text-green-400" />
          <p className="text-sm text-gray-400">Quick Actions</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <action.icon className={`w-3 h-3 mr-1 ${action.color}`} />
              {action.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
