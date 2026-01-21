// firebase-config.js

// 1️⃣ Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyADQZY0PLEcJUPjr2IxC5fjJmMgHXW3Eio",
  authDomain: "ousadiaapp.firebaseapp.com",
  projectId: "ousadiaapp",
  storageBucket: "ousadiaapp.firebasestorage.app",
  messagingSenderId: "736839415891",
  appId: "1:736839415891:web:9335932f5aa4a5689a6ea6"
};

// 2️⃣ Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// 3️⃣ Autenticação
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// 4️⃣ Função de login com Google
function loginGoogle() {
  auth.signInWithPopup(provider)
    .then(result => {
      console.log("Usuário logado:", result.user.displayName);
      window.location.href = 'dashboard.html'; // Redireciona após login
    })
    .catch(error => {
      alert("Erro ao logar: " + error.message);
    });
}

// 5️⃣ Função de logout
function logout() {
  auth.signOut()
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch(error => {
      alert("Erro ao sair: " + error.message);
    });
}

// 6️⃣ Monitorar estado de autenticação
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("Usuário ativo:", user.displayName);
  } else {
    console.log("Nenhum usuário logado.");
  }
});
