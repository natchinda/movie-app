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

        movieDiv.innerHTML = `
            <h3>${movie.title}</h3>

            <img
                src="https://image.tmdb.org/t/p/w200${movie.poster_path}"
                alt="${movie.title}"
            />

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
function saveFavorite(movie) {

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    // Evitar repetidos

    const alreadyExists = favorites.some(
        fav => fav.id === movie.id
    );

    if (alreadyExists) {

        showMessage(
            "Filme já está nos favoritos!"
        );

        return;
    }

    favorites.push(movie);

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    showMessage(
        `${movie.title} adicionado aos favoritos!`
    );
}


// MOSTRAR FAVORITOS
function mostrarFavoritos() {

    const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    sectionTitle.innerText =
        "Meus Filmes Favoritos";

    displayMovies(favorites);
}


// REMOVER FAVORITOS
function removeFavorite(movieId) {

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    favorites = favorites.filter(
        movie => movie.id !== movieId
    );

    localStorage.setItem(
        "favorites",
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


// INICIAR APP
getPopularMovies();
