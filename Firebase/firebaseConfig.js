// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/**
 * 
 * @description The firebase configuration.
 * @var firebaseConfig - The firebase configuration.
 * @function initializeApp - The function that initializes the app.
 * @function getFirestore - The function that gets the firestore.
 * @exports db - The database.
 */
const firebaseConfig = {
  apiKey: "AIzaSyAXVhrpqp9kIJrSEM3-pdJMY3NNO68M3P4",
  authDomain: "audioappfree.firebaseapp.com",
  projectId: "audioappfree",
  storageBucket: "audioappfree.appspot.com",
  messagingSenderId: "156406397272",
  appId: "1:156406397272:web:dc28b647a8b51753f5cd2d",
  measurementId: "G-ZHFMYK50DY"
};

const firebase_app = initializeApp(firebaseConfig);

const db = getFirestore(firebase_app);


export { db  };

