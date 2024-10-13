import { NextResponse, NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), 'app', 'data', 'lessonData2.json')
    const fileContents = await fs.promises.readFile(filePath, 'utf8')
    const lessons = JSON.parse(fileContents)

    return NextResponse.json(lessons)
  } catch (error) {
    console.error('Error reading lesson data:', error)
    return NextResponse.json({ error: 'Failed to fetch lessons' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const filePath = path.join(process.cwd(), 'app', 'data', 'lessonData2.json')
    const fileContents = await fs.promises.readFile(filePath, 'utf8')
    let lessons = JSON.parse(fileContents)

    const body = await request.json()
    const { blockId, lessonId, taskId, updatedData } = body

    // Find and update the specific task
    const block = lessons.blocks.find((b: any) => b.id.toString() === blockId.toString())
    if (block) {
      const lesson = block.lessons.find((l: any) => l.id.toString() === lessonId.toString())
      if (lesson) {
        const taskIndex = lesson.tasks.findIndex((t: any) => t.id.toString() === taskId.toString())
        if (taskIndex !== -1) {
          lesson.tasks[taskIndex] = { ...lesson.tasks[taskIndex], ...updatedData }

          // Write the updated lessons back to the file
          await fs.promises.writeFile(filePath, JSON.stringify(lessons, null, 2), 'utf8')

          return NextResponse.json({ message: 'Task updated successfully' })
        }
      }
    }

    return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  } catch (error) {
    console.error('Error updating lesson:', error)
    return NextResponse.json({ error: 'Failed to update lesson' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const filePath = path.join(process.cwd(), 'app', 'data', 'lessonData2.json')
    const fileContents = await fs.promises.readFile(filePath, 'utf8')
    let lessons = JSON.parse(fileContents)

    const { blockId, lessonId, taskId } = await request.json()

    // Find and remove the specific task
    const block = lessons.blocks.find((b: any) => b.id.toString() === blockId.toString())
    if (block) {
      const lesson = block.lessons.find((l: any) => l.id.toString() === lessonId.toString())
      if (lesson) {
        const taskIndex = lesson.tasks.findIndex((t: any) => t.id.toString() === taskId.toString())
        if (taskIndex !== -1) {
          lesson.tasks.splice(taskIndex, 1)

          // Write the updated lessons back to the file
          await fs.promises.writeFile(filePath, JSON.stringify(lessons, null, 2), 'utf8')

          return NextResponse.json({ message: 'Task deleted successfully' })
        }
      }
    }

    return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  } catch (error) {
    console.error('Error deleting task:', error)
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 })
  }
}