import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
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

const searchButton = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchKeyword');
const searchResults = document.getElementById('search-results');
const urlParams = new URLSearchParams(window.location.search);
const results = urlParams.get('input');
console.log(results);


const searchTerm = results

if (searchTerm !== '') {
    const agentsRef = ref(database, 'data');

    onValue(agentsRef, (snapshot) => {
        const agentsData = snapshot.val();
        const resultsTableBody = document.getElementById('result');
        resultsTableBody.innerHTML = '';
        resultsTableBody.innerHTML = '<h1 class="display-5 animated fadeIn mb-4"></h1> <h1 class="display-5 animated fadeIn mb-4"></h1>';

        agentsData.forEach((agent, index) => {
            if (agent.name.toLowerCase().includes(searchTerm.toLowerCase())) {


                const card = document.createElement('div');
                //brnum.textContent = agent.brnum;
                //imageCell.innerHTML = `<img src="${agent.image}">`;
                card.innerHTML = `
                        <a class="col" href="about.html?index=${index}" >
                            <div class="card mb-3 shadow p-3 mb-5 bg-body rounded" style="max-width: 540px;">
                                <div class="row g-0 ">
                                    <div class="col-md-4">
                                        <img src="${agent.profileIMG}" class="img-fluid rounded-start">
                                    </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">${agent.name}</h5>
                                                <p class="card-text">${agent.post}</p>
                                                <p class="card-text">${agent.comp}</p>
                                                <p class="card-text"><small class="text-muted">No. of properties  ${agent.nofprop}</small></p>
                                                <span id="rateMe2" class="stars">
                                                    <i class="bi bi-star" data-index="1"></i>
                                                    <i class="bi bi-star" data-index="2"></i>
                                                    <i class="bi bi-star" data-index="3"></i>
                                                    <i class="bi bi-star" data-index="4"></i>
                                                    <i class="bi bi-star" data-index="5"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </a>
              `;
                resultsTableBody.appendChild(card);
                //emailCell.textContent = agent.email;

                //console.log(agent.name);
                //window.location.href = `results.html?results=${JSON.stringify(agent)}`
            }
        })
        $('#spinner').removeClass('show');
    });
}


searchButton.addEventListener('click', () => {
    window.location.href = `results.html?input=${searchInput.value}`;
});