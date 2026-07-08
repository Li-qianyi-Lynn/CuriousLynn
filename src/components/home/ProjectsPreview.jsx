import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Layout, Server } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const CATEGORIES = [
  {
    icon: Sparkles,
    title: 'AI + HCI',
    desc: 'Conversational AI, gesture detection, emotion-aware music — where LLMs meet human cognition.',
    count: 3,
  },
  {
    icon: Layout,
    title: 'Frontend Design',
    desc: 'Pixel-perfect, psychologically intuitive UIs. Motion, layout, and interaction design.',
    count: 3,
  },
  {
    icon: Server,
    title: 'Full-Stack',
    desc: 'End-to-end systems with real databases, auth, and cloud deploy — built to last.',
    count: 3,
  },
];

export default function ProjectsPreview() {
  const { isEmpathy } = useTheme();
  const { ref, isVisible } = useScrollReveal(0.05);

  return (
    <section
      className={`py-24 px-6 md:px-12 transition-colors duration-700 ${
        isEmpathy ? 'bg-white' : 'bg-[#070c07]'
      }`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
          style={{
            opacity:    isVisible ? 1 : 0,
            transform:  isVisible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div>
            <p className={`text-xs font-bold tracking-widest uppercase mb-4 ${isEmpathy ? 'text-rose-500' : 'text-green-400'}`}>
              — Project Domains
            </p>
            <h2
              className={`font-serif leading-tight ${isEmpathy ? 'text-stone-900' : 'text-white'}`}
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              What I <em style={{ fontStyle: 'italic' }}>Build.</em>
            </h2>
            <p className={`mt-2 text-xs tracking-widest ${isEmpathy ? 'text-stone-400' : 'text-stone-500'}`}>
              构建有意义的事物
            </p>
          </div>
          <Link
            to="/projects"
            className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
              isEmpathy ? 'text-rose-600 hover:text-rose-700' : 'text-green-400 hover:text-green-300'
            }`}
          >
            See All Projects <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.title}
              to="/projects"
              className={`group flex flex-col gap-4 p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                isEmpathy
                  ? 'bg-white border-stone-100 hover:border-rose-100 hover:shadow-lg'
                  : 'bg-white/[0.03] border-white/8 hover:bg-white/[0.06] hover:border-green-900/40'
              }`}
              style={{
                opacity:    isVisible ? 1 : 0,
                transform:  isVisible ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 120 + 200}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 120 + 200}ms, box-shadow 0.3s, translate 0.3s`,
              }}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isEmpathy ? 'bg-rose-50' : 'bg-green-950/50'}`}>
                <cat.icon size={20} className={isEmpathy ? 'text-rose-500' : 'text-green-400'} />
              </div>
              <div className="flex items-start justify-between gap-3">
                <h3 className={`text-lg font-semibold ${isEmpathy ? 'text-stone-900' : 'text-white'}`}>{cat.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                  isEmpathy ? 'bg-rose-100 text-rose-600' : 'bg-green-900/40 text-green-300'
                }`}>
                  {cat.count} projects
                </span>
              </div>
              <p className={`text-sm leading-relaxed ${isEmpathy ? 'text-stone-500' : 'text-stone-400'}`}>
                {cat.desc}
              </p>
              <div className={`mt-auto inline-flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all ${
                isEmpathy ? 'text-rose-500' : 'text-green-400'
              }`}>
                Explore <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
