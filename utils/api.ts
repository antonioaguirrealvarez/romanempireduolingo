export async function fetchQuestions(id: string) {
  const response = await fetch(`/api/lessons/${id}/questions`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data = await response.json()
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('No tasks found for this lesson')
  }
  return data
}

export async function fetchLessons() {
  const response = await fetch('/api/lessons')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}