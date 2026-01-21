import { auth } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Se não estiver logado, volta para o login
    window.location.href = "index.html";
  } else {
    // Exemplo de boas-vindas
    document.getElementById("welcome").innerText = `Bem-vindo, ${user.displayName}!`;
  }
});

// Botão para sair
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});
