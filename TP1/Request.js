const request = require('request');

const apiKey = '2f9a6a5e2d4d3bc2d68d032ac3c38388';
const city = 'Sousse';

const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${apiKey}`;

request(apiUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        const data = JSON.parse(body);

        // Fonction à insérer dans le callback
        function displayWeatherInfo(cityData) {
            console.log('Description:', cityData.weather[0].description);
            console.log('Température:', cityData.main.temp + ' °C');
            console.log('Humidité:', cityData.main.humidity + '%');
        }

        // Appel de la fonction avec les données de la ville de Sousse
        displayWeatherInfo(data);
    } else {
        console.log('Erreur lors de la requête API:', error);
    }
});
