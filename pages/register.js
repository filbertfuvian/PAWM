import { useState } from 'react';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../lib/firebase';
import { doc, setDoc } from "firebase/firestore";
import styles from '../styles/Register.module.css'; 
import { useRouter } from 'next/router';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword ] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

const materi = [ 'matematika', 'fisika', 'kimia' ]
const range = Array.from({ length: 10 }, (_, i) => i);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        nickname: email.split('@')[0],
        });


      for (const subject of materi) {
        const videoStatus = {}; 
        
        for (const num of range) {
          videoStatus[`video${num + 1}`] = false; 
        }

        await setDoc(doc(db, "users", user.uid, "materi", subject), videoStatus);

        await setDoc(doc(db, "users", user.uid, "kuis", subject), {
          kuisStatus: false,
          score: 0
        });

      }

      alert('User  registered successfully!');
      router.push('/');

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