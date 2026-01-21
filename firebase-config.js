// Importando Firebase v9 modular
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Configuração do Firebase
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
const auth = getAuth(app);
const db = getFirestore(app);

// Provider do Google
const provider = new GoogleAuthProvider();

// Função para login com Google
export async function loginGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Salvando dados do usuário no Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      nome: user.displayName,
      email: user.email,
      foto: user.photoURL,
      loginData: new Date()
    });

    console.log("Usuário logado e dados salvos:", user);
    window.location.href = "dashboard.html"; // Redireciona para o dashboard

  } catch (error) {
    console.error("Erro ao logar com Google:", error);
    alert("Erro ao logar com Google. Veja o console.");
  }
}

// Função para logout
export async function logout() {
  try {
    await signOut(auth);
    console.log("Usuário deslogado");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Erro ao deslogar:", error);
  }
}

// Exportando auth e db se precisar em outros arquivos
export { auth, db };
