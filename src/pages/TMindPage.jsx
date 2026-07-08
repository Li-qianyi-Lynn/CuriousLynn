import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Database, CreditCard, Cloud, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import CatParticles from '../components/ui/CatParticles';

const STATS = [
  { value: '5,000+', label: 'Registered Users'      },
  { value: '10+',    label: 'University Partners'    },
  { value: '60%',    label: 'DB QPS Reduced'         },
  { value: '3',      label: 'CI/CD Environments'     },
];

const CONTRIBUTIONS = [
  {
    icon: Database,
    title: 'Redis Optimization',
    tech: 'Redis · Tag-based Invalidation · PostgreSQL',
    desc: 'Designed tag-based cache invalidation for read-heavy endpoints, reducing PostgreSQL QPS by 60%. Applied distributed caching patterns that made the system resilient at scale.',
    accent: 'a',
  },
  {
    icon: CreditCard,
    title: 'Stripe Connect State Machine',
    tech: 'Stripe Connect · PostgreSQL · Webhook Handling',
    desc: 'Maintained an end-to-end payment settlement state machine persisting 5 appointment states. Used idempotent updateMany writes to handle out-of-order webhook delivery reliably.',
    accent: 'b',
  },
  {
    icon: Cloud,
    title: 'CI/CD Pipeline & Cloud Deploy',
    tech: 'Docker · GitHub Actions · Google Cloud Run',
    desc: 'Deployed via multi-stage Docker builds and a GitHub Actions CI/CD pipeline across 3 environments (dev, staging, prod) on Google Cloud Run with zero-downtime rollouts.',
    accent: 'a',
  },
  {
    icon: Zap,
    title: 'Full-Stack Feature Development',
    tech: 'Next.js · React · TypeScript · Prisma ORM',
    desc: "Contributed to the clinical training platform's full-stack feature development — from data modeling with Prisma to building responsive UI with Next.js App Router.",
    accent: 'b',
  },
];

const TECH_STACK = ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Redis', 'Stripe Connect', 'Docker', 'Google Cloud Run', 'GitHub Actions'];

