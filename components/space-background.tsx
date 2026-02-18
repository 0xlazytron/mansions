"use client";

import { useEffect, useRef, useState } from "react";

interface SpaceObject {
  id: number;
  type: "star" | "twinkle-star" | "nebula" | "shooting-star" | "floating-dot";
  left: string;
  top: string; // Stored as percentage string
  initialTop: number; // Stored as number (0-100) for calculations
  initialLeft: number; // Stored as number (0-100) for calculations
  size: number;
  opacity: number;
  delay: number;
  duration: number;
  parallaxSpeed: number;
  color?: string;
}

function generateSpaceObjects(count: number): SpaceObject[] {
  const objects: SpaceObject[] = [];

  // Regular stars
  for (let i = 0; i < count; i++) {
    const rand = Math.random();
    let type: SpaceObject["type"];

    if (rand > 0.7) {
      type = "twinkle-star";
    } else if (rand > 0.6) {
      type = "floating-dot";
    } else if (rand > 0.97) {
      type = "nebula";
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
      size:
        type === "nebula" ? Math.random() * 100 + 50 : Math.random() * 4 + 1,
      opacity: type === "nebula" ? 0.1 : Math.random() * 0.7 + 0.3,
      delay: Math.random() * 8,
      duration: Math.random() * 4 + 2,
      parallaxSpeed: Math.random() * 0.5 + 0.1,
      color:
        type === "nebula"
          ? ["#f97316", "#8b5cf6", "#ec4899"][Math.floor(Math.random() * 3)]
          : undefined,
    });
  }

  // Add extra floating dots
  for (let i = 0; i < 50; i++) {
    const top = Math.random() * 100;
    const left = Math.random() * 100;

    objects.push({
      id: count + i,
      type: "floating-dot",
      left: `${left}%`,
      top: `${top}%`,
      initialTop: top,
      initialLeft: left,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      delay: Math.random() * 10,
      duration: Math.random() * 6 + 4,
      parallaxSpeed: Math.random() * 0.3 + 0.05,
    });
  }

  // Add a few shooting stars
  for (let i = 0; i < 5; i++) {
    const top = Math.random() * 50;
    const left = Math.random() * 80;

    objects.push({
      id: count + 50 + i,
      type: "shooting-star",
      left: `${left}%`,
      top: `${top}%`,
      initialTop: top,
      initialLeft: left,
      size: 2,
      opacity: 0.8,
      delay: Math.random() * 15 + i * 4,
      duration: 1.5,
      parallaxSpeed: 0.8,
    });
  }

  return objects;
}

