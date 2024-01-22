const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' directory

const PORT = process.env.PORT || 3000;

// OpenWeather API endpoint
app.get('/weather', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const weatherResponse = await axios.get(url);
    res.json(weatherResponse.data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ message: "Error fetching weather data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
