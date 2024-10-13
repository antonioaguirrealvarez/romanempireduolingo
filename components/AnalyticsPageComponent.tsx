'use client'

import React, { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Calendar, Award, BookOpen, AlertTriangle, ArrowLeft } from 'lucide-react'
import { motion } from "framer-motion"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getUserProgress } from '../utils/userProgress'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { BottomMenu } from './HomePageComponent'  // Import BottomMenu from HomePageComponent

// This data should ideally come from an API or be calculated based on user actions
const weeklyActivityData = [
  { name: 'Mon', lessons: 4 },
  { name: 'Tue', lessons: 3 },
  { name: 'Wed', lessons: 2 },
  { name: 'Thu', lessons: 5 },
  { name: 'Fri', lessons: 1 },
  { name: 'Sat', lessons: 6 },
  { name: 'Sun', lessons: 3 },
]

export function AnalyticsPageComponent({ userId }: { userId: string }) {
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserProgress() {
      const progress = await getUserProgress(userId);
      setUserProgress(progress);
    }
    fetchUserProgress();
  }, [userId]);

  if (!userProgress) {
    return <div>Loading...</div>;
  }

  // Calculate the overall progress (this is a simplified calculation)
  const overallProgress = (userProgress.lessonsCompleted.length / 30) * 100 // Assuming there are 30 total lessons

  const handleSwipeLeft = () => {
    router.push('/')
  }

  return (
    <div 
      className="min-h-screen flex flex-col bg-[#F4F4F4]"
      onTouchStart={(e) => {
        const touch = e.touches[0]
        let startX = touch.clientX
        let startY = touch.clientY

        const handleTouchMove = (e: TouchEvent) => {
          const touch = e.touches[0]
          let diffX = startX - touch.clientX
          let diffY = startY - touch.clientY

          if (Math.abs(diffX) > Math.abs(diffY) && diffX > 50) {
            handleSwipeLeft()
            document.removeEventListener('touchmove', handleTouchMove)
          }
        }

        document.addEventListener('touchmove', handleTouchMove)
      }}
    >
      <header className="bg-[#8B4513] text-white p-4 flex justify-between items-center sticky top-0 z-10">
        <Button variant="ghost" onClick={() => router.push('/')} className="text-white">
          <ArrowLeft className="mr-2" /> Back
        </Button>
        <h1 className="text-xl font-bold">Analytics</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <h1 className="text-3xl font-bold text-[#8B4513] mb-6">Your Progress</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="p-6 bg-white border-[#FFD700]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-[#8B4513]">Overall Progress</h2>
                <BarChart className="text-[#FFD700]" />
              </div>
              <Progress value={overallProgress} className="mb-2" />
              <p className="text-sm text-gray-600">{overallProgress.toFixed(1)}% of course completed</p>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-6 bg-white border-[#FFD700]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-[#8B4513]">Current Streak</h2>
                <Calendar className="text-[#FFD700]" />
              </div>
              <p className="text-4xl font-bold text-[#8B4513]">{userProgress.currentStreak} days</p>
              <p className="text-sm text-gray-600">Keep it up!</p>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="p-6 bg-white border-[#FFD700]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-[#8B4513]">Days Using App</h2>
                <Award className="text-[#FFD700]" />
              </div>
              <p className="text-4xl font-bold text-[#8B4513]">{userProgress.daysUsingApp}</p>
              <p className="text-sm text-gray-600">Days of learning</p>
            </Card>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="mt-6 p-6 bg-white border-[#FFD700]">
            <h2 className="text-xl font-semibold text-[#8B4513] mb-4">Weekly Activity</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={weeklyActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="lessons" fill="#FFD700" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="mt-6 p-6 bg-white border-[#FFD700]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#8B4513]">Total Lessons Completed</h2>
              <BookOpen className="text-[#FFD700]" />
            </div>
            <p className="text-4xl font-bold text-[#8B4513]">{userProgress.lessonsCompleted.length}</p>
            <p className="text-sm text-gray-600">You&apos;re making great progress!</p>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="mt-6 p-6 bg-white border-[#FFD700]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#8B4513]">Tasks with Errors</h2>
              <AlertTriangle className="text-[#FFD700]" />
            </div>
            <ul className="space-y-2">
              {userProgress.tasksWithErrors.map((error, index) => (
                <li key={index} className="bg-[#FFF8E1] p-3 rounded-lg">
                  <p className="font-semibold text-[#8B4513]">Lesson ID: {error.lessonId}</p>
                  <p className="text-sm text-gray-600">Task ID: {error.taskId}</p>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </main>

      <nav className="bg-white border-t border-gray-200 p-4 sticky bottom-0 z-10">
        <BottomMenu />  {/* Add BottomMenu here */}
      </nav>
    </div>
  )
}
