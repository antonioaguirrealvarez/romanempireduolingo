'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { ErrorCard } from './ErrorCard'
import { LoadingSpinner } from './LoadingSpinner'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Flame, HelpCircle, SkipForward, BookmarkPlus, Check, X, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from 'next/navigation'
import { fetchQuestions } from '../utils/api'
import { hardcodedLessonData } from '../app/data/hardcodedLessonData'
import { CongratsPage } from './CongratsPage'
import { TheoryBox } from './TheoryBox'
import { TaskRenderer } from './TaskRenderer'
import { FeedbackDisplay } from './FeedbackDisplay'
import { HintDisplay } from './HintDisplay'
import { SolutionDisplay } from './SolutionDisplay'
import { shuffleArray } from '../utils/arrayUtils'
import { getUserProgress, updateUserProgress, UserProgress } from '../utils/userProgress'

interface RandomizedTask {
  type: string;
  possibleAnswers: any[];
  correctAnswerIndex: number | number[];
  // Add other properties as needed
}

export function LessonPageComponent({ id }: { id: string }) {
  const [tasks, setTasks] = useState<any[]>([])
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [startTime, setStartTime] = useState(Date.now())
  const [userAnswer, setUserAnswer] = useState<string | string[]>('')
  const [showHint, setShowHint] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showSolution, setShowSolution] = useState(false)
  const [streak, setStreak] = useState(0)
  const router = useRouter()
  const [showTheory, setShowTheory] = useState(false)
  const [matchingAnswers, setMatchingAnswers] = useState<{[key: string]: string}>({})
  const [matchingPair, setMatchingPair] = useState<{ left: string | null, right: string | null }>({ left: null, right: null })
  const [matchingFeedback, setMatchingFeedback] = useState<{ isCorrect: boolean | null, message: string }>({ isCorrect: null, message: '' })
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [matchingPairs, setMatchingPairs] = useState<{ [key: string]: string }>({})
  const [randomizedMatchingPairs, setRandomizedMatchingPairs] = useState<{ [key: string]: string }>({})
  const [allMatchesMade, setAllMatchesMade] = useState(false)
  const [userId, setUserId] = useState('user1')
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null)

  useEffect(() => {
    console.warn(`[INIT] LessonPageComponent mounted for lesson ${id}`)
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions(id)
        setTasks(data)
        console.warn(`[INIT] Loaded ${data.length} tasks for lesson ${id}`)
      } catch (error) {
        console.error('[INIT] Error fetching questions:', error)
        // Fallback to hardcoded data
        const hardcodedLesson = hardcodedLessonData.blocks
          .flatMap(block => block.lessons)
          .find(lesson => lesson.id === id)
        if (hardcodedLesson) {
          setTasks(hardcodedLesson.tasks)
          console.warn(`[INIT] Loaded ${hardcodedLesson.tasks.length} hardcoded tasks for lesson ${id}`)
        } else {
          setError(`Failed to load lesson questions: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
      }
    }

    const fetchUserProgress = async () => {
      const progress = await getUserProgress(userId)
      setUserProgress(progress)
      setStreak(progress.currentStreak)
    }

    loadQuestions()
    fetchUserProgress()
    setStartTime(Date.now())

    return () => {
      console.warn(`[CLEANUP] LessonPageComponent unmounting for lesson ${id}`)
    }
  }, [id, userId])

  const progress = useMemo(() => {
    const calculatedProgress = ((currentTaskIndex + 1) / tasks.length) * 100;
    console.log(`Progress: ${calculatedProgress}%, CurrentTaskIndex: ${currentTaskIndex}, TotalTasks: ${tasks.length}`);
    return calculatedProgress;
  }, [currentTaskIndex, tasks.length]);

  const currentTask = tasks[currentTaskIndex]

  const randomizedTask = useMemo<RandomizedTask | null>(() => {
    if (!currentTask) return null;
    
    const randomizedTask: RandomizedTask = { ...currentTask };
    
    if (randomizedTask.type === 'multipleChoice') {
      const shuffledAnswers = shuffleArray([...randomizedTask.possibleAnswers]);
      randomizedTask.correctAnswerIndex = shuffledAnswers.indexOf(randomizedTask.possibleAnswers[randomizedTask.correctAnswerIndex]);
      randomizedTask.possibleAnswers = shuffledAnswers;
    } else if (randomizedTask.type === 'fillInTheBlank') {
      randomizedTask.possibleAnswers = randomizedTask.possibleAnswers.map((answerSet: string[]) => shuffleArray([...answerSet]));
      randomizedTask.correctAnswerIndex = randomizedTask.correctAnswerIndex.map((index: number, i: number) => 
        randomizedTask.possibleAnswers[i].indexOf(currentTask.possibleAnswers[i][index])
      );
    } else if (randomizedTask.type === 'matching') {
      const leftColumnTitle = Object.keys(randomizedTask.possibleAnswers[0])[0]
      const rightColumnTitle = Object.keys(randomizedTask.possibleAnswers[0])[1]
      
      const pairs: { [key: string]: string } = {}
      randomizedTask.possibleAnswers.forEach((pair: { [key: string]: string }) => {
        pairs[pair[leftColumnTitle]] = pair[rightColumnTitle]
      })
      
      setMatchingPairs(pairs)
      
      const randomizedPairs: { [key: string]: string } = {}
      const shuffledValues = shuffleArray(Object.values(pairs))
      Object.keys(pairs).forEach((key, index) => {
        randomizedPairs[key] = shuffledValues[index]
      })
      
      setRandomizedMatchingPairs(randomizedPairs)
      
      randomizedTask.columnTitles = { left: leftColumnTitle, right: rightColumnTitle }
      randomizedTask.randomizedPairs = randomizedPairs
    }
    
    return randomizedTask;
  }, [currentTask]);

  const handleSubmit = () => {
    console.warn(`[SUBMIT] Handling submit for task ${currentTaskIndex + 1}/${tasks.length}`)
    let isAnswerCorrect = false;
    switch (randomizedTask.type) {
      case 'multipleChoice':
        isAnswerCorrect = parseInt(userAnswer as string) === randomizedTask.correctAnswerIndex
        break
      case 'fillInTheBlank':
        isAnswerCorrect = (userAnswer as string[]).every((answer, index) => 
          parseInt(answer) === randomizedTask.correctAnswerIndex[index]
        )
        break
      case 'matching':
        isAnswerCorrect = Object.entries(matchingAnswers).every(([key, value]) => 
          matchingPairs[key] === value
        )
        break
      case 'trueFalse':
        isAnswerCorrect = userAnswer === randomizedTask.correctAnswerIndex.toString()
        break
    }
    setIsCorrect(isAnswerCorrect)
    console.warn(`[SUBMIT] Answer is ${isAnswerCorrect ? 'correct' : 'incorrect'}`)
    if (isAnswerCorrect) {
      setCorrectAnswers(prev => prev + 1)
      setStreak(prev => prev + 1)
      console.warn(`[CORRECT] Task ${currentTaskIndex + 1}/${tasks.length} completed. Showing feedback.`)
    } else {
      console.warn(`[INCORRECT] Resetting streak`)
      setStreak(0)
    }
    setShowSolution(true)
  }

  const handleNextTask = () => {
    console.warn(`[NEXT] handleNextTask called. Current index: ${currentTaskIndex}, Total tasks: ${tasks.length}`)
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(prev => {
        const nextIndex = prev + 1
        console.warn(`[NEXT] Moving to next task. Index: ${prev} -> ${nextIndex}`)
        return nextIndex
      })
      resetTaskState()
    } else {
      console.warn("[NEXT] All tasks completed, preparing to show CongratsPage")
      finishLesson()
    }
  }

  const finishLesson = async () => {
    const endTime = Date.now()
    const timeTaken = Math.round((endTime - startTime) / 1000) // in seconds
    const tasksLearned = tasks.map(task => task.question.substring(0, 30) + '...')
    
    // Update user progress on the server
    if (userProgress) {
      const updatedProgress = {
        ...userProgress,
        currentStreak: streak,
        lessonsCompleted: [...userProgress.lessonsCompleted, id],
        // Add any other updates here
      }
      await updateUserProgress(userId, updatedProgress)
    }

    setCurrentTaskIndex(tasks.length) // This will trigger the CongratsPage render
  }

  const resetTaskState = () => {
    console.warn('[RESET] Resetting task state')
    setUserAnswer('')
    setMatchingAnswers({})
    setShowHint(false)
    setIsCorrect(null)
    setShowSolution(false)
    setMatchingPair({ left: null, right: null })
    setMatchingFeedback({ isCorrect: null, message: '' })
  }

  const handleMatchingAnswer = (side: 'left' | 'right', value: string) => {
    setMatchingPair(prev => {
      const newPair = { ...prev, [side]: value }
      
      if (newPair.left && newPair.right) {
        checkMatchingPair(newPair.left, newPair.right)
        return { left: null, right: null }
      }
      
      return newPair
    })
  }

  const checkMatchingPair = (left: string, right: string) => {
    const isCorrect = randomizedTask.possibleAnswers.some((pair: { [key: string]: string }) => 
      Object.values(pair)[0] === left && Object.values(pair)[1] === right
    )
    
    if (isCorrect) {
      setMatchingAnswers(prev => {
        const newAnswers = { ...prev, [left]: right }
        if (Object.keys(newAnswers).length === randomizedTask.possibleAnswers.length) {
          setAllMatchesMade(true)
          // Remove this line:
          // toast.success('Well done! All matches are correct!')
        }
        return newAnswers
      })
      setMatchingFeedback({ isCorrect: true, message: 'Correct match!' })
    } else {
      setMatchingFeedback({ isCorrect: false, message: 'Incorrect match. Try again!' })
    }
    
    setTimeout(() => {
      setMatchingFeedback({ isCorrect: null, message: '' })
    }, 2000)
  }

  if (error) {
    console.error('[ERROR] Rendering ErrorCard:', error)
    return <ErrorCard error={error} />
  }

  console.warn(`[RENDER] Rendering LessonPageComponent. CurrentTaskIndex: ${currentTaskIndex}, TotalTasks: ${tasks.length}`)
  if (currentTaskIndex >= tasks.length && tasks.length > 0) {
    console.warn("[CONGRATS] Conditions met to render CongratsPage")
    const endTime = Date.now()
    const timeTaken = Math.round((endTime - startTime) / 1000) // in seconds
    const tasksLearned = tasks.map(task => task.question.substring(0, 30) + '...')
    return (
      <CongratsPage 
        onGoHome={() => {
          console.warn("[CONGRATS] onGoHome called, navigating to home")
          router.push('/')
        }} 
        timeTaken={timeTaken}
        score={{ correct: correctAnswers, total: tasks.length }}
        streak={streak}
        tasksLearned={tasksLearned}
      />
    )
  }

  if (!currentTask) {
    console.warn('[LOADING] No current task available, rendering LoadingSpinner')
    return <LoadingSpinner />
  }

  console.warn(`[RENDER] Rendering task ${currentTaskIndex + 1}/${tasks.length}`)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F4F4F4] p-4">
      <Card className="w-full max-w-md p-6 space-y-4 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center">
          <Flame className="text-[#FFD700]" />
          <span className="text-[#8B4513] font-bold">{streak} 🔥</span>
        </div>
        {/* Update the Progress component usage */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
          <Progress 
            value={progress} 
            className="w-full h-2.5 rounded-full bg-[#FFD700]" 
          />
        </div>
        <p className="text-sm text-gray-600">Progress: {progress.toFixed(1)}%</p>
        <p className="text-sm text-gray-600">Let&apos;s learn about {currentTask.title}</p>
        <TheoryBox
          showTheory={showTheory}
          setShowTheory={setShowTheory}
          theoryText={currentTask.introText}
        />
        <h2 className="text-xl font-bold text-[#8B4513]">{currentTask.question}</h2>
        <TaskRenderer
          task={randomizedTask}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          matchingPair={matchingPair}
          matchingAnswers={matchingAnswers}
          handleMatchingAnswer={handleMatchingAnswer}
        />
        <div className="flex justify-between">
          <Button onClick={() => setShowHint(true)} className="bg-[#E6C200] text-[#8B4513]">
            <HelpCircle className="mr-2" /> Hint
          </Button>
          <Button 
            onClick={handleSubmit} 
            className="bg-[#FFD700] text-[#8B4513]"
          >
            Go!
          </Button>
        </div>
        <HintDisplay showHint={showHint} hint={currentTask.hint} />
        <FeedbackDisplay isCorrect={isCorrect} />
        <SolutionDisplay showSolution={showSolution} solutionText={currentTask.postSolutionText} />
        <div className="flex justify-between mt-4">
          <Button onClick={() => router.push('/lessons')} className="bg-[#E6C200] text-[#8B4513]">
            <BookmarkPlus className="mr-2" /> Save & Exit
          </Button>
          <Button onClick={handleNextTask} className="bg-[#FFD700] text-[#8B4513]">
            {currentTaskIndex < tasks.length - 1 ? 'Next' : 'Finish'} <SkipForward className="ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  )
}