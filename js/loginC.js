import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref, onValue, get } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
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
const database = getDatabase(app);
const auth = getAuth(app);

const spinner = document.getElementById('spinner');
const register = document.getElementById('register');
const signup = document.getElementById('signup');
const loginbtn = document.getElementById('btnlog');

loginbtn.addEventListener('click', function () {
    const username = document.getElementById('formuser').value;
    const password = document.getElementById('formpass').value;
    // Check the username and password here
    authenticate(username, password);
});

register.addEventListener('click', function () {
    const modal = new bootstrap.Modal(document.getElementById('RevModal'));
    modal.show();
})

signup.addEventListener('click', function () {
    const username = document.getElementById('emailA').value;
    const password = document.getElementById('passwordA').value;
    // Check the username and password here
    createUserWithEmailAndPassword(auth, username, password).then ((userCredential) => {
        sendEmailVerification(userCredential.user).then(() => {
            alert("Please check your email to verify your account")
        })
    }).catch ((error) => {
        alert(error) 
    })
})

function authenticate(username, password) {
    signInWithEmailAndPassword(auth, username, password).then ((userCredential) => {
        const verify = userCredential.user.emailVerified;
        console.log(userCredential.user.emailVerified);
        //window.location.href = 'agent.html?email=' + userCredential.user.email;
        if (verify == true) {
            window.location.href = 'index.html' 
            showSpinner();
        } else {
            alert("Please verify your email")
        }
    }).catch ((error) => {
        alert(error)
    })
}
function showSpinner() {
    spinner.classList.add('show'); // Show the spinner
}
