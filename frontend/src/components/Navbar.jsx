import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="designNavBlock">
        <Link to="/" className="designNav">
          Home
        </Link>
        <Link to="/meteo" className="designNav">
          Météo
        </Link>
        <Link to="/decalage-horaire" className="designNav">
          Décalage Horaire
        </Link>
        <Link to="/devises" className="designNav">
          Devises
        </Link>
      </nav>
    </div>
  );
}
export default Navbar;
