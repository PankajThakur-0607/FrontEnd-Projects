// // Retrieve movie data from localStorage
// const movieData = JSON.parse(localStorage.getItem("movieData"));

// // Check if movie data exists before displaying it
// if (movieData) {
//   document.querySelector(
//     ".movie-name"
//   ).textContent = `Movie name: ${movieData.title}`;
//   document.querySelector(
//     ".movie-rating"
//   ).textContent = `Rating: ${movieData.rating.toFixed(1)}`;
//   document.querySelector(
//     ".release-year"
//   ).textContent = `Year: ${movieData.releaseYear}`;
//   document.querySelector(".movie-overview p").textContent = movieData.overview;

//   const posterImg = document.querySelector(".img-section img");
//   if (movieData.posterPath) {
//     posterImg.src = `https://image.tmdb.org/t/p/w500${movieData.posterPath}`;
//   } else {
//     posterImg.alt = "No image available";
//   }
// } else {
//   alert("Movie data not found. Please go back and search again.");
// }

// GEt the dat from local Storage

document.addEventListener('DOMContentLoaded' , () => {
  
const movieData = JSON.parse(localStorage.getItem("movieDetails"));
console.log(movieData);

if (movieData) {
  document.querySelector(
    ".movie-name"
  ).textContent = `Movie Name : ${movieData.title}`;
  document.querySelector(
    ".movie-rating"
  ).textContent = `Rating : ${movieData.voteAverage.toFixed(1)}`;

  document.querySelector(".release-year").textContent = `Year : ${
    movieData.releaseDate.split("-")[0]
  }`;

  document.querySelector(
    ".movie-overview p"
  ).innerText = `${movieData.overview}`;
  const posterImg = document.querySelector(".img-section img");
  if (movieData.posterPath) {
    posterImg.src = `https://image.tmdb.org/t/p/w500${movieData.posterPath}`;
  } else {
    posterImg.alt = `No image Found`;
  }
} else {
  alert("No movie found , please go back and search Again");
}
})
