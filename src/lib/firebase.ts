import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB-b01HlFUf0RI-QESAVd8OzzerJVXYwKI",
  authDomain: "resume-generator-8815d.firebaseapp.com",
  databaseURL: "https://resume-generator-8815d-default-rtdb.firebaseio.com",
  projectId: "resume-generator-8815d",
  storageBucket: "resume-generator-8815d.appspot.com",
  messagingSenderId: "678047047635",
  appId: "1:678047047635:web:2581c9f75c7998d0519926",
  measurementId: "G-T2VL27EEZD"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getDatabase(app);
