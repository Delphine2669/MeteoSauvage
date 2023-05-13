import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="design-nav-block">
        <Link to="/" className="design-nav">
          Home
        </Link>
        <Link to="/meteo" className="design-nav">
          Météo
        </Link>
        <Link to="/decalage-horaire" className="design-nav">
          Décalage Horaire
        </Link>
        <Link to="/devises" className="design-nav">
          Devises
        </Link>
      </nav>
    </div>
  );
}
export default Navbar;
