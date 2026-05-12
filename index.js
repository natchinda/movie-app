const API_KEY = '8d34f5d8a544a4416e6596e58d71238e'
const container = document.getElementById("moviesContainer");

async function getPopularMovies();
  const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}');

const data = awai response.json();
  displayMovies(data.results);
}

function displayMovies(movies) {
  container.innerHTML = "";

  movies.forEach(movies => {
    const movieDiv = document.create.Element("div");
    moviediv.classList.add("movie");

    movieDiv.innerHTML ='
      <h3>${movie.tatle}</h3>
      <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" />
      <p>${movie.vote_average}</p>
  ;
   container.appendChild(movieDiv);
});
}
getPopularMovies();
