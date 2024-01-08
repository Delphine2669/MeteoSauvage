import PropTypes from "prop-types";
import Meteo from "../components/Meteo";
import Timezone from "../components/Timezone";
import Currency from "../components/Currency";

function Home({ citySearch }) {
  return (
    <main>
      <div className="container">
        <Meteo citySearch={citySearch} />
        <Timezone citySearch={citySearch} />
        <Currency citySearch={citySearch} />
      </div>
    </main>
  );
}

Home.propTypes = {
  citySearch: PropTypes.string.isRequired,
};

export default Home;
