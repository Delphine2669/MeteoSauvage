import { useState } from "react";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const fetchResults = () => {
    fetch(
      `http://dataservice.accuweather.com/locations/v1/search?q=${query}&apikey=${
        import.meta.env.VITE_WEATHER_API_KEY
      }`
    )
      .then((resp) => resp.json())
      .then((data) => setResults(data))
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" onClick={fetchResults}>
        Search
      </button>
      <ul>
        {results.map((result) => (
          <li key={result.key}>{result.title}</li>
        ))}
      </ul>
      <figure>
        <img src="/soleil.jpg" alt="soleil" />
        <figcaption>voici notre component Météo</figcaption>
      </figure>
    </div>
  );
}

function Meteo() {
  console.info('"cle-api"', import.meta.env.VITE_WEATHER_API_KEY);
  return <Search />;
}

export default Meteo;
