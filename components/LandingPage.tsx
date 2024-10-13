import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8B4513] to-[#A0522D] flex flex-col items-center justify-center text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold mb-4 text-center">Roman Empire</h1>
        <p className="text-xl mb-8 text-center">Embark on an epic journey through ancient Rome</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Link href="/lessons">
          <Button className="bg-[#FFD700] text-[#8B4513] hover:bg-[#E6C200] font-bold py-4 px-8 rounded-full text-xl">
            Start Your Journey
          </Button>
        </Link>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-12 text-center"
      >
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="space-y-2">
          <li>Interactive Lessons</li>
          <li>Progress Tracking</li>
          <li>Historical Accuracy</li>
          <li>Engaging Quizzes</li>
        </ul>
      </motion.div>
    </div>
  )
}
