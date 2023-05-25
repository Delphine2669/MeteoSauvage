import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="design-nav-block">
        <Link to="/" className="design-nav home-button">
          Home
        </Link>
        <Link to="/meteo" className="design-nav weather-button">
          Météo
        </Link>
        <Link to="/decalage-horaire" className="design-nav timezone-button">
          Décalage Horaire
        </Link>
        <Link to="/devises" className="design-nav currency-button">
          Devises
        </Link>
      </nav>
    </div>
  );
}
export default Navbar;
