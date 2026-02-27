import React from 'react';
import { Cat, ChevronRight } from 'lucide-react';

const Hero = ({ viewMode }) => {
  const isEmpathy = viewMode === 'empathy';

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-40 pb-24 px-8 max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
      <div className="lg:col-span-7 space-y-8 relative">
        <div
          className={`inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase ${
            isEmpathy ? 'bg-rose-100 text-rose-600' : 'bg-emerald-900/30 text-emerald-500'
          }`}
        >
          {isEmpathy ? 'Human-Centered Developer' : 'System Architect & Researcher'}
        </div>
        <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight">
          {isEmpathy ? 'Pawsitive' : 'Systematic'}
          <br />
          <span className={isEmpathy ? 'text-rose-500' : 'text-white'}>
            {isEmpathy ? 'Innovations.' : 'Execution.'}
          </span>
        </h1>
        <p className="text-xl max-w-xl leading-relaxed opacity-80">
          I'm Lynn, a developer who thinks like a psychologist and acts like a cat—curious,
          precise, and always landing on my feet.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <button
            type="button"
            onClick={handleScrollToProjects}
            className={`px-10 py-4 rounded-2xl flex items-center gap-2 transition-all transform hover:-translate-y-1 ${
              isEmpathy
                ? 'bg-rose-400 hover:bg-rose-500 text-white shadow-lg shadow-rose-200'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold border-b-4 border-emerald-700 active:border-b-0'
            }`}
          >
            View My Work <ChevronRight size={20} />
          </button>
          <a
            href="https://github.com/Li-qianyi-Lynn"
            target="_blank"
            rel="noreferrer"
            className={`px-10 py-4 rounded-2xl border-2 transition-all inline-block ${
              isEmpathy ? 'border-slate-200 hover:bg-slate-100' : 'border-emerald-900 hover:bg-emerald-900/30'
            }`}
          >
            GitHub Profile
          </a>
        </div>
      </div>

      <div className="lg:col-span-5 relative">
        <div
          className={`absolute -inset-10 rounded-full blur-3xl opacity-20 animate-pulse ${
            isEmpathy ? 'bg-rose-400' : 'bg-emerald-600'
          }`}
        />
        <div
          className={`relative z-10 aspect-square rounded-[3rem] overflow-hidden border-8 transition-all duration-500 ${
            isEmpathy
              ? 'border-white bg-rose-50/50 shadow-2xl'
              : 'border-emerald-500/20 bg-slate-900 shadow-2xl shadow-emerald-500/10'
          }`}
        >
          <div className="w-full h-full flex flex-col items-center justify-center p-10">
            {isEmpathy ? (
              <div className="text-center space-y-6">
                <Cat className="w-24 h-24 text-rose-400 mx-auto" />
                <p className="text-lg font-serif italic text-rose-700/60">
                  "Curiosity is the engine of empathy."
                </p>
              </div>
            ) : (
              <div className="w-full font-mono text-[10px] md:text-xs space-y-2 opacity-80">
                <div className="text-emerald-500">lynn@cat-os:~$ system_diagnostic</div>
                <div>{'>'} MOOD: CURIOUS_LOGIC</div>
                <div>{'>'} STATUS: PURRING_OPTIMIZED</div>
                <div className="py-2 border-y border-emerald-900/50 my-2">
                  {'for cat in world:'}
                  <br />
                  {'  if cat.curious:'}
                  <br />
                  {'    cat.explore(code)'}
                  <br />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

