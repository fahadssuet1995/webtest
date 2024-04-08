import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, get, update, set, ref as dbref } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
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

const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
//const Fone = document.getElementById('if1');
const storage = getStorage(app);
const AdsRef = ref(storage, 'Ads/');
const FeatRef = dbref(database, 'property/F');
const SaleRef = dbref(database, 'property/S');
const RentRef = dbref(database, 'property/R');
const AgentRef = dbref(database, 'agent/');
//get URL of all images stored on AdsRef
async function getAllImageURLs() {
      try {
            const result = await listAll(AdsRef);
            const imageURLs = await Promise.all(result.items.map(async (itemRef) => {
                  const url = await getDownloadURL(itemRef);
                  return url;
            }));
            return imageURLs;
      } catch (error) {
            console.error("Error getting image URLs:", error);
            return [];
      }
}

// Example usage
getAllImageURLs()
      .then(imageURLs => {
            //console.log("Image URLs:", imageURLs);
            one.src = imageURLs[0];
            two.src = imageURLs[1];
            three.src = imageURLs[2];
            four.src = imageURLs[3];
            // Do something with the image URLs
      })
      .catch(error => {
            console.error("Error:", error);
      });

async function getFeatImageURLs() {
      try {
            const snapshot = await get(FeatRef); // Assuming get() function returns a Promise
            const propData = snapshot.val();
            const featImages = propData.map(property => property.image);
            return featImages;
      } catch (error) {
            console.error(error);
            return []; // Return an empty array in case of error
      }
}

async function getSaleImageURLs() {
      try {
            const snapshot = await get(SaleRef); // Assuming get() function returns a Promise
            const propData = snapshot.val();
            const saleImages = propData.map(property => property.image);
            return saleImages;
      } catch (error) {
            console.error(error);
            return []; // Return an empty array in case of error
      }
}

async function getRentImageURLs() {
      try {
            const snapshot = await get(RentRef); // Assuming get() function returns a Promise
            const propData = snapshot.val();
            const rentImages = propData.map(property => property.image);
            return rentImages;
      } catch (error) {
            console.error(error);
            return []; // Return an empty array in case of error
      }
}
async function getAgentImageURLs() {
      try {
            const snapshot = await get(AgentRef); // Assuming get() function returns a Promise
            const propData = snapshot.val();
            const agentImages = propData.map(property => property.image);
            return agentImages;
      } catch (error) {
            console.error(error);
            return []; // Return an empty array in case of error
      }
}

async function loadFeatImages() {
      try {
            const featImages = await getFeatImageURLs();
            console.log("Image URLs:", featImages);

            if (featImages.length > 0) {
                  const Fione = document.getElementById('if1');
                  const Fitwo = document.getElementById('if2');
                  const Fithree = document.getElementById('if3');
                  const Fifour = document.getElementById('if4');
                  const Fifive = document.getElementById('if5');
                  const Fisix = document.getElementById('if6');
                  Fione.src = featImages[1] || './img/property-1.jpg';
                  Fitwo.src = featImages[2] || './img/property-1.jpg';
                  Fithree.src = featImages[3] || './img/property-1.jpg';
                  Fifour.src = featImages[4] || './img/property-1.jpg';
                  Fifive.src = featImages[5] || './img/property-1.jpg';
                  Fisix.src = featImages[6] || './img/property-1.jpg';
            } else {
                  console.log("No images found.");
            }
      } catch (error) {
            console.error("Error loading images:", error);
      }
}

async function loadSaleImages() {
      try {
            const saleImages = await getSaleImageURLs();
            console.log("Image URLs:", saleImages);

            if (saleImages.length > 0) {
                  const Sione = document.getElementById('is1');
                  const Sitwo = document.getElementById('is2');
                  const Sithree = document.getElementById('is3');
                  const Sifour = document.getElementById('is4');
                  const Sifive = document.getElementById('is5');
                  const Sisix = document.getElementById('is6');
                  Sione.src = saleImages[1] || './img/property-1.jpg';
                  Sitwo.src = saleImages[2] || './img/property-1.jpg';
                  Sithree.src = saleImages[3] || './img/property-1.jpg';
                  Sifour.src = saleImages[4] || './img/property-1.jpg';
                  Sifive.src = saleImages[5] || './img/property-1.jpg';
                  Sisix.src = saleImages[6] || './img/property-1.jpg';
            } else {
                  console.log("No images found.");
            }
      } catch (error) {
            console.error("Error loading images:", error);
      }
}

async function loadRentImages() {
      try {
            const rentImages = await getRentImageURLs();
            console.log("Image URLs:", rentImages);

            if (rentImages.length > 0) {
                  const Rione = document.getElementById('ir1');
                  const Ritwo = document.getElementById('ir2');
                  const Rithree = document.getElementById('ir3');
                  const Rifour = document.getElementById('ir4');
                  const Rifive = document.getElementById('ir5');
                  const Risix = document.getElementById('ir6');
                  Rione.src = rentImages[1] || './img/property-1.jpg';
                  Ritwo.src = rentImages[2] || './img/property-1.jpg';
                  Rithree.src = rentImages[3] || './img/property-1.jpg';
                  Rifour.src = rentImages[4] || './img/property-1.jpg';
                  Rifive.src = rentImages[5] || './img/property-1.jpg';
                  Risix.src = rentImages[6] || './img/property-1.jpg';
            } else {
                  console.log("No images found.");
            }
      } catch (error) {
            console.error("Error loading images:", error);
      }
}

