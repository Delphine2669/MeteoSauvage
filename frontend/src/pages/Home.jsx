import { Routes, Route } from "react-router-dom";
import Meteo from "../components/Meteo";
import Timezone from "../components/Timezone";
import Currency from "../components/Currency";

function Home() {
  return (
    <body>
      <main>
        <Routes>
          <Route path="/meteo" element={<Meteo />} />
          <Route path="/decalage-horaire" element={<Timezone />} />
          <Route path="/devises" element={<Currency />} />
        </Routes>
        <Meteo />
        <Timezone />
        <Currency />
      </main>
    </body>
  );
}

export default Home;
