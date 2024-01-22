const map = L.map('map').setView([0, 0], 1);
const layerGroup = L.layerGroup().addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);


const cityNames = ['London', 'Paris', 'New York', 'Tokyo', 'Berlin', 'Sydney'];

function searchCities(query) {
  const suggestionsElement = document.getElementById('citySuggestions');
  suggestionsElement.innerHTML = ''; 

  if (query.length === 0) return; 

  const suggestions = cityNames.filter(city => city.toLowerCase().startsWith(query.toLowerCase()));
  
  suggestions.forEach(city => {
    const li = document.createElement('li');
    li.textContent = city;
    li.onclick = () => {
      document.getElementById('cityInput').value = city;
      suggestionsElement.innerHTML = '';
      getWeather(city); 
    };
    suggestionsElement.appendChild(li);
  });
}
async function displayRandomPoem() {
  try {
    
    const response = await fetch('https://poetrydb.org/random');
    const poems = await response.json();
    const poem = poems[0];

    
    const firstFourLines = poem.lines.slice(0, 4).join('\n');

    
    const poemDiv = document.createElement('div');
    poemDiv.textContent = firstFourLines;
    poemDiv.style.whiteSpace = 'pre-line';
    poemDiv.style.marginTop = '20px';
    poemDiv.style.fontStyle = 'italic';

    
    const resultDiv = document.getElementById('weatherResult');
    resultDiv.appendChild(poemDiv);
  } catch (error) {
    console.error('Error fetching poem:', error);
  }
}
async function getWeather(city) {
  if (!city) {
    alert('Please enter a city name');
    return;
  }

  try {
    const response = await fetch(`/weather?city=${city}`);
    const data = await response.json();
    
    
    const resultDiv = document.getElementById('weatherResult');
    resultDiv.innerHTML = `Temperature: ${data.main.temp}°C <br>
                          Weather: ${data.weather[0].main}, ${data.weather[0].description} <br>
                          Wind Speed: ${data.wind.speed} m/s`;

    
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    map.setView([lat, lon], 13); 
    layerGroup.clearLayers(); 
    L.marker([lat, lon]).addTo(layerGroup); 
    
    
    const catResponse = await fetch('https://api.thecatapi.com/v1/images/search');
    const catData = await catResponse.json();
    const catImageUrl = catData[0].url; 

    
    const catImage = document.createElement('img');
    catImage.src = catImageUrl;
    catImage.alt = 'Random Kitten';
    catImage.style.maxWidth = '300px'; 
    catImage.style.marginTop = '20px'; 

    
    const existingCatImage = resultDiv.querySelector('img');
    if (existingCatImage) {
      resultDiv.replaceChild(catImage, existingCatImage);
    } else {
      resultDiv.appendChild(catImage);
    }
    displayRandomPoem(); 
  } catch (error) {
    console.error('Error fetching weather or kitten data:', error);
    alert('Failed to retrieve data.');
  }
}
