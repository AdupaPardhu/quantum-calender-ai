"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Clock } from "lucide-react"

export function TimeZoneWidget() {
  const [times, setTimes] = useState([
    { city: "New York", time: "", offset: -5 },
    { city: "London", time: "", offset: 0 },
    { city: "Tokyo", time: "", offset: 9 },
  ])

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date()
      setTimes((prev) =>
        prev.map((tz) => ({
          ...tz,
          time: new Date(now.getTime() + tz.offset * 60 * 60 * 1000).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        })),
      )
    }

    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="backdrop-blur-xl bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Globe className="w-4 h-4 text-cyan-400" />
          <p className="text-sm text-gray-400">World Clock</p>
        </div>
        <div className="space-y-2">
          {times.map((tz, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-xs text-gray-300">{tz.city}</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-gray-400" />
                <span className="text-sm font-mono text-white">{tz.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
