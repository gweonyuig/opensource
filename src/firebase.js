// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC3MmeJGsb_KTI03OdwBdwFEr8Ze9kaotU',
  authDomain: 'opensource-36c35.firebaseapp.com',
  projectId: 'opensource-36c35',
  storageBucket: 'opensource-36c35.appspot.com',
  messagingSenderId: '426244688640',
  appId: '1:426244688640:web:7b35673933fb1b5978c1e5',
  //measurementId: 'G-DETH51GTRJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export default app;
