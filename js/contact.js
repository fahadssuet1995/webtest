import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref, onValue, get, update, set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
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
const send = document.getElementById('send');

send.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const contact = {
        name,
        email,
        subject,
        message
    }
    if (name == '' || email == '' || subject == '' || message == '') {
        alert('Please fill all the fields')
    }
    else {
        sendEmail(contact)
    }
})

function sendEmail(contact) {
    const currentDate = new Date();
    // Format the date into a readable form
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    set(ref(database, 'contact/' + formattedDate), {
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message
    }).then(() => {
        alert('Your message has been sent')
    }).catch((error) => {
        alert(error)
    })
}