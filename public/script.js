// Initialize the map
const map = L.map('map').setView([0, 0], 1);
const layerGroup = L.layerGroup().addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Static list of city names for autocomplete (replace this with your dynamic source)
const cityNames = ['London', 'Paris', 'New York', 'Tokyo', 'Berlin', 'Sydney'];

function searchCities(query) {
  const suggestionsElement = document.getElementById('citySuggestions');
  suggestionsElement.innerHTML = ''; // Clear existing suggestions

  if (query.length === 0) return; // If the query is empty, don't display any suggestions

  const suggestions = cityNames.filter(city => city.toLowerCase().startsWith(query.toLowerCase()));
  
  suggestions.forEach(city => {
    const li = document.createElement('li');
    li.textContent = city;
    li.onclick = () => {
      document.getElementById('cityInput').value = city;
      suggestionsElement.innerHTML = '';
      getWeather(city); // Fetch weather when a city is clicked
    };
    suggestionsElement.appendChild(li);
  });
}

async function getWeather(city) {
  if (!city) {
    alert('Please enter a city name');
    return;
  }

  try {
    const response = await fetch(`/weather?city=${city}`);
    const data = await response.json();
    
    // Display weather data
    const resultDiv = document.getElementById('weatherResult');
    resultDiv.innerHTML = `Temperature: ${data.main.temp} <br>
                          Weather: ${data.weather[0].main}, ${data.weather[0].description} <br>
                          Wind Speed: ${data.wind.speed} m/s`;

    // Update the map with the new location
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    map.setView([lat, lon], 13); // Zoom level 13 for city view
    layerGroup.clearLayers(); // Remove previous markers
    L.marker([lat, lon]).addTo(layerGroup); // Add new marker
  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert('Failed to retrieve weather data.');
  }
}
