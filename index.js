require('dotenv').config();
const http = require('http');
const url = require('url');
const API_KEY = process.env.WEATHER_API_KEY;
const PORT = process.env.PORT || 8083;

const server = http.createServer(async function (req, res) {
  const parsedUrl = url.parse(req.url, true);
  const visitorName = parsedUrl.query.visitor_name;

  if (parsedUrl.pathname === '/api/hello' && visitorName) {
    // Get client IP
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    try {
      const locationResponse = await fetch(`https://ipapi.co/${ip}/json`);
      const locationData = await locationResponse.json();
      console.log(locationData);
      const city = locationData.city;
      const region = locationData.region;

      const weatherResponse = await fetch(
        `https://api.weatherapi.com/v1/current.json?q=${city}&key=${API_KEY}`
      );
      const weatherData = await weatherResponse.json();
      console.log(weatherData);
      const temperature = weatherData.current.temp_c;
      const response = {
        client_ip: ip,
        location: `${city}, ${region}`,
        greeting: `Hello, ${visitorName}!, the temparature is ${temperature} degrees Celsius in ${city}.`,
      };
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Something went wrong!' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        error: 'Endpoint not found or visitor_name not provided',
      })
    );
  }
});
server.listen(PORT, () => {
  console.log('Server running at http://127.0.0.1:8083/');
});
