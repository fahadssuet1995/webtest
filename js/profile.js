import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
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

const searchButton = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchKeyword');
const searchResults = document.getElementById('search-results');
const urlParams = new URLSearchParams(window.location.search);
const number = urlParams.get('index');
console.log(number);
const body = document.getElementById('profile');

const searchTerm = number


const agentsRef = ref(database, 'data/' + searchTerm);
get(agentsRef).then((snapshot) => {
    const agentsData = snapshot.val();
    console.log(agentsData);
    body.innerHTML = ``;
    body.innerHTML = `
    <div class="row g-0 align-items-center flex-column-reverse flex-md-row" style="margin-top: 8rem;">
                <div class="col-md-3 animated fadeIn">
                    <img class="img-thumbnail rounded-circle" style=" object-fit: cover;" src="${agentsData.profileIMG}" alt="">
                </div>
                <div class="col-md-5 p-2 mt-lg-2 mb-3">
                        <h1 class="display-5 animated fadeIn mb-4">${agentsData.name}</h1>
                        <h3 class=" animated fadeIn mb-4">${agentsData.post}</h3>
                    <div id="result" class="row row-cols-1 row-cols-md-2">
                        <p class="animated fadeIn mb-3">Company: ${agentsData.comp}</p>
                        <p class="animated fadeIn mb-3">Registration: ${agentsData.brnum}</p>
                        <p class="animated fadeIn mb-3">${agentsData.email}</p>
                        <p class="animated fadeIn mb-5">Languages: ${agentsData.lan}</p>
                        <a class="bi bi-telephone-outbound" href="tel:${agentsData.phone}"> Call Now</a></a>
                        <a class="bi bi-whatsapp animated fadeIn mb-3" href="https://wa.me/${agentsData.wapp}"> Whatsapp</a>
                    </div>
                    <a class="animated fadeIn mb-2">Areas: ${agentsData.a1}, ${agentsData.a2}, ${agentsData.a3}</a>
                    <p class="animated fadeIn mb-4"><small class="text-muted">No. of properties  ${agentsData.nofprop}</small></p>
                </div>
                
                
            </div>
            <div class="col-md-9 p-5 mt-lg-3">
                    <h3>About Us</h1>
                    <p>${agentsData.about}</p>
                </div>
    `;
})

/*onValue(agentsRef, (snapshot) => {
    const agentsData = snapshot.val();
    const resultsTableBody = document.getElementById('profile');
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
});*/



searchButton.addEventListener('click', () => {
    window.location.href = `results.html?input=${searchInput.value}`;
});