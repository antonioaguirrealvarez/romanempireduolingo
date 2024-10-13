import React from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Check, X } from 'lucide-react'

interface FeedbackDisplayProps {
  isCorrect: boolean | null
}

export function FeedbackDisplay({ isCorrect }: FeedbackDisplayProps) {
  return (
    <AnimatePresence>
      {isCorrect !== null && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
        >
          {isCorrect ? (
            <div className="flex items-center">
              <Check className="mr-2" />
              <span>Correct! Well done!</span>
            </div>
          ) : (
            <div className="flex items-center">
              <X className="mr-2" />
              <span>Incorrect. Try again!</span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}