// Configuração do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Suas credenciais
const firebaseConfig = {
  apiKey: "AIzaSyADQZY0PLEcJUPjr2IxC5fjJmMgHXW3Eio",
  authDomain: "ousadiaapp.firebaseapp.com",
  projectId: "ousadiaapp",
  storageBucket: "ousadiaapp.firebasestorage.app",
  messagingSenderId: "736839415891",
  appId: "1:736839415891:web:9335932f5aa4a5689a6ea6"
};

// Inicializando Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
