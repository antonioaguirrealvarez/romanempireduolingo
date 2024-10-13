'use client'

import { useEffect, useState } from 'react'
import { hardcodedLessonData } from '../data/hardcodedLessonData'

export default function LessonsPage() {
  const [lessonData, setLessonData] = useState(hardcodedLessonData)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/lessons')
        if (!response.ok) {
          throw new Error('Failed to fetch lesson data')
        }
        const data = await response.json()
        setLessonData(data)
      } catch (error) {
        console.error('Error fetching lesson data:', error)
        // Fallback to hardcoded data is already set
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      {lessonData.blocks.map(block => (
        <div key={block.id}>
          <h2>{block.title}</h2>
          {block.lessons.map(lesson => (
            <div key={lesson.id}>
              <h3>{lesson.title}</h3>
              {/* Render tasks here */}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}