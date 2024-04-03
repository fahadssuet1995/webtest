import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth,  signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
const firebaseConfig = {
      apiKey: "AIzaSyBeUNbYNaqXbWHxH4CyFMAUyqFYDQd38Ic",
      authDomain: "betteragent-776b4.firebaseapp.com",
      databaseURL: "https://betteragent-776b4-default-rtdb.firebaseio.com",
      projectId: "betteragent-776b4",
      storageBucket: "betteragent-776b4.appspot.com",
      messagingSenderId: "638601102700",
      appId: "1:638601102700:web:2d7036e87f460179f7df49"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const searchButton = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchKeyword');
const searchResults = document.getElementById('search-results');
const logout = document.getElementById('logout');

onAuthStateChanged(auth, (user) => {
      if (user) {
            console.log(user)
            logout.classList.remove('d-none')
      } else {
            logout.classList.add('d-none')
      }
})

searchButton.addEventListener('click', () => {
      window.location.href = `results.html?input=${searchInput.value}`;
});

logout.addEventListener('click', () => {
      signOut(auth).then(() => {
            logout.classList.add('d-none')
            alert("Sign out successful")
            
      })
})