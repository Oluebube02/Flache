// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import {getAuth,GoogleAuthProvider, signInWithPopup} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "withdrawn",
  authDomain: "withdrawn",
  projectId: "withdrawn",
  storageBucket: "withdrawn",
  messagingSenderId: "46037237286",
  appId: "1:46037237286:web:8c4536df197780117b70e7",
  measurementId: "G-Z2E7K1XHF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); //connecting our app to firebase
export const provider = new GoogleAuthProvider() //holds everything related to google authentication
export const db = getFirestore(app) //initialize the database inside the project

export const auth = getAuth() //showing that our app uses auth. needs to be exported 