function ContribCard({ item, index }) {
  const { isEmpathy } = useTheme();
  const { ref, isVisible } = useScrollReveal(0.1);
  const accentCls = isEmpathy
    ? (item.accent === 'a' ? 'border-rose-100 bg-rose-50 text-rose-600' : 'border-stone-100 bg-stone-50 text-stone-600')
    : (item.accent === 'a' ? 'border-green-800/40 bg-green-950/30 text-green-400' : 'border-stone-700/40 bg-stone-900/30 text-stone-400');

  return (
    <div
      ref={ref}
      className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 ${
        isEmpathy ? 'bg-white border-stone-100 hover:shadow-lg' : 'bg-white/[0.03] border-white/8 hover:bg-white/[0.06]'
      }`}
      style={{
        opacity:    isVisible ? 1 : 0,
        transform:  isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms`,
      }}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${accentCls}`}>
          <item.icon size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold mb-1 ${isEmpathy ? 'text-stone-900' : 'text-white'}`}>{item.title}</h3>
          <p className={`text-xs font-mono mb-3 ${isEmpathy ? 'text-stone-400' : 'text-stone-500'}`}>{item.tech}</p>
          <p className={`text-sm leading-relaxed ${isEmpathy ? 'text-stone-600' : 'text-stone-400'}`}>{item.desc}</p>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  const { isEmpathy } = useTheme();
  return (
    <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${isEmpathy ? 'text-rose-500' : 'text-green-400'}`}>
      — {children}
    </p>
  );
}

export default function TMindPage() {
  const { isEmpathy } = useTheme();
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0);
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal(0.1);

  const bg       = isEmpathy ? 'bg-[#f5ede0]' : 'bg-[#070c07]';
  const altBg    = isEmpathy ? 'bg-white'      : 'bg-[#0a120a]';

  return (
    <div className={`min-h-screen transition-colors duration-700 ${bg}`}>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-32 pb-20 px-6 md:px-12"
        style={{
          background: isEmpathy
            ? 'linear-gradient(135deg, #f5ede0 0%, #fce7e4 100%)'
            : 'linear-gradient(135deg, #070c07 0%, #0d1f0d 100%)',
        }}
      >
        <CatParticles />
        <div
          className="max-w-4xl mx-auto relative z-10"
          style={{
            opacity:    heroVisible ? 1 : 0,
            transform:  heroVisible ? 'translateY(0)' : 'translateY(36px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <Link to="/" className={`inline-flex items-center gap-1.5 text-sm font-medium mb-8 transition-colors ${isEmpathy ? 'text-stone-500 hover:text-stone-700' : 'text-stone-500 hover:text-stone-300'}`}>
            <ArrowLeft size={15} /> Back to Home
          </Link>

          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border mb-6 ${
            isEmpathy ? 'border-rose-200 bg-rose-50 text-rose-600' : 'border-green-800/50 bg-green-950/30 text-green-400'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Current Role · Apr 2026 – Present
          </div>

          <h1
            className={`font-serif leading-none mb-2 ${isEmpathy ? 'text-stone-900' : 'text-white'}`}
            style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
          >
            TMind.AI
          </h1>
          <p className={`text-lg mb-6 ${isEmpathy ? 'text-rose-600' : 'text-green-400'}`}>
            Full-Stack Clinical Training SaaS
          </p>
          <p className={`text-base leading-relaxed max-w-2xl ${isEmpathy ? 'text-stone-600' : 'text-stone-400'}`}>
            TMind.AI builds digital infrastructure for mental health education — a clinical training
            platform used by therapists-in-training at 10+ universities. Working here perfectly unites
            my{' '}
            <span className={isEmpathy ? 'text-rose-600 font-medium' : 'text-green-400 font-medium'}>social work background</span>
            {' '}with{' '}
            <span className={isEmpathy ? 'text-rose-500 font-medium' : 'text-green-500 font-medium'}>production-grade engineering</span>.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className={`py-16 px-6 md:px-12 ${altBg}`}>
        <div ref={statsRef} className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`text-center p-5 rounded-2xl ${isEmpathy ? 'bg-[#f5ede0]' : 'bg-white/5'}`}
              style={{
                opacity:    statsVisible ? 1 : 0,
                transform:  statsVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`,
              }}
            >
              <div className={`text-2xl font-bold font-serif ${isEmpathy ? 'text-gradient-empathy' : 'text-gradient-logic'}`}>
                {s.value}
              </div>
              <div className={`text-xs mt-1 ${isEmpathy ? 'text-stone-500' : 'text-stone-500'}`}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What is TMind */}
      <section className={`py-16 px-6 md:px-12 ${bg}`}>
        <div className="max-w-4xl mx-auto">
          <SectionLabel>What is TMind?</SectionLabel>
          <h2 className={`text-3xl font-serif mb-6 ${isEmpathy ? 'text-stone-900' : 'text-white'}`}>
            Mental Health Education, Powered by AI
          </h2>
          <div className={`space-y-4 text-sm leading-relaxed ${isEmpathy ? 'text-stone-600' : 'text-stone-400'}`}>
            <p>
              TMind.AI is a SaaS platform designed for universities and clinical training programs.
              It helps supervisors manage therapy session workflows, track trainee progress, and handle
              appointment scheduling — all while integrating AI-driven insights to support clinical learning.
            </p>
            <p>
              As a full-stack engineer on the platform, I work with Next.js, React, TypeScript, and
              PostgreSQL (via Prisma ORM) on features that directly impact how mental health professionals
              develop their craft.
            </p>
          </div>
        </div>
      </section>

      {/* Contributions */}
      <section className={`py-16 px-6 md:px-12 ${altBg}`}>
        <div className="max-w-4xl mx-auto">
          <SectionLabel>My Contributions</SectionLabel>
          <h2 className={`text-3xl font-serif mb-8 ${isEmpathy ? 'text-stone-900' : 'text-white'}`}>
            What I Built and Owned
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {CONTRIBUTIONS.map((item, i) => <ContribCard key={item.title} item={item} index={i} />)}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className={`py-16 px-6 md:px-12 ${bg}`}>
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Tech Stack</SectionLabel>
          <h2 className={`text-3xl font-serif mb-8 ${isEmpathy ? 'text-stone-900' : 'text-white'}`}>
            Tools of the Trade
          </h2>
          <div className="flex flex-wrap gap-3">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all hover:-translate-y-0.5 ${
                  isEmpathy
                    ? 'bg-white border-stone-100 text-stone-700 hover:border-rose-100 hover:text-rose-700'
                    : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10 hover:border-green-900/50'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className={`py-20 px-6 md:px-12 text-center ${isEmpathy ? 'bg-gradient-to-r from-rose-50 to-stone-50' : 'bg-gradient-to-r from-green-950/20 to-stone-950/20'}`}>
        <div className="max-w-3xl mx-auto">
          <h2 className={`text-3xl font-serif mb-4 ${isEmpathy ? 'text-stone-900' : 'text-white'}`}>
            Why This Role Matters to Me
          </h2>
          <p className={`text-base leading-relaxed ${isEmpathy ? 'text-stone-600' : 'text-stone-400'}`}>
            I spent four years studying social work and the science of human behavior. Now I get to
            build the technology that supports mental health training at scale. TMind is the intersection
            I have always been drawn to — where empathy and engineering are not opposites, but partners.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/about" className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 ${
              isEmpathy ? 'bg-gradient-to-r from-rose-500 to-pink-400 text-white shadow-lg' : 'bg-gradient-to-r from-green-600 to-emerald-500 text-white'
            }`}>Read My Full Story</Link>
            <Link to="/projects" className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-medium transition-all hover:-translate-y-0.5 ${
              isEmpathy ? 'border-stone-200 text-stone-700 hover:bg-white' : 'border-stone-700 text-stone-300 hover:bg-stone-800/50'
            }`}>See All Projects</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
