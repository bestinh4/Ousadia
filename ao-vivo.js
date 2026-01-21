import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const preJogoList = document.getElementById("pre-jogo-list");

// Função para carregar jogos do Firestore
async function carregarPreJogo() {
  const querySnapshot = await getDocs(collection(db, "pre-jogo"));
  preJogoList.innerHTML = "";
  querySnapshot.forEach(doc => {
    const data = doc.data();
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${data.time1} x ${data.time2}</h3><p>${data.horario}</p>`;
    preJogoList.appendChild(card);
  });
}

carregarPreJogo();
