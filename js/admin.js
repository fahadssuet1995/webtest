import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {   get, update, set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getDatabase, ref as dbref, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
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
const database = getDatabase(app);
const storage = getStorage(app);
const imageInput = document.getElementById("image");
const propImage = document.getElementById("imageP");
const agentImage = document.getElementById("imageA");
const uploadButton = document.getElementById("upload-button");
const save = document.getElementById("save");
const saveA = document.getElementById("saveA");
const select = document.getElementById("select");
const index = document.getElementById("index");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const title = document.getElementById("title");
const area = document.getElementById("area");
const position = document.getElementById("position");
const positionA = document.getElementById("positionA");
const Fors = document.getElementById("forP");
const location = document.getElementById("location");
const name = document.getElementById("nameA");
const desig = document.getElementById("desigA");
const whatA = document.getElementById("whatA");
const indexA = document.getElementById("indexA");
//get URL of all images stored on AdsRef

uploadButton.addEventListener("click", async () => {
      const selectedImage = imageInput.files[0];

      if (selectedImage) {
            const imageRef = ref(storage, "Ads/" + selectedImage.name);

            try {
                  const snapshot = await uploadBytes(imageRef, selectedImage);
                  console.log("Image uploaded:", snapshot.metadata.fullPath);
                  alert("Image uploaded successfully!");
                  fetchImageURLs();
                  // Display the selected image preview
                  const reader = new FileReader();
                  reader.onload = function (event) {
                        const imagePreview = document.getElementById("image-preview");
                        const imgElement = document.createElement("img");
                        imgElement.src = event.target.result;
                        imagePreview.innerHTML = ""; // Clear previous previews
                        imagePreview.appendChild(imgElement);
                  };
                  reader.readAsDataURL(selectedImage);
            } catch (error) {
                  console.error("Error uploading image:", error);
                  alert("An error occurred while uploading the image.");
            }
      } else {
            alert("Please select an image to upload.");
      }
});

save.addEventListener("click", async () => {
      const selectedImage = propImage.files[0];
      if (selectedImage) {
            const imageRef = ref(storage, "property/" + selectedImage.name);
            const propRef = dbref(database, 'property/' + select.value + '/' + position.value);

            try {
                  const snapshot = await uploadBytes(imageRef, selectedImage);
                  const path = await getDownloadURL(snapshot.ref)
                  console.log("Image uploaded:", path);
                  set(propRef, {
                        agent: index.value,
                        amount: amount.value,
                        type: type.value,
                        title: title.value,
                        area: area.value,
                        image:path,
                        for: Fors.value,
                        location:location.value
                        
                  }).then (() => {
                        alert("Data saved successfully!");
                  }). catch((error) => {
                        alert(error)
                  })
            } catch (error) {
                  console.error("Error uploading image:", error);
                  alert("An error occurred while uploading the image.");
            }
      } else {
            alert("Please select an image to upload.");
      }

})

saveA.addEventListener("click", async () => {
      const selectedImage = agentImage.files[0];
      if (selectedImage) {
            const imageRef = ref(storage, "agent/" + selectedImage.name);
            const AgentRef = dbref(database, 'agent/' + positionA.value);

            try {
                  const snapshot = await uploadBytes(imageRef, selectedImage);
                  const path = await getDownloadURL(snapshot.ref)
                  console.log("Image uploaded:", path);
                  set(AgentRef, {
                        agent: indexA.value,
                        name: name.value,
                        desig: desig.value,
                        whats: whatA.value,
                        image:path,
                        
                  }).then (() => {
                        alert("Data saved successfully!");
                  }). catch((error) => {
                        alert(error)
                  })
            } catch (error) {
                  console.error("Error uploading image:", error);
                  alert("An error occurred while uploading the image.");
            }
      } else {
            alert("Please select an image to upload.");
      }
})

async function fetchImageURLs() {
      const imagesRef = ref(storage, "Ads/");

      const imageList = document.getElementById("image-list");
      imageList.innerHTML = ""; // Clear previous images

      try {
            const listResult = await listAll(imagesRef);
            listResult.items.forEach(async itemRef => {
                  const imgURL = await getDownloadURL(itemRef);

                  // Create and append an <img> element for each image
                  const imgElement = document.createElement("img");
                  imgElement.style.padding = "10px";
                  imgElement.src = imgURL;
                  imgElement.style.width = "300px"; // Set image width for better display

                  // Create a "Delete" button for each image
                  const deleteButton = document.createElement("button");
                  deleteButton.style.backgroundColor = "#1B9C85";
                  deleteButton.style.borderRadius = "1rem";
                  deleteButton.innerText = "Delete";
                  deleteButton.addEventListener("click", async () => {
                        try {
                              await deleteObject(itemRef); // Delete the image from Firebase Storage
                              fetchImageURLs(); // Refresh the image list
                        } catch (error) {
                              console.error("Error deleting image:", error);
                        }
                  });

                  // Create a container to hold the image and the delete button
                  const container = document.createElement("div");
                  container.appendChild(imgElement);
                  container.appendChild(deleteButton);

                  imageList.appendChild(container);
            });
      } catch (error) {
            console.error("Error fetching image URLs:", error);
      }
}

// Call the fetchImageURLs function to display images when the page loads
fetchImageURLs();