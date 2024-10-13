import React from 'react'
import { Button } from "@/components/ui/button"

interface TaskRendererProps {
  task: any
  userAnswer: string | string[]
  setUserAnswer: (answer: string | string[]) => void
  matchingPair: { left: string | null, right: string | null }
  matchingAnswers: {[key: string]: string}
  handleMatchingAnswer: (side: 'left' | 'right', value: string) => void
}

export function TaskRenderer({ task, userAnswer, setUserAnswer, matchingPair, matchingAnswers, handleMatchingAnswer }: TaskRendererProps) {
  if (!task) return null;

  const renderButton = (text: string, index: number, isSelected: boolean, onClick: () => void, disabled: boolean = false) => (
    <Button
      key={index}
      className={`m-1 w-full justify-start ${isSelected ? 'bg-[#FFD700] text-[#8B4513]' : 'bg-white text-[#8B4513] border border-[#8B4513]'} ${text.length > 30 ? 'h-auto py-2 whitespace-normal' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </Button>
  );

  switch (task.type) {
    case 'multipleChoice':
      return (
        <div className="space-y-2">
          {task.possibleAnswers.map((answer: string, index: number) => 
            renderButton(
              answer, 
              index, 
              userAnswer === index.toString(), 
              () => setUserAnswer(index.toString())
            )
          )}
        </div>
      )
    case 'fillInTheBlank':
      return (
        <div className="space-y-2">
          {task.possibleAnswers.map((answerSet: string[], blankIndex: number) => (
            <div key={blankIndex}>
              <p>Blank {blankIndex + 1}:</p>
              {answerSet.map((answer: string, index: number) => (
                <Button
                  key={index}
                  className={`m-1 ${(userAnswer as string[])[blankIndex] === index.toString() ? 'bg-[#FFD700] text-[#8B4513]' : 'bg-white text-[#8B4513] border border-[#8B4513]'}`}
                  onClick={() => {
                    const newAnswer = [...(userAnswer as string[] || [])]
                    newAnswer[blankIndex] = index.toString()
                    setUserAnswer(newAnswer)
                  }}
                >
                  {answer}
                </Button>
              ))}
            </div>
          ))}
        </div>
      )
    case 'matching':
      return (
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="w-1/2 pr-2">
              <h3 className="font-bold mb-2">{task.columnTitles.left}</h3>
              {Object.keys(task.randomizedPairs).map((item, index) => 
                renderButton(
                  item, 
                  index, 
                  matchingPair.left === item || item in matchingAnswers, 
                  () => handleMatchingAnswer('left', item),
                  item in matchingAnswers
                )
              )}
            </div>
            <div className="w-1/2 pl-2">
              <h3 className="font-bold mb-2">{task.columnTitles.right}</h3>
              {Object.values(task.randomizedPairs).map((item, index) => 
                renderButton(
                  item as string, 
                  index, 
                  matchingPair.right === item || Object.values(matchingAnswers).includes(item), 
                  () => handleMatchingAnswer('right', item as string),
                  Object.values(matchingAnswers).includes(item)
                )
              )}
            </div>
          </div>
        </div>
      )
    case 'trueFalse':
      return (
        <div className="space-y-2">
          {task.possibleAnswers.map((answer: string, index: number) => 
            renderButton(
              answer, 
              index, 
              userAnswer === index.toString(), 
              () => setUserAnswer(index.toString())
            )
          )}
        </div>
      )
    default:
      return null
  }
}
