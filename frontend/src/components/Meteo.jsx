import { useState } from "react";
import axios from "axios";

function WeatherDisplay() {
  const [query, setQuery] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  async function HandleSearch(e) {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&q=${query}&language=fr-fr`
      );
      const locationKey = response.data[0].Key;
      const currentConditionsResponse = await axios.get(
        `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&language=fr-fr`
      );
      const fiveDayForecastResponse = await axios.get(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&language=fr-fr`
      );
      setCurrentWeather(currentConditionsResponse.data[0]);
      setForecast(fiveDayForecastResponse.data.DailyForecasts);
    } catch (error) {
      console.error(error);
    }
  }
  const celsius = (fahrenheit) => Math.ceil(((fahrenheit - 32) * 5) / 9);
  const iconUrl = (iconNumber) => {
    return `https://developer.accuweather.com/sites/default/files/${
      iconNumber < 10 ? "0" : ""
    }${iconNumber}-s.png`;
  };
  return (
    <div>
      <form onSubmit={HandleSearch}>
        <input
          type="text"
          placeholder="Enter city name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {currentWeather && (
        <div>
          <h2>{currentWeather.WeatherText}</h2>
          <img
            src={iconUrl(currentWeather.WeatherIcon)}
            alt={currentWeather.WeatherText}
          />
          <p>{`Temperature:${currentWeather.Temperature?.Metric?.Value}°C`}</p>
        </div>
      )}
      {forecast && (
        <div>
          <h2>Prévisions sur 5 jours</h2>
          <ul>
            {forecast.map((day) => {
              const date = new Date(day.Date);
              const dayOfMonth = date.getDate();
              const month = date.getMonth() + 1;
              const formattedDate = `${
                dayOfMonth < 10 ? "0" : ""
              }${dayOfMonth} / ${month < 10 ? "0" : ""}${month};`;
              return (
                <li key={day.Date}>
                  <p>{formattedDate}</p>
                  <p>{day.Day.IconPhrase}</p>
                  <img src={iconUrl(day.Day.Icon)} alt={day.Day.IconPhrase} />
                  <p>{`Temperature range: ${celsius(
                    day.Temperature.Minimum.Value
                  )}°C - ${celsius(day.Temperature.Maximum.Value)}°C`}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default WeatherDisplay;
