
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_7MWWnG3LhI1Ph_fkhARpEAghgaWll9o",
  authDomain: "vit-m-7ae0a.firebaseapp.com",
  projectId: "vit-m-7ae0a",
  storageBucket: "vit-m-7ae0a.firebasestorage.app",
  messagingSenderId: "892090509071",
  appId: "1:892090509071:web:65fbcb2bf9bbb75b2e807a",
  measurementId: "G-KV04HQ0TPH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);