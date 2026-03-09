"use client";

import { useEffect, useState, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorColor, setCursorColor] = useState({ hue: 180, saturation: 70, lightness: 50 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isMoving, setIsMoving] = useState(false);
  const requestRef = useRef<number>();
  const moveTimeoutRef = useRef<NodeJS.Timeout>();
  const trailIdRef = useRef(0);

  useEffect(() => {
    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;
      
      setMousePosition({ x: newX, y: newY });
      
      // Calculate dynamic color based on position and movement
      const hue = (newX / window.innerWidth) * 360;
      const saturation = 60 + (newY / window.innerHeight) * 40;
      const lightness = isHovering ? 60 : 50;
      
      setCursorColor({ hue, saturation, lightness });

      // Add trail point
      setTrail(prev => {
        const newTrail = [...prev, { x: newX, y: newY, id: trailIdRef.current++ }];
        return newTrail.slice(-8); // Keep last 8 points
      });

      // Set moving state
      setIsMoving(true);
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
      moveTimeoutRef.current = setTimeout(() => setIsMoving(false), 100);
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'H1' ||
        target.tagName === 'H2' ||
        target.tagName === 'H3' ||
        target.tagName === 'H4' ||
        target.tagName === 'H5' ||
        target.tagName === 'H6' ||
        target.tagName === 'P' ||
        target.tagName === 'SPAN' ||
        target.tagName === 'LI' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', updateMousePosition);

    const elements = document.querySelectorAll(
      'a, button, input, textarea, select, h1, h2, h3, h4, h5, h6, p, span, li, [class*="cursor-pointer"]'
    );

    elements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Smooth following animation
    const animate = () => {
      setCursorPosition((prev) => {
        const dx = mousePosition.x - prev.x;
        const dy = mousePosition.y - prev.y;
        return {
          x: prev.x + dx * 0.12,
          y: prev.y + dy * 0.12,
        };
      });
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
    };
  }, [mousePosition.x, mousePosition.y, isHovering]);

  if (!isVisible) return null;

  const mainColor = `hsl(${cursorColor.hue}, ${cursorColor.saturation}%, ${cursorColor.lightness}%)`;
  const glowColor = `hsla(${cursorColor.hue}, ${cursorColor.saturation}%, ${cursorColor.lightness}%, 0.6)`;
  const shadowColor = `hsla(${cursorColor.hue}, ${cursorColor.saturation}%, ${cursorColor.lightness}%, 0.3)`;
  const trailColor = `hsla(${cursorColor.hue}, ${cursorColor.saturation}%, ${cursorColor.lightness}%, 0.15)`;

  return (
    <>
      {/* Trail particles */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="cursor-trail-particle"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            width: `${4 + index * 2}px`,
            height: `${4 + index * 2}px`,
            background: `radial-gradient(circle, ${glowColor}, ${trailColor})`,
            opacity: (index / trail.length) * 0.6,
          }}
        />
      ))}

      {/* Outer glow ring */}
      <div
        className="cursor-outer-glow"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          width: '100px',
          height: '100px',
          background: `radial-gradient(circle, ${shadowColor} 0%, transparent 70%)`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      />

      {/* Main outer circle */}
      <div
        className="custom-cursor-circle"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          width: '40px',
          height: '40px',
          border: `2px solid ${mainColor}`,
          boxShadow: isHovering 
            ? `0 0 30px ${glowColor}, 0 0 60px ${shadowColor}, inset 0 0 20px ${shadowColor}` 
            : `0 0 20px ${glowColor}, 0 0 40px ${shadowColor}`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.4 : 1}) rotate(${isMoving ? '45deg' : '0deg'})`,
        }}
      />

      {/* Inner ring */}
      <div
        className="cursor-inner-ring"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          width: '20px',
          height: '20px',
          border: `2px solid ${mainColor}`,
          opacity: isHovering ? 0.8 : 0.4,
          transform: `translate(-50%, -50%) scale(${isHovering ? 0.8 : 0.6}) rotate(${isMoving ? '-45deg' : '0deg'})`,
        }}
      />

      {/* Center dot with pulse */}
      <div
        className="custom-cursor-dot"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          width: '8px',
          height: '8px',
          background: `radial-gradient(circle, ${mainColor}, ${glowColor})`,
          boxShadow: `0 0 15px ${glowColor}, 0 0 30px ${shadowColor}`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      />

      {/* Pulsing effect when hovering */}
      {isHovering && (
        <div
          className="cursor-pulse"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            width: '40px',
            height: '40px',
            border: `2px solid ${mainColor}`,
          }}
        />
      )}
    </>
  );
}
