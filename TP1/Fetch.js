// Utilisation de la bibliothèque "fetch"
const apiKey = '2f9a6a5e2d4d3bc2d68d032ac3c38388';
const city = 'Sousse';

const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${apiKey}`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Fonction à insérer dans le callback
        function displayWeatherInfo(cityData) {
            console.log('Description:', cityData.weather[0].description);
            console.log('Température:', cityData.main.temp + ' °C');
            console.log('Humidité:', cityData.main.humidity + '%');
        }

        // Appel de la fonction avec les données de la ville de Sousse
        displayWeatherInfo(data);
    })
    .catch(error => console.log('Erreur lors de la requête API:', error));
