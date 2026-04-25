"use client";

import { useEffect, useRef, useState } from "react";

const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Skip for users who prefer reduced motion — no canvas needed at all.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setShouldRender(false);
      return;
    }

    // Defer all heavy setup until the browser is idle so it never competes
    // with the LCP element or first-paint CSS/font decode.
    const scheduleInit = (cb: () => void) => {
      if (typeof requestIdleCallback !== "undefined") {
        requestIdleCallback(cb, { timeout: 2000 });
      } else {
        // Safari fallback — still yields one tick to unblock paint
        setTimeout(cb, 200);
      }
    };

    let animationFrameId = 0;
    let resizeTimer: ReturnType<typeof setTimeout>;
    let lastMouseMove = 0;
    let mounted = true;

    scheduleInit(() => {
      if (!mounted) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
      if (!ctx) return;
      ctxRef.current = ctx;

      const setSize = () => {
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;
      };
      setSize();

      class Particle {
        x = 0;
        y = 0;
        vx = 0;
        vy = 0;
        size = 0;

        constructor() {
          this.reset();
        }

        reset() {
          this.x = Math.random() * canvas!.width;
          this.y = Math.random() * canvas!.height;
          this.vx = (Math.random() - 0.5) * 0.35;
          this.vy = (Math.random() - 0.5) * 0.35;
          this.size = Math.random() * 3 + 1.5;
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
          if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
        }
      }

      const getThemeColors = () => {
        const s = getComputedStyle(document.documentElement);
        return {
          accent: s.getPropertyValue("--accent-primary").trim() || "#2563eb",
          muted: s.getPropertyValue("--text-muted").trim() || "#94a3b8",
        };
      };

      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile ? 18 : 28;
      const particles = Array.from({ length: particleCount }, () => new Particle());

      const draw = () => {
        if (!mounted) return;
        const c = ctxRef.current!;
        c.clearRect(0, 0, canvas.width, canvas.height);

        const colors = getThemeColors();
        const now = Date.now();
        const enableMouse = now - lastMouseMove < 3000;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.update();

          c.fillStyle = i % 8 === 0 ? colors.accent : `${colors.muted}cc`;
          c.beginPath();
          c.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          c.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
              const alpha = Math.floor((1 - dist / 150) * 45)
                .toString(16)
                .padStart(2, "0");
              c.strokeStyle = `${colors.muted}${alpha}`;
              c.lineWidth = 0.9;
              c.beginPath();
              c.moveTo(p.x, p.y);
              c.lineTo(p2.x, p2.y);
              c.stroke();
            }
          }

          if (enableMouse) {
            const dx = p.x - mouse.current.x;
            const dy = p.y - mouse.current.y;
            const mDist = Math.sqrt(dx * dx + dy * dy);
            if (mDist < 250) {
              const mAlpha = Math.floor((1 - mDist / 250) * 70)
                .toString(16)
                .padStart(2, "0");
              c.strokeStyle = `${colors.accent}${mAlpha}`;
              c.lineWidth = 1.2;
              c.beginPath();
              c.moveTo(p.x, p.y);
              c.lineTo(mouse.current.x, mouse.current.y);
              c.stroke();
            }
          }
        }

        animationFrameId = requestAnimationFrame(draw);
      };

      const handleMouseMove = (e: MouseEvent) => {
        mouse.current.x = e.clientX;
        mouse.current.y = e.clientY;
        lastMouseMove = Date.now();
      };

      // Debounce resize to avoid thrashing the canvas every pixel
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setSize, 150);
      };

      window.addEventListener("resize", handleResize, { passive: true });
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      draw();
    });

    return () => {
      mounted = false;
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimer);
    };
  }, []);

  return shouldRender ? (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 pointer-events-none opacity-90"
    />
  ) : null;
};

export default NeuralBackground;
