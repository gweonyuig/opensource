// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getStorage, ref, uploadBytes} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: '****************************',
  authDomain: 'opensource-36c35.firebaseapp.com',
  projectId: 'opensource-36c35',
  storageBucket: 'opensource-36c35.appspot.com',
  messagingSenderId: '426244688640',
  appId: '1:426244688640:web:7b35673933fb1b5978c1e5',
  //measurementId: 'G-DETH51GTRJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase 인증 및 스토리지 가져오기
const auth = getAuth(app);
const storage = getStorage(app);

const uploadImage = async imageFile => {
  const storageRef = ref(storage, 'images/' + imageFile.name);
  await uploadBytes(storageRef, imageFile.uri, {contentType: imageFile.type});
  console.log('Image uploaded successfully.');
};

export {auth, storage, uploadImage};
export default app;
