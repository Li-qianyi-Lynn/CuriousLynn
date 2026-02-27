import React from 'react';

const steps = ['hero', 'projects', 'contact'];

const CuriosityMeter = ({ viewMode, explored }) => {
  const isEmpathy = viewMode === 'empathy';
  const total = steps.length;
  const completed = steps.filter((s) => explored[s]).length;
  const percent = (completed / total) * 100;

  return (
    <div className="fixed bottom-8 left-8 z-[90]">
      <div
        className={`px-4 py-3 rounded-2xl text-[10px] font-bold tracking-widest flex items-center gap-3 shadow-xl backdrop-blur-sm ${
          isEmpathy
            ? 'bg-white/80 text-rose-500 border border-rose-100'
            : 'bg-black/70 text-emerald-400 border border-emerald-900'
        }`}
      >
        <span className="uppercase">Curiosity Path</span>
        <div className="flex items-center gap-1">
          {steps.map((step) => (
            <span
              key={step}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                explored[step]
                  ? isEmpathy
                    ? 'bg-rose-400'
                    : 'bg-emerald-400'
                  : isEmpathy
                    ? 'bg-rose-100'
                    : 'bg-emerald-900'
              }`}
            />
          ))}
        </div>
        <div className="flex-1 h-[3px] rounded-full overflow-hidden bg-black/5">
          <div
            className={`h-full transition-all ${
              isEmpathy ? 'bg-rose-300' : 'bg-emerald-500'
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="opacity-60">
          {completed}/{total}
        </span>
      </div>
    </div>
  );
};

export default CuriosityMeter;

