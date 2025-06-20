"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Brain, Send, Sparkles, Calendar, Clock, Users } from "lucide-react"

export function AIAssistant() {
  const [message, setMessage] = useState("")
  const [suggestions] = useState([
    {
      type: "schedule",
      icon: Calendar,
      title: "Optimal Meeting Time",
      description: "Best slot: Tomorrow 2-3 PM",
      confidence: 95,
    },
    {
      type: "productivity",
      icon: Clock,
      title: "Focus Block",
      description: "Schedule 2h deep work session",
      confidence: 88,
    },
    {
      type: "collaboration",
      icon: Users,
      title: "Team Sync",
      description: "Weekly standup due",
      confidence: 92,
    },
  ])

  return (
    <Card className="backdrop-blur-xl bg-white/5 border-white/10">
      <CardHeader className="border-b border-white/10">
        <CardTitle className="flex items-center space-x-2 text-white">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span>AI Assistant</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* AI Suggestions */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300 flex items-center space-x-1">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>Smart Suggestions</span>
          </h4>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <suggestion.icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="text-sm font-medium text-white truncate">{suggestion.title}</h5>
                    <Badge variant="outline" className="text-xs border-green-400/50 text-green-400">
                      {suggestion.confidence}%
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400">{suggestion.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Interface */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300">Ask AI</h4>
          <div className="flex space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about your schedule..."
              className="bg-white/5 border-white/10 text-white placeholder-gray-400"
            />
            <Button size="icon" className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Quick Commands */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-300">Quick Commands</h4>
          <div className="flex flex-wrap gap-2">
            {["Find free time", "Schedule meeting", "Weekly summary", "Optimize schedule"].map((command) => (
              <Button
                key={command}
                variant="outline"
                size="sm"
                className="text-xs border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
              >
                {command}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
