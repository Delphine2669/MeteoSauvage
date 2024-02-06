// import { useState, useEffect } from "react";
// import PropTypes from "prop-types";

// function Timezone({ citySearch }) {
//   const [timezoneData, setTimezoneData] = useState(null);
//   const [parisTimezoneData, setParisTimezoneData] = useState(null);
//   const [errorMessage, setErrorMessage] = useState(null);

//   useEffect(() => {
//     if (!citySearch.trim()) return;

//     const fetchTimezoneData = async (city) => {
//       try {
//         const responseCS = await fetch(
//           `https://timezone.abstractapi.com/v1/current_time/?api_key=${
//             import.meta.env.VITE_TIMEZONE_ABSTRACT_API_KEY
//           }&location=${encodeURIComponent(city)}`
//         );
//         if (!responseCS.ok) {
//           setErrorMessage(`Failed to fetch timezone data for ${city}`);
//         }
//         const data = await responseCS.json();
//         if (city.toLowerCase() === "paris") {
//           setParisTimezoneData(data);
//         } else {
//           setTimezoneData(data);
//         }
//       } catch (error) {
//         setErrorMessage(`Error fetching timezone data for ${city}`);
//       }
//     };

//     fetchTimezoneData(citySearch);
//     fetchTimezoneData("Paris");
//   }, [citySearch]);

//   return (
//     <div className="timezone">
//       <h2>Décalage horaire:</h2>
//       {timezoneData && (
//         <div>
//           <h3 className="tz-h4">{citySearch}:</h3>
//           <h4 className="tz-h4">{timezoneData.datetime}:</h4>
//           <h4 className="tz-h4">
//             {timezoneData.timezone_name}:{timezoneData.timezone_location}
//           </h4>
//         </div>
//       )}
//       {parisTimezoneData && (
//         <div>
//           <h3 className="tz-h4">Paris:</h3>
//           <h4 className="tz-h4">{parisTimezoneData.datetime}:</h4>
//           <h4 className="tz-h4">
//             {parisTimezoneData.timezone_name}:
//             {parisTimezoneData.timezone_location}
//           </h4>
//         </div>
//       )}
//       {errorMessage !== null && <p>{errorMessage}</p>}
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
        const response = await fetch(
          `https://timezone.abstractapi.com/v1/current_time/?api_key=${
            import.meta.env.VITE_TIMEZONE_ABSTRACT_API_KEY
          }&location=${encodeURIComponent(city)}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch timezone data for ${city}`);
        }
        const data = await response.json();
        if (city.toLowerCase() === "paris") {
          setParisTimezoneData(data);
        } else {
          setTimezoneData(data);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    // Fetch data for searched city
    fetchTimezoneData(citySearch);
    // Fetch data for Paris
    fetchTimezoneData("Paris");
  }, [citySearch]);

  return (
    <div className="timezone">
      <h2>Décalage horaire:</h2>
      {/* Render timezone data for searched city */}
      {timezoneData && (
        <div>
          <h3 className="tz-h4">{citySearch}:</h3>
          <h4 className="tz-h4">{timezoneData.datetime}:</h4>
          <h4 className="tz-h4">
            {timezoneData.timezone_name}:{timezoneData.timezone_location}
          </h4>
        </div>
      )}
      {/* Render timezone data for Paris */}
      {parisTimezoneData && (
        <div>
          <h3 className="tz-h4">Paris:</h3>
          <h4 className="tz-h4">{parisTimezoneData.datetime}:</h4>
          <h4 className="tz-h4">
            {parisTimezoneData.timezone_name}:
            {parisTimezoneData.timezone_location}
          </h4>
        </div>
      )}
      {/* Render error message if any */}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

Timezone.propTypes = {
  citySearch: PropTypes.string.isRequired,
};

export default Timezone;
