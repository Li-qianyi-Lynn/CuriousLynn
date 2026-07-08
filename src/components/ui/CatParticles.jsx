import React from 'react';

// SVG paw print — no emoji
const PawSVG = ({ size, color }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main pad */}
    <ellipse cx="20" cy="29" rx="8" ry="6" />
    {/* Toe beans */}
    <ellipse cx="8"  cy="18" rx="4.5" ry="5.5" />
    <ellipse cx="16" cy="13" rx="4"   ry="5"   />
    <ellipse cx="24" cy="13" rx="4"   ry="5"   />
    <ellipse cx="32" cy="18" rx="4.5" ry="5.5" />
  </svg>
);

const PAWS = [
  { left: '4%',  delay: 0,   dur: 13, size: 16 },
  { left: '14%', delay: 2.8, dur: 9,  size: 12 },
  { left: '26%', delay: 5.2, dur: 12, size: 18 },
  { left: '38%', delay: 1.1, dur: 14, size: 13 },
  { left: '52%', delay: 3.7, dur: 10, size: 16 },
  { left: '65%', delay: 6.5, dur: 13, size: 11 },
  { left: '77%', delay: 2.3, dur: 11, size: 15 },
  { left: '90%', delay: 4.1, dur: 9,  size: 19 },
];

export default function CatParticles({ light = false }) {
  const color = light ? 'rgba(80,120,80,0.18)' : 'rgba(60,100,60,0.12)';
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {PAWS.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: p.left,
            bottom: '-8%',
            opacity: 0,
            animationName: 'floatPaw',
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
          }}
        >
          <PawSVG size={p.size} color={color} />
        </div>
      ))}
    </div>
  );
}
