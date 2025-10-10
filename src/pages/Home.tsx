import DotGrid from "../components/DotGrid";
import Buttons from "../components/Buttons";
import NavBar from "../components/NavBar";
import useTheme from '../hooks/useTheme';

export default function Home() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode ? "" : "dark"} "relative w-full h-screen transition"`}>
      <NavBar />
      <DotGrid />
      <section className="min-h-screen flex flex-col items-center justify-center md:flex-row md:items-center md:justify-center">
        <Buttons label={"Click Here"}/>
        <Buttons label={"Clickea Acá"}/>
      </section>
    </div>
  );
}
