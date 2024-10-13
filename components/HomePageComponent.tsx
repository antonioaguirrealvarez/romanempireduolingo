'use client'

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Flame, Settings, BarChart2, BookOpen, Lock, Trophy, User, Home, Sword, Calendar, Heart, CheckCircle } from 'lucide-react'
import { motion } from "framer-motion"
import Link from 'next/link'
import { getUserProgress, UserProgress } from '../utils/userProgress'

interface SubLesson {
  id: string
  title: string
  completed: boolean
}

interface Lesson {
  id: string
  title: string
  tasks: any[]
}

interface Block {
  id: string
  title: string
  lessons: Lesson[]
}

interface HeaderProps {
  streak: number | null;
  daysUsingApp: number | null;
  lives: number | null;
}

function Header({ streak, daysUsingApp, lives }: HeaderProps) {
  if (streak === null || daysUsingApp === null || lives === null) {
    return <div>Loading...</div> // or any loading placeholder
  }

  return (
    <motion.header 
      className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold">Roman Empire</h1>
      <div className="flex items-center space-x-6">
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Flame className="text-[#FFD700] mr-2" />
          <span className="font-semibold">{streak} lesson streak</span>
        </motion.div>
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Calendar className="text-[#FFD700] mr-2" />
          <span className="font-semibold">{daysUsingApp} days</span>
        </motion.div>
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className="text-[#FFD700] mr-2" />
          <span className="font-semibold">{lives} lives</span>
        </motion.div>
      </div>
    </motion.header>
  )
}

export function HomePageComponent() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [userId, setUserId] = useState('user1'); // Use a fixed userId for now

  useEffect(() => {
    setIsClient(true)
    async function fetchData() {
      try {
        const updatedProgress = await getUserProgress(userId)
        setUserProgress(updatedProgress)
        console.log('Updated user progress:', updatedProgress)

        const response = await fetch('/api/lessons')
        const data = await response.json()
        console.log('Fetched lessons data:', data)
        setBlocks(data.blocks)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [userId]) // Add userId to the dependency array

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F4F4]">
      <Header 
        streak={userProgress?.currentStreak ?? 0}
        daysUsingApp={userProgress?.daysUsingApp ?? 0}
        lives={userProgress?.livesUsed ?? 0}
      />
      <main className="flex-1 overflow-y-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold text-[#8B4513] mb-2">Your Roman Journey</h1>
          <p className="text-xl text-[#5D4037]">Embark on an epic quest through ancient Rome</p>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mt-4"
          >
            <Sword className="text-[#FFD700] w-16 h-16 mx-auto" />
          </motion.div>
        </motion.div>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-[#FFD700] rounded"></div>
          {blocks.map((block, blockIndex) => (
            <React.Fragment key={block.id}>
              <h2 className="text-2xl font-bold text-[#8B4513] mb-4 ml-16">{block.title}</h2>
              {block.lessons.map((lesson, lessonIndex) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (blockIndex * block.lessons.length + lessonIndex) * 0.1 }}
                  className="mb-8 pl-16 relative"
                >
                  <div className="absolute left-6 top-1/2 w-4 h-4 bg-[#FFD700] rounded-full transform -translate-y-1/2 border-4 border-white"></div>
                  <Card className={`w-full max-w-2xl p-4 bg-white hover:shadow-md transition-shadow ${userProgress?.lessonsCompleted.includes(lesson.id) ? 'border-green-500 border-4' : 'border-[#FFD700]'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-[#8B4513]">{lesson.title}</h3>
                      {userProgress?.lessonsCompleted.includes(lesson.id) ? (
                        <CheckCircle className="text-green-500" size={24} />
                      ) : (
                        <BookOpen className="text-[#8B4513]" size={24} />
                      )}
                    </div>
                    <p className="text-sm text-[#5D4037] mb-2">Explore this lesson about {lesson.title}</p>
                    <div className="space-y-1 mb-4">
                      {lesson.tasks.slice(0, 3).map((task) => (
                        <div key={task.id} className="flex items-center">
                          <div className="w-2 h-2 rounded-full mr-2 bg-[#BDBDBD]" />
                          <span className="text-xs text-[#5D4037]">{task.question.substring(0, 30)}...</span>
                        </div>
                      ))}
                    </div>
                    <Link href={`/lesson/${lesson.id}`}>
                      <Button 
                        className="w-full bg-[#FFD700] text-[#8B4513] hover:bg-[#E6C200]"
                      >
                        Start Lesson
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </main>
      <BottomMenu />
    </div>
  )
}

export function BottomMenu() {
  return (
    <nav className="bg-white border-t border-gray-200 p-4 sticky bottom-0 z-10 shadow-lg">
      <div className="flex justify-around items-center">
        <Link href="/">
          <Button variant="ghost" className="flex flex-col items-center">
            <Home className="h-6 w-6" />
          </Button>
        </Link>
        <Link href="/analytics">
          <Button variant="ghost" className="flex flex-col items-center">
            <BarChart2 className="h-6 w-6" />
          </Button>
        </Link>
      </div>
    </nav>
  )
}
