import React from 'react'

interface HintDisplayProps {
  showHint: boolean
  hint: string
}

export function HintDisplay({ showHint, hint }: HintDisplayProps) {
  if (!showHint) return null
  return <p className="text-[#8B4513] italic">{hint}</p>
}