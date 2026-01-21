// Importar funções do Firebase (v9 modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyADQZY0PLEcJUPjr2IxC5fjJmMgHXW3Eio",
  authDomain: "ousadiaapp.firebaseapp.com",
  projectId: "ousadiaapp",
  storageBucket: "ousadiaapp.firebasestorage.app",
  messagingSenderId: "736839415891",
  appId: "1:736839415891:web:9335932f5aa4a5689a6ea6"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Login com Google
export function loginGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Usuário logado:", result.user.displayName);
      window.location.href = 'dashboard.html'; // Redireciona após login
    })
    .catch((error) => {
      alert("Erro ao logar: " + error.message);
    });
}

// Logout
export function logout() {
  signOut(auth)
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch((error) => {
      alert("Erro ao sair: " + error.message);
    });
}

// Monitorar autenticação
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuário ativo:", user.displayName);
  } else {
    console.log("Nenhum usuário logado.");
  }
});
