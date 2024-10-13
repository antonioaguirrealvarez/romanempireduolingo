'use client'

import React, { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Moon, Sun, Volume2, Bell, Globe, ArrowLeft, Clock, BookOpen, Settings, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function SettingsPageComponent() {
  const [darkMode, setDarkMode] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [language, setLanguage] = useState('English')
  const [fontSize, setFontSize] = useState(16)
  const [dailyGoal, setDailyGoal] = useState(15)
  const [difficultyLevel, setDifficultyLevel] = useState('medium')
  const [privacyMode, setPrivacyMode] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('userSettings')
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings)
      setDarkMode(parsedSettings.darkMode)
      setSoundEnabled(parsedSettings.soundEnabled)
      setNotificationsEnabled(parsedSettings.notificationsEnabled)
      setLanguage(parsedSettings.language)
      setFontSize(parsedSettings.fontSize)
      setDailyGoal(parsedSettings.dailyGoal)
      setDifficultyLevel(parsedSettings.difficultyLevel)
      setPrivacyMode(parsedSettings.privacyMode)
    }
  }, [])

  const saveSettings = () => {
    const settings = {
      darkMode,
      soundEnabled,
      notificationsEnabled,
      language,
      fontSize,
      dailyGoal,
      difficultyLevel,
      privacyMode
    }
    localStorage.setItem('userSettings', JSON.stringify(settings))
    // Here you would typically update your app's theme and other settings
    document.documentElement.classList.toggle('dark', darkMode)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="bg-[#8B4513] text-white p-4 flex justify-between items-center sticky top-0 z-10">
        <Button variant="ghost" onClick={() => router.push('/')} className="text-white">
          <ArrowLeft className="mr-2" /> Back
        </Button>
        <h1 className="text-xl font-bold">Settings</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <Label htmlFor="dark-mode">Dark Mode</Label>
            </div>
            <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Volume2 className="h-5 w-5" />
              <Label htmlFor="sound">Sound Effects</Label>
            </div>
            <Switch id="sound" checked={soundEnabled} onCheckedChange={setSoundEnabled} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <Label htmlFor="notifications">Notifications</Label>
            </div>
            <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <Label>Language</Label>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded p-2"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <Label>Font Size: {fontSize}px</Label>
            </div>
            <Slider
              value={[fontSize]}
              onValueChange={(value) => setFontSize(value[0])}
              min={12}
              max={24}
              step={1}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <Label>Daily Goal: {dailyGoal} minutes</Label>
            </div>
            <Slider
              value={[dailyGoal]}
              onValueChange={(value) => setDailyGoal(value[0])}
              min={5}
              max={60}
              step={5}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <Label>Difficulty Level</Label>
            </div>
            <select
              value={difficultyLevel}
              onChange={(e) => setDifficultyLevel(e.target.value)}
              className="border rounded p-2"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5" />
              <Label htmlFor="privacy-mode">Privacy Mode</Label>
            </div>
            <Switch id="privacy-mode" checked={privacyMode} onCheckedChange={setPrivacyMode} />
          </div>
          <Button onClick={saveSettings} className="w-full bg-[#FFD700] text-[#8B4513] hover:bg-[#E6C200]">
            Save Settings
          </Button>
        </Card>
      </main>

      <nav className="bg-white border-t border-gray-200 p-4 sticky bottom-0 z-10">
        <div className="flex justify-around items-center">
          <Link href="/">
            <Button variant="ghost" className="text-sm">Home</Button>
          </Link>
          <Link href="/analytics">
            <Button variant="ghost" className="text-sm">Analytics</Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" className="text-sm">Profile</Button>
          </Link>
          <Link href="/settings">
            <Button variant="ghost" className="text-sm">Settings</Button>
          </Link>
        </div>
      </nav>
    </div>
  )
}
