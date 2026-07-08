import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import miaoHomeImg from '../../assets/miaoHome.png';
import tmindAIImg from '../../assets/tmindAI.png';
import AmbientOrbs from '../ui/AmbientOrbs';

/* ── Visual: TMind screenshot ───────────────────────── */
function TMindVisual() {
  const { isEmpathy } = useTheme();
  return (
    <div className={`rounded-2xl overflow-hidden border h-full min-h-[220px] ${
      isEmpathy ? 'border-stone-200' : 'border-stone-800'
    }`}>
      <img src={tmindAIImg} alt="TMind.AI Platform" className="w-full h-full object-cover object-top" />
    </div>
  );
}

/* ── Visual: About journey cards ────────────────────── */
function AboutVisual() {
  const { isEmpathy } = useTheme();
  const steps = [
    { year: '2017–21', school: 'Hong Kong Baptist University', degree: 'BS Social Work', gpa: 'GPA 3.73' },
    { year: '2024–27', school: 'Northeastern University',      degree: 'MS Info Systems', gpa: 'GPA 3.85' },
  ];
  return (
    <div className="flex flex-col gap-4 h-full justify-center">
      {steps.map((s, i) => (
        <React.Fragment key={s.school}>
          <div className={`rounded-xl p-5 ${
            isEmpathy ? 'bg-rose-50/60 border border-rose-100' : 'bg-green-950/40 border border-green-900/40'
          }`}>
            <div className={`text-xs font-mono mb-1 ${isEmpathy ? 'text-rose-500' : 'text-green-500'}`}>{s.year}</div>
            <div className={`font-semibold text-sm ${isEmpathy ? 'text-stone-900' : 'text-white'}`}>{s.school}</div>
            <div className={`text-xs mt-0.5 ${isEmpathy ? 'text-stone-500' : 'text-stone-400'}`}>{s.degree}</div>
            <div className={`text-xs mt-1 font-semibold ${isEmpathy ? 'text-rose-600' : 'text-green-400'}`}>{s.gpa}</div>
          </div>
          {i === 0 && (
            <div className={`flex items-center gap-2 self-center text-xs font-medium ${isEmpathy ? 'text-rose-500' : 'text-green-500'}`}>
              <div className={`w-px h-5 ${isEmpathy ? 'bg-rose-300' : 'bg-green-700'}`} />
              <ArrowRight size={12} />
              <span>Then built things</span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ── Visual: MiaoStories screenshot ─────────────────── */
function CatsVisual() {
  const { isEmpathy } = useTheme();
  return (
    <div className={`rounded-2xl overflow-hidden border h-full min-h-[220px] ${
      isEmpathy ? 'border-stone-200' : 'border-stone-800'
    }`}>
      <img src={miaoHomeImg} alt="MiaoStories" className="w-full h-full object-cover object-top" />
    </div>
  );
}

/* ── Single numbered row (monakadesign style) ────────── */
function FeatureRow({ card, index, visual: Visual }) {
  const { isEmpathy } = useTheme();
  const { ref, isVisible } = useScrollReveal(0.06);

  const num      = String(index + 1).padStart(2, '0');
  const divider  = isEmpathy ? 'border-stone-300/60' : 'border-white/10';
  const numColor = isEmpathy ? 'text-stone-300'       : 'text-white/20';
  const labelColor = isEmpathy ? 'text-rose-500'      : 'text-green-400';
  const titleColor = isEmpathy ? 'text-stone-900'     : 'text-white';
  const subColor   = isEmpathy ? 'text-stone-400'     : 'text-stone-500';
  const descColor  = isEmpathy ? 'text-stone-600'     : 'text-stone-400';
  const tagBg      = isEmpathy
    ? 'border-stone-300/70 text-stone-500 hover:border-rose-200 hover:text-rose-500'
    : 'border-white/15 text-white/40 hover:border-green-800/60 hover:text-green-400';
  const ctaBg = card.external
    ? (isEmpathy
        ? 'bg-gradient-to-r from-rose-500 to-pink-400 text-white shadow-md shadow-rose-200/40 hover:shadow-rose-300/50'
        : 'bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-md')
    : (isEmpathy
        ? 'bg-gradient-to-r from-rose-500 to-pink-400 text-white shadow-md shadow-rose-200/40'
        : 'bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-md');

  return (
    <div
      ref={ref}
      className={`border-t ${divider}`}
      style={{
        opacity:    isVisible ? 1 : 0,
        transform:  isVisible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
      }}
    >
      {/* ── Row header ── */}
      <div className="flex items-start justify-between gap-4 pt-7 pb-5">
        {/* Number + title */}
        <div className="flex items-baseline gap-5">
          <span className={`font-serif text-5xl leading-none font-light select-none ${numColor}`}>{num}</span>
          <div>
            <h3
              className={`font-serif leading-tight ${titleColor}`}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}
            >
              {card.title}
            </h3>
            <p className={`text-sm mt-0.5 tracking-wide ${subColor}`}>{card.subtitleCN}</p>
          </div>
        </div>

        {/* Tags + year */}
        <div className="hidden md:flex flex-col items-end gap-2 shrink-0">
          <span className={`text-xs font-mono ${isEmpathy ? 'text-stone-400' : 'text-stone-500'}`}>{card.year}</span>
          <div className="flex flex-wrap justify-end gap-1.5">
            {card.tags.slice(0, 3).map((tag) => (
              <span key={tag} className={`text-[11px] px-2 py-0.5 border rounded-full transition-colors cursor-default ${tagBg}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content grid ── */}
      <div className="grid md:grid-cols-[3fr_2fr] gap-8 pb-10">
        {/* Description */}
        <div className="flex flex-col gap-5">
          <p className={`text-sm leading-relaxed ${labelColor} font-medium`}>{card.subtitle}</p>
          <p className={`text-sm leading-relaxed ${descColor}`}>{card.desc}</p>

          {/* Mobile tags */}
          <div className="flex flex-wrap gap-1.5 md:hidden">
            {card.tags.map((tag) => (
              <span key={tag} className={`text-[11px] px-2 py-0.5 border rounded-full ${tagBg}`}>{tag}</span>
            ))}
          </div>

          {/* CTA */}
          {card.external ? (
            <a href={card.to} target="_blank" rel="noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 w-fit hover:-translate-y-0.5 hover:gap-3 ${ctaBg}`}>
              {card.cta} <ExternalLink size={14} />
            </a>
          ) : (
            <Link to={card.to}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 w-fit hover:-translate-y-0.5 hover:gap-3 ${ctaBg}`}>
              {card.cta} <ArrowRight size={15} />
            </Link>
          )}
        </div>

        {/* Visual */}
        <div>
          <Visual />
        </div>
      </div>
    </div>
  );
}

/* ── Section data ────────────────────────────────────── */
const ROWS = [
  {
    id: 'tmind',
    to: 'https://tmind.ai/',
    external: true,
    year: '2026',
    title: 'TMind.AI',
    subtitleCN: '临床 AI 培训平台',
    subtitle: 'Clinical AI Training Platform',
    desc: 'Contributing to the main platform website, designing AI client personas that draw directly on my social work training — realistic cases with distinct presenting concerns, backstories, and behavioral patterns. Currently building a new evaluation framework to measure trainee competency growth.',
    tags: ['AI Client Design', 'Next.js', 'TypeScript', 'Social Work', 'Eval Framework'],
    cta: 'Visit TMind.AI',
    Visual: TMindVisual,
  },
  {
    id: 'about',
    to: '/about',
    external: false,
    year: '2017 – Now',
    title: 'Lynn Li',
    subtitleCN: '人文与代码的交汇',
    subtitle: 'Where Heart Meets Code',
    desc: "Social work graduate turned software engineer. From studying human systems at HKBU to building intelligent ones at Northeastern — I've always been drawn to the question of how technology can serve people better.",
    tags: ['Social Work', 'MS Info Systems', 'HCI', 'Full-Stack'],
    cta: 'Read My Journey',
    Visual: AboutVisual,
  },
  {
    id: 'cats',
    to: '/cats',
    external: false,
    year: '2024',
    title: 'MiaoStories',
    subtitleCN: '喵故事 · 猫咪日记与寄养',
    subtitle: 'Personal Cat Journal & Boarding Site',
    desc: "A bilingual (EN/中文) React + Framer Motion site celebrating the 10 cats I've cared for in Seattle — individual profiles with backstories, boarding services with real booking, and enough personality to make you want to adopt them all.",
    tags: ['React 18', 'Framer Motion', 'Tailwind CSS', 'Bilingual', 'Vercel'],
    cta: 'Meet the Cats',
    Visual: CatsVisual,
  },
];

/* ── Section ─────────────────────────────────────────── */
export default function FeaturedSection() {
  const { isEmpathy } = useTheme();
  const { ref, isVisible } = useScrollReveal(0.05);

  return (
    <section
      id="featured"
      className={`relative py-24 px-6 md:px-12 overflow-hidden transition-colors duration-700 ${
        isEmpathy ? 'bg-white' : 'bg-[#070c07]'
      }`}
    >
      <AmbientOrbs opacity={0.5} />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <div
          ref={ref}
          className="mb-16"
          style={{
            opacity:    isVisible ? 1 : 0,
            transform:  isVisible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <p className={`text-xs font-bold tracking-widest uppercase mb-4 ${isEmpathy ? 'text-rose-500' : 'text-green-400'}`}>
            — Selected Work
          </p>
          <h2
            className={`font-serif leading-tight ${isEmpathy ? 'text-stone-900' : 'text-white'}`}
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)' }}
          >
            Three Things<br />
            <em style={{ fontStyle: 'italic' }}>That Define Me.</em>
          </h2>
          <p className={`mt-2 text-xs tracking-widest ${isEmpathy ? 'text-stone-400' : 'text-stone-500'}`}>
            我的角色，我的起点，我的项目
          </p>
        </div>

        {/* Numbered rows */}
        <div>
          {ROWS.map((row, i) => (
            <FeatureRow key={row.id} card={row} index={i} visual={row.Visual} />
          ))}
          {/* Final closing line */}
          <div className={`border-t ${isEmpathy ? 'border-stone-300/60' : 'border-white/10'}`} />
        </div>
      </div>
    </section>
  );
}
