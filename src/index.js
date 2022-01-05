import "./style.css";

const apiKey = "f011607811bd8226b53313936016eee8";
let currentUnit = "F";
let fahrenheitVals;
let celciusVals;

const cityNameField = document.querySelector("input");
const dataField = document.querySelector(".data");
const weatherField = document.querySelector(".weather-data");
const errorField = document.querySelector(".error-data");
const loadingField = document.querySelector(".loading");

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
      weatherField.style.opacity = 1;
      errorField.style.display = "none";
      loadingField.style.display = "none";
      dataField.classList.remove("data-errored");

      fahrenheitVals = [
        result.temp,
        result.temp_min,
        result.temp_max,
        result.feels_like,
      ];
      celciusVals = [...convertToCelcius(fahrenheitVals)];

      if (currentUnit === "F") {
        addTempToDom(...fahrenheitVals);
      } else {
        addTempToDom(...celciusVals);
      }

      header.textContent = result.name;
      main.textContent = result.main;
      description.textContent = result.description;
      humidity.textContent = result.humidity + "%";
      pressure.textContent = result.pressure + "mb";
    })
    .catch((err) => {
      console.log(new Error(err));
      weatherField.style.opacity = 0;
      errorField.style.display = "block";
      loadingField.style.display = "none";
      dataField.classList.add("data-errored");
    });
});

const changeUnitBtn = document.querySelector(".change-unit");
changeUnitBtn.addEventListener("click", () => {
  if (currentUnit === "F") {
    currentUnit = "C";
    addTempToDom(...celciusVals);
    changeUnitBtn.textContent = "To °F";
    return;
  }
  currentUnit = "F";
  addTempToDom(...fahrenheitVals);
  changeUnitBtn.textContent = "To °C";
});

async function getWeather(cityName, stateCode = "", countryCode = "") {
  if (!cityName) {
    return Promise.reject("Must provide a city name");
  }

  loadingField.style.display = "block";
  weatherField.style.opacity = 0;
  errorField.style.display = "none";
  const req = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateCode},${countryCode}&appid=${apiKey}`;
  const response = await fetch(req);
  const responseJson = await response.json();
  return Object.assign({}, responseJson.weather[0], responseJson.main, {
    name: responseJson.name,
  });
}

function convertToCelcius(values) {
  return values.map((value) => {
    return (((value - 32) * 5) / 9).toFixed(2);
  });
}

function addTempToDom(tempVal, minTempVal, maxTempVal, feelsLikeVal) {
  temp.textContent = tempVal + "°" + currentUnit;
  minTemp.textContent = minTempVal + "°" + currentUnit;
  maxTemp.textContent = maxTempVal + "°" + currentUnit;
  feelsLike.textContent = feelsLikeVal + "°" + currentUnit;
}
