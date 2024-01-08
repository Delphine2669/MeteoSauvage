import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Timezone({ citySearch }) {
  const [timezoneName, setTimezoneName] = useState("");
  const [timezoneOffset, setTimezoneOffset] = useState("");
  const [currentTimeParis, setCurrentTimeParis] = useState("");
  const [currentTimeSearchedCity, setCurrentTimeSearchedCity] = useState("");

  const formatOffset = (offset) => {
    const offsetHours = offset.slice(0, -2);
    const offsetMinutes = offset.slice(-2);
    return `${offsetHours}h${offsetMinutes}`;
  };
  useEffect(() => {
    async function fetchTimezone() {
      try {
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${citySearch}&key=${
            import.meta.env.VITE_TIMEZONE_API_KEY ??
            import.meta.env.VITE_TIMEZONE_API_KEY2
          }`
        );
        const timezoneNameResponse =
          response.data.results[0].annotations.timezone.name;
        setTimezoneName(timezoneNameResponse);
        const timezoneOffsetResponse =
          response.data.results[0].annotations.timezone.offset_string;
        // setTimezoneOffset(timezoneOffsetResponse);
        const formattedOffset = formatOffset(timezoneOffsetResponse);
        setTimezoneOffset(formattedOffset);

        const now = new Date();

        const parisOffset = new Date().getTimezoneOffset() === 0 ? 1 : 0;
        const parisTime = new Date(
          now.getTime() + parisOffset * 60 * 60 * 1000
        );
        const formattedParisTime = parisTime.toLocaleTimeString("en-US", {
          hour12: false,
        });
        setCurrentTimeParis(formattedParisTime);

        // Calculate time for the searched city
        const cityOffset = parseInt(timezoneOffsetResponse.slice(0, -2), 10);
        const cityMinutes = parseInt(timezoneOffsetResponse.slice(-2), 10);
        const cityTime = new Date(
          now.getTime() + (cityOffset + cityMinutes / 60) * 60 * 60 * 1000
        );
        const formattedCityTime = cityTime.toLocaleTimeString("en-US", {
          hour12: false,
        });
        setCurrentTimeSearchedCity(formattedCityTime);
      } catch (error) {
        console.error(error);
      }
    }
    if (citySearch) {
      fetchTimezone();
    }
  }, [citySearch]);

  return (
    <div className="timezone ">
      <h2 className="component-title">Décalage horaire</h2>
      <h4 className="tz-h4">Région:</h4>
      <h4 className="tz-h4">{timezoneName}</h4>
      <p className="tz-p">décalage horaire de:</p>
      <h4 className="tz-h4">{timezoneOffset} par rapport à Paris</h4>
      <h4 className="tz-h4">Paris:</h4>
      <p className="tz-p">{currentTimeParis}</p>
      <h4 className="tz-h4">{citySearch}:</h4>
      <h4 className="tz-h4">{currentTimeSearchedCity}</h4>
    </div>
  );
}
Timezone.propTypes = { citySearch: PropTypes.string.isRequired };
export default Timezone;
