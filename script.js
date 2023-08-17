const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

searchBtn.addEventListener('click', () => {
    const cityName = cityInput.value;
    if (cityName) {
        getWeather(cityName);
    } else {
        weatherInfo.innerHTML = 'Please enter a city.';
    }
});

function getWeather(cityName) {
    // We useD OpenWeatherMap API
    const apiKey = '4862887cedf2ef1a27d4b078649921f0';// This is API Key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherDescription = data.weather[0].description;
            const temperature = (data.main.temp - 273.15).toFixed(2); // Convert to Celsius

            weatherInfo.innerHTML = `
                <h2>Weather in ${cityName}</h2>
                <p>Description: ${weatherDescription}</p>
                <p>Temperature: ${temperature} &#8451;</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = 'Error fetching weather data. Please try again later.';
        });
}




function getWeather(cityName) {
    const apiKey = '4862887cedf2ef1a27d4b078649921f0';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherDescription = data.weather[0].description;
            const temperature = (data.main.temp - 273.15).toFixed(2); // Convert to Celsius
            const weatherIcon = data.weather[0].icon;

            weatherInfo.innerHTML = `
                <h2>Weather in ${cityName}</h2>
                <p>Description: ${weatherDescription}</p>
                <p>Temperature: ${temperature} &#8451;</p>
            `;

            // Check weather conditions and set appropriate image
            const weatherImage = document.createElement('img');
            if (weatherIcon.includes('01')) {
                // Clear sky
                weatherImage.src = 'sun.png'; 
            } else if (weatherIcon.includes('02') || weatherIcon.includes('03') || weatherIcon.includes('04')) {
                // Cloudy
                weatherImage.src = 'cloud.png'; 
            } else {
                // Default image or other conditions
                weatherImage.src = 'default.png'; 
            }

            weatherInfo.appendChild(weatherImage);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = 'Error fetching weather data. Please try again later.';
        });
}
