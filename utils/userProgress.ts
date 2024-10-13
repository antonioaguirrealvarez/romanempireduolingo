import { logger } from './logger';

export interface UserProgress {
  userId: string;
  livesUsed: number;
  currentStreak: number;
  daysUsingApp: number;
  lessonsCompleted: string[];
  tasksWithErrors: {
    lessonId: string;
    taskId: string;
  }[];
}

export async function getUserProgress(userId: string): Promise<UserProgress> {
  try {
    logger.info(`Fetching user progress for user ${userId}`);
    const response = await fetch(`/api/user-progress/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user progress');
    }
    const data = await response.json();
    logger.info(`Fetched user progress for user ${userId}`, data);
    return data;
  } catch (error) {
    logger.error(`Error fetching user progress for user ${userId}`, error);
    return createInitialProgress(userId);
  }
}

export async function updateUserProgress(userId: string, updatedProgress: Partial<UserProgress>) {
  try {
    const response = await fetch(`/api/user-progress/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProgress),
    });
    if (!response.ok) {
      throw new Error('Failed to update user progress');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating user progress:', error);
    throw error;
  }
}

function createInitialProgress(userId: string): UserProgress {
  return {
    userId,
    livesUsed: 3,
    currentStreak: 0,
    daysUsingApp: 1,
    lessonsCompleted: [],
    tasksWithErrors: [],
  };
}

export async function incrementLivesUsed(userId: string) {
  const progress = await getUserProgress(userId);
  if (progress.livesUsed > 0) {
    await updateUserProgress(userId, { livesUsed: progress.livesUsed - 1 });
  }
}

export async function updateStreak(userId: string, newStreak: number) {
  await updateUserProgress(userId, { currentStreak: newStreak });
}

export async function incrementDaysUsingApp(userId: string) {
  const progress = await getUserProgress(userId);
  await updateUserProgress(userId, { daysUsingApp: progress.daysUsingApp + 1 });
}

export async function markLessonCompleted(userId: string, lessonId: string) {
  const progress = await getUserProgress(userId);
  if (!progress.lessonsCompleted.includes(lessonId)) {
    const updatedProgress = { 
      ...progress, 
      lessonsCompleted: [...progress.lessonsCompleted, lessonId] 
    };
    await updateUserProgress(userId, updatedProgress);
    logger.info(`Lesson ${lessonId} marked as completed for user ${userId}`);
    logger.info('Updated user progress:', updatedProgress);
  }
}

export async function addTaskWithError(userId: string, lessonId: string, taskId: string) {
  const progress = await getUserProgress(userId);
  await updateUserProgress(userId, {
    tasksWithErrors: [...progress.tasksWithErrors, { lessonId, taskId }],
  });
}