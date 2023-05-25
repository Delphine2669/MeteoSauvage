import PropTypes from "prop-types";
import Meteo from "../components/Meteo";
import Timezone from "../components/Timezone";
import Currency from "../components/Currency";

function Home({ citySearch }) {
  return (
    <main>
      <Meteo citySearch={citySearch} />
      <Timezone citySearch={citySearch} />
      <Currency citySearch={citySearch} />
    </main>
  );
}

Home.propTypes = {
  citySearch: PropTypes.func.isRequired,
};

export default Home;
