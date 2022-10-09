import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyAAH0dbov6KZpy4oAHP6pDzTzG_Dpbc7nI",
  authDomain: "susten-clean.firebaseapp.com",
  projectId: "susten-clean",
  storageBucket: "susten-clean.appspot.com",
  messagingSenderId: "662446914505",
  appId: "1:662446914505:web:76e1608f338b0987864618"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

