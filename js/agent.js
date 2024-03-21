import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, onValue, get, update } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getStorage, ref as stRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
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
const storage = getStorage(app);


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
                    <img id="prof" class="img-thumbnail rounded-circle" style=" object-fit: cover;" src="${agentsData.profileIMG}" alt="">
                    <input class="form-control" type="file" id="formFile">
                </div>
                <div class="col-md-5 p-3 mt-lg-3">
                    <input id="name" style="border-width: 0px;" class="display-5 animated fadeIn mb-4" value="${agentsData.name}"></input>
                    <input id="post" style="border-width: 0px;" class=" animated fadeIn mb-4" value="${agentsData.post}"></input>
                    <div id="result" class="row row-cols-1 row-cols-md-2">
                        <label class="animated fadeIn mb-3">Company: </label>
                        <input id="comp" style="border-width: 0px;" class="animated fadeIn mb-3" value="${agentsData.comp}"></input>
                        <label class="animated fadeIn mb-3">BRN: </label>
                        <input id="brnum" style="border-width: 0px;" class="animated fadeIn mb-3" value="${agentsData.brnum}"></input>
                        <label class="animated fadeIn mb-3">Email: </label>
                        <input id="email" style="border-width: 0px;" class="animated fadeIn mb-3" value="${agentsData.email}"></input>
                        <label class="animated fadeIn mb-3">Phone: </label>
                        <input id="phone" style="border-width: 0px;" class="animated fadeIn mb-3" value="${agentsData.phone}"></input>
                        <label class="animated fadeIn mb-3">Whatsapp: </label>
                        <input id="wapp" style="border-width: 0px;" class="animated fadeIn mb-3" value="${agentsData.wapp}"></input>
                        <label class="animated fadeIn mb-3">Languages: </label>
                        <input id="lan" style="border-width: 0px;" class="animated fadeIn mb-5" value="${agentsData.lan}"></input>
                    </div>
                    <div class="row row-cols-1">
                    <label style="border-width: 0px;" class="animated fadeIn mb-3">Areas</label>
                    <input id="a1" style="border-width: 0px;" class="animated fadeIn mb-3" value="${agentsData.a1}"></input>
                    <input id="a2" style="border-width: 0px;" class="animated fadeIn mb-3" value="${agentsData.a2}"></input>
                    <input id="a3" style="border-width: 0px;" class="animated fadeIn mb-3" value="${agentsData.a3}"></input>
                    <input id="a4" style="border-width: 0px;" class="animated fadeIn mb-3" value="${agentsData.a4}"></input>
                    <input id="a5" style="border-width: 0px;" class="animated fadeIn mb-3" value="${agentsData.a5}"></input>
                    <input id="a6" style="border-width: 0px;" class="animated fadeIn mb-3" value="${agentsData.a6}"></input>
                    <input id="a7" style="border-width: 0px;" class="animated fadeIn mb-3" value="${agentsData.a7}"></input>
                    <input id="a8" style="border-width: 0px;" class="animated fadeIn mb-3" value="${agentsData.a8}"></input>
                    <input id="a9" style="border-width: 0px;" class="animated fadeIn mb-3" value="${agentsData.a9}"></input>
                    <input id="a10" style="border-width: 0px;" class="animated fadeIn mb-3" value="${agentsData.a10}"></input>
                    <p class="animated fadeIn mb-4"><small class="text-muted">No. of properties  ${agentsData.nofprop}</small></p>
                    </div>
                </div>
                
                
            </div>
            <div class="col-md-9 p-5 mt-lg-3">
        <h3>About</h1>
        <textarea id="about" style="width: 100%; height: 150px; border-width: 0px">${agentsData.about}</textarea>
    </div>
    `;
}).then(() => {
    document.getElementById('formFile').addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const imageUrl = event.target.result;
            document.getElementById('prof').src = imageUrl;
        };
        reader.readAsDataURL(file);
    });
    document.getElementById('searchBtn').addEventListener('click', function() {
        const saveRef = ref(database, 'data/' + searchTerm);
        update(saveRef, {
            name: document.getElementById('name').value,
            post: document.getElementById('post').value,
            comp: document.getElementById('comp').value,
            brnum: document.getElementById('brnum').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            wapp: document.getElementById('wapp').value,
            lan: document.getElementById('lan').value,
            a1: document.getElementById('a1').value,
            a2: document.getElementById('a2').value,
            a3: document.getElementById('a3').value,
            a4: document.getElementById('a4').value,
            a5: document.getElementById('a5').value,
            a6: document.getElementById('a6').value,
            a7: document.getElementById('a7').value,
            a8: document.getElementById('a8').value,
            a9: document.getElementById('a9').value,
            a10: document.getElementById('a10').value,
            about: document.getElementById('about').value
        }).then(() => {
            alert('Profile updated successfully!');
        })
    })
})

const logout = document.getElementById('logout');
logout.addEventListener('click', () => {
    sessionStorage.removeItem('authToken')
    window.location.href = 'index.html';
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



