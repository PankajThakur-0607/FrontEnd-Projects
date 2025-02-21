// // Select elements from the first page (search page)
// const searchButton = document.querySelector("#search-btn");
// const searchInput = document.querySelector("#search-movie");

// // Base URL for the TMDb API
// const apiKey = "7fb7cc730cad948454e0ae9a2fdc3ded";
// const baseUrl = "https://api.themoviedb.org/3/search/movie";

// // Event listener for the search button
// searchButton.addEventListener("click", () => {
//   const query = searchInput.value.trim();
//   if (query) {
//     fetchMovieDetails(query);
//   } else {
//     alert("Please enter a movie name");
//   }
// });

// // Fetch movie details based on the search query
// function fetchMovieDetails(query) {
//   const url = `${baseUrl}?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.results && data.results.length > 0) {
//         const movie = data.results[0]; // Get the first movie result
//         saveMovieData(movie); // Save the movie data
//         window.location.href = "./moviePage.html"; // Redirect to details page
//       } else {
//         alert("No movies found. Try another title.");
//       }
//     })
//     .catch((error) => console.error("Error fetching data:", error));
// }

// // Save movie data to localStorage to retrieve on the second page
// function saveMovieData(movie) {
//   const movieData = {
//     title: movie.title,
//     rating: movie.vote_average,
//     releaseYear: movie.release_date.split("-")[0], // Get only the year
//     overview: movie.overview,
//     posterPath: movie.poster_path,
//   };
//   localStorage.setItem("movieData", JSON.stringify(movieData));
// }

const searchMovieInput = document.getElementById("search-movie");
const searchButtonInput = document.getElementById("search-btn");

const API_KEY = "7fb7cc730cad948454e0ae9a2fdc3ded";

searchButtonInput.addEventListener("click", async () => {
  let movieName = searchMovieInput.value.trim();
  if (movieName === "") return;

  try {
    const movieData = await fetchMovieData(movieName);

    if (movieData.results && movieData.results.length > 0) {
      saveMovieData(movieData);

      window.location.href = "./moviePage.html";
    } else {
      alert("Movie Not Found : Please write the Coreect Name");
    }
    searchMovieInput.value = "";
  } catch (error) {
    console.log({ message: error.message });
    // showError();
  }
});

async function fetchMovieData(movie) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movie}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Http Error ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log("error is : ", error);
  }
}

function saveMovieData(movieData) {
  const {
    title,
    poster_path: posterPath,
    vote_average: voteAverage,
    release_date: releaseDate,
    overview,
  } = movieData.results[0];

  const movieDetails = {
    title,
    posterPath,
    voteAverage,
    releaseDate,
    overview,
  };
  localStorage.setItem("movieDetails", JSON.stringify(movieDetails));
}
