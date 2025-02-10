// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

import {getAuth} from 'firebase/auth'

console.log("-----------------",process.env.EXPO_PUBLIC_FIREBASE_API_KEY)

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "meditracker-182d4.firebaseapp.com",
  projectId: "meditracker-182d4",
  storageBucket: "meditracker-182d4.firebasestorage.app",
  messagingSenderId: "355144076965",
  appId: "1:355144076965:web:93005890bc5891b760074c",
  measurementId: "G-D9587WEMK0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
