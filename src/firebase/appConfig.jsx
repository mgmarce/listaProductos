// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//importamos el servicio de la autenticacion
import { getAuth, GoogleAuthProvider } from "firebase/auth";

//firestore

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGIN,
    appId: process.ta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//firestore
//auth
//Indicamos que se va utilizar el servicio de la autenticacion con la app
const auth_user = getAuth(app)
const providerGoogle = new GoogleAuthProvider()
export { auth_user, providerGoogle };
