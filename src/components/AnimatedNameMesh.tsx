"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

export default function AnimatedNameMesh() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const texts = ["JavaScript", "TypeScript", "Tailwind CSS", "React / Next.js", "HTML5 & CSS3", "Figma / Adobe XD"];
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    ctx.clearRect(0, 0, width, height);

    // Render text to pixel data to get particle targets
    const getTargetPoints = (text: string): Particle[] => {
      ctx.clearRect(0, 0, width, height);
      const fontSize = Math.max(12, Math.floor(height * 0.3));
ctx.font = `bold ${fontSize}px Arial`;

      ctx.textAlign = "center";
      ctx.fillStyle = "white";
      ctx.fillText(text, width / 2, height / 1.5);

      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      const result: Particle[] = [];

      for (let y = 0; y < height; y += 4) {
        for (let x = 0; x < width; x += 6) {
          const index = (y * width + x) * 4;
          if (data[index + 3] > 128) {
            result.push({
              x: Math.random() * width,
              y: Math.random() * height,
              targetX: x,
              targetY: y,
            });
          }
        }
      }

      return result;
    };

    let frameId: number;

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles.current) {
        // Move x
        p.x += (p.targetX - p.x) * 0.1;
        p.y += (p.targetY - p.y) * 0.1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "#60A5FA";
        ctx.fill();
      }
      frameId = requestAnimationFrame(animateParticles);
    };

    // Initial draw
    particles.current = getTargetPoints(texts[currentTextIndex]);
    animateParticles();

    // Update particles every 2s
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 2000);

    // Resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles.current = getTargetPoints(texts[currentTextIndex]);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // When text index changes, update target positions only
  useEffect(() => {
    setTimeout(() => window.dispatchEvent(new Event("resize")), 0);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const updateTargetPoints = (text: string) => {
      ctx.clearRect(0, 0, width, height);
      const fontSize = Math.max(10, Math.floor(width / 8));
ctx.font = `bold ${fontSize}px Arial`;
      ctx.textAlign = "center";
      ctx.fillStyle = "white";
      ctx.fillText(text, width / 2, height / 1.5);

      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      let i = 0;
      for (let y = 0; y < height; y += 4) {
        for (let x = 0; x < width; x += 6) {
          const index = (y * width + x) * 4;
          if (data[index + 3] > 128) {
            if (particles.current[i]) {
              particles.current[i].targetX = x;
              particles.current[i].targetY = y;
            } else {
              particles.current.push({
                x: Math.random() * width,
                y: Math.random() * height,
                targetX: x,
                targetY: y,
              });
            }
            i++;
          }
        }
      }

      // Remove excess particles
      particles.current.length = i;
    };

    updateTargetPoints(texts[currentTextIndex]);
  }, [currentTextIndex]);

  return <canvas ref={canvasRef} className="w-full h-24 sm:h-28 md:h-32 lg:h-36" />
  ;
}


