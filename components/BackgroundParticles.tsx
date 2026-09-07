"use client";

import { useTheme } from "@/components/theme/ThemeProvider";
import { useMousePosition } from "@/util/mouse";
import { useEffect, useRef } from "react";

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

type BackgroundParticlesProps = {
  quantity?: number;
  staticity?: number;
  ease?: number;
};

function remapValue(
  value: number,
  start1: number,
  end1: number,
  start2: number,
  end2: number,
): number {
  const remapped =
    ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
  return remapped > 0 ? remapped : 0;
}

/** Wider size spread: occasional large dots + varied small/medium (CSS px radius). */
function randomRadius(): number {
  const roll = Math.random();
  if (roll < 0.12) return 2.2 + Math.random() * 4.2;
  if (roll < 0.35) return 0.9 + Math.random() * 1.8;
  return 0.25 + Math.random() ** 1.4 * 1.6;
}

export default function BackgroundParticles({
  quantity = 96,
  staticity = 50,
  ease = 50,
}: BackgroundParticlesProps) {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const circlesRef = useRef<Circle[]>([]);
  const canvasSizeRef = useRef({ w: 0, h: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const clientMouseRef = useRef({ x: 0, y: 0 });
  const mousePosition = useMousePosition();
  const rafRef = useRef<number>(0);
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    clientMouseRef.current = {
      x: mousePosition.x,
      y: mousePosition.y,
    };
  }, [mousePosition.x, mousePosition.y]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    const getDpr = () => Math.min(window.devicePixelRatio ?? 1, 2);

    const syncMouseToCanvasSpace = () => {
      const { w, h } = canvasSizeRef.current;
      if (w === 0 || h === 0) return;
      const rect = canvas.getBoundingClientRect();
      const { x: mx, y: my } = clientMouseRef.current;
      const x = mx - rect.left - w / 2;
      const y = my - rect.top - h / 2;
      const inside = x <= w / 2 && x >= -w / 2 && y <= h / 2 && y >= -h / 2;
      if (inside) {
        mouseRef.current = { x, y };
      }
    };

    const circleParams = (): Circle => {
      const { w, h } = canvasSizeRef.current;
      return {
        x: Math.floor(Math.random() * w),
        y: Math.floor(Math.random() * h),
        translateX: 0,
        translateY: 0,
        size: randomRadius(),
        alpha: 0,
        targetAlpha: parseFloat((Math.random() * 0.55 + 0.12).toFixed(2)),
        dx: (Math.random() - 0.5) * 0.22,
        dy: (Math.random() - 0.5) * 0.22,
        magnetism: 0.12 + Math.random() * 3.8,
      };
    };

    const drawCircle = (circle: Circle, update = false) => {
      const context = ctxRef.current;
      if (!context) return;
      const dpr = getDpr();
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.translate(translateX, translateY);
      context.beginPath();
      context.arc(x, y, size, 0, 2 * Math.PI);
      const isDark = themeRef.current === "dark";
      context.fillStyle = isDark
        ? `rgba(255, 255, 255, ${alpha})`
        : `rgba(0, 0, 0, ${alpha})`;
      context.fill();
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circlesRef.current.push(circle);
      }
    };

    const clearContext = () => {
      const context = ctxRef.current;
      if (!context) return;
      const { w, h } = canvasSizeRef.current;
      context.clearRect(0, 0, w, h);
    };

    const drawParticles = () => {
      clearContext();
      circlesRef.current = [];
      const n = quantity;
      for (let i = 0; i < n; i++) {
        drawCircle(circleParams());
      }
    };

    const resizeCanvas = () => {
      const context = ctxRef.current;
      if (!container || !canvas || !context) return;

      circlesRef.current = [];
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      canvasSizeRef.current = { w, h };
      const dpr = getDpr();
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawParticles();
      syncMouseToCanvasSpace();
    };

    const animate = () => {
      const context = ctxRef.current;
      if (!context) return;

      syncMouseToCanvasSpace();

      const st = staticity;
      const es = ease;
      clearContext();
      const circles = circlesRef.current;
      const { w, h } = canvasSizeRef.current;

      for (let i = circles.length - 1; i >= 0; i--) {
        const circle = circles[i];
        const edge = [
          circle.x + circle.translateX - circle.size,
          w - circle.x - circle.translateX - circle.size,
          circle.y + circle.translateY - circle.size,
          h - circle.y - circle.translateY - circle.size,
        ];
        const closestEdge = edge.reduce((a, b) => Math.min(a, b));
        const remapClosestEdge = parseFloat(
          remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
        );
        if (remapClosestEdge > 1) {
          circle.alpha += 0.02;
          if (circle.alpha > circle.targetAlpha) {
            circle.alpha = circle.targetAlpha;
          }
        } else {
          circle.alpha = circle.targetAlpha * remapClosestEdge;
        }

        circle.x += circle.dx;
        circle.y += circle.dy;
        circle.translateX +=
          (mouseRef.current.x / (st / circle.magnetism) - circle.translateX) /
          es;
        circle.translateY +=
          (mouseRef.current.y / (st / circle.magnetism) - circle.translateY) /
          es;

        const out =
          circle.x < -circle.size ||
          circle.x > w + circle.size ||
          circle.y < -circle.size ||
          circle.y > h + circle.size;

        if (out) {
          circles.splice(i, 1);
          drawCircle(circleParams());
        } else {
          drawCircle(
            {
              ...circle,
              x: circle.x,
              y: circle.y,
              translateX: circle.translateX,
              translateY: circle.translateY,
              alpha: circle.alpha,
            },
            true,
          );
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    rafRef.current = requestAnimationFrame(animate);

    const onResize = () => resizeCanvas();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
      circlesRef.current = [];
    };
  }, [quantity, staticity, ease]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div ref={containerRef} className="absolute inset-0">
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>
      <div className="absolute inset-0 dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,#000_78%)] light:bg-[radial-gradient(ellipse_at_center,transparent_0%,#fff_78%)] transition-colors duration-300" />
    </div>
  );
}
