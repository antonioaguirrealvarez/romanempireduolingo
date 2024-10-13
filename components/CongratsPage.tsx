import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trophy, ArrowRight, Clock, CheckCircle, Flame, BookOpen } from 'lucide-react'
import Confetti from 'react-confetti'

interface CongratsPageProps {
  onGoHome: () => void
  timeTaken: number
  score: { correct: number; total: number }
  streak: number
  tasksLearned: string[]
}

export function CongratsPage({ onGoHome, timeTaken, score, streak, tasksLearned }: CongratsPageProps) {
  const messages = ["Congratulations!", "AMAZING!", "KEEP UP THE GOOD WORK!"]
  const [randomMessage] = useState(messages[Math.floor(Math.random() * messages.length)])
  const [showItems, setShowItems] = useState(0)
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setShowItems(prev => (prev < 4 ? prev + 1 : prev)) // Change this to 4 to include the new icon
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8B4513] to-[#A0522D] flex flex-col items-center justify-center text-white p-4">
      {showConfetti && <Confetti />}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Trophy size={100} className="text-[#FFD700] mb-6" />
      </motion.div>
      
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {randomMessage}
      </motion.h1>

      <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-2xl">
        {showItems > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white text-[#8B4513] p-4 rounded-lg">
            <p className="flex flex-col items-center text-xl">
              <Clock className="mb-2 w-8 h-8" />
              <span>Time:</span>
              <span className="font-bold">{timeTaken} seconds</span>
            </p>
          </motion.div>
        )}
        {showItems > 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white text-[#8B4513] p-4 rounded-lg">
            <p className="flex flex-col items-center text-xl">
              <CheckCircle className="mb-2 w-8 h-8" />
              <span>Score:</span>
              <span className="font-bold">{score.correct}/{score.total}</span>
            </p>
          </motion.div>
        )}
        {showItems > 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white text-[#8B4513] p-4 rounded-lg">
            <p className="flex flex-col items-center text-xl">
              <Flame className="mb-2 w-8 h-8" />
              <span>Streak:</span>
              <span className="font-bold">{streak}</span>
            </p>
          </motion.div>
        )}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 2 }}
        className="mt-8 bg-white text-[#8B4513] p-4 rounded-lg w-full max-w-2xl"
      >
        <h2 className="text-xl font-bold mb-2 flex items-center">
          <BookOpen className="mr-2" /> Tasks Learned:
        </h2>
        <ul className="list-disc list-inside">
          {tasksLearned.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </motion.div>

      <Button 
        onClick={onGoHome}
        className="bg-[#FFD700] text-[#8B4513] hover:bg-[#E6C200] font-bold py-4 px-8 rounded-full text-xl mt-12"
      >
        Go to Home
        <ArrowRight className="ml-2" />
      </Button>
    </div>
  )
}
