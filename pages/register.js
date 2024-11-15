// pages/register.js
import { useState } from 'react';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../lib/firebase';
import { doc, setDoc } from "firebase/firestore";
import styles from '../styles/Register.module.css'; // Impor gaya

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword ] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Simpan data pengguna ke Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        nickname: email.split('@')[0],
        materi: {
          matematika: {
            completed_video: 0,
            max_video: 10,
            video1: false,
            video2: false,
            video3: false,
            video4: false,
            video5: false,
            video6: false,
            video7: false,
            video8: false,
            video9: false,
            video10: false
          },
          fisika: {
            completed_video: 0,
            max_video: 10,
            video1: false,
            video2: false,
            video3: false,
            video4: false,
            video5: false,
            video6: false,
            video7: false,
            video8: false,
            video9: false,
            video10: false
          },
          kimia: {
            completed_video: 0,
            max_video: 10,
            video1: false,
            video2: false,
            video3: false,
            video4: false,
            video5: false,
            video6: false,
            video7: false,
            video8: false,
            video9: false,
            video10: false
          },
        },
        kuis: {
          matematika: {
            completed: false,
            score: 0,
            max_score: 100,
          },
          fisika: {
            completed: false,
            score: 0,
            max_score: 100,
          },
          kimia: {
            completed: false,
            score: 0,
            max_score: 100,
          },
        }
      });

      alert('User  registered successfully!');
      // Redirect or perform other actions after registration
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className={styles.registerForm} onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;