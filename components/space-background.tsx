"use client";

import { useEffect, useRef, useState } from "react";

interface SpaceObject {
  id: number;
  type: "star" | "twinkle-star" | "floating-dot";
  left: string;
  top: string;
  initialTop: number;
  initialLeft: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
  parallaxSpeed: number;
}

function generateSpaceObjects(count: number): SpaceObject[] {
  const objects: SpaceObject[] = [];

  for (let i = 0; i < count; i++) {
    const rand = Math.random();
    let type: SpaceObject["type"];

    if (rand > 0.82) {
      type = "twinkle-star";
    } else if (rand > 0.7) {
      type = "floating-dot";
    } else {
      type = "star";
    }

    const top = Math.random() * 100;
    const left = Math.random() * 100;

    objects.push({
      id: i,
      type,
      left: `${left}%`,
      top: `${top}%`,
      initialTop: top,
      initialLeft: left,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      delay: Math.random() * 8,
      duration: Math.random() * 5 + 3,
      parallaxSpeed: Math.random() * 0.3 + 0.05,
    });
  }

  for (let i = 0; i < 15; i++) {
    const top = Math.random() * 100;
    const left = Math.random() * 100;

    objects.push({
      id: count + i,
      type: "floating-dot",
      left: `${left}%`,
      top: `${top}%`,
      initialTop: top,
      initialLeft: left,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
      delay: Math.random() * 10,
      duration: Math.random() * 6 + 4,
      parallaxSpeed: Math.random() * 0.2 + 0.03,
    });
  }

  return objects;
}

export function SpaceBackground({
  intensity = "normal",
}: {
  intensity?: "light" | "normal" | "dense";
}) {
  const count = intensity === "light" ? 30 : intensity === "dense" ? 80 : 50;

  const [objects, setObjects] = useState<SpaceObject[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const scrollRef = useRef(0);
  const frameRef = useRef<number>(0);
  const objectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setObjects(generateSpaceObjects(count));
  }, [count]);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const animate = () => {
      const scrollY = scrollRef.current;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      const containerRect = containerRef.current?.getBoundingClientRect();

      objects.forEach((obj, index) => {
        const el = objectRefs.current[index];
        if (!el) return;

        const parallaxOffset = scrollY * obj.parallaxSpeed * 0.08;
        let transform = `translateY(${parallaxOffset}px)`;

        if (obj.type === "floating-dot" && containerRect) {
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          const elX = (obj.initialLeft / 100) * viewportWidth;
          const elY = (obj.initialTop / 100) * viewportHeight + parallaxOffset;

          const distX = mouseX - elX;
          const distY = mouseY - elY;
          const distance = Math.sqrt(distX * distX + distY * distY);
          const maxDistance = 200;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const moveX = distX * force * 0.25;
            const moveY = distY * force * 0.25;
            transform = `translate(${moveX}px, ${parallaxOffset + moveY}px)`;
          }
        }

        el.style.transform = transform;
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, [objects]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {objects.map((obj, index) => {
        const starColor = obj.type === "twinkle-star"
          ? "rgba(212, 165, 174, 0.7)"
          : "rgba(232, 221, 224, 0.6)";

        return (
          <div
            key={obj.id}
            ref={(el) => {
              objectRefs.current[index] = el;
            }}
            className={`absolute rounded-full ${obj.type === "twinkle-star" ? "animate-twinkle" : ""} ${obj.type === "floating-dot" ? "animate-float-dot" : ""}`}
            style={{
              left: obj.left,
              top: obj.top,
              width: obj.size,
              height: obj.size,
              opacity: obj.opacity,
              backgroundColor: starColor,
              boxShadow:
                obj.type === "twinkle-star"
                  ? `0 0 ${obj.size * 2}px ${obj.size * 0.5}px rgba(212, 165, 174, 0.2)`
                  : undefined,
              animationDelay: `${obj.delay}s`,
              animationDuration:
                obj.type === "twinkle-star"
                  ? `${obj.duration}s`
                  : undefined,
            }}
          />
        );
      })}

      <FourPointStar
        className="absolute text-rose-300/40"
        size={20}
        style={{ left: "10%", top: "20%" }}
      />
      <FourPointStar
        className="absolute text-amber-300/30"
        size={14}
        style={{ right: "12%", top: "30%" }}
      />
      <FourPointStar
        className="absolute text-rose-200/25"
        size={18}
        style={{ left: "5%", bottom: "40%" }}
      />
      <FourPointStar
        className="absolute text-amber-200/20"
        size={16}
        style={{ right: "20%", top: "70%" }}
      />
    </div>
  );
}

function FourPointStar({
  className,
  size,
  style,
}: {
  className?: string;
  size: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={`${className} animate-pulse-slow`}
      style={style}
    >
      <path
        fill="currentColor"
        d="M20 0 L22 18 L40 20 L22 22 L20 40 L18 22 L0 20 L18 18 Z"
      />
    </svg>
  );
}
