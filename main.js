import { auth, provider, db } from './firebase-config.js';
import { signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { collection, addDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    alert("Login realizado com sucesso: " + user.displayName);

    // Referência da coleção "users"
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // Se não existe, cria o usuário
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      });
      alert("Usuário adicionado ao Firestore!");
    } else {
      alert("Usuário já cadastrado no Firestore.");
    }

    // Redireciona para o dashboard
    window.location.href = "dashboard.html";

  } catch (error) {
    alert("Erro: " + error.message);
  }
});

// Se já estiver logado, redireciona automaticamente
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "dashboard.html";
  }
});
