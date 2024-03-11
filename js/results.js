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
        const resultsTableBody = document.getElementById('resultsTableBody');
        resultsTableBody.innerHTML = '';

        agentsData.forEach((agent) => {
            if (agent.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                const newRow = resultsTableBody.insertRow();




                const nameCell = newRow.insertCell(0);
                const expyr = newRow.insertCell(1);
                const brnum = newRow.insertCell(2);
                const phoneCell = newRow.insertCell(3);
                const emailCell = newRow.insertCell(4);
                const imageCell = newRow.insertCell(5);
                const profCell = newRow.insertCell(6);


                nameCell.textContent = agent.name;
                phoneCell.textContent = agent.phone;
                expyr.textContent = agent.expyr;
                brnum.textContent = agent.brnum;
                //imageCell.innerHTML = `<img src="${agent.image}">`;
                imageCell.innerHTML = `<img src="${agent.profileIMG}" style="width: 100px; height: 80px;">`;
                emailCell.textContent = agent.email;

                const sourceLink = document.createElement('a');
                sourceLink.href = agent.source;
                sourceLink.textContent = 'View Profile';
                sourceLink.target = '_blank';
                profCell.appendChild(sourceLink);

                //console.log(agent.name);
                //window.location.href = `results.html?results=${JSON.stringify(agent)}`
            }
        })
    });
}


/*searchButton.addEventListener('click', () => {
    const searchTerm = results

    if (searchTerm !== '') {
        const agentsRef = ref(database, 'data');

        onValue(agentsRef, (snapshot) => {
            const agentsData = snapshot.val();

            agentsData.forEach((agent) => {
                if (agent.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    matchingAgents.push(agent);
                    console.log(agent);
                    //window.location.href = `results.html?results=${JSON.stringify(agent)}`
                }
            })
        });
    }
});*/