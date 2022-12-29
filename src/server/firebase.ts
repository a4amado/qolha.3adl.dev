import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyD6eR7x0BSTi4wasnzkrW_Qi6j8uiJiM7g",
  authDomain: "qolha-372817.firebaseapp.com",
  projectId: "qolha-372817",
  storageBucket: "qolha-372817.appspot.com",
  messagingSenderId: "118315522198",
  appId: "1:118315522198:web:30ee3cb0ae1bc335424ab7",
  measurementId: "G-FKLJDTKM5E",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const Cols = {
  CLIPS: "CLIPS",
  WORDS: "WORDS",
};
