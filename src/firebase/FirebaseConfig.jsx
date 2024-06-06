// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByxOmmVPnCq_Pj6YSkK2g0D4T0um5jBT4",
  authDomain: "namastemart-5989f.firebaseapp.com",
  projectId: "namastemart-5989f",
  storageBucket: "namastemart-5989f.appspot.com",
  messagingSenderId: "316548791593",
  appId: "1:316548791593:web:f62dbacd8547ce71c88b38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firedb=getFirestore(app);

const auth=getAuth(app);

export {firedb,auth}