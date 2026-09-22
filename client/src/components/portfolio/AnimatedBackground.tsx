import React, { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const initialPositions = [
    { x: -4, y: 0 },
    { x: 30, y: 10 },
    { x: 15, y: -8 },
    { x: -20, y: 25 },
  ];

  useEffect(() => {
    let currentScroll = 0;
    let requestId: number;

    const handleScroll = () => {
      const newScroll = window.pageYOffset;
      currentScroll = newScroll;

      blobRefs.current.forEach((blob, index) => {
        if (!blob) return;
        const initialPos = initialPositions[index] || { x: 0, y: 0 };
        const xOffset = Math.sin(newScroll / 140 + index * 0.7) * 160;
        const yOffset = Math.cos(newScroll / 140 + index * 0.7) * 35;
        const x = initialPos.x + xOffset;
        const y = initialPos.y + yOffset;
        blob.style.transform = `translate(${x}px, ${y}px)`;
        blob.style.transition = "transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)";
      });

      requestId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white dark:bg-[#0B1114] transition-colors duration-300">
      
      <div className="absolute inset-0">
        <div
          ref={(el) => {
            blobRefs.current[0] = el;
          }}
          className="absolute -top-12 -left-16 w-[550px] h-[550px] rounded-full bg-[#E0F2F1] filter blur-[120px] opacity-70"
        />
        <div
          ref={(el) => {
            blobRefs.current[1] = el;
          }}
          className="absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-[#B2DFDB] filter blur-[130px] opacity-50 hidden sm:block"
        />
        <div
          ref={(el) => {
            blobRefs.current[2] = el;
          }}
          className="absolute bottom-1/3 -left-20 w-[520px] h-[520px] rounded-full bg-[#E0F2F1] filter blur-[120px] opacity-60"
        />
        <div
          ref={(el) => {
            blobRefs.current[3] = el;
          }}
          className="absolute -bottom-16 right-10 w-[580px] h-[580px] rounded-full bg-[#80CBC4] filter blur-[140px] opacity-40 hidden sm:block"
        />
      </div>

      
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 137, 123, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 137, 123, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}
