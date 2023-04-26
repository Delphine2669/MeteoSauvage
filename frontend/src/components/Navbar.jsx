import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="Hnavbar">
        <Link to="/">Home</Link>
        <br />
        <Link to="/meteo">Meteo</Link>
      </nav>
    </div>
  );
}
export default Navbar;
