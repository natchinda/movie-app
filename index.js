import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

    import {
        getDatabase,
        ref,
        push
    } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIza...",
    authDomain: "mymovielist-b7d5a.firebaseapp.com",
    databaseURL: "https://mymovielist-b7d5a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mymovielist-b7d5a",
    storageBucket: "mymovielist-b7d5a.firebasestorage.app",
    messagingSenderId: "806137484009",
    appId: "1:806137484009:web:c4673c6a6875b9a6fe9678"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const API_KEY = "8d34f5d8a544a4416e6596e58d71238e";

const container = document.getElementById("moviesContainer");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const sectionTitle = document.getElementById("sectionTitle");


// FILMES POPULARES
async function getPopularMovies() {

    const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );

    const data = await response.json();

    displayMovies(data.results);
}

// PESQUISAR FILMES
async function searchMovies(movieName) {

    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieName}`
    );

    const data = await response.json();

    sectionTitle.innerText =
        `Resultados para: ${movieName}`;

    displayMovies(data.results);
}


// PESQUISAR POR GÉNERO
async function buscarPorGenero(generoId) {

    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${generoId}`
    );

    const data = await response.json();

    sectionTitle.innerText =
        "Filmes por Género";

    displayMovies(data.results);
}


// MOSTRAR FILMES
function displayMovies(movies) {

    container.innerHTML = "";

    movies.forEach(movie => {

        const movieDiv =
            document.createElement("div");

        movieDiv.classList.add("movie");

    const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
        : "https://via.placeholder.com/200x300?text=Sem+Imagem";

        movieDiv.innerHTML = `
            <h3>${movie.title}</h3>
        
            <img src="${poster}" alt="${movie.title}" />

            <p>⭐ ${movie.vote_average}</p>

            <button class="favorite-btn">
                ❤️ Favorito
            </button>

            <button class="remove-btn">
                🗑 Remover
            </button>
        `;


        // BOTÃO FAVORITO

        const favoriteBtn =
            movieDiv.querySelector(".favorite-btn");

        favoriteBtn.addEventListener("click", () => {

            saveFavorite(movie);

        });


        // BOTÃO REMOVER

        const removeBtn =
            movieDiv.querySelector(".remove-btn");

        removeBtn.addEventListener("click", () => {

            removeFavorite(movie.id);

        });


        container.appendChild(movieDiv);

    });

}


// GUARDAR FAVORITOS
async function saveFavorite(movie) {

      const username =
        document.getElementById("usernameInput").value;

    if (!username.trim()) {

        showMessage("Escreve um username!");

        return;
    }

    let favorites =
        JSON.parse(
            localStorage.getItem(`favorites_${username}`)
        ) || [];

    const alreadyExists = favorites.some(
        fav => fav.id === movie.id
    );

    if (alreadyExists) {

        showMessage("Filme já existe!");

        return;
    }

    favorites.push(movie);

    localStorage.setItem(
        `favorites_${username}`,
        JSON.stringify(favorites)
    );

    await push(
        ref(db, `favorites/${username}`),
        movie
    );

    showMessage(
        `${movie.title} guardado!`
    );
}



// MOSTRAR FAVORITOS
function mostrarFavoritos() {

    const username =
        document.getElementById("usernameInput").value;

    if (!username.trim()) {

        showMessage("Escreve um username!");

        return;
    }

    const favorites =
        JSON.parse(
            localStorage.getItem(`favorites_${username}`)
        ) || [];

    sectionTitle.innerText =
        `${username} - Favoritos`;

    displayMovies(favorites);
}


// REMOVER FAVORITOS
function removeFavorite(movieId) {

     const username =
        document.getElementById("usernameInput").value;

    let favorites =
        JSON.parse(
            localStorage.getItem(`favorites_${username}`)
        ) || [];

    favorites = favorites.filter(
        movie => movie.id !== movieId
    );

    localStorage.setItem(
        `favorites_${username}`,
        JSON.stringify(favorites)
    );

    mostrarFavoritos();

    showMessage(
        "Filme removido dos favoritos!"
    );
}


// VOLTAR À HOME
function mostrarHome() {

    sectionTitle.innerText =
        "Filmes Populares";

    getPopularMovies();
}


// MENSAGEM BONITA
function showMessage(message) {

    const msg = document.createElement("div");

    msg.innerText = message;

    msg.style.position = "fixed";
    msg.style.top = "20px";
    msg.style.right = "20px";
    msg.style.background = "#00b894";
    msg.style.color = "white";
    msg.style.padding = "15px";
    msg.style.borderRadius = "10px";
    msg.style.zIndex = "1000";

    document.body.appendChild(msg);

    setTimeout(() => {

        msg.remove();

    }, 3000);
}



// EVENTO PESQUISA
searchBtn.addEventListener("click", () => {

    const movieName =
        searchInput.value;

    if (movieName !== "") {

        searchMovies(movieName);

    }

});
window.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("favoritesBtn")
        .addEventListener("click", mostrarFavoritos);

    getPopularMovies();
});

window.mostrarFavoritos = mostrarFavoritos;
window.mostrarHome = mostrarHome;
window.buscarPorGenero = buscarPorGenero;

// INICIAR APP

getPopularMovies();
