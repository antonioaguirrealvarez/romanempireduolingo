'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Trophy, Book, Clock } from 'lucide-react'
import Image from 'next/image'

interface User {
  displayName: string;
  email: string;
  photoURL: string;
}

interface UserStats {
  totalLessonsCompleted: number;
  averageScore: number;
  totalTimeSpent: number;
  achievements: string[];
}

export function ProfilePageComponent() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [userStats, setUserStats] = useState<UserStats>({
    totalLessonsCompleted: 0,
    averageScore: 0,
    totalTimeSpent: 0,
    achievements: []
  })

  useEffect(() => {
    // Simulate fetching user data
    setLoading(true)
    setTimeout(() => {
      setUser({ displayName: "John Doe", email: "john@example.com", photoURL: "https://example.com/photo.jpg" })
      setUserStats({
        totalLessonsCompleted: 25,
        averageScore: 85,
        totalTimeSpent: 1500,
        achievements: ['First Lesson', 'Week Streak', 'History Buff']
      })
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <Card className="p-6">
        {user ? (
          <div>
            <Image src={user.photoURL} alt="Profile" width={80} height={80} className="rounded-full mb-4" />
            <h2 className="text-2xl font-semibold">{user.displayName}</h2>
            <p className="text-gray-600 mb-4">{user.email}</p>
            <Button onClick={() => setUser(null)}>Sign Out</Button>
            <Card className="mt-6">
              <CardHeader>
                <h3 className="text-xl font-semibold">Your Progress</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Book className="mr-2" />
                    <span>Lessons Completed: {userStats.totalLessonsCompleted}</span>
                  </div>
                  <div className="flex items-center">
                    <Trophy className="mr-2" />
                    <span>Average Score: {userStats.averageScore}%</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2" />
                    <span>Total Time Spent: {Math.floor(userStats.totalTimeSpent / 60)}h {userStats.totalTimeSpent % 60}m</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <h3 className="text-xl font-semibold">Achievements</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {userStats.achievements.map((achievement, index) => (
                    <div key={index} className="text-center">
                      <Trophy className="mx-auto mb-2" />
                      <span className="text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div>
            <p className="mb-4">Please sign in to view your profile.</p>
            <Button onClick={() => setUser({ displayName: "John Doe", email: "john@example.com", photoURL: "https://example.com/photo.jpg" })}>Sign in</Button>
          </div>
        )}
      </Card>
    </div>
  )
}
