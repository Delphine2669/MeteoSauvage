import Meteo from "../components/Meteo";
import Timezone from "../components/Timezone";
import Currency from "../components/Currency";

export default function Home() {
  return (
    <main>
      <Meteo />
      <Timezone />
      <Currency />
    </main>
  );
}
