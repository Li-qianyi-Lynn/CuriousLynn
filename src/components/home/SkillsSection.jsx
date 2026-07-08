import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const HUMAN_SKILLS = [
  { label: 'Psychology & Behavioral Science' },
  { label: 'Social Work & Community Development' },
  { label: 'Human-Computer Interaction' },
  { label: 'UX Research & Empathy Mapping' },
  { label: 'Qualitative Research Methods' },
  { label: 'Cross-cultural Communication' },
];

const TECH_SKILLS = [
  { label: 'Java · Python · TypeScript · Go' },
  { label: 'React · Next.js · Spring Boot' },
  { label: 'PostgreSQL · MySQL · Redis' },
  { label: 'GCP · AWS · Docker · CI/CD' },
  { label: 'LangChain · RAG · Vector Search' },
  { label: 'Stripe · Prisma · FastAPI' },
];

function SkillBadge({ label, delay }) {
  const { isEmpathy } = useTheme();
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <div
      ref={ref}
      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
        isEmpathy
          ? 'bg-white border border-stone-100 text-stone-700 hover:border-rose-100 hover:text-rose-700 shadow-sm hover:shadow-md'
          : 'bg-white/[0.04] border border-white/8 text-stone-300 hover:bg-white/[0.08] hover:border-green-900/50'
      }`}
      style={{
        opacity:    isVisible ? 1 : 0,
        transform:  isVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, box-shadow 0.2s, border-color 0.2s`,
      }}
    >
      {label}
    </div>
  );
}

export default function SkillsSection() {
  const { isEmpathy } = useTheme();
  const { ref, isVisible } = useScrollReveal(0.05);

  return (
    <section
      className={`py-24 px-6 md:px-12 transition-colors duration-700 ${
        isEmpathy ? 'bg-white' : 'bg-[#0a120a]'
      }`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className="mb-14 text-center"
          style={{
            opacity:    isVisible ? 1 : 0,
            transform:  isVisible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <p className={`text-xs font-bold tracking-widest uppercase mb-4 ${isEmpathy ? 'text-rose-500' : 'text-green-400'}`}>
            — Skill Set
          </p>
          <h2
            className={`font-serif leading-tight ${isEmpathy ? 'text-stone-900' : 'text-white'}`}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Built From{' '}
            <em style={{ fontStyle: 'italic' }}>Both Sides.</em>
          </h2>
          <p className={`mt-2 text-xs tracking-widest ${isEmpathy ? 'text-stone-400' : 'text-stone-500'}`}>
            人文与技术，缺一不可
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 relative">
          {/* Divider */}
          <div className="hidden md:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex-col items-center pointer-events-none">
            <div className={`w-px flex-1 ${isEmpathy ? 'bg-gradient-to-b from-transparent via-rose-200 to-transparent' : 'bg-gradient-to-b from-transparent via-green-900/50 to-transparent'}`} />
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs border font-bold ${
              isEmpathy ? 'border-rose-200 bg-rose-50 text-rose-500' : 'border-green-800/50 bg-green-950/50 text-green-400'
            }`}>×</div>
            <div className={`w-px flex-1 ${isEmpathy ? 'bg-gradient-to-b from-transparent via-rose-200 to-transparent' : 'bg-gradient-to-b from-transparent via-green-900/50 to-transparent'}`} />
          </div>

          {/* Humanistic */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <h3 className={`text-lg font-semibold ${isEmpathy ? 'text-stone-900' : 'text-white'}`}>
                Humanistic
              </h3>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                isEmpathy ? 'bg-rose-100 text-rose-600' : 'bg-green-900/40 text-green-300'
              }`}>Foundation</span>
            </div>
            <div className="flex flex-col gap-2">
              {HUMAN_SKILLS.map((s, i) => (
                <SkillBadge key={s.label} label={s.label} delay={i * 70} />
              ))}
            </div>
          </div>

          {/* Technical */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <h3 className={`text-lg font-semibold ${isEmpathy ? 'text-stone-900' : 'text-white'}`}>
                Technical
              </h3>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                isEmpathy ? 'bg-rose-100 text-rose-600' : 'bg-green-900/40 text-green-300'
              }`}>Engineering</span>
            </div>
            <div className="flex flex-col gap-2">
              {TECH_SKILLS.map((s, i) => (
                <SkillBadge key={s.label} label={s.label} delay={i * 70} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
