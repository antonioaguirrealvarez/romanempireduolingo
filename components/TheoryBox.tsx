import React from 'react'
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from 'lucide-react'

interface TheoryBoxProps {
  showTheory: boolean
  setShowTheory: (show: boolean) => void
  theoryText: string
}

export function TheoryBox({ showTheory, setShowTheory, theoryText }: TheoryBoxProps) {
  return (
    <>
      <Button
        onClick={() => setShowTheory(!showTheory)}
        className="w-full bg-[#E6C200] text-[#8B4513] flex justify-between items-center"
      >
        Theory
        {showTheory ? <ChevronUp /> : <ChevronDown />}
      </Button>
      {showTheory && (
        <div className="bg-[#FFF8DC] p-4 rounded-lg">
          <p>{theoryText}</p>
        </div>
      )}
    </>
  )
}