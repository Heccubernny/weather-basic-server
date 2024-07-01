require('dotenv').config();
const express = require('express');
const API_KEY = process.env.WEATHER_API_KEY;
const PORT = process.env.PORT || 8000;
const hostname = '0.0.0.0';

const app = express();

app.get('/', async (req, res) => {
  return res.status(404).json({ data: 'Home api is working' });
});

app.get('/api/hello', async (req, res) => {
  const visitorName = req.query.visitor_name;
  if (!visitorName) {
    return res.status(404).json({
      error: 'Endpoint not found or visitor_name not provided',
    });
  }

  // Get client IP
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  try {
    const locationResponse = await fetch(`https://ipapi.co/${ip}/json`);
    const locationData = await locationResponse.json();
    const city = locationData.city;
    const region = locationData.region;
    if (!ip || !city || !region) {
      return res.status(400).json({
        message: 'Sorry we are having network issue , please try again',
      });
    }

    const weatherResponse = await fetch(
      `https://api.weatherapi.com/v1/current.json?q=${city}&key=${API_KEY}`
    );
    const weatherData = await weatherResponse.json();
    const temperature = weatherData.current.temp_c;
    if (!weatherData) {
      return res.status(400).json({
        message: 'Sorry we are having issue with the weather, please try again',
      });
    }
    const response = {
      client_ip: ip,
      location: `${city}, ${region}`,
      greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${city}.`,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
