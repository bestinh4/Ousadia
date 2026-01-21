// firebase-config.js

// Configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyADQZY0PLEcJUPjr2IxC5fjJmMgHXW3Eio",
  authDomain: "ousadiaapp.firebaseapp.com",
  projectId: "ousadiaapp",
  storageBucket: "ousadiaapp.firebasestorage.app",
  messagingSenderId: "736839415891",
  appId: "1:736839415891:web:9335932f5aa4a5689a6ea6"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Autenticação
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// Login Google
function loginGoogle() {
  auth.signInWithPopup(provider)
    .then(result => {
      console.log("Usuário logado:", result.user.displayName);
      window.location.href = 'dashboard.html';
    })
    .catch(error => {
      alert("Erro ao logar: " + error.message);
    });
}

// Logout
function logout() {
  auth.signOut()
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch(error => {
      alert("Erro ao sair: " + error.message);
    });
}

// Monitorar autenticação
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("Usuário ativo:", user.displayName);
  } else {
    console.log("Nenhum usuário logado.");
  }
});
