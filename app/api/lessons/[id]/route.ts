import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  try {
    const filePath = path.join(process.cwd(), 'app', 'data', 'lessonData2.json')
    const fileContents = await fs.readFile(filePath, 'utf8')
    const lessonData = JSON.parse(fileContents)

    const lesson = lessonData.blocks
      .flatMap((block: any) => block.lessons)
      .find((lesson: any) => lesson.id === id)

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }

    return NextResponse.json(lesson)
  } catch (error) {
    console.error('Error reading lesson data:', error)
    return NextResponse.json({ error: 'Failed to fetch lesson' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  try {
    const filePath = path.join(process.cwd(), 'app', 'data', 'lessonData2.json')
    const fileContents = await fs.readFile(filePath, 'utf8')
    let lessonData = JSON.parse(fileContents)

    const body = await request.json()

    let lessonUpdated = false
    lessonData.blocks = lessonData.blocks.map((block: any) => {
      block.lessons = block.lessons.map((lesson: any) => {
        if (lesson.id === id) {
          lessonUpdated = true
          return { ...lesson, ...body }
        }
        return lesson
      })
      return block
    })

    if (!lessonUpdated) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }

    await fs.writeFile(filePath, JSON.stringify(lessonData, null, 2), 'utf8')

    return NextResponse.json({ message: 'Lesson updated successfully' })
  } catch (error) {
    console.error('Error updating lesson:', error)
    return NextResponse.json({ error: 'Failed to update lesson' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  try {
    const filePath = path.join(process.cwd(), 'app', 'data', 'lessonData2.json')
    const fileContents = await fs.readFile(filePath, 'utf8')
    let lessonData = JSON.parse(fileContents)

    let lessonDeleted = false
    lessonData.blocks = lessonData.blocks.map((block: any) => {
      block.lessons = block.lessons.filter((lesson: any) => {
        if (lesson.id === id) {
          lessonDeleted = true
          return false
        }
        return true
      })
      return block
    })

    if (!lessonDeleted) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }

    await fs.writeFile(filePath, JSON.stringify(lessonData, null, 2), 'utf8')

    return NextResponse.json({ message: 'Lesson deleted successfully' })
  } catch (error) {
    console.error('Error deleting lesson:', error)
    return NextResponse.json({ error: 'Failed to delete lesson' }, { status: 500 })
  }
}
