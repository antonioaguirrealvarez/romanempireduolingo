import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: Request) {
  try {
    // Test reading lessonData2.json
    const filePath = path.join(process.cwd(), 'app', 'data', 'lessonData2.json')
    const fileContents = await fs.promises.readFile(filePath, 'utf8')
    const lessonData = JSON.parse(fileContents)

    // Test fetching a specific lesson
    const testLessonId = 'lesson1'
    const block = lessonData.blocks.find((block: any) => 
      block.lessons.some((lesson: any) => lesson.id === testLessonId)
    )
    const lesson = block?.lessons.find((lesson: any) => lesson.id === testLessonId)

    if (!lesson) {
      return NextResponse.json({ error: 'Test lesson not found' }, { status: 404 })
    }

    return NextResponse.json({ 
      message: 'Test API is working',
      lessonDataLoaded: true,
      testLessonFound: true,
      testLessonTasks: lesson.tasks
    })
  } catch (error) {
    console.error('Error in test API:', error)
    return NextResponse.json({ error: 'Test API encountered an error' }, { status: 500 })
  }
}