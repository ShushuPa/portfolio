import DotGrid from "../components/DotGrid";
import Buttons from "../components/Buttons";

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      <DotGrid />
      <div className="min-h-screen flex items-center justify-center p-4">
        <Buttons />
      </div>
    </div>
  );
}
