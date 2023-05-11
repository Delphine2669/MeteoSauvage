import { Routes, Route } from "react-router-dom";
import logo from "./assets/logo-projet-2.png";
import Home from "./pages/Home";
import "./App.css";
import Navbar from "./components/Navbar";
import Meteo from "./components/Meteo";
import Timezone from "./components/Timezone";
import Currency from "./components/Currency";

function App() {
  return (
    <div>
      <header>
        <img src={logo} className="logo-site" alt="logo site" />
      </header>
      <Navbar />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/Meteo" element={<Meteo />} />
        <Route path="/decalage-horaire" element={<Timezone />} />
        <Route path="/devises" element={<Currency />} />
      </Routes>
    </div>
  );
}

export default App;
