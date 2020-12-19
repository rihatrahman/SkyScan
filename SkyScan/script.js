const form = document.querySelector(".top-banner form");
const city_input = document.querySelector(".top-banner input");
const invalid_message = document.querySelector(".top-banner .invalid-message");
const temperature_digit = document.querySelector(".weather-description .temperature-digit");
const title = document.querySelector(".weather-description .temperature-title");
const city = document.querySelector(".top-banner .city .city-name");
const temperature_feel = document.querySelector(".weather-description .temperature-feel")
const weather_icon = document.querySelector('#icon');
const celsius_button = document.querySelector("#change-to-celsius");
const farenheit_button = document.querySelector("#change-to-farenheit");
const metric_section = document.querySelector(".metric")
metric_section.style.display = "none";

const apiKey = "09664e1f62fc4d8350b1681c9eb927bd";
var celsius;
var farenheit;
var celsius_feels_like;
var farenheit_feels_like;

function farenheitToCelsius (farenheit) { return (farenheit - 32) * 5 / 9; }

function celsiusToFarenheit (celsius) { return (celsius * 9) / 5 + 32; }

function loadCelsius () {

  celsius_button.style.backgroundColor = "#d9514eff";
  celsius_button.style.color = "white";
  farenheit_button.style.backgroundColor = "white";
  farenheit_button.style.color = "black";
  metric_section.style.display = "block";
}


function loadFarenheit () {

  farenheit_button.style.color = "white";
  farenheit_button.style.backgroundColor = "#d9514eff";
  celsius_button.style.backgroundColor = "white";
  celsius_button.style.color = "black";
}


// Farenheit to Celsius Button
celsius_button.addEventListener("click", function() {

  celsius =  farenheitToCelsius(farenheit);
  temperature_digit.textContent = celsius.toFixed(2) + "° Celsius";
  celsius_feels_like = farenheitToCelsius(farenheit_feels_like);
  temperature_feel.textContent = "Feels like " + Math.round(celsius_feels_like) + "°";
  loadCelsius();
});


// Celsius to Farenheit Button
farenheit_button.addEventListener("click", function() {

  farenheit = celsiusToFarenheit(celsius);
  temperature_digit.textContent = farenheit.toFixed(2) + "° Farenheit";
  farenheit_feels_like = celsiusToFarenheit(celsius_feels_like);
  temperature_feel.textContent = "Feels like " + Math.round(farenheit_feels_like) + "°";
  loadFarenheit();
});

 
form.addEventListener("submit", e => {

  e.preventDefault();
  const city_name = city_input.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${apiKey}&units=metric`;

  fetch(url)
  .then(response => response.json())
  .then(data => {
    
    celsius = data.main.temp;
    celsius_feels_like = Math.round(data.main.feels_like);
    
    city.textContent = city_name;
    temperature_digit.textContent = celsius + "° Celsius";

    title.textContent = data.weather[0]["description"];
    temperature_feel.textContent = "Feels like " + Math.round(celsius_feels_like) + "°";

    let iconcode = data.weather[0].icon;
    let iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
    weather_icon.src = iconURL;

    loadCelsius();
  })

  .catch(() => {
    invalid_message.textContent = "Please search for a valid city";
  });

  invalid_message.textContent = "";
  form.reset();
});