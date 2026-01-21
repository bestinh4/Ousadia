import { auth, db } from "./firebase-config.js";
import { signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Logout
document.getElementById("logout").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
});

// Agendar pelada
document.getElementById("agendar").addEventListener("click", async () => {
  const local = document.getElementById("local").value;
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;
  const participantes = document.getElementById("participantes").value.split(",").map(p => p.trim());

  if (!local || !data || !hora || participantes.length === 0) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    await addDoc(collection(db, "partidas"), {
      local,
      data,
      hora,
      participantes,
      status: "agendada"
    });

    alert("Pelada agendada com sucesso!");
    carregarPeladas();
  } catch (err) {
    alert("Erro ao salvar: " + err.message);
  }
});

// Carregar peladas
async function carregarPeladas() {
  const lista = document.getElementById("listaPeladas");
  lista.innerHTML = "";
  const q = query(collection(db, "partidas"));
  const snapshot = await getDocs(q);

  snapshot.forEach(docu => {
    const p = docu.data();
    const li = document.createElement("li");
    li.textContent = `${p.data} ${p.hora} - ${p.local} [${p.participantes.join(", ")}]`;
    lista.appendChild(li);
  });
}

// Carrega ao iniciar
carregarPeladas();
