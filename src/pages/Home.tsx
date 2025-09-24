import DotGrid from "../components/DotGrid";

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      <DotGrid />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="text-white text-4xl font-bold">Bienvenido 🚀</h1>
        </div>
    </div>
  );
}
