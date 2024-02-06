// import { useState, useEffect } from "react";
// import PropTypes from "prop-types";

// function Timezone({ citySearch }) {
//   const [currentTimeParis, setCurrentTimeParis] = useState("");
//   const [currentTimeSearchedCity, setCurrentTimeSearchedCity] = useState("");
//   const [timeDifference, setTimeDifference] = useState("");

//   useEffect(() => {
//     async function fetchTimezone() {
//       try {
//         const response = await fetch(
//           `https://nominatim.openstreetmap.org/search?format=json&q=${citySearch}`
//         );
//         const data = await response.json();

//         if (data.length > 0) {
//           const location = data[0];
//           const cityTimezone = location.timezone;

//           const now = new Date();

//           // Get Paris time
//           const parisTime = new Date().toLocaleString("en-US", {
//             timeZone: "Europe/Paris",
//             hour12: false,
//             hour: "numeric",
//             minute: "numeric",
//             second: "numeric",
//           });

//           // Get time for the searched city
//           const cityTime = now.toLocaleString("en-US", {
//             timeZone: cityTimezone,
//             hour12: false,
//             hour: "numeric",
//             minute: "numeric",
//             second: "numeric",
//           });

//           // Calculate time difference
//           const parisOffset = now.getTimezoneOffset() / 60;
//           const cityOffset = new Date().toLocaleString("en-US", {
//             timeZone: cityTimezone,
//             timeZoneName: "short",
//           });

//           setTimeDifference(
//             `Paris: UTC${parisOffset > 0 ? "-" : "+"}${Math.abs(
//               parisOffset
//             )}, ${citySearch}: ${cityOffset}`
//           );

//           setCurrentTimeParis(parisTime);
//           setCurrentTimeSearchedCity(cityTime);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     if (citySearch) {
//       fetchTimezone();
//     }
//   }, [citySearch]);

//   return (
//     <div className="timezone">
//       <h2 className="component-title">Décalage horaire</h2>
//       <h4 className="tz-h4">Paris:</h4>
//       <h4 className="tz-h4">{currentTimeParis}</h4>
//       <h4 className="tz-h4">{citySearch}:</h4>
//       <h4 className="tz-h4">{currentTimeSearchedCity}</h4>
//       <p className="tz-p">{timeDifference}</p>
//     </div>
//   );
// }

// Timezone.propTypes = { citySearch: PropTypes.string.isRequired };
// export default Timezone;

// import { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import moment from "moment-timezone";

// function Timezone({ citySearch }) {
//   const [currentTimeSearchedCity, setCurrentTimeSearchedCity] = useState(null);
//   const [currentTimeParis, setCurrentTimeParis] = useState(null);
//   const [timeDifference, setTimeDifference] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (citySearch.trim() === "") return;

//     // Get timezone for the searched city
//     const timezoneSearchedCity = moment.tz.zone(moment.tz.guess(citySearch));
//     if (!timezoneSearchedCity) {
//       setError("Timezone not found for the given city or country.");
//       return;
//     }

//     // Get timezone for Paris
//     const timezoneParis = moment.tz.zone("Europe/Paris");
//     if (!timezoneParis) {
//       setError("Timezone not found for Paris.");
//       return;
//     }

//     // Reset error if previous attempt succeeded
//     setError(null);

//     // Get current time in the searched city's timezone
//     const currentTimeInSearchedCity = moment()
//       .tz(timezoneSearchedCity.name)
//       .format("LLLL");
//     setCurrentTimeSearchedCity(currentTimeInSearchedCity);

//     // Get current time in Paris timezone
//     const currentTimeInParis = moment().tz("Europe/Paris").format("LLLL");
//     setCurrentTimeParis(currentTimeInParis);

//     // Calculate time difference
//     const offsetSearchedCity = moment()
//       .tz(timezoneSearchedCity.name)
//       .utcOffset();
//     const offsetParis = moment().tz("Europe/Paris").utcOffset();
//     const differenceInMinutes = Math.abs(offsetParis - offsetSearchedCity);
//     const hours = Math.floor(differenceInMinutes / 60);
//     const minutes = differenceInMinutes % 60;
//     setTimeDifference(
//       `Time difference with Paris: ${hours} hours and ${minutes} minutes.`
//     );
//   }, [citySearch]);

//   return (
//     <div className="timezone">
//       <h2 className="component-title">Timezone Converter</h2>
//       {error && <p>{error}</p>}
//       <h4 className="tz-h4">Paris:</h4>
//       <h4 className="tz-h4">{currentTimeParis}</h4>
//       <h4 className="tz-h4">{citySearch}:</h4>
//       <h4 className="tz-h4">{currentTimeSearchedCity}</h4>
//       <p className="tz-p">{timeDifference}</p>
//     </div>
//   );
// }

