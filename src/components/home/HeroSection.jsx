import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, ChevronDown, ExternalLink } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import AmbientOrbs from '../ui/AmbientOrbs';

const ROLES = [
  'Software Engineer @ TMind.AI',
  'AI + HCI Enthusiast',
  'Full-Stack Developer',
  'Psych × Code Explorer',
  'Cat Enthusiast',
];

function TypewriterCycle() {
  const { isEmpathy } = useTheme();
  const [idx, setIdx]     = useState(0);
  const [chars, setChars] = useState('');
  const [phase, setPhase] = useState('type');

  useEffect(() => {
    const text = ROLES[idx];
    let t;
    if (phase === 'type') {
      if (chars.length < text.length) {
        t = setTimeout(() => setChars(text.slice(0, chars.length + 1)), 65);
      } else {
        t = setTimeout(() => setPhase('hold'), 2400);
      }
    } else if (phase === 'hold') {
      t = setTimeout(() => setPhase('delete'), 50);
    } else {
      if (chars.length > 0) {
        t = setTimeout(() => setChars((c) => c.slice(0, -1)), 32);
      } else {
        setIdx((i) => (i + 1) % ROLES.length);
        setPhase('type');
      }
    }
    return () => clearTimeout(t);
  }, [chars, phase, idx]);

  return (
    <span>
      {chars}
      <span className={`animate-pulse font-thin ${isEmpathy ? 'text-rose-400' : 'text-green-400'}`}>|</span>
    </span>
  );
}

const COMPETENCIES = [
  { label: 'Empathy',          value: 88 },
  { label: 'Active Listening', value: 76 },
  { label: 'Reflection',       value: 92 },
  { label: 'Professionalism',  value: 84 },
];

