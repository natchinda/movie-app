const API_KEY = "8d34f5d8a544a4416e6596e58d71238e";

const container = document.getElementById("moviesContainer");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const sectionTitle = document.getElementById("sectionTitle");


// Filmes Populares

async function getPopularMovies() {

    const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );

    const data = await response.json();

    displayMovies(data.results);
}



// Pesquisar Filmes

async function searchMovies(movieName) {

    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieName}`
    );

    const data = await response.json();

    sectionTitle.innerText = `Resultados para: ${movieName}`;

    displayMovies(data.results);
}
//Pesquisar por Género
async function buscarPorgenero(generoId){
    

//Mostrar Filmes
function displayMovies(movies){
    

//Botão Favoritos
const favoriteBtn = movieDiv.querySelector(".favorite-btn");
    
//Quardar Favoritos
function savefavorite(movies){

    
//Mostrar Favoritos
function mostrarFavotite(){
    
    
//Voltar à Home
function mostrarHome(){

    
// Evento Pesquisar
searchBtn.addEventList("click", () => {
    

// Iníciar app
getPopularMovies();
