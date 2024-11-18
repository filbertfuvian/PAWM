import React, { useEffect, useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import styles from '../../styles/Course.module.css'; 

const Physics = () => {
  const [userData, setUserData] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [videoCompleted, setVideoCompleted] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const userId = auth.currentUser ?.uid;

  const videoList = [
    { id: 1, title: 'Video Fisika 1', src: 'https://example.com/videos/Fisika1.mp4' },
    { id: 2, title: 'Video Fisika 2', src: 'https://example.com/videos/Fisika2.mp4' },
    { id: 3, title: 'Video Fisika 3', src: 'https://example.com/videos/Fisika3.mp4' },
    { id: 4, title: 'Video Fisika 4', src: 'https://example.com/videos/Fisika4.mp4' },
    { id: 5, title: 'Video Fisika 5', src: 'https://example.com/videos/Fisika5.mp4' },
    { id: 6, title: 'Video Fisika 6', src: 'https://example.com/videos/Fisika6.mp4' },
    { id: 7, title: 'Video Fisika 7', src: 'https://example.com/videos/Fisika7.mp4' },
    { id: 8, title: 'Video Fisika 8', src: 'https://example.com/videos/Fisika8.mp4' },
    { id: 9, title: 'Video Fisika 9', src: 'https://example.com/videos/Fisika9.mp4' },
    { id: 10, title: 'Video Fisika 10', src: 'https://example.com/videos/Fisika10.mp4' },
  ];

  const quizQuestions = 
    [
        {
          "question": "Apa rumus hukum kedua Newton?",
          "options": ["F = ma", "F = mv", "F = m/a", "F = m^2a"],
          "answer": "F = ma"
        },
        {
          "question": "Apa kecepatan cahaya di vakum?",
          "options": ["3 × 10^8 m/s", "3 × 10^6 m/s", "3 × 10^4 m/s", "3 × 10^2 m/s"],
          "answer": "3 × 10^8 m/s"
        },
        {
          "question": "Apa satuan SI untuk energi?",
          "options": ["Joule", "Watt", "Newton", "Pascal"],
          "answer": "Joule"
        },
        {
          "question": "Apa hukum yang menjelaskan bahwa tekanan dan volume gas berbanding terbalik pada suhu konstan?",
          "options": ["Hukum Charles", "Hukum Gay-Lussac", "Hukum Boyle", "Hukum Avogadro"],
          "answer": "Hukum Boyle"
        },
        {
          "question": "Apa persamaan untuk energi kinetik sebuah benda?",
          "options": ["E = 1/2 mv^2", "E = mv", "E = 1/2 mv", "E = mv^2"],
          "answer": "E = 1/2 mv^2"
        },
        {
          "question": "Apa satuan hambatan listrik dalam SI?",
          "options": ["Ohm", "Volt", "Ampere", "Watt"],
          "answer": "Ohm"
        },
        {
          "question": "Apa fenomena pemisahan warna cahaya putih melalui prisma disebut?",
          "options": ["Refleksi", "Refraksi", "Difraksi", "Dispersi"],
          "answer": "Dispersi"
        },
        {
          "question": "Apa nilai percepatan gravitasi di permukaan Bumi?",
          "options": ["9,8 m/s^2", "10 m/s^2", "9 m/s^2", "8 m/s^2"],
          "answer": "9,8 m/s^2"
        },
        {
          "question": "Apa hubungan antara tegangan, arus, dan hambatan dalam hukum Ohm?",
          "options": ["V = IR", "V = I/R", "V = IR^2", "V = R/I"],
          "answer": "V = IR"
        },
        {
          "question": "Apa jenis gelombang yang tidak memerlukan medium untuk merambat?",
          "options": ["Gelombang mekanik", "Gelombang transversal", "Gelombang elektromagnetik", "Gelombang longitudinal"],
          "answer": "Gelombang elektromagnetik"
        }
    ]
      

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.error("No user data found");
        }
      }
    };
    fetchUserData();
  }, [userId]);

  const markAsCompleted = async (videoId) => {
    if (userId && userData) {
      const userDocRef = doc(db, 'users', userId, 'materi', 'fisika');
      const currentStatus = !videoCompleted;
      await setDoc(userDocRef, {
        [`video${videoId}`]: currentStatus // Mengubah value menjadi true/false
      }, { merge: true });
      setVideoCompleted(currentStatus); 
      console.log(`Video marked as ${currentStatus ? 'completed' : 'not completed'} successfully!`);
    }
  };

  useEffect(() => {
    if (selectedVideo && userData) {
      const completedStatus = userData.materi?.fisika[`video${selectedVideo}`] || false;
      setVideoCompleted(completedStatus);
    }
  }, [selectedVideo, userData]);

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    const selectedAnswer = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
    if (selectedAnswer && selectedAnswer.value === quizQuestions[currentQuestionIndex].answer) {
      setScore(prevScore => prevScore + 1);
    }

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setQuizCompleted(true);
      saveQuizResult(score + (selectedAnswer && selectedAnswer.value === quizQuestions[currentQuestionIndex].answer ? 1 : 0));
    }
  };

  const saveQuizResult = async (calculatedScore) => {
    if (userId && userData) {
      const userDocRef = doc(db, 'users', userId, 'kuis', 'fisika');
      await setDoc(userDocRef, {
        kuisStatus: true,
        score: calculatedScore
      }, { merge: true });
      console.log(`Quiz completed with score: ${calculatedScore}`);
    }
  };

  return (
    <div className={styles.Container}>
      <h1 className={styles.title}>Kursus Fisika</h1>
      <p className={styles.description}>Deskripsi singkat tentang kursus Fisika.</p>
      <div>
        <h2 className={styles.subtitle}>Pilih Video</h2>
        <select className={styles.videoSelect} onChange={(e) => setSelectedVideo(e.target.value)}>
          <option value="">-- Select Video --</option>
          {videoList.map(video => (
            <option key={video.id} value={video.id}>{video.title}</option>
          ))}
        </select>
      </div>
      {selectedVideo && (
        <div>
          <video controls src={videoList[selectedVideo - 1].src} className={styles.videoPlayer}>
            Your browser does not support the video tag.
          </video>
          <button 
            className={videoCompleted ? styles.notCompletedButton : styles.completedButton} 
            onClick={() => markAsCompleted(selectedVideo)}
          >
            {videoCompleted ? 'Mark as Not Completed' : 'Mark as Completed'}
          </button>
        </div>
      )}
      <div className={styles.quizSection}>
        <h2 className={styles.subtitle}>Kuis Fisika</h2>
        {!quizCompleted ? (
          <form onSubmit={handleQuizSubmit}>
            <div className={styles.question}>
              <p>{quizQuestions[currentQuestionIndex].question}</p>
              {quizQuestions[currentQuestionIndex].options.map((option, i) => (
                <label key={i} className={styles.questionLabel}>
                  <input type="radio" name={`question${currentQuestionIndex}`} value={option} required className={styles.radioInput} />
                  {option}
                </label>
              ))}
            </div>
            <button type="submit" className={styles.submitButton}>
              {currentQuestionIndex < quizQuestions.length - 1 ? 'Next' : 'Submit'}
            </button>
          </form>
        ) : (
          <div className={styles['endscreen']}>
            <h3>Skor: {score} / {quizQuestions.length}</h3>
            <p>Kuis Selesai!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Physics;