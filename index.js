const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDM0ZjVkOGE1NDRhNDQxNmU2NTk2ZTU4ZDcxMjM4ZSIsIm5iZiI6MTc3Nzk3MjI1MS40ODYsInN1YiI6IjY5ZjliNDFiOGIwOWY5MTc5ZmM5NWIxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aarhlhmz4GTF1nxm6PpmxMhg3Tr1pzBrNIKTE0TCVlo'
  }
};
response();

function response(){
fetch('https://api.themoviedb.org/3/movie/popular?api_key=8d34f5d8a544a4416e6596e58d71238e', options)
  .then(res => res.json())
  .then(res => {
    console.log(res);
    tratar_resp(res);
  })
  .catch(err => console.error(err));
}

function tratar_resp(res){
  let moviesContainer=document.querySelector('#moviesContainer');
  res.results.forEach(filme => {
    console.log(filme.title);
    let img=document.createElement('img');
    img.src=`https://image.tmdb.org/t/p/w500${filme.poster_path}`;
    moviesContainer.append(img);
    
  });
}
