import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export async function updateUserData(userId: string, data: any) {
  try {
    await setDoc(doc(db, 'users', userId), data, { merge: true });
  } catch (error) {
    console.error('Error updating user data:', error);
  }
}
