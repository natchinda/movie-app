const API_KEY = "8d34f5d8a544a4416e6596e58d71238e";
const container = document.getElementById("moviesContainer");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const sectionTitle = document.getElementById("sectionTitle");


// Filmes Populares

async function getPopularMovies() {

    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    displayMovies(data.results);
}

// Pesquisar Filmes

async function searchMovies(movieName) {
const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieName}`);
const data = await response.json();
sectionTitle.innerText = `Resultados para: ${movieName}`;
displayMovies(data.results);
}

//Pesquisar por Género
async function buscarPorGenero(generoId){
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${generoId}`);
  const data = await response.json();
    sectionTitle.innerText = "Filmes por Género";
    displayMovies(data.results);
}    

//Mostrar Filmes
function displayMovies(movies){
    container.innerHTML = "";
    movies.forEach(movie => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
        movieDiv.innerHTML = `
        <h3>${movie.title}</h3>
        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}"alt="${movie.title}"/>
       <p>${movie.vote_average}</p>
       <button class="favorite-btn">Favorito</button>`;
        

//Botão Favoritos
const favoriteBtn = movieDiv.querySelector(".favorite-btn");
favoriteBtn.addEventListener("click", () => {
    saveFavorite(movie);
   });
        container.appendChild(movieDiv);
 });
}                              

//Quardar Favoritos
function saveFavorite(movie){
let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push(movie);

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );
    alert(`${movie.title} foi adicionado aos favoritos!`);
}
    
//Mostrar Favoritos
    function mostrarFavoritos() {
    const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
    sectionTitle.innerText = "Meus Filmes Favoritos";

displayMovies(favorites);
}
    
//Voltar à Home
function mostrarHome(){
    sectionTitle.innerText = "Filmes Populares";
    getPopularMovies();
}   
    
// Evento Pesquisar
searchBtn.addEventListener("click", () => {
    const movieName = searchInput.value;

    if (movieName !== "") {
        searchMovies(movieName);
    }

});

// Iníciar app
getPopularMovies();
