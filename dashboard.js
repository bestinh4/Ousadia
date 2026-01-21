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

    document.getElementById("local").value = "";
    document.getElementById("data").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("participantes").value = "";

    carregarPeladas();
  } catch (err) {
    alert("Erro ao salvar: " + err.message);
  }
});

// Carregar peladas com separação por status
async function carregarPeladas() {
  const listaPre = document.getElementById("preJogo");
  const listaAoVivo = document.getElementById("aoVivo");
  const listaPos = document.getElementById("posJogo");

  listaPre.innerHTML = "";
  listaAoVivo.innerHTML = "";
  listaPos.innerHTML = "";

  const snapshot = await getDocs(query(collection(db, "partidas"), orderBy("data")));
  const agora = new Date();

  snapshot.forEach(docu => {
    const p = docu.data();
    const dataHora = new Date(`${p.data}T${p.hora}`);
    let container;

    if (dataHora > agora) container = listaPre;
    else if (dataHora <= agora && dataHora.getTime() + 2*60*60*1000 > agora.getTime()) container = listaAoVivo; // partida 2h
    else container = listaPos;

    const li = document.createElement("li");
    li.className = "pelada-item";
    li.innerHTML = `<strong>${p.local}</strong> - ${p.data} ${p.hora}<br>Jogadores: ${p.participantes.join(", ")}`;
    container.appendChild(li);

    // Animação suave
    li.animate([
      { opacity: 0, transform: "translateY(-20px)" },
      { opacity: 1, transform: "translateY(0)" }
    ], { duration: 400, easing: "ease-out" });
  });
}

// Inicializa
carregarPeladas();
