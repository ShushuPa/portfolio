import { useEffect, useRef } from "react";

type DotGridProps = {
  spacing?: number; //distance between dots
  size?: number;   // radius of each dot
  influenceRadius?: number;  // radius of mouse influence
};

export default function DotGrid({ spacing = 71, size = 3, influenceRadius = 100 }: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const framePending = useRef(false);
  const pointsRef = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
  const canvas = canvasRef.current!; 
  const ctx = canvas.getContext("2d")!; 

    function buildPoints() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const pts: { x: number; y: number }[] = [];
      for (let x = spacing; x < canvas.width; x += spacing) {
        for (let y = spacing; y < canvas.height; y += spacing) {
          pts.push({ x, y });
        }
      }
      pointsRef.current = pts;
    }

    function draw() {
      framePending.current = false;
      const points = pointsRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#94a3b8";
      const mouse = mouseRef.current;
      const hasMouse = !!mouse;
      points.forEach(p => {
        let px = p.x;
        let py = p.y;
        if (hasMouse && mouse) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < influenceRadius && dist > 0.0001) {
            const offset = (influenceRadius - dist) / 5; 
            px = p.x - (dx / dist) * offset;
            py = p.y - (dy / dist) * offset;
          }
        }
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function scheduleDraw() {
      if (!framePending.current) {
        framePending.current = true;
        requestAnimationFrame(draw);
      }
    }

    function handlePointerMove(e: PointerEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      scheduleDraw();
    }

    function handlePointerLeave() {
      mouseRef.current = null; 
      scheduleDraw();
    }

    function handleResize() {
      buildPoints();
      scheduleDraw();
    }

    buildPoints();
    draw();

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [spacing, size, influenceRadius]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    />
  );
}
