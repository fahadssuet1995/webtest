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


const searchButton = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchKeyword');
const searchResults = document.getElementById('search-results');
const urlParams = new URLSearchParams(window.location.search);
const number = urlParams.get('index');
const body = document.getElementById('profile');
const agentEmail = document.getElementById('agentEmail');
const claimbtn = document.getElementById('claimBtn');
const login = document.getElementById('login');
const password = document.getElementById('password');
const emailA = document.getElementById('emailA');
const passwordA = document.getElementById('passwordA');
const subRev = document.getElementById('subRev');
var useruid = "";
var useremail = "";
var counter = 0;


const searchTerm = number


const agentsRef = ref(database, 'data/' + searchTerm);
get(agentsRef).then((snapshot) => {
    const agentsData = snapshot.val();
    const reviews = agentsData.reviews;
    let totalRate = 0;
    let numberOfEntries = 0;
    for (const userId in reviews) {
        if (reviews.hasOwnProperty(userId)) {
            const userReview = reviews[userId];
            const rate = parseInt(userReview.rate); // Convert rate to integer
            totalRate += rate;
            numberOfEntries++;
        }
    }
    // Calculate the average rate
    const averageRate = numberOfEntries > 0 ? totalRate / numberOfEntries : 0;
    console.log(agentsData);
    body.innerHTML = ``;
    body.innerHTML = `
    <div class="row g-0 align-items-center flex-column-reverse flex-md-row" style="margin-top: 8rem;">
                <div class="col-md-3 animated fadeIn">
                    <img class="img-thumbnail rounded-circle" style=" object-fit: cover;" src="${agentsData.profileIMG}" alt="">
                </div>
                <div class="col-md-5 p-2 mt-lg-2 mb-3">
                <button class="btn btn-outline-primary btn-sm" id="revbtn">Review</button>
                <button class="btn btn-outline-secondary btn-sm" id="savebtn">Save</button>
                        <h1 class="display-5 animated fadeIn mb-4">${agentsData.name}</h1>
                        <h3 class=" animated fadeIn mb-4">${agentsData.post}</h3>
                    <div id="result" class="row row-cols-1 row-cols-md-2">
                        <p class="animated fadeIn mb-3">Company: ${agentsData.comp}</p>
                        <p class="animated fadeIn mb-3">Registration: ${agentsData.brnum}</p>
                        <a class="bi-envelope animated fadeIn mb-3" href="mailto:${agentsData.email}"> Email</a>
                        <p class="animated fadeIn mb-5">Languages: ${agentsData.lan}</p>
                        <a class="bi bi-telephone-outbound" href="tel:${agentsData.phone}"> Call Now</a>
                        <a class="bi bi-whatsapp animated fadeIn mb-3" href="https://wa.me/${agentsData.wapp}"> Whatsapp</a>
                    </div>
                    <a class="animated fadeIn mb-2">Areas: ${agentsData.a1}, ${agentsData.a2}, ${agentsData.a3}</a>
                    <p class="animated fadeIn mb-4"><small class="text-muted">Rating: ${averageRate.toFixed(1)} out of 5</small></p>
                </div> 
            </div>
            <div class="col-md-9 p-5 mt-lg-3">
                    <h3>About Us</h1>
                    <p>${agentsData.about}</p>
                    <button type="button" class="btn btn-primary" id ="showModal">Claim profile</button>
                </div>
    `;
    agentEmail.innerHTML = agentsData.email;
    const showModalb = document.getElementById('showModal');
    const revModal = document.getElementById('revbtn');
    const savebtn = document.getElementById('savebtn');

    showModalb.addEventListener('click', () => {
        const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
        modal.show();
    });
    revModal.addEventListener('click', () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                useruid = user.uid
                useremail = user.email
                const modal = new bootstrap.Modal(document.getElementById('starModal'));
                modal.show();
            } else {
                const modal = new bootstrap.Modal(document.getElementById('RevModal'));
                modal.show();
            }
        })

    });
    savebtn.addEventListener('click', () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const saved =  ref(database, 'saved/' + user.uid + '/' + number);
                set(saved, {
                    number: number
                }).then(() => {
                    alert("Saved!")
                })
            } else {
                const modal = new bootstrap.Modal(document.getElementById('RevModal'));
                modal.show();
            }
        })
    })

    claimbtn.addEventListener('click', () => {
        createUserWithEmailAndPassword(auth, agentsData.email, password.value).then((userCredential) => {
            console.log(userCredential.user)
            sendEmailVerification(userCredential.user)
            alert("Successfully Claimed! Please check your email inbox to verify")
        }).catch((error) => {
            alert(error)
        })
    })

    login.addEventListener('click', () => {
        signInWithEmailAndPassword(auth, emailA.value, passwordA.value).then((userCredential) => {
            alert(userCredential.user.email)
            useruid = userCredential.user.uid
            useremail = userCredential.user.email

        }).catch((error) => {
            alert(error)
        }).finally(() => {
            const close = document.getElementById('close');
            close.click();
            const modal = new bootstrap.Modal(document.getElementById('starModal'));
            modal.show();
        })
    })

    subRev.addEventListener('click', () => {
        const revRef = ref(database, 'data/' + searchTerm + '/reviews/' + useruid);
        update(revRef, {
            email: useremail,
            rate: document.getElementById('range1').value,
        }).then(() => {
            alert("Successfully Submitted")
            const close = document.getElementById('close2');
            close.click();
        })
    })

})

searchButton.addEventListener('click', () => {
    window.location.href = `results.html?input=${searchInput.value}`;
});

