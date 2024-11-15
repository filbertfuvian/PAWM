import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export const getUserNickname = async (userId) => {
  const userDoc = doc(db, 'users', userId);
  const userSnapshot = await getDoc(userDoc);
  
  if (userSnapshot.exists()) {
    return userSnapshot.data().nickname;
  } else {
    return null; // Jika tidak ada nickname
  }
};