function showCurrentTime() {
  let now = new Date();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let liDayAndTime = document.querySelector("li#current-day-and-time");
  liDayAndTime.innerHTML = `${day} ${hours}:${minutes}`;
}

showCurrentTime();

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${temperature}°C`;
  let liDescription = document.querySelector("#description");
  liDescription.innerHTML = response.data.weather[0].main;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} mph`;
  let place = document.querySelector("#city-name");
  place.innerHTML = response.data.name;
}

function getWeather(event) {
  event.preventDefault();
  let apiKey = "d8be2ee04844f8293aa2d5192b804b5f";
  let city = document.querySelector("#search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  console.log(apiUrl);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", getWeather);

function getCurrentLocation(position) {
  let apiKey = "d8be2ee04844f8293aa2d5192b804b5f";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
navigator.geolocation.getCurrentPosition(getCurrentLocation);

function getWeatherInCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let myLocationBtn = document.querySelector("#btn-mylocation");
myLocationBtn.addEventListener("click", getWeatherInCurrentLocation);
