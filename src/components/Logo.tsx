import React from 'react';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className, size = 40 }: LogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Glossy Black Background */}
      <rect x="5" y="5" width="90" height="90" rx="24" fill="black" />
      <rect x="5" y="5" width="90" height="90" rx="24" fill="url(#bg-gloss)" />
      
      {/* Outer Metallic Border */}
      <rect 
        x="6" 
        y="6" 
        width="88" 
        height="88" 
        rx="23" 
        stroke="url(#rim-border)" 
        strokeWidth="3.5"
      />
      
      {/* Thin inner black separator */}
      <rect 
        x="9.5" 
        y="9.5" 
        width="81" 
        height="81" 
        rx="20" 
        stroke="black" 
        strokeWidth="1.5"
      />

      {/* Silver Arch - Precision Path */}
      <path 
        d="M28 54C28 41.85 37.85 32 50 32C62.15 32 72 41.85 72 54" 
        stroke="url(#silver-arch)" 
        strokeWidth="9" 
        strokeLinecap="round"
      />
      
      {/* 4 Fluid Silver Waves */}
      <g stroke="url(#silver-waves)" strokeWidth="3.2" strokeLinecap="round">
        <path d="M26 60C32.5 58 40 64 50 60C60 56 67.5 62 74 60" />
        <path d="M24 67C31.5 65 39 71 50 67C61 63 68.5 69 76 67" />
        <path d="M25 74C32.5 72 40 78 50 74C60 70 67.5 76 75 74" />
        <path d="M27 81C33.5 79 41 85 50 81C59 77 66.5 83 73 81" />
      </g>

      <defs>
        {/* Background gloss */}
        <radialGradient id="bg-gloss" cx="50" cy="30" r="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1A1A1A" />
          <stop offset="1" stopColor="black" />
        </radialGradient>

        {/* Metallic rim */}
        <linearGradient id="rim-border" x1="6" y1="6" x2="94" y2="94" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="0.4" stopColor="#888" />
          <stop offset="0.6" stopColor="#666" />
          <stop offset="1" stopColor="#DDD" />
        </linearGradient>

        {/* Silver arch gradient */}
        <linearGradient id="silver-arch" x1="50" y1="32" x2="50" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="0.7" stopColor="#AAA" />
          <stop offset="1" stopColor="#888" />
        </linearGradient>

        {/* Silver waves gradient */}
        <linearGradient id="silver-waves" x1="24" y1="60" x2="76" y2="81" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="0.5" stopColor="#CCC" />
          <stop offset="1" stopColor="#999" />
        </linearGradient>
      </defs>
    </svg>
  );
}
