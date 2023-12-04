import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "instagram-88617.firebaseapp.com",
  projectId: "instagram-88617",
  storageBucket: "instagram-88617.appspot.com",
  messagingSenderId: "275119720073",
  appId: "1:275119720073:web:4f4253d9cd67befa8aa858"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
