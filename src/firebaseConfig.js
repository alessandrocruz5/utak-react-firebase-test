// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey:
    process.env.REACT_APP_FIREBASE_API_KEY ||
    "AIzaSyDTbZ8-qKHyuqBbexnEwqFSRCth7UTgWVE",
  authDomain:
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ||
    "utak-react-firebase.firebaseapp.com",
  databaseURL:
    process.env.REACT_APP_FIREBASE_DATABASE_URL ||
    "https://utak-react-firebase-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "utak-react-firebase",
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
    "utak-react-firebase.appspot.com",
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "417722742767",
  appId:
    process.env.REACT_APP_FIREBASE_APP_ID ||
    "1:417722742767:web:6a814fd4e06547b9d7281a",
  measurementId:
    process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-T797KM8ZD5",
};
// const firebaseConfig = {
//   apiKey: "AIzaSyDTbZ8-qKHyuqBbexnEwqFSRCth7UTgWVE",
//   authDomain: "utak-react-firebase.firebaseapp.com",
//   projectId: "utak-react-firebase",
//   storageBucket: "utak-react-firebase.appspot.com",
//   messagingSenderId: "417722742767",
//   appId: "1:417722742767:web:6a814fd4e06547b9d7281a",
//   measurementId: "G-T797KM8ZD5",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

// const firebaseConfig = {
//   apiKey:
//     process.env.REACT_APP_FIREBASE_API_KEY ||
//     "AIzaSyCrUJrkr7iiB2-XXN8hca2xvSgP3Bys9Dc",
//   authDomain:
//     process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ||
//     "utak-firebase-402a3.firebaseapp.com",
//   databaseURL:
//     process.env.REACT_APP_FIREBASE_DATABASE_URL ||
//     "https://utak-firebase-402a3-default-rtdb.asia-southeast1.firebasedatabase.app/",
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "utak-firebase-402a3",
//   storageBucket:
//     process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
//     "utak-firebase-402a3.appspot.com",
//   messagingSenderId:
//     process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "938640281165",
//   appId:
//     process.env.REACT_APP_FIREBASE_APP_ID ||
//     "1:938640281165:web:10dff722eb807c264b1604",
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
