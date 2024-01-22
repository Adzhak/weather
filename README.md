# Weather Application

## Overview
This Weather Application provides real-time weather information along with a random kitten image and a four-line poem. The project demonstrates the use of external APIs and basic web development concepts including client-server architecture, asynchronous JavaScript, and responsive design.

## Features
- Fetch and display real-time weather information.
- Display a random kitten image from The Cat API.
- Show a random four-line poem from PoetryDB.
- Responsive design for various screen sizes.

## Technologies
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js with Express.js
- **APIs**: OpenWeatherMap, The Cat API, PoetryDB
- **Mapping**: Leaflet.js for map display

## Setup Instructions

### Prerequisites
- Node.js and npm (Node Package Manager)
- Internet connection for API access

### Installation
1. **Clone the Repository**
```
git clone [repository_url]
cd [repository_name]
```
3. **Install Dependencies**
```
npm install
```
4. **Environment Variables**
- Create a `.env` file in the root directory.
- Add the following line (replace `[your_api_key]` with your actual OpenWeatherMap API key):
  ```
  OPENWEATHER_API_KEY=[your_api_key]
  ```

5. **Start the Server**
```
node server.js
```
6. **Access the Application**
- Open a web browser and navigate to `http://localhost:3000`.

## API Usage

1. **OpenWeatherMap**
- Used for fetching real-time weather data.
- Requires an API key which should be stored in the `.env` file.

2. **The Cat API**
- Provides random kitten images.
- No API key required for basic usage.

3. **PoetryDB**
- Fetches random poems.
- Used to extract the first four lines of a random poem.
- No API key required.

## Key Design Decisions

- **Asynchronous JavaScript**: Used async/await for API calls to handle data fetching efficiently.
- **Modular Code**: Separated API logic in server-side to keep the client-side code clean and maintainable.
- **Responsive Design**: CSS media queries ensure the application is usable on a wide range of devices.
- **Error Handling**: Implemented both on the client and server sides to manage API errors gracefully.
- **Security**: Stored sensitive information like API keys in environment variables to keep them secure.

## Contributing
Contributions, issues, and feature requests are welcome. Feel free to check issues page if you want to contribute.

## Author
- **Adilet Zhaksylyk SE-2207**
