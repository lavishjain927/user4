const apiKey = "YOUR_API_KEY_HERE"; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const weatherInfo = document.getElementById("weatherInfo");
  const errorDiv = document.getElementById("error");

  if (!city) {
    errorDiv.textContent = "Please enter a city name.";
    weatherInfo.innerHTML = "";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error(data.message);
    }

    const html = `
      <h2>${data.name}</h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>Condition:</strong> ${data.weather[0].main}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;

    weatherInfo.innerHTML = html;
    errorDiv.textContent = "";
  } catch (error) {
    weatherInfo.innerHTML = "";
    errorDiv.textContent = "City not found. Please try again.";
  }
}
