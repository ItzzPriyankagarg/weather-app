const cityInput = document.getElementById('city_input');
const searchBtn = document.getElementById('Search-btn');
const weatherCard = document.getElementById('weather-card');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");
const weatherIcon = document.getElementById("weather-icon");
const location_btn = document.getElementById("current-location-btn");

 weatherCard.style.display = 'none';

async function getCurrentLocationWeather() 
{

    loading.textContent = "Loading...";
    errorMessage.textContent = "";

    navigator.geolocation.getCurrentPosition(
        async (position) => {

            try {

                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                const API_KEY = "617abd926375cbeb4bfbbf8a8e4bc018";

                const url =
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

                const response = await fetch(url);
                const data = await response.json();

                cityName.textContent = data.name;
                temperature.textContent = `Temperature:${Math.round(data.main.temp)}°C`;
                description.textContent = `Weather: ${data.weather[0].description}`;
                const condition = data.weather[0].main;
                if (condition === "Clear") {
                    weatherIcon.textContent = "☀️";
                 }
               else if (condition === "Clouds") {
                    weatherIcon.textContent = "☁️";
                 }
               else if (condition === "Rain") {
                    weatherIcon.textContent = "🌧️";
                 }
               else if (condition === "Snow") {
                   weatherIcon.textContent = "❄️";
                 }
               else if (condition === "Thunderstorm") {
                   weatherIcon.textContent = "⛈️";
                 }
              else {
                   weatherIcon.textContent = "🌤️";
                 }
                humidity.textContent = `Humidity: ${data.main.humidity}%`;
                wind.textContent = `Wind: ${data.wind.speed} m/s`;

                weatherCard.style.display = "block";

            } catch (error) {
                errorMessage.textContent = error.message;
            } finally {
                loading.textContent = "";
            }

        },
        () => {
            errorMessage.textContent = "Location access denied";
        }
    );
}

 async function getWeather() 
 {
    const city = cityInput.value.trim();

    if(!city) {
        errorMessage.textContent = 'Please enter a city name';
        return;

    }
     loading.textContent = "Loading...";
    errorMessage.textContent = "";

    const API_KEY = "617abd926375cbeb4bfbbf8a8e4bc018";

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        const condition = data.weather[0].main;

       if (condition === "Clear") {
          weatherIcon.textContent = "☀️";
         }
       else if (condition === "Clouds") {
          weatherIcon.textContent = "☁️";
         }
       else if (condition === "Rain") {
          weatherIcon.textContent = "🌧️";
         }
       else if (condition === "Snow") {
          weatherIcon.textContent = "❄️";
         }
       else if (condition === "Thunderstorm") {
          weatherIcon.textContent = "⛈️";
         }
       else {
          weatherIcon.textContent = "🌤️";
         }
        cityName.textContent = data.name;
        temperature.textContent = `Temperature: ${Math.round(data.main.temp)} °C`;
        description.textContent = `Weather: ${data.weather[0].description}`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        weatherCard.style.display = 'block';
    } catch (error) {

        weatherCard.style.display = "none";
        errorMessage.textContent = error.message;

    } finally {

        loading.textContent = "";

    }
}

searchBtn.addEventListener("click", getWeather);
location_btn.addEventListener("click", getCurrentLocationWeather);
cityInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        getWeather();
    }

});   
