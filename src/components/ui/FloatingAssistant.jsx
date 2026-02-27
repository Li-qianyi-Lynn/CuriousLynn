import React from 'react';
import { Cat } from 'lucide-react';

const FloatingAssistant = ({ viewMode, visible }) => {
  const isEmpathy = viewMode === 'empathy';

  return (
    <div
      className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <div
        className={`group relative p-4 rounded-full shadow-2xl flex items-center justify-center ${
          isEmpathy ? 'bg-rose-400 text-white' : 'bg-emerald-500 text-slate-900'
        }`}
      >
        <Cat size={24} />
        <div
          className={`absolute bottom-full mb-4 right-0 w-48 p-4 rounded-2xl text-[10px] font-bold transition-all opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 ${
            isEmpathy
              ? 'bg-white text-slate-800 shadow-xl'
              : 'bg-slate-800 text-emerald-400 border border-emerald-500'
          }`}
        >
          {isEmpathy
            ? 'Thinking about UX psychology? Leave a paw below!'
            : 'System status: Optimizing kitty.v2... All good!'}
          <div
            className={`absolute top-full right-6 border-8 border-transparent ${
              isEmpathy ? 'border-t-white' : 'border-t-slate-800'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default FloatingAssistant;

