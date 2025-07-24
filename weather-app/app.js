

const input = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const temp = document.querySelector('.temp');
const city = document.querySelector('.city');
const humidity= document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const apiKey = "YOUR_API_KEY";
const weatherIcon = document.querySelector(".weather-icon");


async function weatherReport() {
  try {
    const userInput = input.value
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const json = await response.json();
    weatherIcon.src = `img/${json.weather[0].icon}.png`
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    temp.textContent = Math.round(json.main.temp) + "°C";
    city.textContent = json.name;
    humidity.textContent = json.main.humidity + '%';
    wind.textContent = json.wind.speed + ' km/h'
    document.querySelector(".search input").value = '';
    console.log(json);
  } catch (error) {
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
    document.querySelector(".search input").value = "";
  }
}

searchBtn.addEventListener('click', () => {
  weatherReport();
})

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    weatherReport()
  }
})