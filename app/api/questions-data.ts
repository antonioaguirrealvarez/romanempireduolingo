export const questionsData = {
  "1": [
    {
      id: 1,
      type: 'multiple-choice',
      question: 'Who founded Rome according to legend?',
      options: ['Romulus and Remus', 'Julius Caesar', 'Augustus', 'Nero'],
      correctAnswer: 'Romulus and Remus',
      theory: 'According to Roman mythology, Rome was founded by twin brothers Romulus and Remus, who were raised by a she-wolf.'
    },
    // ... (rest of the questions for lesson 1)
  ],
  // ... (other lessons)
}

export function getQuestion(lessonId: string, questionId: number) {
  const lessonQuestions = questionsData[lessonId as keyof typeof questionsData]
  if (!lessonQuestions) return null
  return lessonQuestions.find(q => q.id === questionId) || null
}

export function updateQuestion(lessonId: string, questionId: number, updatedQuestion: any) {
  const lessonQuestions = questionsData[lessonId as keyof typeof questionsData]
  if (!lessonQuestions) return false
  const index = lessonQuestions.findIndex(q => q.id === questionId)
  if (index === -1) return false
  lessonQuestions[index] = { ...lessonQuestions[index], ...updatedQuestion }
  return true
}