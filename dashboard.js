import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const welcomeEl = document.getElementById("welcome");
const usersListEl = document.getElementById("usersList");
const logoutBtn = document.getElementById("logoutBtn");

// Verifica login
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    welcomeEl.innerText = `Bem-vindo, ${user.displayName}!`;
    loadUsersRealTime();
  }
});

// Função para carregar usuários em tempo real
function loadUsersRealTime() {
  const usersCollection = collection(db, "users");

  onSnapshot(usersCollection, (snapshot) => {
    usersListEl.innerHTML = ""; // limpa a lista
    snapshot.forEach((doc) => {
      const userData = doc.data();
      const li = document.createElement("li");
      li.innerText = `${userData.name} - ${userData.email}`;
      usersListEl.appendChild(li);
    });
  });
}

// Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});
