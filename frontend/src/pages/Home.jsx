import { Routes, Route } from "react-router-dom";
import Meteo from "../components/Meteo";
import Timezone from "../components/Timezone";
import Currency from "../components/Currency";

export default function Home() {
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
