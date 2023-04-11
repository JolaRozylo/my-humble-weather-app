function showCurrentTime() {
  let now = new Date();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[now.getDay()];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let liDayAndTime = document.querySelector("li#day-and-time");
  liDayAndTime.innerHTML = `${day} ${hours}:${minutes}`;
}

showCurrentTime();

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = temperature;
  let liDescription = document.querySelector("#description");
  liDescription.innerHTML = response.data.weather[0].description;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let place = document.querySelector("#city-name");
  place.innerHTML = response.data.name;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let icon = document.querySelector("#icon");
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", response.data.weather[0].description);
  celsiusTemp = response.data.main.temp;
}

function getWeather(event) {
  event.preventDefault();
  let apiKey = "d8be2ee04844f8293aa2d5192b804b5f";
  let city = document.querySelector("#search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

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

function convertToFahrenhite(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperature = document.querySelector("h1");
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

function defaultSearch(city) {
  let apiKey = "d8be2ee04844f8293aa2d5192b804b5f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function convertBackToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("h1");
  temperature.innerHTML = Math.round(celsiusTemp);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
              <span>${day}</span><br /><img
                src="https://openweathermap.org/img/wn/10d@2x.png"
                alt=""
                width="50px"
              /><br /><span>14°C</span>
            </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let celsiusTemp = null;

let form = document.querySelector("#search-city");
form.addEventListener("submit", getWeather);

let myLocationBtn = document.querySelector("#btn-mylocation");
myLocationBtn.addEventListener("click", getWeatherInCurrentLocation);

let searchButton = document.querySelector("#btn-search");
searchButton.addEventListener("click", getWeather);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenhite);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertBackToCelsius);

defaultSearch("London");
displayForecast();
