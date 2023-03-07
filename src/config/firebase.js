// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDM37A_SwwGYvvRXCw2KeRcU6o_CpBZ9rI",
    authDomain: "fir-pedro-450cd.firebaseapp.com",
    projectId: "fir-pedro-450cd",
    storageBucket: "fir-pedro-450cd.appspot.com",
    messagingSenderId: "529260949625",
    appId: "1:529260949625:web:83bea57183eb4c25d664a8",
    measurementId: "G-SX08E625L9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProivder = new GoogleAuthProvider()

export const db = getFirestore(app)