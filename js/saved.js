import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref, onValue, get, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
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
const login = document.getElementById('login');


var useruid = "";
var useremail = "";


onAuthStateChanged(auth, (user) => {
    if (user) {
        useruid = user.uid;
        useremail = user.email;
        saved(useruid)

    } else {
        alert("Please Login")
        $('#spinner').removeClass('show');
        const modal = new bootstrap.Modal(document.getElementById('RevModal'));
        modal.show();
        login.addEventListener('click', () => {
            signInWithEmailAndPassword(auth, emailA.value, passwordA.value).then((userCredential) => {
                const verify = userCredential.user.emailVerified;
                if (verify == true) {
                    window.location.reload();
                }
                if (verify == false) {
                    alert("Please verify your email")
                    signOut(auth).then(() => {
                        window.location.href = "index.html";
                    })
                }
            }).catch((error) => {
                alert(error)
            })
        })
    }
})



function saved(useruid) {
    const keysArray = []; // Initialize an empty array to store keys
    const savedRef = ref(database, 'saved/' + useruid);
    console.log(useruid);
    get(savedRef).then((snapshot) => {
        const savedData = snapshot.val();
        //console.log(savedData);
        if (savedData) {
            for (const key in savedData) {
                console.log("Key:", key);
                keysArray.push(key);
            }
        } else {
            alert("No Saved Agents");
            window.location.href = "index.html";
        }
        savedAgents(keysArray);
    })
}

function deleteAgent(uid, key) {
    const savedRef = ref(database, 'saved/' + uid);
    get(savedRef).then((snapshot) => {
        const savedData = snapshot.val();
        for (const keys in savedData) {
            if (keys == key) {
                remove(ref(database, 'saved/' + uid + '/' + key))
                    .then(() => {
                        alert("Agent Deleted");
                        window.location.reload();
                    })
            }
        }
    })

}

function savedAgents(keysArray) {
    const resultsTableBody = document.getElementById('result');
    resultsTableBody.innerHTML = '';

    keysArray.forEach(key => {
        const agentsRef = ref(database, 'data/' + key);
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

            const card = document.createElement('div');
            card.innerHTML = `
                <a class="col" href="about.html?index=${key}" >
                    <div class="card mb-3 shadow p-3 mb-5 bg-body rounded" style="max-width: 540px;">
                        <div class="row g-0 ">
                            <div class="col-md-4">
                                <img src="${agentsData.profileIMG}" class="img-fluid rounded-start">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${agentsData.name}</h5>
                                    <p class="card-text">${agentsData.post}</p>
                                    <p class="card-text">${agentsData.comp}</p>
                                    <p class="card-text"><small class="text-muted">No. of properties  ${agentsData.nofprop}</small></p>
                                    <p class="card-text"><small style="color: #F5B041;">Rating: ${averageRate} out of 5</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
                <button class="btn btn-outline-primary deleteBtn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg> Delete</button>
            `;
            resultsTableBody.appendChild(card);

            // Add event listener to the dynamically generated delete button
            const deleteBtn = card.querySelector('.deleteBtn');
            deleteBtn.addEventListener('click', () => {
                deleteAgent(useruid, key);
            });
        });
    });
    $('#spinner').removeClass('show');
}

