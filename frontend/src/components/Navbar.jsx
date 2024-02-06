import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="design-nav-block">
        <button type="button" className="design-nav home-button">
          <NavLink to="/" className="design-nav-home">
            Home
          </NavLink>
        </button>

        <button type="button" className="design-nav weather-button">
          <NavLink to="/meteo" className="design-nav-weather">
            Météo
          </NavLink>
        </button>
        <button type="button" className="design-nav timezone-button">
          <NavLink to="/decalage-horaire" className="design-nav-timezone">
            Décalage Horaire
          </NavLink>
        </button>
        <button type="button" className="design-nav currency-button">
          <NavLink to="/devises" className="design-nav-currency">
            Devises
          </NavLink>
        </button>
      </nav>
    </div>
  );
}
export default Navbar;
