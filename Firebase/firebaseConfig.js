// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDbIBHbd4MTDC4CLBv0voe0AdllzmLA4V0",
  authDomain: "audiowave-84911.firebaseapp.com",
  databaseURL: "https://audiowave-84911-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "audiowave-84911",
  storageBucket: "audiowave-84911.appspot.com",
  messagingSenderId: "171238336630",
  appId: "1:171238336630:web:44c84e1e3c819d4fa51757",
  measurementId: "G-7DRB58EKEM",
  storageBucket: "audiowave-84911.appspot.com"
};

const firebase_app = initializeApp(firebaseConfig);

const db = getFirestore(firebase_app);

const storage = getStorage(firebase_app);


export { db , storage };
