const apiKey = '7d36804cf2fa6ef9cf9f13caf49bed8e';
const baseUrl = 'https://api.openweathermap.org/data/2.5/';

function searchWeather() {
    const city = document.getElementById('city-input').value;
    fetchWeather(city);
    fetchForecast(city);
}

function fetchWeather(city) {
    const url = `${baseUrl}weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateCurrentWeather(data);
        })
        .catch(error => console.error('Error fetching current weather:', error));
}

function fetchForecast(city) {
    const url = `${baseUrl}forecast?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateForecast(data);
        })
        .catch(error => console.error('Error fetching forecast:', error));
}

function updateCurrentWeather(data) {
    const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById('weather-icon').style.backgroundImage = `url(${weatherIcon})`;
    document.getElementById('temperature').textContent = `${data.main.temp} °C`;
    document.getElementById('weather-description').textContent = data.weather[0].description;
}

function updateForecast(data) {
    const container = document.getElementById('forecast-container');
    container.innerHTML = ''; // Clear previous entries
    data.list.forEach((forecast, index) => {
        if (index % 8 === 0) { // Only show data for around midday
            const date = new Date(forecast.dt * 1000);
            const weatherIcon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
            const forecastEl = document.createElement('div');
            forecastEl.innerHTML = `
                <h3>${date.toDateString()}</h3>
                <div style="background-image: url(${weatherIcon}); width: 50px; height: 50px; background-size: contain;"></div>
                <p>${forecast.main.temp} °C</p>
                <p>${forecast.weather[0].description}</p>
            `;
            container.appendChild(forecastEl);
        }
    });
}
