import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBd6JIlGYM-kpWScdojnQp-mJWHnWr2OtM",
  authDomain: "every-63f9f.firebaseapp.com",
  projectId: "every-63f9f",
  storageBucket: "every-63f9f.appspot.com",
  messagingSenderId: "1070767850792",
  appId: "1:1070767850792:web:d80940a3886bdce7093c1d",
  measurementId: "G-QX8FGV45Y9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
