"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, Clock, Users, Target, Zap } from "lucide-react"

export function SmartSuggestions() {
  const suggestions = [
    {
      type: "optimization",
      icon: TrendingUp,
      title: "Optimize Your Schedule",
      description: "Move your 2 PM meeting to 10 AM for better productivity",
      impact: "High",
      timesSaved: "45 min",
      color: "from-green-500 to-emerald-500",
    },
    {
      type: "focus",
      icon: Clock,
      title: "Focus Time Block",
      description: "Schedule 2-hour deep work session tomorrow morning",
      impact: "Medium",
      timesSaved: "2 hours",
      color: "from-blue-500 to-cyan-500",
    },
    {
      type: "collaboration",
      icon: Users,
      title: "Team Sync Opportunity",
      description: "All team members are free Thursday 3-4 PM",
      impact: "High",
      timesSaved: "30 min",
      color: "from-purple-500 to-pink-500",
    },
    {
      type: "goal",
      icon: Target,
      title: "Goal Achievement",
      description: "You're 87% towards your weekly meeting goal",
      impact: "Low",
      timesSaved: "15 min",
      color: "from-orange-500 to-red-500",
    },
  ]

  return (
    <Card className="backdrop-blur-xl bg-white/5 border-white/10">
      <CardHeader className="border-b border-white/10">
        <CardTitle className="flex items-center space-x-2 text-white">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span>AI-Powered Insights</span>
          <Badge variant="outline" className="border-purple-400/50 text-purple-400 bg-purple-400/10">
            <Zap className="w-3 h-3 mr-1" />
            Smart Mode
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`w-10 h-10 bg-gradient-to-r ${suggestion.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  <suggestion.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {suggestion.title}
                    </h4>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        suggestion.impact === "High"
                          ? "border-green-400/50 text-green-400"
                          : suggestion.impact === "Medium"
                            ? "border-yellow-400/50 text-yellow-400"
                            : "border-gray-400/50 text-gray-400"
                      }`}
                    >
                      {suggestion.impact}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 mb-3 leading-relaxed">{suggestion.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs text-cyan-400">
                      <Clock className="w-3 h-3" />
                      <span>Saves {suggestion.timesSaved}</span>
                    </div>
                    <Button
                      size="sm"
                      className="h-6 px-3 text-xs bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0 hover:from-cyan-600 hover:to-purple-600"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
