import { useEffect, useRef } from "react";

type DotGridProps = {
  spacing?: number; 
  size?: number;   
};

export default function DotGrid({ spacing = 30, size = 3 }: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const points: { x: number; y: number }[] = [];

    for (let x = spacing; x < canvas.width; x += spacing) {
      for (let y = spacing; y < canvas.height; y += spacing) {
        points.push({ x, y });
      }
    }

    function drawPoints(mouseX?: number, mouseY?: number) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#94a3b8";

      points.forEach((p) => {
        let px = p.x;
        let py = p.y;

        if (mouseX !== undefined && mouseY !== undefined) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const offset = (100 - dist) / 5;
            px = p.x - (dx / dist) * offset;
            py = p.y - (dy / dist) * offset;
          }
        }

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2); // <- acá usás el tamaño
        ctx.fill();
      });
    }

    drawPoints();

    function handleMove(e: MouseEvent) {
      drawPoints(e.clientX, e.clientY);
    }
    canvas.addEventListener("mousemove", handleMove);

    return () => {
      canvas.removeEventListener("mousemove", handleMove);
    };
  }, [spacing, size]); // <- importante: recalcular si cambian props

  return <canvas ref={canvasRef} className="w-full h-screen bg-black block" />;
}
