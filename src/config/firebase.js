// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwp59JTLDHhuLgsFZphiL3mmUWm5fIQCU",
  authDomain: "vite-contact-7c496.firebaseapp.com",
  projectId: "vite-contact-7c496",
  storageBucket: "vite-contact-7c496.appspot.com",
  messagingSenderId: "356116900289",
  appId: "1:356116900289:web:ea351484b65cbb06b62740"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);