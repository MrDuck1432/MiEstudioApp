import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCROZtsXD3lllPVhLnZA9UfXjz42-6DjCM",
  authDomain: "miestudioapp-duck1432.firebaseapp.com",
  projectId: "miestudioapp-duck1432",
  storageBucket: "miestudioapp-duck1432.firebasestorage.app",
  messagingSenderId: "765099270378",
  appId: "1:765099270378:web:f4b7cf68d7dfb482a63793",
  measurementId: "G-40HWGL7JTV"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);