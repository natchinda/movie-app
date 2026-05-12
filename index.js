const API_KEY = '8d34f5d8a544a4416e6596e58d71238e'
const container = document.getElementById("moviesContainer");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

async function getPopularMovies();
  const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}');

const data = await response.json();
  displayMovies(data.results);
}

function displayMovies(movies) {
  container.innerHTML = "";

  movies.forEach(movie => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    movieDiv.innerHTML =`
      <h3>${movie.tttle}</h3>
      <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" />
      <p>${movie.vote_average}</p>
`;
   container.appendChild(movieDiv);
});
}
searchBtn.addEventListener("click", () => {
    const movieName = searchInput.value;

    if (movieName !== "") {
        searchMovies(movieName);
    }
});
getPopularMovies();
