# ExpressJS Project - HNG Stage One Task Backend

## Overview

This project is a basic web server that exposes an API endpoint for the HNG Stage One Task of the Backend Track. It provides information about the client's location, IP address and current temperature in degree Celsius.

## Features

- Responds with a personalized greeting including the visitor's name and temperature information
- Retrieves the client's IP address
- Determines the client's location (city) based on their IP
- Fetches the current temperature for the client's city

## API Endpoint

```
GET /api/hello?visitor_name=
```

### Example Response

```json
{
  "client_ip": "127.0.0.1",
  "location": "New York",
  "greeting": "Hello, Mark!, the temperature is 11 degrees Celsius in New York"
}
```

## Technologies Used

- Express.js
- Fetch for API requests
- ipapi for IP geo location

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm: Download and install from [nodejs.org](https://nodejs.org)

## Installation

1. Clone the repository

```bash
    git clone https://github.com/Heccubernny/weather-basic-server
```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the project root directory
2. Add the following environment variables:

   ```
   PORT=3000
   WEATHER_API_KEY=your_api_key_here

   ```

Replace `YourAppName` and `your_api_key_here` with your actual project name and [Weather API key](https://www.weatherapi.com/).

## Running the Project

Start the development server:

```bash
npm run dev
```

The server will be running at `http://localhost:8000`.

## Deployment

Project can be deployed to any free or paid hosting platform that supports Node.js applications.
