// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDBeTqPRM5es_mYpHxx4NQ6B3lxJ1Uh8M0",
  authDomain: "godwinshop-b7a2a.firebaseapp.com",
  projectId: "godwinshop-b7a2a",
  storageBucket: "godwinshop-b7a2a.appspot.com",
  messagingSenderId: "148759046480",
  appId: "1:148759046480:web:650917fe62fde99fcd2455",
  measurementId: "G-JJWWS0SMLT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const database = getFirestore(app)
export const storage = getStorage(app)

export default app


