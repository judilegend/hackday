// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB4VgqY1VthDKnx1OYyJHe8_XRdazWWzSE",
  authDomain: "hackday-294a6.firebaseapp.com",
  projectId: "hackday-294a6",
  storageBucket: "hackday-294a6.appspot.com",
  messagingSenderId: "142512993111",
  appId: "1:142512993111:web:3744893cde2b870aad0412",
  measurementId: "G-NBX9VKNLP6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional, depends on your use case)
const analytics = getAnalytics(app);

// Initialize Firebase Auth and Firestore if needed
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics };
