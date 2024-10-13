import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { logger } from '../../../utils/logger';

const DATA_FILE = path.join(process.cwd(), 'data', 'user-progress.json');

async function readData() {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      logger.info('Data file not found, creating a new one');
      return {};
    }
    logger.error('Error reading user progress data', error);
    return {};
  }
}

async function writeData(data: any) {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    logger.error('Error writing user progress data', error);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (typeof userId !== 'string') {
    return res.status(400).json({ error: 'Invalid userId' });
  }

  if (req.method === 'GET') {
    logger.info(`GET request for user progress of user ${userId}`);
    const data = await readData();
    const userProgress = data[userId] || createInitialProgress(userId);
    res.status(200).json(userProgress);
  } else if (req.method === 'POST') {
    logger.info(`POST request to update user progress of user ${userId}`);
    const update = req.body;
    const data = await readData();
    data[userId] = { ...createInitialProgress(userId), ...data[userId], ...update };
    await writeData(data);
    res.status(200).json(data[userId]);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function createInitialProgress(userId: string) {
  return {
    userId,
    livesUsed: 3,
    currentStreak: 0,
    daysUsingApp: 1,
    lessonsCompleted: [],
    tasksWithErrors: [],
  };
}
