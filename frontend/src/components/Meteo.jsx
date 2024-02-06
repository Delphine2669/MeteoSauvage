// import { useState, useEffect } from "react";
// import axios from "axios";
// import PropTypes from "prop-types";

// const celsius = (fahrenheit) => Math.ceil(((fahrenheit - 32) * 5) / 9);
// const iconUrl = (iconNumber) => {
//   return `https://developer.accuweather.com/sites/default/files/${
//     iconNumber < 10 ? "0" : ""
//   }${iconNumber}-s.png`;
// };
// function Meteo({ citySearch }) {
//   const [currentWeather, setCurrentWeather] = useState("");
//   const [forecast, setForecast] = useState("");
//   useEffect(() => {
//     async function fetchWeather() {
//       try {
//         const response = await axios.get(
//           `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${
//             import.meta.env.VITE_WEATHER_API_KEY ??
//             import.meta.env.VITE_WEATHER_API_KEY2
//           }&q=${citySearch}&language=fr-fr`
//         );
//         const locationKey = response.data[0].Key;
//         const currentConditionsResponse = await axios.get(
//           `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${
//             import.meta.env.VITE_WEATHER_API_KEY2 ??
//             import.meta.env.VITE_WEATHER_API_KEY
//           }&language=fr-fr`
//         );
//         const fiveDayForecastResponse = await axios.get(
//           `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${
//             import.meta.env.VITE_WEATHER_API_KEY ??
//             import.meta.env.VITE_WEATHER_API_KEY2
//           }&language=fr-fr`
//         );
//         setCurrentWeather(currentConditionsResponse.data[0]);
//         setForecast(fiveDayForecastResponse.data.DailyForecasts);
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     if (citySearch) {
//       fetchWeather();
//     }
//   }, [citySearch]);
//   return (
//     <div className="meteo">
//       <h2 className="component-title">Météo actuelle :</h2>
//       <h2>{citySearch}</h2>
//       {currentWeather && (
//         <div className="currentweather">
//           <h3>{currentWeather.WeatherText}</h3>
//           <img
//             className="currentweather-icon"
//             src={iconUrl(currentWeather.WeatherIcon)}
//             alt={currentWeather.WeatherText}
//           />
//           <p>{`Temperature:${currentWeather.Temperature?.Metric?.Value}°C`}</p>
//         </div>
//       )}
//       {forecast && (
//         <div>
//           <h3>Prévisions sur 5 jours</h3>
//           <ul className="forecast-ul">
//             {forecast.map((day) => {
//               const date = new Date(day.Date);
//               const dayOfMonth = date.getDate();
//               const month = date.getMonth() + 1;
//               const formattedDate = `${
//                 dayOfMonth < 10 ? "0" : ""
//               }${dayOfMonth} / ${month < 10 ? "0" : ""}${month}:`;
//               return (
//                 <li key={day.Date}>
//                   <p> Le {formattedDate}</p>
//                   <p>{day.Day.IconPhrase}</p>
//                   <img src={iconUrl(day.Day.Icon)} alt={day.Day.IconPhrase} />
//                   <p>{`Ecart de Température: ${celsius(
//                     day.Temperature.Minimum.Value
//                   )}°C - ${celsius(day.Temperature.Maximum.Value)}°C`}</p>
//                   <br />
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
// Meteo.propTypes = {
//   citySearch: PropTypes.string.isRequired,
// };

// export default Meteo;
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const celsius = (fahrenheit) => Math.ceil(((fahrenheit - 32) * 5) / 9);
const iconUrl = (iconNumber) => {
  return `https://developer.accuweather.com/sites/default/files/${
    iconNumber < 10 ? "0" : ""
  }${iconNumber}-s.png`;
};

async function fetchWeather(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function Meteo({ citySearch }) {
  const [currentWeather, setCurrentWeather] = useState("");
  const [forecast, setForecast] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (!citySearch) return;

      try {
        const locationResponse = await fetchWeather(
          `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${
            import.meta.env.VITE_WEATHER_API_KEY ??
            import.meta.env.VITE_WEATHER_API_KEY2
          }&q=${citySearch}&language=fr-fr`
        );
        const locationKey = locationResponse[0].Key;

        const currentConditionsResponse = await fetchWeather(
          `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${
            import.meta.env.VITE_WEATHER_API_KEY3 ??
            import.meta.env.VITE_WEATHER_API_KEY4
          }&language=fr-fr`
        );

        const fiveDayForecastResponse = await fetchWeather(
          `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${
            import.meta.env.VITE_WEATHER_API_KEY3 ??
            import.meta.env.VITE_WEATHER_API_KEY4
          }&language=fr-fr`
        );

        setCurrentWeather(currentConditionsResponse[0]);
        setForecast(fiveDayForecastResponse.DailyForecasts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [citySearch]);

  return (
    <div className="meteo">
      <h2 className="component-title">Météo actuelle :</h2>
      <h2>{citySearch}</h2>
      {currentWeather && (
        <div className="currentweather">
          <h3>{currentWeather.WeatherText}</h3>
          <img
            className="currentweather-icon"
            src={iconUrl(currentWeather.WeatherIcon)}
            alt={currentWeather.WeatherText}
          />
          <p>{`Temperature:${currentWeather.Temperature?.Metric?.Value}°C`}</p>
        </div>
      )}
      {forecast && (
        <div>
          <h3>Prévisions sur 5 jours</h3>
          <ul className="forecast-ul">
            {forecast.map((day) => {
              const date = new Date(day.Date);
              const dayOfMonth = date.getDate();
              const month = date.getMonth() + 1;
              const formattedDate = `${
                dayOfMonth < 10 ? "0" : ""
              }${dayOfMonth} / ${month < 10 ? "0" : ""}${month}:`;
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
  citySearch: PropTypes.string.isRequired,
};

export default Meteo;
