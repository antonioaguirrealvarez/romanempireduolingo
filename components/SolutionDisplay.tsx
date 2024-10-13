import React from 'react'

interface SolutionDisplayProps {
  showSolution: boolean
  solutionText: string
}

export function SolutionDisplay({ showSolution, solutionText }: SolutionDisplayProps) {
  if (!showSolution) return null
  return (
    <div className="mt-4">
      <h3 className="font-bold text-[#8B4513]">Explanation:</h3>
      <p>{solutionText}</p>
    </div>
  )
}