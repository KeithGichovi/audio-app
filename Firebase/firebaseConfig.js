// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC0gfLtEb7rko2YNswxIAJGcSQ0Tq8-8Kw",
  authDomain: "audiowave2.firebaseapp.com",
  projectId: "audiowave2",
  storageBucket: "audiowave2.appspot.com",
  messagingSenderId: "165002961158",
  appId: "1:165002961158:web:6629ac318d8024480b7e87",
  measurementId: "G-GZN27CGQTT",
  storageBucket: "gs://audiowave2.appspot.com"
};

const firebase_app = initializeApp(firebaseConfig);

const db = getFirestore(firebase_app);

const storage = getStorage(firebase_app);


export { db , storage };
