import Meteo from "../components/Meteo";
import Timezone from "../components/Timezone";
import Currency from "../components/Currency";

function Home() {
  return (
    <main>
      <Meteo />
      <Timezone />
      <Currency />
    </main>
  );
}

export default Home;