export function SpaceBackground({
  intensity = "normal",
}: {
  intensity?: "light" | "normal" | "dense";
}) {
  const count = intensity === "light" ? 60 : intensity === "dense" ? 200 : 120;

  // Initialize empty to match server render
  const [objects, setObjects] = useState<SpaceObject[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const scrollRef = useRef(0);
  const frameRef = useRef<number>(0);
  const objectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Generate objects only on client after mount to avoid hydration mismatch
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

      // Get container bounds to create relative coordinates
      const containerRect = containerRef.current?.getBoundingClientRect();
      const containerTop = containerRect?.top || 0;

      objects.forEach((obj, index) => {
        const el = objectRefs.current[index];
        if (!el) return;

        // Calculate base parallax offset
        const parallaxOffset = scrollY * obj.parallaxSpeed * 0.1;
        let transform = `translateY(${parallaxOffset}px)`;

        // Magnetic effect for floating dots
        if (obj.type === "floating-dot") {
          // Calculate element position relative to viewport
          // Approximate position based on initial % + parallax
          // This is an estimation since we don't query getBoundingClientRect per element per frame (expensive)

          // Current absolute position estimation
          // We can use the mouse position relative to window vs element position relative to window
          // Element Y = initialTop% * viewportHeight + parallaxOffset + containerTop
          // Element X = initialLeft% * viewportWidth

          if (containerRect) {
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;

            const elX = (obj.initialLeft / 100) * viewportWidth;
            const elY =
              (obj.initialTop / 100) * viewportHeight + parallaxOffset; // relative to container start (0 at top of hero usually)

            // Adjust to viewport coordinates considering container might be scrolled
            // Actually, if container is fixed/absolute covering screen, simple math works.
            // If it scrolls with page, we need to account for that.
            // SpaceBackground is absolute inset-0, so it scrolls with parent.
            // If parent is body/relative, it scrolls.

            // Since the container is fixed (per usage in page.tsx), the element's position relative to viewport
            // is simply its initial position plus the transform offset.
            // We do NOT subtract scrollY because the container itself doesn't move up with scroll.

            const screenX = elX;
            const screenY = elY; // Relative to viewport top

            const dx = mouseX - screenX;
            const dy = mouseY - screenY;

            const distX = mouseX - elX;
            const distY = mouseY - elY;

            const distance = Math.sqrt(distX * distX + distY * distY);
            const maxDistance = 250;

            if (distance < maxDistance) {
              const force = (maxDistance - distance) / maxDistance;
              const moveX = distX * force * 0.4; // 0.4 = strength
              const moveY = distY * force * 0.4;

              transform = `translate(${moveX}px, ${parallaxOffset + moveY}px)`;
            }
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
        return (
          <div
            key={obj.id}
            ref={(el) => {
              objectRefs.current[index] = el;
            }}
            className={`absolute rounded-full ${obj.type === "twinkle-star" ? "animate-twinkle" : ""} ${obj.type === "floating-dot" ? "animate-float-dot" : ""} ${obj.type === "shooting-star" ? "animate-shooting-star" : ""} ${obj.type === "nebula" ? "blur-3xl animate-pulse-slow" : "bg-white"}`}
            style={{
              left: obj.left,
              top: obj.top,
              width: obj.type === "shooting-star" ? 100 : obj.size,
              height: obj.type === "shooting-star" ? 2 : obj.size,
              opacity: obj.opacity,
              background:
                obj.type === "nebula"
                  ? `radial-gradient(circle, ${obj.color} 0%, transparent 70%)`
                  : obj.type === "shooting-star"
                    ? "linear-gradient(90deg, transparent, white, transparent)"
                    : undefined,
              boxShadow:
                obj.type === "twinkle-star"
                  ? `0 0 ${obj.size * 3}px ${obj.size}px rgba(255, 255, 255, 0.4)`
                  : undefined,
              animationDelay: `${obj.delay}s`,
              animationDuration:
                obj.type === "shooting-star" || obj.type === "twinkle-star"
                  ? `${obj.duration}s`
                  : undefined,
              transform:
                obj.type === "shooting-star" ? "rotate(45deg)" : undefined,
            }}
          />
        );
      })}

      {/* Decorative 4-pointed stars - kept static/CSS animated for simplicity, or could be added to refs for magnetism too */}
      <FourPointStar
        className="absolute text-orange-500"
        size={40}
        style={{
          left: "10%",
          top: "20%",
          transform: `translateY(${0}px)`, // Will require refactoring to animate via JS if needed
        }}
      />
      <FourPointStar
        className="absolute text-amber-500"
        size={20}
        style={{
          left: "15%",
          top: "25%",
        }}
      />
      <FourPointStar
        className="absolute text-orange-400"
        size={35}
        style={{
          right: "12%",
          top: "30%",
        }}
      />
      <FourPointStar
        className="absolute text-purple-500"
        size={25}
        style={{
          right: "8%",
          top: "35%",
        }}
      />
      <FourPointStar
        className="absolute text-rose-400"
        size={30}
        style={{
          left: "5%",
          bottom: "40%",
        }}
      />
      <FourPointStar
        className="absolute text-orange-300"
        size={45}
        style={{
          right: "5%",
          bottom: "35%",
        }}
      />
      <FourPointStar
        className="absolute text-amber-400"
        size={28}
        style={{
          left: "25%",
          top: "60%",
        }}
      />
      <FourPointStar
        className="absolute text-orange-500"
        size={32}
        style={{
          right: "20%",
          top: "70%",
        }}
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
