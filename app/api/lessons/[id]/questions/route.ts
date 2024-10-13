import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const filePath = path.join(process.cwd(), 'app', 'data', 'lessonData2.json')
    const fileContents = await fs.promises.readFile(filePath, 'utf8')
    const lessonData = JSON.parse(fileContents)

    const lessonId = params.id
    const block = lessonData.blocks.find((block: any) => 
      block.lessons.some((lesson: any) => lesson.id === lessonId || lesson.id === `lesson${lessonId}`)
    )
    const lesson = block?.lessons.find((lesson: any) => lesson.id === lessonId || lesson.id === `lesson${lessonId}`)

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }

    return NextResponse.json(lesson.tasks)
  } catch (error) {
    console.error('Error fetching lesson questions:', error)
    return NextResponse.json({ error: 'Failed to fetch lesson questions' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'