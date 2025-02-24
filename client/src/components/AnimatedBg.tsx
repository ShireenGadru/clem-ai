import React, { useEffect, useRef } from "react";

// This is a separate component for the animated background
export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Animation variables
    let time = 0;

    // Gradient colors
    const darkGreen = "#052e16"; // Very dark green
    const mediumGreen = "#065f46"; // Dark emerald
    const black = "#000000";

    // Animation loop
    const animate = () => {
      time += 0.005;

      // Create gradient that slowly shifts
      const gradientX = Math.sin(time) * 0.5 + 0.5;
      const gradientY = Math.cos(time * 0.8) * 0.5 + 0.5;

      const gradient = ctx.createRadialGradient(
        canvas.width * gradientX,
        canvas.height * gradientY,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.8
      );

      gradient.addColorStop(0, mediumGreen);
      gradient.addColorStop(0.5, darkGreen);
      gradient.addColorStop(1, black);

      // Fill background
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Optional: Add subtle particle effect
      const particleCount = 20;
      for (let i = 0; i < particleCount; i++) {
        const x =
          Math.sin(time * (i * 0.1) + i) * canvas.width * 0.5 +
          canvas.width * 0.5;
        const y =
          Math.cos(time * (i * 0.1) + i) * canvas.height * 0.5 +
          canvas.height * 0.5;
        const size = Math.sin(time + i) * 2 + 2;
        const alpha = Math.sin(time + i) * 0.05 + 0.05;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 128, ${alpha})`;
        ctx.fill();
      }

      animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};
