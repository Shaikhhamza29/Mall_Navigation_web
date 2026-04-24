// 🔥 IMPORT STORES
import { stores } from "./stores.js";


// -----------------------------
// CREATE CARDS
// -----------------------------
function createCards(data) {

    const grid = document.getElementById("storeGrid");
    grid.innerHTML = "";

    data.forEach(store => {

        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = store.logo;
        img.onerror = () => img.src = "logos/default.png";

        const name = document.createElement("h3");
        name.innerText = store.name;

        const floor = document.createElement("p");
        floor.innerText = "Floor: " + store.floor;

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(floor);

        grid.appendChild(card);
    });
}


// -----------------------------
// SEARCH
// -----------------------------
function searchStore() {

    const query = document.getElementById("searchInput").value.toLowerCase();

    const filtered = stores.filter(s =>
        s.name.toLowerCase().includes(query)
    );

    createCards(filtered);
}


// -----------------------------
// LIVE SEARCH + SUGGESTIONS
// -----------------------------
const input = document.getElementById("searchInput");
const suggestionBox = document.getElementById("suggestions");

input.addEventListener("keyup", () => {

    const query = input.value.toLowerCase();

    if (!query) {
        suggestionBox.style.display = "none";
        createCards(stores);
        return;
    }

    const filtered = stores.filter(s =>
        s.name.toLowerCase().includes(query)
    );

    suggestionBox.innerHTML = "";

    filtered.slice(0, 8).forEach(s => {
        const li = document.createElement("li");
        li.innerText = s.name;

        li.onclick = () => {
            input.value = s.name;
            suggestionBox.style.display = "none";
            createCards([s]);
        };

        suggestionBox.appendChild(li);
    });

    suggestionBox.style.display = filtered.length ? "block" : "none";

    createCards(filtered);
});


// -----------------------------
// INITIAL LOAD
// -----------------------------
createCards(stores);


// -----------------------------
// NAVIGATION
// -----------------------------
function goToStores() {
    window.location.href = "index.html";
}