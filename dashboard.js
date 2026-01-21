// Importando Firebase v9 modular
import { auth, db, logout } from "./firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Elementos HTML onde vamos mostrar dados
const nomeUsuario = document.getElementById("nomeUsuario");
const fotoUsuario = document.getElementById("fotoUsuario");
const btnLogout = document.getElementById("btnLogout");

// Monitorando se usuário está logado
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Pega os dados do Firestore
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      nomeUsuario.textContent = userData.nome;
      fotoUsuario.src = userData.foto;
    } else {
      console.log("Nenhum dado encontrado no Firestore");
    }
  } else {
    // Se não estiver logado, volta para index
    window.location.href = "index.html";
  }
});

// Logout
btnLogout.addEventListener("click", () => {
  logout();
});
