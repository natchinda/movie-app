const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDM0ZjVkOGE1NDRhNDQxNmU2NTk2ZTU4ZDcxMjM4ZSIsIm5iZiI6MTc3Nzk3MjI1MS40ODYsInN1YiI6IjY5ZjliNDFiOGIwOWY5MTc5ZmM5NWIxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aarhlhmz4GTF1nxm6PpmxMhg3Tr1pzBrNIKTE0TCVlo'
  }
};

fetch('https://api.themoviedb.org/3/movie/popular?api_key=8d34f5d8a544a4416e6596e58d71238e', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
