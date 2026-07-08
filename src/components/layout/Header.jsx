import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Cat, Brain, Code, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const NAV_LINKS = [
  { to: '/about',    label: 'About'    },
  { to: '/projects', label: 'Projects' },
  { to: '/cats',     label: 'Cats'     },
];

export default function Header({ scrolled }) {
  const { isEmpathy, toggleMode } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const glassEmpathy = 'backdrop-blur-xl bg-white/90 border-b border-rose-100/60 shadow-sm';
  const glassLogic   = 'backdrop-blur-xl bg-[#070c07]/90 border-b border-white/5 shadow-sm';

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 md:px-10 py-4 flex justify-between items-center ${
        scrolled ? (isEmpathy ? glassEmpathy : glassLogic) : ''
      }`}
    >
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 text-xl font-bold tracking-tight group"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Cat
          size={22}
          className={`transition-transform duration-300 group-hover:rotate-12 ${
            isEmpathy ? 'text-rose-500' : 'text-green-400'
          }`}
        />
        <span className={isEmpathy ? 'text-stone-900' : 'text-white'}>
          CURIOUS
          <span className={isEmpathy ? 'text-rose-500' : 'text-green-400'}>LYNN</span>
        </span>
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-6">
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? isEmpathy ? 'text-rose-600 font-semibold' : 'text-green-400 font-semibold'
                  : isEmpathy ? 'text-stone-600 hover:text-rose-600' : 'text-stone-400 hover:text-green-400'
              }`
            }
          >
            {label}
          </NavLink>
        ))}

        <button
          onClick={toggleMode}
          className={`ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-bold tracking-wide transition-all duration-300 ${
            isEmpathy
              ? 'border-rose-200 text-rose-600 hover:bg-rose-50'
              : 'border-green-800/60 text-green-400 hover:bg-green-950/40'
          }`}
        >
          {isEmpathy
            ? <><Code size={13} /> Logic Mode</>
            : <><Brain size={13} /> Empathy Mode</>
          }
        </button>
      </div>

      {/* Mobile */}
      <button
        className={`md:hidden p-2 rounded-lg ${isEmpathy ? 'text-stone-700' : 'text-stone-300'}`}
        onClick={() => setMobileOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {mobileOpen && (
        <div
          className={`absolute top-full left-0 right-0 p-6 flex flex-col gap-4 shadow-xl ${
            isEmpathy
              ? 'bg-white/97 border-b border-rose-100/60'
              : 'bg-[#070c07]/97 border-b border-white/5'
          }`}
        >
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `text-base font-medium transition-colors ${
                  isActive
                    ? isEmpathy ? 'text-rose-600' : 'text-green-400'
                    : isEmpathy ? 'text-stone-600' : 'text-stone-400'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <button
            onClick={() => { toggleMode(); setMobileOpen(false); }}
            className={`mt-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-bold w-fit ${
              isEmpathy
                ? 'border-rose-200 text-rose-600'
                : 'border-green-800/60 text-green-400'
            }`}
          >
            {isEmpathy ? <><Code size={13} /> Logic Mode</> : <><Brain size={13} /> Empathy Mode</>}
          </button>
        </div>
      )}
    </nav>
  );
}
