import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import styles from '../../styles/Course.module.css'; // Impor gaya CSS jika diperlukan

const Math = () => {
  const [userData, setUserData] = useState(null);
  const [videos, setVideos] = useState([]);
  const auth = getAuth();
  const db = getDatabase();
  const userId = auth.currentUser ?.uid;

  // Daftar video pembelajaran
  const videoList = [
    { id: 1, title: 'Video Matematika 1', src: '../../public/Thin_Smoke_84___4K_res.mp4' },
    { id: 2, title: 'Video Matematika 2', src: 'https://example.com/videos/matematika2.mp4' },
    // Tambahkan video lainnya sesuai kebutuhan
  ];

  useEffect(() => {
    // Ambil data pengguna dari Firebase
    if (userId) {
      const userRef = ref(db, `users/${userId}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setUserData(data);
      }, {
        onlyOnce: true // Hanya ambil data sekali
      });
    }
    // Set daftar video
    setVideos(videoList);
  }, [userId]);

  const markAsCompleted = (videoId) => {
    if (userId && userData) {
      const completedVideos = userData.materi.matematika.completed_video + 1;
      const maxVideos = userData.materi.matematika.max_video;

      // Update data di Firebase
      const userRef = ref(db, `users/${userId}/materi/matematika`);
      set(userRef, {
        completed_video: Math.min(completedVideos, maxVideos), // Pastikan tidak melebihi max_video
        max_video: maxVideos,
      })
      .then(() => {
        console.log("Video marked as completed successfully!");
      })
      .catch((error) => {
        console.error("Error marking video as completed: ", error);
      });
    }
  };

  return (
    <div className={styles.Container}>
      <h1>Kursus Matematika</h1>
      <div className={styles.videoList}>
        {videos.map((video) => (
          <div key={video.id} className={styles.videoItem}>
            <h2>{video.title}</h2>
            <video controls src={video.src} className={styles.videoPlayer}>
              Your browser does not support the video tag.
            </video>
            <button
              onClick={() => markAsCompleted(video.id)}
              disabled={userData && userData.materi.matematika.completed_video >= video.id}
              className={styles.completeButton}
            >
              {userData && userData.materi.matematika.completed_video >= video.id ? 'Completed' : 'Mark as Completed'}
            </button>
            {userData && userData.materi.matematika.completed_video >= video.id && <span className={styles.completedMarker}>✔️</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Math;