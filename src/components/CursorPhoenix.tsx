'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const PhoenixIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    className={cn("overflow-visible", className)}
    {...props}
  >
    <defs>
      <linearGradient id="phoenixGradient" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#FFFBEB" />
        <stop offset="40%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <filter id="phoenixGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
        <feFlood floodColor="#FBBF24" floodOpacity="0.5" result="flood" />
        <feComposite in="flood" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#phoenixGlow)">
      {/* Sparkles */}
      <path fill="#FEF9C3" d="M83 75 l 2 -4 l 2 4 l 4 2 l -4 2 l -2 4 l -2 -4 l -4 -2 l 4 -2 z" opacity="0.9" />
      <path fill="#FEF9C3" d="M78 95 l 1.5 -3 l 1.5 3 l 3 1.5 l -3 1.5 l -1.5 3 l -1.5 -3 l -3 -1.5 l 3 -1.5 z" opacity="0.7" />
      <path fill="#FEF9C3" d="M90 125 l 1 -2 l 1 2 l 2 1 l -2 1 l -1 2 l -1 -2 l -2 -1 l 2 -1 z" opacity="0.8" />
      <path fill="#FEF9C3" d="M105 155 l 2 -4 l 2 4 l 4 2 l -4 2 l -2 4 l -2 -4 l -4 -2 l 4 -2 z" opacity="0.9" />
      <path fill="#FEF9C3" d="M125 150 l 1 -2 l 1 2 l 2 1 l -2 1 l -1 2 l -1 -2 l -2 -1 l 2 -1 z" opacity="0.7" />
      {/* Main Phoenix */}
      <g stroke="#92400E" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Tail */}
        <path
          className="animate-wing-flap-delay"
          fill="url(#phoenixGradient)"
          d="M118 128 Q 115 150 120 170 C 110 165, 105 150, 108 135 C 110 145, 115 140, 118 128 Z"
        />
        <path
          className="animate-wing-flap-delay"
          fill="url(#phoenixGradient)"
          d="M108 135 C 100 160, 105 185, 100 190 C 95 170, 100 150, 105 130 Q 107 132, 108 135 Z"
        />
        <path
          className="animate-wing-flap-delay"
          fill="url(#phoenixGradient)"
          d="M105 130 C 95 150, 90 170, 80 180 C 85 160, 90 145, 100 125 Q 102 128, 105 130 Z"
        />
        {/* Body and Head */}
        <path
          fill="url(#phoenixGradient)"
          d="M112 130 C 120 110, 130 90, 145 78 C 150 85, 152 95, 148 105 C 140 120, 125 130, 112 130 Z"
        />
        <path
          fill="url(#phoenixGradient)"
          d="M145 78 C 152 75, 160 78, 162 85 C 158 80, 152 80, 145 78 Z"
        />
        {/* Wings with animation */}
        <g className="animate-wing-flap origin-bottom-right">
          <path
            fill="url(#phoenixGradient)"
            d="M120 70 C 100 50, 70 45, 50 60 C 70 65, 95 75, 120 70 Z"
          />
          <path
            fill="url(#phoenixGradient)"
            d="M122 78 C 100 65, 75 65, 60 75 C 80 78, 100 82, 122 78 Z"
          />
        </g>
        <g className="animate-wing-flap-slow origin-bottom-right">
          <path
            fill="url(#phoenixGradient)"
            d="M125 88 C 105 80, 85 82, 70 90 C 90 90, 110 92, 125 88 Z"
          />
          <path
            fill="url(#phoenixGradient)"
            d="M128 98 C 110 95, 95 98, 80 105 C 100 105, 115 105, 128 98 Z"
          />
          <path
            fill="url(#phoenixGradient)"
            d="M130 110 C 115 110, 100 112, 90 120 C 105 118, 120 115, 130 110 Z"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default function CursorPhoenix() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible]);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999] transition-transform duration-75 ease-out hidden md:block"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <PhoenixIcon className="h-12 w-12 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
