import "./style.css";

const apiKey = "f011607811bd8226b53313936016eee8";

async function getWeather(cityName, stateCode = "", countryCode = "") {
  const req = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateCode},${countryCode}&appid=${apiKey}`;
  const response = await fetch(req);
  const responseJson = await response.json();
  return Object.assign({}, responseJson.weather[0], responseJson.main, {
    name: responseJson.name,
  });
}

const cityNameField = document.querySelector("input");
const header = document.querySelector(".header");
const temp = document.querySelector(".temp");
const main = document.querySelector(".main-weather");
const description = document.querySelector(".description");
const feelsLike = document.querySelector(".feels-like");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");
const minTemp = document.querySelector(".min-temp");
const maxTemp = document.querySelector(".max-temp");

const button = document.querySelector("button");
button.addEventListener("click", () => {
  getWeather(cityNameField.value)
    .then((result) => {
      console.log(result);
      header.textContent = result.name;
      temp.textContent = `${result.temp}°`;
      main.textContent = result.main;
      description.textContent = result.description;
      feelsLike.textContent = result.feels_like + "°";
      humidity.textContent = result.humidity + "%";
      pressure.textContent = result.pressure + "mb";
      minTemp.textContent = result.temp_max + "°";
      maxTemp.textContent = result.temp_min + "°";
    })
    .catch((err) => {
      console.log(new Error(err));
    });
});