function AIClientCard() {
  const { isEmpathy } = useTheme();
  return (
    <div className={`rounded-2xl overflow-hidden shadow-2xl border transition-colors duration-700 ${
      isEmpathy ? 'bg-white/80 backdrop-blur-sm border-stone-100' : 'bg-[#0d180d]/90 backdrop-blur-sm border-green-900/30'
    }`}>
      {/* Window chrome */}
      <div className={`px-4 py-2.5 flex items-center gap-2 border-b ${
        isEmpathy ? 'bg-stone-50/80 border-stone-100' : 'bg-[#0a120a]/80 border-green-900/20'
      }`}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        </div>
        <span className={`text-xs font-mono ml-1.5 ${isEmpathy ? 'text-stone-400' : 'text-stone-500'}`}>
          tmind.ai · AI Client Interface
        </span>
      </div>

      <div className="p-5">
        {/* Client profile */}
        <div className="flex items-start gap-3 mb-4">
          <div className={`w-11 h-11 rounded-full flex items-center justify-center text-base font-bold border-2 shrink-0 ${
            isEmpathy ? 'bg-rose-100 border-rose-200 text-rose-600' : 'bg-green-950/60 border-green-800/60 text-green-400'
          }`}>M</div>
          <div className="flex-1 min-w-0">
            <p className={`font-semibold leading-tight ${isEmpathy ? 'text-stone-900' : 'text-white'}`}>Maya, 31</p>
            <p className={`text-xs mt-0.5 ${isEmpathy ? 'text-stone-400' : 'text-stone-500'}`}>Generalized Anxiety · First session</p>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0 border ${
            isEmpathy ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-amber-950/30 text-amber-400 border-amber-800/30'
          }`}>AI Client</span>
        </div>

        {/* Presenting concern */}
        <div className={`rounded-xl p-3 mb-4 text-xs leading-relaxed border ${
          isEmpathy ? 'bg-stone-50 border-stone-100' : 'bg-white/[0.04] border-white/8'
        }`}>
          <span className={`font-semibold ${isEmpathy ? 'text-stone-400' : 'text-stone-500'}`}>Concern: </span>
          <span className={isEmpathy ? 'text-stone-700' : 'text-stone-300'}>
            "I've been overwhelmed at work. Hard to focus, keep second-guessing myself."
          </span>
        </div>

        {/* Competency bars */}
        <p className={`text-[10px] font-bold tracking-widest uppercase mb-2.5 ${
          isEmpathy ? 'text-stone-400' : 'text-stone-500'
        }`}>Trainee Competencies</p>
        <div className="space-y-2">
          {COMPETENCIES.map(({ label, value }) => (
            <div key={label}>
              <div className="flex justify-between text-xs mb-1">
                <span className={isEmpathy ? 'text-stone-500' : 'text-stone-400'}>{label}</span>
                <span className={`font-mono text-[10px] ${isEmpathy ? 'text-rose-500' : 'text-green-400'}`}>{value}%</span>
              </div>
              <div className={`h-1.5 rounded-full overflow-hidden ${isEmpathy ? 'bg-stone-100' : 'bg-white/10'}`}>
                <div
                  className={`h-full rounded-full ${
                    isEmpathy ? 'bg-gradient-to-r from-rose-400 to-pink-300' : 'bg-gradient-to-r from-green-500 to-emerald-400'
                  }`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className={`px-5 py-3 border-t flex items-center justify-between ${
        isEmpathy ? 'bg-stone-50/80 border-stone-100' : 'bg-[#0a120a]/80 border-green-900/20'
      }`}>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className={`text-[10px] font-medium ${isEmpathy ? 'text-stone-400' : 'text-stone-500'}`}>
            Evaluation framework · in development
          </span>
        </div>
        <a href="https://tmind.ai" target="_blank" rel="noreferrer"
          className={`text-[10px] flex items-center gap-0.5 transition-colors ${
            isEmpathy ? 'text-rose-400 hover:text-rose-600' : 'text-green-500 hover:text-green-300'
          }`}>
          tmind.ai <ExternalLink size={9} />
        </a>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const { isEmpathy } = useTheme();
  const { ref, isVisible } = useScrollReveal(0);

  return (
    <section
      ref={ref}
      className={`relative min-h-screen flex items-center overflow-hidden transition-colors duration-700 ${
        isEmpathy ? 'bg-white' : 'bg-[#070c07]'
      }`}
    >
      <AmbientOrbs />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pt-28 pb-16 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

        {/* ── Left: Text ── */}
        <div
          style={{
            opacity:    isVisible ? 1 : 0,
            transform:  isVisible ? 'translateY(0)' : 'translateY(36px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          }}
          className="space-y-6"
        >
          {/* Status badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border ${
            isEmpathy
              ? 'border-rose-200 bg-rose-50/80 text-rose-600'
              : 'border-green-800/50 bg-green-950/30 text-green-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isEmpathy ? 'bg-rose-400' : 'bg-green-400'}`} />
            Open to Opportunities · Seattle, WA
          </div>

          {/* Headline — monakadesign style: serif + italic word */}
          <div className="space-y-1">
            <h1
              className={`font-serif leading-[1.05] ${isEmpathy ? 'text-stone-900' : 'text-white'}`}
              style={{ fontSize: 'clamp(3.4rem, 7.5vw, 6rem)' }}
            >
              Where{' '}
              <em className={`not-italic font-serif ${isEmpathy ? 'text-gradient-empathy' : 'text-gradient-logic'}`}
                  style={{ fontStyle: 'italic' }}>
                Humans
              </em>
              <br />
              Meet Machines.
            </h1>
            {/* Chinese subtitle */}
            <p className={`text-sm tracking-widest ${isEmpathy ? 'text-stone-400' : 'text-stone-500'}`}>
              以人文温度，探索智能边界
            </p>
          </div>

          {/* Typewriter */}
          <div className={`text-base font-medium h-6 ${isEmpathy ? 'text-stone-500' : 'text-stone-400'}`}>
            <TypewriterCycle />
          </div>

          {/* Bio */}
          <p className={`text-sm leading-relaxed max-w-lg ${isEmpathy ? 'text-stone-600' : 'text-stone-400'}`}>
            From studying human behavior in Hong Kong to engineering AI platforms in Seattle —
            I bridge{' '}
            <span className={`font-semibold ${isEmpathy ? 'text-rose-600' : 'text-green-400'}`}>psychology</span>
            {' '}with{' '}
            <span className={`font-semibold ${isEmpathy ? 'text-rose-500' : 'text-green-500'}`}>intelligent systems</span>.
          </p>

          {/* Tag pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Psychology',     e: 'bg-rose-50 text-rose-600 border border-rose-200',    l: 'bg-green-950/50 text-green-300 border border-green-800/40' },
              { label: 'AI Engineering', e: 'bg-pink-50 text-rose-700 border border-rose-100',    l: 'bg-green-900/30 text-green-400 border border-green-800/40' },
              { label: 'Cat Sitter',     e: 'bg-stone-100 text-stone-700 border border-stone-200',l: 'bg-stone-800/50 text-stone-300 border border-stone-700/40' },
            ].map((t) => (
              <span key={t.label} className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${isEmpathy ? t.e : t.l}`}>
                {t.label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="#featured"
              onClick={(e) => { e.preventDefault(); document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 hover:-translate-y-1 ${
                isEmpathy
                  ? 'bg-gradient-to-r from-rose-500 to-pink-400 text-white shadow-lg shadow-rose-200/50 hover:shadow-rose-300/60'
                  : 'bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg shadow-green-900/50'
              }`}
            >
              Explore My Work <ArrowRight size={16} />
            </a>
            <a
              href="https://github.com/Li-qianyi-Lynn"
              target="_blank" rel="noreferrer"
              className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border text-sm font-medium transition-all duration-300 hover:-translate-y-1 ${
                isEmpathy
                  ? 'border-stone-200 text-stone-700 hover:bg-white/60'
                  : 'border-stone-700 text-stone-300 hover:bg-stone-800/50'
              }`}
            >
              <Github size={16} /> GitHub
            </a>
          </div>
        </div>

        {/* ── Right: AI Client Card ── */}
        <div
          style={{
            opacity:    isVisible ? 1 : 0,
            transform:  isVisible ? 'translateY(0)' : 'translateY(36px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s',
          }}
          className="relative"
        >
          <div className={`absolute -inset-6 rounded-3xl blur-3xl opacity-30 pointer-events-none ${
            isEmpathy ? 'bg-rose-200' : 'bg-green-800/30'
          }`} />
          <div className="relative z-10 max-w-sm mx-auto lg:max-w-none">
            <AIClientCard />
          </div>
          <p className={`text-center text-xs mt-4 font-medium ${isEmpathy ? 'text-stone-400' : 'text-stone-600'}`}>
            AI client interface I designed at TMind.AI
          </p>
        </div>
      </div>

      {/* Scroll cue */}
      <div className={`absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none ${
        isEmpathy ? 'text-stone-400' : 'text-stone-600'
      }`}>
        <span className="text-[10px] font-semibold tracking-widest uppercase">Scroll</span>
        <ChevronDown size={15} className="animate-bounce" />
      </div>
    </section>
  );
}
