import React, { useEffect, useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import styles from '../../styles/Course.module.css'; 

const Chemistry = () => {
  const [userData, setUserData] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [videoCompleted, setVideoCompleted] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const userId = auth.currentUser ?.uid;

  const videoList = [
    { id: 1, title: 'Video Kimia 1', src: 'https://example.com/videos/Kimia1.mp4' },
    { id: 2, title: 'Video Kimia 2', src: 'https://example.com/videos/Kimia2.mp4' },
    { id: 3, title: 'Video Kimia 3', src: 'https://example.com/videos/Kimia3.mp4' },
    { id: 4, title: 'Video Kimia 4', src: 'https://example.com/videos/Kimia4.mp4' },
    { id: 5, title: 'Video Kimia 5', src: 'https://example.com/videos/Kimia5.mp4' },
    { id: 6, title: 'Video Kimia 6', src: 'https://example.com/videos/Kimia6.mp4' },
    { id: 7, title: 'Video Kimia 7', src: 'https://example.com/videos/Kimia7.mp4' },
    { id: 8, title: 'Video Kimia 8', src: 'https://example.com/videos/Kimia8.mp4' },
    { id: 9, title: 'Video Kimia 9', src: 'https://example.com/videos/Kimia9.mp4' },
    { id: 10, title: 'Video Kimia 10', src: 'https://example.com/videos/Kimia10.mp4' },
  ];

  const quizQuestions = 
    [
        {
            "question": "Apa nama senyawa dengan rumus kimia H2SO4?",
            "options": ["Asam klorida", "Asam nitrat", "Asam sulfat", "Asam asetat"],
            "answer": "Asam sulfat"
        },
        {
            "question": "Apa jenis ikatan yang terdapat dalam molekul H2O?",
            "options": ["Ikatan ionik", "Ikatan kovalen", "Ikatan hidrogen", "Ikatan logam"],
            "answer": "Ikatan kovalen"
        },
        {
            "question": "Apa nilai bilangan kuantum spin untuk elektron?",
            "options": ["0", "1", "1/2", "-1"],
            "answer": "1/2"
        },
        {
            "question": "Apa fungsi dari katalis dalam reaksi kimia?",
            "options": ["Menurunkan energi aktivasi", "Mengubah entalpi reaksi", "Menghasilkan lebih banyak produk", "Mempercepat kesetimbangan"],
            "answer": "Menurunkan energi aktivasi"
        },
        {
            "question": "Gas mana yang sering digunakan dalam proses fotosintesis?",
            "options": ["Oksigen", "Nitrogen", "Karbon dioksida", "Hidrogen"],
            "answer": "Karbon dioksida"
        },
        {
            "question": "Berapa mol gas yang terdapat dalam 22,4 liter gas ideal pada STP?",
            "options": ["1 mol", "2 mol", "0,5 mol", "0,1 mol"],
            "answer": "1 mol"
        },
        {
            "question": "Apa jenis reaksi yang menghasilkan air dari hidrogen dan oksigen?",
            "options": ["Reaksi pengendapan", "Reaksi oksidasi", "Reaksi sintesis", "Reaksi redoks"],
            "answer": "Reaksi sintesis"
        },
        {
            "question": "Berapa pH larutan dengan konsentrasi ion H+ sebesar 10^-3 M?",
            "options": ["3", "7", "10", "13"],
            "answer": "3"
        },
        {
            "question": "Apa nama unsur dengan simbol Au?",
            "options": ["Perak", "Emas", "Aluminium", "Timah"],
            "answer": "Emas"
        },
        {
            "question": "Apa konfigurasi elektron dari atom karbon (C)?",
            "options": ["1s^2 2s^2 2p^2", "1s^2 2s^2 2p^4", "1s^2 2s^2 2p^6", "1s^2 2s^1 2p^3"],
            "answer": "1s^2 2s^2 2p^2"
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
      const userDocRef = doc(db, 'users', userId, 'materi', 'kimia');
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
      const completedStatus = userData.materi?.kimia[`video${selectedVideo}`] || false;
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
      const userDocRef = doc(db, 'users', userId, 'kuis', 'kimia');
      await setDoc(userDocRef, {
        kuisStatus: true,
        score: calculatedScore
      }, { merge: true });
      console.log(`Quiz completed with score: ${calculatedScore}`);
    }
  };

  return (
    <div className={styles.Container}>
      <h1 className={styles.title}>Kursus Kimia</h1>
      <p className={styles.description}>Deskripsi singkat tentang kursus Kimia.</p>
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
        <h2 className={styles.subtitle}>Kuis Kimia</h2>
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

export default Chemistry;