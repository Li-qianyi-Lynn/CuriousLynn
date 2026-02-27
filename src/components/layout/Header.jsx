import React from 'react';
import { Brain, Cat, Code } from 'lucide-react';

const Header = ({ viewMode, scrolled, onToggleMode, onLogoClick }) => {
  const isEmpathy = viewMode === 'empathy';

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-8 py-5 flex justify-between items-center ${
        scrolled
          ? 'backdrop-blur-xl border-b border-opacity-10 ' +
            (isEmpathy
              ? 'border-rose-200 bg-white/80'
              : 'border-emerald-500 bg-black/80')
          : ''
      }`}
    >
      <button
        type="button"
        className="relative flex items-center gap-2 text-2xl font-black tracking-tighter group cursor-pointer"
        onClick={onLogoClick}
      >
        <Cat
          className={`transition-transform duration-300 group-hover:rotate-12 ${
            isEmpathy ? 'text-rose-400' : 'text-emerald-500'
          }`}
        />
        <span>
          CURIOUS
          <span className={isEmpathy ? 'text-rose-500' : 'text-white'}>
            LYNN
          </span>
        </span>
        <span className="sr-only">Go to top</span>
      </button>

      <div className="flex items-center gap-4">
        <button
          onClick={onToggleMode}
          className={`px-5 py-2 rounded-full border-2 transition-all flex items-center gap-2 text-sm font-bold ${
            isEmpathy
              ? 'border-rose-200 text-rose-600 hover:bg-rose-50'
              : 'border-emerald-500 text-emerald-400 hover:bg-emerald-500/10'
          }`}
        >
          {isEmpathy ? (
            <>
              <Code size={16} /> Switch to Logic Mode
            </>
          ) : (
            <>
              <Brain size={16} /> Switch to Empathy Mode
            </>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Header;

