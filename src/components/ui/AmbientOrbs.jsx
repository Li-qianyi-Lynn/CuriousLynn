import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

/*
 * AmbientOrbs — glowing rings that float and respond to mouse movement.
 * Inspired by monakadesign.com's background animation.
 * Place inside a `position: relative; overflow: hidden` container.
 */
export default function AmbientOrbs({ opacity = 1 }) {
  const { isEmpathy } = useTheme();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const orbs = el.querySelectorAll('.amb-orb');

    const onMove = (e) => {
      const cx = e.clientX / window.innerWidth  - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;
      orbs.forEach((orb, i) => {
        const s = (i + 1) * 22;
        orb.style.translate = `${cx * s}px ${cy * s}px`;
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const orbs = isEmpathy ? [
    {
      w: 820, h: 820,
      left: '38%', top: '-30%',
      border: 'rgba(244, 114, 182, 0.28)',
      glow:   'rgba(244, 114, 182, 0.12)',
      animation: 'orbFloat1 26s ease-in-out infinite',
    },
    {
      w: 580, h: 580,
      left: '-18%', top: '18%',
      border: 'rgba(251, 146, 60, 0.22)',
      glow:   'rgba(251, 146, 60, 0.09)',
      animation: 'orbFloat2 34s ease-in-out infinite',
    },
    {
      w: 460, h: 460,
      left: '62%', top: '44%',
      border: 'rgba(251, 113, 133, 0.22)',
      glow:   'rgba(251, 113, 133, 0.09)',
      animation: 'orbFloat3 42s ease-in-out infinite',
    },
    {
      w: 320, h: 320,
      left: '22%', top: '55%',
      border: 'rgba(253, 186, 116, 0.18)',
      glow:   'rgba(253, 186, 116, 0.07)',
      animation: 'orbFloat2 50s ease-in-out infinite reverse',
    },
  ] : [
    {
      w: 820, h: 820,
      left: '38%', top: '-30%',
      border: 'rgba(74, 222, 128, 0.12)',
      glow:   'rgba(74, 222, 128, 0.06)',
      animation: 'orbFloat1 26s ease-in-out infinite',
    },
    {
      w: 580, h: 580,
      left: '-18%', top: '18%',
      border: 'rgba(52, 211, 153, 0.10)',
      glow:   'rgba(52, 211, 153, 0.05)',
      animation: 'orbFloat2 34s ease-in-out infinite',
    },
    {
      w: 460, h: 460,
      left: '62%', top: '44%',
      border: 'rgba(16, 185, 129, 0.10)',
      glow:   'rgba(16, 185, 129, 0.05)',
      animation: 'orbFloat3 42s ease-in-out infinite',
    },
    {
      w: 320, h: 320,
      left: '22%', top: '55%',
      border: 'rgba(110, 231, 183, 0.08)',
      glow:   'rgba(110, 231, 183, 0.04)',
      animation: 'orbFloat2 50s ease-in-out infinite reverse',
    },
  ];

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity }}
    >
      {orbs.map((o, i) => (
        <div
          key={i}
          className="amb-orb absolute rounded-full"
          style={{
            width:  o.w,
            height: o.h,
            left:   o.left,
            top:    o.top,
            border: `1px solid ${o.border}`,
            boxShadow: `0 0 50px ${o.glow}, 0 0 120px ${o.glow}, inset 0 0 50px ${o.glow}`,
            background: 'transparent',
            animation: o.animation,
            transition: 'translate 1.2s cubic-bezier(0.16,1,0.3,1)',
            willChange: 'translate',
          }}
        />
      ))}
    </div>
  );
}