async function loadAgentImages() {
      try {
            const agentImages = await getAgentImageURLs();
            console.log("Image URLs:", agentImages);

            if (agentImages.length > 0) {
                  const Aione = document.getElementById('Aimg1');
                  const Aitwo = document.getElementById('Aimg2');
                  const Aithree = document.getElementById('Aimg3');
                  const Aifour = document.getElementById('Aimg4');
                  Aione.src = agentImages[1] || './img/property-1.jpg';
                  Aitwo.src = agentImages[2] || './img/property-1.jpg';
                  Aithree.src = agentImages[3] || './img/property-1.jpg';
                  Aifour.src = agentImages[4] || './img/property-1.jpg';

            } else {
                  console.log("No images found.");
            }
      } catch (error) {
            console.error("Error loading images:", error);
      }
}

loadFeatImages();
loadSaleImages();
loadRentImages();
loadAgentImages();

function featured() {
      const elements = [];

      // Populate elements array with references to the target elements
      for (let i = 1; i <= 6; i++) {
            elements.push({
                  for: document.getElementById(`ffor${i}`),
                  type: document.getElementById(`ftype${i}`),
                  price: document.getElementById(`fprice${i}`),
                  title: document.getElementById(`ftitle${i}`),
                  area: document.getElementById(`farea${i}`),
                  location: document.getElementById(`flocation${i}`)
            });
      }

      get(FeatRef).then((snapshot) => {
            const data = snapshot.val();
            for (let i = 1; i <= 6; i++) {
                  elements[i - 1].for.textContent = data[i].for;
                  elements[i - 1].type.textContent = data[i].type;
                  elements[i - 1].price.innerHTML = `<span class="text-primary">$</span>${data[i].amount.slice(1)}`;
                  elements[i - 1].title.textContent = data[i].title;
                  elements[i - 1].title.href = `about.html?index=${data[i].agent}`
                  elements[i - 1].area.innerHTML = `<i class="fa fa-ruler-combined text-primary me-2"></i>${data[i].area} Sqft`;
                  elements[i - 1].location.innerHTML = `<i class="fa fa-map-marker-alt text-primary me-2"></i>${data[i].location}`;
            }
      })
}

function Sale() {
      const elements = [];

      // Populate elements array with references to the target elements
      for (let i = 1; i <= 6; i++) {
            elements.push({
                  for: document.getElementById(`sfor${i}`),
                  type: document.getElementById(`stype${i}`),
                  price: document.getElementById(`sprice${i}`),
                  title: document.getElementById(`stitle${i}`),
                  area: document.getElementById(`sarea${i}`),
                  location: document.getElementById(`slocation${i}`)
            });
      }

      get(SaleRef).then((snapshot) => {
            const data = snapshot.val();
            for (let i = 1; i <= 6; i++) {
                  //elements[i - 1].for.textContent = data[i].for;
                  elements[i - 1].type.textContent = data[i].type;
                  elements[i - 1].price.innerHTML = `<span class="text-primary">$</span>${data[i].amount.slice(1)}`;
                  elements[i - 1].title.textContent = data[i].title;
                  elements[i - 1].title.href = `about.html?index=${data[i].agent}`
                  elements[i - 1].area.innerHTML = `<i class="fa fa-ruler-combined text-primary me-2"></i>${data[i].area} Sqft`;
                  elements[i - 1].location.innerHTML = `<i class="fa fa-map-marker-alt text-primary me-2"></i>${data[i].location}`;
            }
      })
}

function Rent() {
      const elements = [];

      // Populate elements array with references to the target elements
      for (let i = 1; i <= 6; i++) {
            elements.push({
                  for: document.getElementById(`rfor${i}`),
                  type: document.getElementById(`rtype${i}`),
                  price: document.getElementById(`rprice${i}`),
                  title: document.getElementById(`rtitle${i}`),
                  area: document.getElementById(`rarea${i}`),
                  location: document.getElementById(`rlocation${i}`)
            });
      }

      get(RentRef).then((snapshot) => {
            const data = snapshot.val();
            for (let i = 1; i <= 6; i++) {
                  //elements[i - 1].for.textContent = data[i].for;
                  elements[i - 1].type.textContent = data[i].type;
                  elements[i - 1].price.innerHTML = `<span class="text-primary">$</span>${data[i].amount.slice(1)}`;
                  elements[i - 1].title.textContent = data[i].title;
                  elements[i - 1].title.href = `about.html?index=${data[i].agent}`
                  elements[i - 1].area.innerHTML = `<i class="fa fa-ruler-combined text-primary me-2"></i>${data[i].area} Sqft`;
                  elements[i - 1].location.innerHTML = `<i class="fa fa-map-marker-alt text-primary me-2"></i>${data[i].location}`;
            }
      })
}

function Agent() {
      const elements = [];

      // Populate elements array with references to the target elements
      for (let i = 1; i <= 4; i++) {
            elements.push({
                  name: document.getElementById(`Aname${i}`),
                  desig: document.getElementById(`Adesig${i}`),
                  whats: document.getElementById(`Awhatsapp${i}`),
                  profile: document.getElementById(`profile${i}`)
            });
      }

      get(AgentRef).then((snapshot) => {
            const data = snapshot.val();
            for (let i = 1; i <= 4; i++) {
                  elements[i - 1].name.textContent = data[i].name;
                  elements[i - 1].desig.innerHTML = data[i].desig;
                  elements[i - 1].whats.href = `https://wa.me/91${data[i].whats}`
                  elements[i - 1].profile.href = `about.html?index=${data[i].agent}`
            }
      })
}
featured();
Sale();
Rent();
Agent();