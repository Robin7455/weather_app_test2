/*===================={weather app.js}=====================*/
"use strict";

/*===================={variables for current day weather}=====================*/
const today_date_weather = document.querySelector(".today");
const today_weather_image = document.querySelector(".today_imagelink");
const today_weather_title = document.querySelector(".weather_title");
const currentLocation = document.querySelector(".location");
const todayWindSpeed = document.querySelector(".wind");
const todayHumidity = document.querySelector(".humidity");
const humidityProgress = document.querySelector("#humidity_progress");
const todayPressure = document.querySelector(".pressure");
const todayVisibility = document.querySelector(".visibility_p");
/*===================={search btn }=====================*/
const searchByCity = document.querySelector(".search");
const exit_btn = document.querySelector(".exit_icon");
const todayContent = document.querySelector(".today_content");
const searching = document.querySelector(".searching");
const search_input = document.querySelector(".input");
const search_btn = document.querySelector(".search_btn");
/*===================={logic for search by city and exit btn}=====================*/
searchByCity.addEventListener("click", function (event) {
  todayContent.classList.toggle("hidden");
  searching.classList.toggle("hidden");
});

exit_btn.addEventListener("click", function (event) {
  todayContent.classList.toggle("hidden");
  searching.classList.toggle("hidden");
});

/*===================={get location function}=====================*/
const getLocation = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

/*===================={temprature conversion function}=====================*/
function kelvinTocelsius(kelvin) {
  const tem = kelvin - 273.15;
  return tem;
}
/*===================={kilometere to miles }=====================*/
function kmtomiles(km) {
  return Math.round(km * 0.62137);
}

/*===================={fetching current weather using open weather api}=====================*/
const today_weather = async function (city) {
  try {
    const todayWeatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=482235b1ae63214aec4b96a3302fffec`
    );
    if (!todayWeatherResponse.ok) throw new Error("City not found");
    const todayWeatherData = await todayWeatherResponse.json();
    console.log(todayWeatherData);

    const todayKelvin = todayWeatherData.main.temp;
    const todayCelsius = Math.round(kelvinTocelsius(todayKelvin));

    today_date_weather.innerText = todayCelsius;

    const weather_icon = todayWeatherData.weather[0].icon;
    //   console.log(weather_icon);
    today_weather_image.src = `http://openweathermap.org/img/wn/${weather_icon}@4x.png`;

    today_weather_title.innerText = todayWeatherData.weather[0].description;
    currentLocation.innerText = todayWeatherData.name;

    todayWindSpeed.innerText = Math.round(todayWeatherData.wind.speed);
    todayHumidity.innerText = todayWeatherData.main.humidity;
    humidityProgress.value = todayWeatherData.main.humidity;
    todayPressure.innerText = todayWeatherData.main.pressure;
    const today_visibility = kmtomiles(todayWeatherData.visibility);
    todayVisibility.innerText = today_visibility;
  } catch (err) {
    alert(`${err}`);
  }
};

today_weather(" new delhi");
/*===================={search by entered city name }=====================*/

document.addEventListener("keypress", function (e) {
  console.log(e);
  if (e.code === "Enter") {
    const cityName = search_input.value;
    today_weather(`${cityName}`);
  }
});

search_btn.addEventListener("click", function (event) {
  const cityName = search_input.value;
  today_weather(`${cityName}`);
});
