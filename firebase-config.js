// Inicializar Firebase
var firebaseConfig = {
  apiKey: "AIzaSyADQZY0PLEcJUPjr2IxC5fjJmMgHXW3Eio",
  authDomain: "ousadiaapp.firebaseapp.com",
  projectId: "ousadiaapp",
  storageBucket: "ousadiaapp.firebasestorage.app",
  messagingSenderId: "736839415891",
  appId: "1:736839415891:web:9335932f5aa4a5689a6ea6"
};
firebase.initializeApp(firebaseConfig);

// Referência de autenticação
var auth = firebase.auth();

// Login com Google
function loginGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(function(result) {
      console.log("Usuário logado:", result.user.displayName);
      window.location.href = 'dashboard.html'; // Redireciona após login
    })
    .catch(function(error) {
      alert("Erro ao logar: " + error.message);
    });
}

// Logout
function logout() {
  auth.signOut()
    .then(function() {
      window.location.href = 'index.html'; // Redireciona após logout
    })
    .catch(function(error) {
      alert("Erro ao sair: " + error.message);
    });
}

// Monitorar autenticação
auth.onAuthStateChanged(function(user) {
  if (user) {
    console.log("Usuário ativo:", user.displayName);
  } else {
    console.log("Nenhum usuário logado.");
  }
});
