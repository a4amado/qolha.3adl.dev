import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPHSsraLEMa2Hu41OVACMV_nslUgJyqUU",
  authDomain: "sait-5fd26.firebaseapp.com",
  databaseURL:
    "https://sait-5fd26-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sait-5fd26",
  storageBucket: "sait-5fd26.appspot.com",
  messagingSenderId: "505856707076",
  appId: "1:505856707076:web:e5bc46d5e979c8eee94351",
  measurementId: "G-CXPZ214N2C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const Cols = {
  AUDIOS: "AUDIOS",
  AUDIOS_TO_REVIEW: "AUDIOS_TO_REVIEW",
  WORDS: "WORDS",
  WORDS_TO_REVIEW: "WORDS_TO_REVIEW",
};
