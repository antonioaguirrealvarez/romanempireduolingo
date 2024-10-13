import { NextResponse } from 'next/server'
import { lessons } from '../data'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const lesson = lessons.find(l => l.id === id)
  
  if (!lesson) {
    return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
  }

  return NextResponse.json(lesson)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const body = await request.json()
  const index = lessons.findIndex(l => l.id === id)

  if (index === -1) {
    return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
  }

  lessons[index] = { ...lessons[index], ...body }
  return NextResponse.json(lessons[index])
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const index = lessons.findIndex(l => l.id === id)

  if (index === -1) {
    return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
  }

  lessons.splice(index, 1)
  return NextResponse.json({ message: 'Lesson deleted successfully' })
}