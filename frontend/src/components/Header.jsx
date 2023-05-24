import PropTypes from "prop-types";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

function Header({ setCitySearch }) {
  return (
    <header>
      <img src="/logo-projet-2.png" className="logo-site" alt="logo site" />
      <Navbar />
      <SearchBar setCitySearch={setCitySearch} />
    </header>
  );
}

Header.propTypes = {
  setCitySearch: PropTypes.func.isRequired,
};

export default Header;