// Timezone.propTypes = {
//   citySearch: PropTypes.string.isRequired,
// };

// export default Timezone;

// import { useState, useEffect } from "react";
// import PropTypes from "prop-types";

// function Timezone({ citySearch }) {
//   const [currentTime, setCurrentTime] = useState(null);
//   const [errorMessage, setErrorMessage] = useState(null);

//   // Construct the API URL
//   const apiUrl = `https://timezone.abstractapi.com/v1/current_time/?api_key=${
//     import.meta.env.VITE_TIMEZONE_ABSTRACT_API_KEY
//   }&location=${encodeURIComponent(citySearch)}`;

//   // Fetch the data
//   fetch(apiUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       const { datetime, timezone_name, timezone_location } = data;
//       console.log("Current Time:", datetime);
//       console.log("Time Zone Name:", timezone_name);
//       console.log("Time Zone Location:", timezone_location);
//     })
//     .catch((error) => {
//       console.error("Error fetching time zone info:", error);
//     });

//   return (
//     <div>
//       <div className="timezone"></div>
//       <h4 className="tz-h4">{citySearch}:</h4>
//       <h4 className="tz-h4">{datetime}:</h4>
//       <h4 className="tz-h4">
//         {timezone_name}:{timezone_location}
//       </h4>
//     </div>
//   );
// }
// export default Timezone;

// import { useState, useEffect } from "react";
// import PropTypes from "prop-types";

// function Timezone({ citySearch }) {
//   const [timezoneData, setTimezoneData] = useState(null);
//   const [errorMessage, setErrorMessage] = useState(null);

//   const [parisTimezoneData, setParisTimezoneData] = useState(null);
// const location = "Oxford, United Kingdom";
//   useEffect(() => {
//     if (!citySearch.trim()) return;

//     const fetchTimezoneData = async () => {
//       try {
//         const response = await fetch(
//           `https://timezone.abstractapi.com/v1/current_time/?api_key=${
//             import.meta.env.VITE_TIMEZONE_ABSTRACT_API_KEY
//           }&location=${encodeURIComponent(citySearch)}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch timezone data");
//         }
//         const data = await response.json();
//         setTimezoneData(data);
//       } catch (error) {
//         setErrorMessage("Error fetching timezone data");
//       }
//     };

//     fetchTimezoneData();
//   }, [citySearch]);

//   return (
//     <div className="timezone">
//       {timezoneData && (
//         <div>
//           <h4 className="tz-h4">{citySearch}:</h4>
//           <h4 className="tz-h4">{timezoneData.datetime}:</h4>
//           <h4 className="tz-h4">
//             {timezoneData.timezone_name}:{timezoneData.timezone_location}
//           </h4>
//         </div>
//       )}
//       {errorMessage && <p>{errorMessage}</p>}
//     </div>
//   );
// }

// Timezone.propTypes = {
//   citySearch: PropTypes.string.isRequired,
// };

// export default Timezone;
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Timezone({ citySearch }) {
  const [timezoneData, setTimezoneData] = useState(null);
  const [parisTimezoneData, setParisTimezoneData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!citySearch.trim()) return;

    const fetchTimezoneData = async (city) => {
      try {
        const responseCS = await fetch(
          `https://timezone.abstractapi.com/v1/current_time/?api_key=${
            import.meta.env.VITE_TIMEZONE_ABSTRACT_API_KEY
          }&location=${encodeURIComponent(city)}`
        );
        if (!responseCS.ok) {
          setErrorMessage(`Failed to fetch timezone data for ${city}`);
        }
        const data = await responseCS.json();
        if (city.toLowerCase() === "paris") {
          setParisTimezoneData(data);
        } else {
          setTimezoneData(data);
        }
      } catch (error) {
        setErrorMessage(`Error fetching timezone data for ${city}`);
      }
    };

    fetchTimezoneData(citySearch);
    fetchTimezoneData("Paris");
  }, [citySearch]);

  return (
    <div className="timezone">
      {timezoneData && (
        <div>
          <h2 className="tz-h4">{citySearch}:</h2>
          <h4 className="tz-h4">{timezoneData.datetime}:</h4>
          <h4 className="tz-h4">
            {timezoneData.timezone_name}:{timezoneData.timezone_location}
          </h4>
        </div>
      )}
      {parisTimezoneData && (
        <div>
          <h2 className="tz-h4">Paris:</h2>
          <h4 className="tz-h4">{parisTimezoneData.datetime}:</h4>
          <h4 className="tz-h4">
            {parisTimezoneData.timezone_name}:
            {parisTimezoneData.timezone_location}
          </h4>
        </div>
      )}
      {errorMessage !== null && <p>{errorMessage}</p>}
    </div>
  );
}

Timezone.propTypes = {
  citySearch: PropTypes.string.isRequired,
};

export default Timezone;
