import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6VzmTYe009WkWTpAz7TNGQVlMkthOAKc",
  authDomain: "animedisclist.firebaseapp.com",
  databaseURL: "https://animedisclist-default-rtdb.firebaseio.com",
  projectId: "animedisclist",
  storageBucket: "animedisclist.appspot.com",
  messagingSenderId: "277728267784",
  appId: "1:277728267784:web:a9cc6372828199ad530bbd",
  measurementId: "G-PR5PCVXJKX",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const auth = getAuth();
