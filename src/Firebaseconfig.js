// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUSLE-l-n3gnLwKNTSNsHZ-ArLNblLalA",
  authDomain: "visitsrilanka-3a909.firebaseapp.com",
  projectId: "visitsrilanka-3a909",
  storageBucket: "visitsrilanka-3a909.appspot.com",
  messagingSenderId: "309072445035",
  appId: "1:309072445035:web:b0c18697996e3747f2bb2e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const Firestore = getFirestore(app);
