import { useState, useEffect } from "react";
import axios from "axios";

function Timezone() {
  const [query, setQuery] = useState("");
  const [timezoneName, setTimezoneName] = useState("");
  const [timezone, setTimezone] = useState("");
  useEffect(() => {
    async function fetchTimezone() {
      try {
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${
            import.meta.env.VITE_TIMEZONE_API_KEY
          }`
        );
        const timezoneNameResponse =
          response.data.results[0].annotations.timezone.name;
        setTimezoneName(timezoneNameResponse);
        const timezoneOffset =
          response.data.results[0].annotations.timezone.offset_string;
        // this API time isnt based on Paris time, so that we had to add the -2 for the next variable
        const hours = timezoneOffset.slice(0, -2) - 2;
        const minutes = timezoneOffset.slice(-2);
        const formattedOffset = `${hours}H${minutes}`;
        setTimezone(formattedOffset);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTimezone();
  }, [query]);
  function handleSearch(e) {
    e.preventDefault();
  }
  return (
    <figure className="timezone">
      <div>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter city name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <figure>
          <img src="/time.jpg" alt="time" />
          <p>Region:</p>
          <p>{timezoneName}</p>
          <p>décalage horaire de:</p>
          <p>{timezone}</p>
        </figure>
      </div>
    </figure>
  );
}
export default Timezone;
