import React, { useEffect, useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import styles from '../../styles/Course.module.css'; 

const Math = () => {
  const [userData, setUserData] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [videoCompleted, setVideoCompleted] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const userId = auth.currentUser ?.uid;

  const videoList = [
    { id: 1, title: 'Video Matematika 1', src: 'https://example.com/videos/matematika1.mp4' },
    { id: 2, title: 'Video Matematika 2', src: 'https://example.com/videos/matematika2.mp4' },
    { id: 3, title: 'Video Matematika 3', src: 'https://example.com/videos/matematika3.mp4' },
    { id: 4, title: 'Video Matematika 4', src: 'https://example.com/videos/matematika4.mp4' },
    { id: 5, title: 'Video Matematika 5', src: 'https://example.com/videos/matematika5.mp4' },
    { id: 6, title: 'Video Matematika 6', src: 'https://example.com/videos/matematika6.mp4' },
    { id: 7, title: 'Video Matematika 7', src: 'https://example.com/videos/matematika7.mp4' },
    { id: 8, title: 'Video Matematika 8', src: 'https://example.com/videos/matematika8.mp4' },
    { id: 9, title: 'Video Matematika 9', src: 'https://example.com/videos/matematika9.mp4' },
    { id: 10, title: 'Video Matematika 10', src: 'https://example.com/videos/matematika10.mp4' },
  ];

  const quizQuestions = [
    {
      "question": "Apa turunan dari fungsi f(x) = 3x^2 + 2x - 5?",
      "options": ["3x + 2", "6x + 2", "6x - 2", "6x^2 + 2"],
      "answer": "6x + 2"
    },
    {
      "question": "Apa integral tak tentu dari f(x) = 4x^3?",
      "options": ["x^4 + C", "x^3 + C", "x^2 + C", "4x^4 + C"],
      "answer": "x^4 + C"
    },
    {
      "question": "Jika f(x) = e^x, apa turunan dari f(x)?",
      "options": ["e^x", "x * e^x", "e^(x+1)", "ln(x)"],
      "answer": "e^x"
    },
    {
      "question": "Apa integral tak tentu dari f(x) = 1/x?",
      "options": ["ln(x)", "ln|x| + C", "1/x + C", "ln(x) + C"],
      "answer": "ln|x| + C"
    },
    {
      "question": "Apa nilai limit lim(x→0) sin(x)/x?",
      "options": ["1", "0", "∞", "Tidak ada"],
      "answer": "1"
    },
    {
      "question": "Apa turunan dari fungsi f(x) = cos(x)?",
      "options": ["-sin(x)", "sin(x)", "-cos(x)", "tan(x)"],
      "answer": "-sin(x)"
    },
    {
      "question": "Jika f(x) = x^2, berapa nilai turunan kedua f(x)?",
      "options": ["2", "1", "0", "4x"],
      "answer": "2"
    },
    {
      "question": "Apa integral dari f(x) = 2x dengan batas 0 hingga 2?",
      "options": ["2", "4", "6", "8"],
      "answer": "4"
    },
    {
      "question": "Apa nilai dari lim(x→∞) 1/x?",
      "options": ["∞", "1", "0", "Tidak ada"],
      "answer": "0"
    },
    {
      "question": "Jika f(x) = ln(x), apa turunan dari f(x)?",
      "options": ["1/x", "ln(x)", "x", "e^x"],
      "answer": "1/x"
    }
  ];

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
      const userDocRef = doc(db, 'users', userId, 'materi', 'matematika');
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
      const completedStatus = userData.materi?.matematika[`video${selectedVideo}`] || false;
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
      const userDocRef = doc(db, 'users', userId, 'kuis', 'matematika');
      await setDoc(userDocRef, {
        kuisStatus: true,
        score: calculatedScore
      }, { merge: true });
      console.log(`Quiz completed with score: ${calculatedScore}`);
    }
  };

  return (
    <div className={styles.Container}>
      <h1 className={styles.title}>Kursus Matematika</h1>
      <p className={styles.description}>Deskripsi singkat tentang kursus Matematika.</p>
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
        <h2 className={styles.subtitle}>Kuis Matematika</h2>
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

export default Math;