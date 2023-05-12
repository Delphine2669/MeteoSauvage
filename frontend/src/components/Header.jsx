import PropTypes from "prop-types";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

function Header({ setCitySearch }) {
  return (
    <header>
      <Navbar />
      <SearchBar setCitySearch={setCitySearch} />
    </header>
  );
}

Header.propTypes = {
  setCitySearch: PropTypes.func.isRequired,
};

export default Header;
