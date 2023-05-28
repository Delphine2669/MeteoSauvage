import PropTypes from "prop-types";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

function Header({ setCitySearch }) {
  return (
    <header>
      <div className="header-div">
        <img src="/logo-projet-2.png" className="logo-site" alt="logo site" />
      </div>
      <Navbar />
      <SearchBar setCitySearch={setCitySearch} />
    </header>
  );
}

Header.propTypes = {
  setCitySearch: PropTypes.string.isRequired,
};

export default Header;
