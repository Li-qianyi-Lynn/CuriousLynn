import { ChevronRight } from 'lucide-react';
import React from 'react';
import lynnPhoto from '../../assets/lynn.jpg';

const Hero = ({ viewMode }) => {
  const isEmpathy = viewMode === 'empathy';

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const buttonClasses = isEmpathy
    ? 'bg-rose-400 hover:bg-rose-500 text-white shadow-lg shadow-rose-200'
    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold border-b-4 border-emerald-700 active:border-b-0';

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
          Hi, I'm Lynn. I build bridges between the human mind and the machine. A cat lover exploring the curious intersections of Tech and Psychology.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <button
            type="button"
            onClick={handleScrollToProjects}
            className={`px-10 py-4 rounded-2xl flex items-center gap-2 transition-all transform hover:-translate-y-1 ${buttonClasses}`}
          >
            My Projects <ChevronRight size={20} />
          </button>
          <a
            href="https://github.com/Li-qianyi-Lynn"
            target="_blank"
            rel="noreferrer"
            className={`px-10 py-4 rounded-2xl border-2 transition-all inline-block ${
              isEmpathy ? 'border-slate-200 hover:bg-slate-100' : 'border-emerald-900 hover:bg-emerald-900/30'
            }`}
          >
            GitHub
          </a>
        </div>
      </div>

      <div className="lg:col-span-5 relative group">
        {/* 猫耳朵彩蛋 - 仅在 Hover 时显现 */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
          <div className={`w-6 h-6 rotate-[-15deg] ${isEmpathy ? 'text-rose-300' : 'text-emerald-500'}`}>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z"/></svg>
          </div>
          <div className={`w-6 h-6 rotate-[15deg] ${isEmpathy ? 'text-rose-300' : 'text-emerald-500'}`}>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z"/></svg>
          </div>
        </div>

        {/* 照片容器 */}
        <div
          className={`relative z-10 aspect-[4/5] overflow-hidden transition-all duration-700 shadow-2xl ${
            isEmpathy
              ? 'rounded-[4rem] border-8 border-white bg-rose-50'
              : 'rounded-xl border-2 border-emerald-500 bg-slate-900 grayscale hover:grayscale-0'
          }`}
        >
          <img
            src={lynnPhoto}
            alt="Lynn's Portrait"
            className={`w-full h-full object-cover transition-all duration-700 ${!isEmpathy ? 'opacity-70 scale-105 group-hover:opacity-100 group-hover:scale-100' : 'opacity-100'}`}
          />

          {/* 逻辑模式下的覆盖层 (点阵和扫描线) */}
          {!isEmpathy && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,#000_100%)] opacity-40" />
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/20 animate-scan" />
              <div className="absolute bottom-4 right-4 text-[8px] font-mono text-emerald-500/50">LYNN_ID: 1024-PSYCH</div>
            </div>
          )}
        </div>

        {/* 背景装饰图案 */}
        <div
          className={`absolute -bottom-6 -right-6 w-32 h-32 rounded-full blur-2xl opacity-40 transition-colors ${
            isEmpathy ? 'bg-rose-400' : 'bg-emerald-600'
          }`}
        />
      </div>
    </section>
  );
};

export default Hero;

