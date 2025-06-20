"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Cloud, Sun, CloudRain, Thermometer } from "lucide-react"

export function WeatherWidget() {
  const [weather, setWeather] = useState({
    temp: 22,
    condition: "sunny",
    humidity: 65,
    location: "San Francisco",
  })

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="w-6 h-6 text-yellow-400" />
      case "cloudy":
        return <Cloud className="w-6 h-6 text-gray-400" />
      case "rainy":
        return <CloudRain className="w-6 h-6 text-blue-400" />
      default:
        return <Sun className="w-6 h-6 text-yellow-400" />
    }
  }

  return (
    <Card className="backdrop-blur-xl bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">Weather</p>
            <div className="flex items-center space-x-2">
              {getWeatherIcon(weather.condition)}
              <span className="text-2xl font-bold text-white">{weather.temp}°</span>
            </div>
            <p className="text-xs text-gray-500">{weather.location}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <Thermometer className="w-3 h-3" />
              <span>{weather.humidity}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
