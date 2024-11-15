// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2fdr9WQ0863eP6qMGxN82y1FteYl2guw",
  authDomain: "virtuallab-88f0e.firebaseapp.com",
  databaseURL: "https://virtuallab-88f0e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "virtuallab-88f0e",
  storageBucket: "virtuallab-88f0e.firebasestorage.app",
  messagingSenderId: "524216976619",
  appId: "1:524216976619:web:5917d63f3ee417f43feaae"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
