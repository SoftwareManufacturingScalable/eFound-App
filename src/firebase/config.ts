// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTGse0WBsqv2H2nTpg_ipEmBGtMs_J-RE",
  authDomain: "journal-app-react-ts.firebaseapp.com",
  projectId: "journal-app-react-ts",
  storageBucket: "journal-app-react-ts.appspot.com",
  messagingSenderId: "375724688715",
  appId: "1:375724688715:web:e131d441702cedd61514ce",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
