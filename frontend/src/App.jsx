import { Routes, Route } from "react-router-dom";
import { useState } from "react";
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
      <Header setCitySearch={setCitySearch} />
      <Routes>
        <Route path="*" element={<Home citySearch={citySearch} />} />
        <Route path="/Meteo" element={<Meteo citySearch={citySearch} />} />
        <Route
          path="/decalage-horaire"
          element={<Timezone citySearch={citySearch} />}
        />
        <Route path="/devises" element={<Currency citySearch={citySearch} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
