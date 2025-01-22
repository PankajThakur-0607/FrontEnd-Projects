document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");
  const errorDisplay = document.getElementById("error");
  const tempDisplay = document.getElementById("temp");
  const searchIcon = document.getElementById("searchIcon");
  const cityDisplay = document.getElementById("city");
  const humidityDisplay = document.getElementById("humidity");
  const windDisplay = document.getElementById("wind");
  const weatherContainer = document.getElementById("weather");
  const weatherIcon = document.getElementById("weather-icon");



  const API_KEY = "61e72262d4a080b53e6521949117ed3d";

  searchIcon.addEventListener("click", async () => {
    let city = searchBar.value.trim();
    if (city === "") return;
    searchBar.value = "";

    try {
      weatherContainer.classList.remove("hidden");
      errorDisplay.classList.add("hidden");

      const cityData = await fetchData(city);
      console.log(cityData);

      const {
        name,
        main: { humidity, temp },
        wind: { speed },
        weather,
      } = cityData;

      displayData(name, humidity, temp, speed, weather[0].main);
    } catch (error) {
      console.log("error is : ", {message : error.message , name : error.name});
      showError();
    }
  });

  function displayData(name, humidity, temp, speed, weatherCondition) {
    tempDisplay.textContent = `${temp}°C`;
    cityDisplay.textContent = `${name}`;
    windDisplay.textContent = `${speed}m/s`;
    humidityDisplay.textContent = `${humidity}%`;

    if (weatherCondition === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (weatherCondition === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (weatherCondition === "Humidity") {
      weatherIcon.src = "images/humidity.png";
    } else if (weatherCondition === "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (weatherCondition === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (weatherCondition === "Snow") {
      weatherIcon.src = "images/snow.png";
    } else if (weatherCondition === "Wind") {
      weatherIcon.src = "images/wind.png";
    } else if (weatherCondition === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else {
      weatherIcon.src = "./images/rain.png"; // Default icon if no match
    }
  }

  async function fetchData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data = await response.json();

    return data;
  }

  function showError() {
    errorDisplay.classList.remove("hidden");
    weatherContainer.classList.add("hidden");
  }
});

// const apiKey = '61e72262d4a080b53e6521949117ed3d'; // Replace with your API key

// const searchBox = document.querySelector('.searchBox input');
// const searchBtn = document.querySelector('.searchBox button');
// const weatherIcon = document.querySelector('.weather-icon');

// async function checkWeather(city){

//     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//     const response = await fetch(apiUrl);

//         if(response.status == 404){
//             document.querySelector('.error').style.display = 'block';
//             document.querySelector('.weather').style.display = 'none';
//         }else{
//             const data  = await response.json();
//             console.log(data);

//             document.querySelector('.city').innerHTML = data.name;
//             document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
//             document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
//             document.querySelector('.wind').innerHTML = data.wind.speed + "km/h";

//             if(data.weather[0].main == 'Clouds'){
//                 weatherIcon.src = "images/clouds.png";
//             }else if(data.weather[0].main == 'Drizzle'){
//                 weatherIcon.src = "images/drizzle.png";
//             }else if(data.weather[0].main == 'Humidity'){
//                 weatherIcon.src = "images/humidity.png";
//             }else if(data.weather[0].main == 'Mist'){
//                 weatherIcon.src = "images/mist.png";
//             }else if(data.weather[0].main == 'Rain'){
//                 weatherIcon.src = "images/rain.png";
//             }else if(data.weather[0].main == 'Snow'){
//                 weatherIcon.src = "images/snow.png";
//             }else if(data.weather[0].main == 'Wind'){
//                 weatherIcon.src = "images/wind.png";
//             }else if(data.weather[0].main == 'Clear'){
//                 weatherIcon.src = "images/clear.png";

//             }

//         }

// }

// searchBtn.addEventListener('click' , () => {
//     checkWeather(searchBox.value)
//     searchBox.value = '';
// })
