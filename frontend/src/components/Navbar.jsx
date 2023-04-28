import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <br />
        <Link to="/meteo">Meteo</Link>
        <br />
        <Link to="/decalage-horaire">Decalage Horaire</Link>
        <br />
        <Link to="/devises">Devises</Link>
      </nav>
    </div>
  );
}
export default Navbar;
