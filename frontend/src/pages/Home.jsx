import { Routes, Route } from "react-router-dom";
import Meteo from "../components/Meteo";

export default function Home() {
  return (
    <body>
      <main>
        <Routes>
          <Route path="/meteo" element={<Meteo />} />
          {/* <Route path="/decalage-horaire" element={<Timezone />} />
          <Route path="/devises" element={<Currency />} /> */}
        </Routes>
        <Meteo />
      </main>
    </body>
  );
}
