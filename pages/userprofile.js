// pages/userprofile.js
import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase'
import styles from '../styles/UserProfile.module.css'
import ProgressBar from '@/components/ProgressBar';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [nickname, setNickname] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const userId = auth.currentUser ?.uid;

  const fetchUserData = async () => {
    if (userId) {
      const userDocRef = doc(db, 'users', userId);
      const snapshot = await getDoc(userDocRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        setUserData(data);
        setNickname(data.nickname);
      } else {
        console.error("No user data found");
      }
    } else {
      console.log("User  is not authenticated");
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [userId, db]);

  const handleNicknameChange = async () => {
    if (userId && userData) {
      const userDocRef = doc(db, 'users', userId);
      try {
        await setDoc(userDocRef, {
          ...userData,
          nickname: newNickname,
        }, { merge: true });
        console.log("Nickname updated successfully!");
        setNickname(newNickname);
        setNewNickname('');
        await fetchUserData();
      } catch (error) {
        console.error("Error updating nickname: ", error);
      }
    }
  };

  return (
    <div className={styles['profileContainer']}>
      <h1 className={styles['title']}>User  Profile</h1>
      {userData ? (
        <div>
          <p className={styles['infoText']}>Email: {auth.currentUser ?.email}</p>
          <p className={styles['infoText']}>Nickname: {nickname}</p>
          <input
            className={styles['inputField']}
            type="text"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
            placeholder="Enter new nickname"
          />
          <button className={styles['submitButton']} onClick={handleNicknameChange}>
            Change Nickname
          </button>

          <h2 className={styles['sectionTitle']}>Progress Video Materi</h2>
          <ul className={styles['list']}>
            {userData.materi && Object.keys(userData.materi).map((subject) => (
              <li className={styles['listItem']} key={subject}>
                <div>
                    {subject.charAt(0).toUpperCase() + subject.slice(1)}: 
                    {userData.materi[subject].completed_video} / {userData.materi[subject].max_video}
                </div>
                <ProgressBar completed={userData.materi[subject].completed_video} total={userData.materi[subject].max_video} />
              </li>
            ))}
          </ul>

          <h2 className={ styles['sectionTitle']}>Progress Kuis</h2>
          <ul className={styles['list']}>
            {userData.kuis && Object.keys(userData.kuis).map((quiz) => { 
              const quizData = userData.kuis[quiz];
              const { completed, max_score, score } = quizData;

              return (
                <li className={styles.listItem} key={quiz}>
                  <div>
                    {quiz.charAt(0).toUpperCase() + quiz.slice(1)}: 
                    {completed ? ` Score: ${score} / ${max_score}` : 'Not completed yet'}
                  </div>
                  {completed && <ProgressBar completed={score} total={max_score} />}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;