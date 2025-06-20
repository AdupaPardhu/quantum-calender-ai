"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/calendar"
import { EventProvider } from "@/components/event-context"
import { ThemeProvider } from "@/components/theme-provider"
import { WeatherWidget } from "@/components/weather-widget"
import { TimeZoneWidget } from "@/components/timezone-widget"
import { ProductivityStats } from "@/components/productivity-stats"
import { QuickActions } from "@/components/quick-actions"
import { AIAssistant } from "@/components/ai-assistant"
import { NotificationCenter } from "@/components/notification-center"
import { Sparkles, Zap, Globe, BarChart3 } from "lucide-react"

export default function FuturisticCalendarApp() {
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-cyan-400 text-xl font-light">Initializing Quantum Calendar...</p>
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider>
      <EventProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
            <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            {/* Header */}
            <header className="border-b border-white/10 backdrop-blur-xl bg-white/5">
              <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                          Quantum Calendar
                        </h1>
                        <p className="text-xs text-gray-400">Next-Gen Time Management</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-6 text-sm text-gray-300">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-cyan-400" />
                        <span>{currentTime.toLocaleTimeString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4 text-purple-400" />
                        <span>Productivity: 87%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span>Focus Mode</span>
                      </div>
                    </div>
                    <NotificationCenter />
                  </div>
                </div>
              </div>
            </header>

            <div className="container mx-auto px-6 py-8">
              {/* Top Widgets Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <WeatherWidget />
                <TimeZoneWidget />
                <ProductivityStats />
                <QuickActions />
              </div>

              {/* Main Calendar Section */}
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                <div className="xl:col-span-3">
                  <Calendar />
                </div>
                <div className="xl:col-span-1 space-y-6">
                  <AIAssistant />
                </div>
              </div>
            </div>
          </div>
        </div>
      </EventProvider>
    </ThemeProvider>
  )
}
