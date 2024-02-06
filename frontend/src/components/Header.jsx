import PropTypes from "prop-types";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import logo from "../assets/logo.png";

function Header({ setCitySearch }) {
  return (
    <header>
      <div className="header-div">
        <img src={logo} className="logo-site" alt="logo site" />
      </div>
      <Navbar />
      <SearchBar setCitySearch={setCitySearch} />
    </header>
  );
}

Header.propTypes = {
  setCitySearch: PropTypes.func.isRequired,
};

export default Header;
