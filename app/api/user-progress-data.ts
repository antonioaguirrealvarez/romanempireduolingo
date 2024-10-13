interface UserProgress {
  userId: string;
  completedLessons: number[];
  currentStreak: number;
  totalXP: number;
  achievements: string[];
  incorrectAnswers: { lessonId: number; questionId: number }[];
}

export const userProgressData: { [key: string]: UserProgress } = {
  "user1": {
    userId: "user1",
    completedLessons: [1, 2],
    currentStreak: 5,
    totalXP: 1000,
    achievements: ["First Lesson Completed", "Week-long Streak"],
    incorrectAnswers: [
      { lessonId: 1, questionId: 3 },
      { lessonId: 2, questionId: 1 },
    ]
  },
  // Add more users as needed
}

export function getUserProgress(userId: string): UserProgress | null {
  return userProgressData[userId] || null;
}

export function updateUserProgress(userId: string, update: Partial<UserProgress>): boolean {
  if (!userProgressData[userId]) return false;
  userProgressData[userId] = { ...userProgressData[userId], ...update };
  return true;
}

export function addUserProgress(userId: string, progress: UserProgress): void {
  userProgressData[userId] = progress;
}