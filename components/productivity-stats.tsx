"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Zap, Award } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function ProductivityStats() {
  const stats = {
    focusTime: 6.5,
    tasksCompleted: 12,
    goalProgress: 87,
    streak: 5,
  }

  return (
    <Card className="backdrop-blur-xl bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <TrendingUp className="w-4 h-4 text-purple-400" />
          <p className="text-sm text-gray-400">Productivity</p>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-300">Daily Goal</span>
              <span className="text-xs text-white">{stats.goalProgress}%</span>
            </div>
            <Progress value={stats.goalProgress} className="h-2" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-1">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span className="text-gray-300">{stats.focusTime}h focus</span>
            </div>
            <div className="flex items-center space-x-1">
              <Award className="w-3 h-3 text-green-400" />
              <span className="text-gray-300">{stats.streak} day streak</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
