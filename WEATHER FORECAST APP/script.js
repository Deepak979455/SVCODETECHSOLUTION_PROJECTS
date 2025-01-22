const apiKey = '9a70be732224eb852375af19167b9936';
const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherDisplay = document.getElementById('weather-display');
const errorMessage = document.getElementById('error-message');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const weatherDescription = document.getElementById('weather-description');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();
    if (!city) {
        displayError('Please enter a city name.');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    }
});

function displayWeather(data) {
    cityName.textContent = data.name;
    temperature.textContent = `${data.main.temp} °C`;
    humidity.textContent = `${data.main.humidity} %`;
    weatherDescription.textContent = data.weather[0].description;

    weatherDisplay.classList.remove('hidden');
    errorMessage.classList.add('hidden');
}

function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    weatherDisplay.classList.add('hidden');
}
