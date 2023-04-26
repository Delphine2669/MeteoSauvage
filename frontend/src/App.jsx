import logo from "./assets/logo-projet-2.png";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <div>
      <header>
        <img src={logo} className="logo-site" alt="logo site" />
      </header>
      <Home />
      <p>coucou</p>
    </div>
  );
}

export default App;
