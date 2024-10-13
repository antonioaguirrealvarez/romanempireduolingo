import React from 'react'

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen bg-[#F4F4F4]">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#FFD700]"></div>
    </div>
  )
}