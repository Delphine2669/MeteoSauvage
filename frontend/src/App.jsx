import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import logo from "./assets/logo-projet-2.png";
import Home from "./pages/Home";
import "./App.css";
import Footer from "./components/Footer";
import Meteo from "./components/Meteo";
import Timezone from "./components/Timezone";
import Currency from "./components/Currency";
import Header from "./components/Header";

function App() {
  const [citySearch, setCitySearch] = useState("");
  return (
    <div>
      <header>
        <img src={logo} className="logo-site" alt="logo site" />
      </header>
      <Header setCitySearch={setCitySearch} />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/Meteo" element={<Meteo citySearch={citySearch} />} />
        <Route path="/decalage-horaire" element={<Timezone />} />
        <Route path="/devises" element={<Currency />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
