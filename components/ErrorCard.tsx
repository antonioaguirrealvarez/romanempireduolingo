import React from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from 'lucide-react'

interface ErrorCardProps {
  error: string
}

export function ErrorCard({ error }: ErrorCardProps) {
  return (
    <div className="flex justify-center items-center h-screen bg-[#F4F4F4]">
      <Card className="p-6 bg-red-100 border-red-500 max-w-md">
        <div className="flex items-center text-red-700 mb-4">
          <AlertCircle className="mr-2" />
          <h2 className="text-xl font-bold">Error</h2>
        </div>
        <p className="mb-4">{error}</p>
        <Button onClick={() => window.location.reload()} className="bg-[#FFD700] text-[#8B4513] hover:bg-[#E6C200]">
          Try Again
        </Button>
      </Card>
    </div>
  )
}