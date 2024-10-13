import React, { useState, useEffect } from 'react';
import { logger } from '../utils/logger';

export function DebugUserProgress() {
  const [allUserProgress, setAllUserProgress] = useState<any>(null);

  useEffect(() => {
    async function fetchAllUserProgress() {
      try {
        const response = await fetch('/api/user-progress/all');
        if (!response.ok) {
          throw new Error('Failed to fetch all user progress');
        }
        const data = await response.json();
        setAllUserProgress(data);
        logger.info('Fetched all user progress data', data);
      } catch (error) {
        logger.error('Error fetching all user progress data', error);
      }
    }

    fetchAllUserProgress();
  }, []);

  if (!allUserProgress) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>All User Progress Data</h2>
      <pre>{JSON.stringify(allUserProgress, null, 2)}</pre>
    </div>
  );
}
