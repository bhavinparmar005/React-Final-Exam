// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyD199GxBO9pBKJnTcId8slOjCQ45SXdaOs",
//     authDomain: "react-blog-page-7233d.firebaseapp.com",
//     projectId: "react-blog-page-7233d",
//     storageBucket: "react-blog-page-7233d.firebasestorage.app",
//     messagingSenderId: "383656267314",
//     appId: "1:383656267314:web:659028498b8c81f325762b",
//     measurementId: "G-9CW9M5H1YH"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);





import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBd2ZY7HrB1UVBeO4x8DrYwTmskzzBKDB0",
  authDomain: "blogpage-de244.firebaseapp.com",
  projectId: "blogpage-de244",
  storageBucket: "blogpage-de244.firebasestorage.app",
  messagingSenderId: "791904299205",
  appId: "1:791904299205:web:01aeb48a1aebbb333da8ac",
  measurementId: "G-KCY7C6RV80"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);