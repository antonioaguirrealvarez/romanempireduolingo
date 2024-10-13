import { LessonPageComponent } from '@/components/LessonPageComponent'
import lessonData from '@/app/data/lessonData2.json'

export default function LessonPage({ params }: { params: { id: string } }) {
  return <LessonPageComponent id={params.id} />
}

export async function generateStaticParams() {
  const lessonIds = lessonData.blocks.flatMap(block => 
    block.lessons.map(lesson => ({ id: lesson.id }))
  )
  return lessonIds
}