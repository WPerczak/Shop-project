import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDtNP2YkZxvZn8XeWzZfcyZH7GTX8kcxUU",
  authDomain: "shop-project-7fc8f.firebaseapp.com",
  projectId: "shop-project-7fc8f",
  storageBucket: "shop-project-7fc8f.appspot.com",
  messagingSenderId: "574975784329",
  appId: "1:574975784329:web:49dd96bf016ad6b7ef5d58"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const firestore = firebase.firestore(); // Add this line to initialize Firestore

export { auth, googleAuthProvider, firestore }; // Export the firestore object
