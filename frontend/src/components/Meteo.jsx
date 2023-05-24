import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const celsius = (fahrenheit) => Math.ceil(((fahrenheit - 32) * 5) / 9);
const iconUrl = (iconNumber) => {
  return `https://developer.accuweather.com/sites/default/files/${
    iconNumber < 10 ? "0" : ""
  }${iconNumber}-s.png`;
};
function Meteo({ citySearch }) {
  const [currentWeather, setCurrentWeather] = useState("");
  const [forecast, setForecast] = useState("");
  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await axios.get(
          `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${
            import.meta.env.VITE_WEATHER_API_KEY
          }&q=${citySearch}&language=fr-fr`
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

    if (citySearch) {
      fetchWeather();
    }
  }, [citySearch]);
  return (
    <div className="meteo">
      <h2>Météo actuelle :</h2>
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
                  <p> Le {formattedDate}</p>
                  <p>{day.Day.IconPhrase}</p>
                  <img src={iconUrl(day.Day.Icon)} alt={day.Day.IconPhrase} />
                  <p>{`Ecart de Température: ${celsius(
                    day.Temperature.Minimum.Value
                  )}°C - ${celsius(day.Temperature.Maximum.Value)}°C`}</p>
                  <br />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
Meteo.propTypes = {
  citySearch: PropTypes.func.isRequired,
};

export default Meteo;
