import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { logger } from '../../../utils/logger';

const DATA_FILE = path.join(process.cwd(), 'data', 'user-progress.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      logger.info('GET request for all user progress data');
      const data = await fs.readFile(DATA_FILE, 'utf-8');
      res.status(200).json(JSON.parse(data));
    } catch (error) {
      logger.error('Error reading all user progress data', error);
      res.status(500).json({ error: 'Failed to read user progress data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
