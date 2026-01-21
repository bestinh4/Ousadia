// Firebase v9.23
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyADQZY0PLEcJUPjr2IxC5fjJmMgHXW3Eio",
  authDomain: "ousadiaapp.firebaseapp.com",
  projectId: "ousadiaapp",
  storageBucket: "ousadiaapp.firebasestorage.app",
  messagingSenderId: "736839415891",
  appId: "1:736839415891:web:9335932f5aa4a5689a6ea6"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Login com Google
const provider = new GoogleAuthProvider();

export async function loginGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Salva no Firestore se não existir
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        createdAt: new Date()
      });
    }

    // Redireciona para dashboard
    window.location.href = "dashboard.html";

  } catch (error) {
    console.error("Erro no login:", error);
    alert("Falha no login. Veja o console.");
  }
}

// Função para deslogar
export function logout() {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
}

// Função para buscar usuários
export async function getUsers() {
  const usersCol = collection(db, "users");
  const usersSnapshot = await getDocs(usersCol);
  const usersList = usersSnapshot.docs.map(doc => doc.data());
  return usersList;
}

// Verifica se o usuário está logado
export function checkAuth(redirect = true) {
  onAuthStateChanged(auth, user => {
    if (!user && redirect) {
      window.location.href = "index.html";
    }
  });
}
