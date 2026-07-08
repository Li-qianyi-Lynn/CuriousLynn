import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Mail, Github, Linkedin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import CatParticles from '../components/ui/CatParticles';
import lynnPhoto from '../assets/lynn.jpg';
import neu1 from '../assets/neu1.JPG';
import edin2 from '../assets/edin2.jpg';
import edin3 from '../assets/edin3.JPG';
import edin4 from '../assets/edin4.JPG';
import edin5 from '../assets/edin5.JPG';
import uic2 from '../assets/uic2.JPG';
import uic4 from '../assets/uic4.jpg';

const EDUCATION = [
  {
    school: 'Northeastern University',
    degree: 'MS Information Systems',
    period: 'Sep 2024 – May 2027',
    gpa: '3.85',
    location: 'Seattle, WA',
    courses: ['Program Structure & Algorithms', 'AI Generative Models', 'Network & Cloud Computing'],
    accent: 'a',
    photos: [neu1],
  },
  {
    school: 'University of Edinburgh',
    degree: 'MS Counselling Studies',
    period: 'Sep 2021 – Nov 2022',
    location: 'Edinburgh, UK',
    courses: ['Counselling Theory', 'Mental Health Practice', 'Research Methods'],
    accent: 'b',
    photos: [edin2, edin3, edin4, edin5],
  },
  {
    school: 'Beijing Normal–Hong Kong Baptist University',
    degree: 'BS Social Work & Social Administration',
    period: 'Jul 2017 – Jun 2021',
    gpa: '3.73',
    location: 'Zhuhai, China',
    courses: ['Advanced Statistics', 'IT for Everyday Life & Work', 'Community Practice'],
    accent: 'b',
    photos: [uic2, uic4],
  },
];

const EXPERIENCE = [
  {
    company: 'TMind.AI',
    role: 'Software Engineer Intern',
    period: 'Apr 2026 – Present',
    location: 'Seattle, WA',
    current: true,
    bullets: [
      'Full-stack clinical training SaaS — Next.js, React, TypeScript, PostgreSQL (Prisma ORM), 5,000+ users across 10+ university partners',
      'Redis distributed caching with tag-based invalidation — 60% reduction in PostgreSQL QPS on read-heavy endpoints',
      'Stripe Connect payment state machine — 5 appointment states, idempotent writes for out-of-order webhooks',
      'Docker + GitHub Actions CI/CD deployed to Google Cloud Run across 3 environments',
    ],
  },
  {
    company: 'Rise2Gether',
    role: 'AI Product Engineer Intern',
    period: 'Jan 2026 – Apr 2026',
    location: 'Seattle, WA',
    current: false,
    bullets: [
      'Built CareerCoach chatbot using Python, React, and RAG architecture — indexed 1,000+ organizational documents',
      'LangChain Hybrid Search + Markdown Heading Splitting — 35% improvement in retrieval precision',
      'pgvector on PostgreSQL for efficient vector similarity search',
    ],
  },
  {
    company: 'Poizon Global',
    role: 'Software Engineer Intern',
    period: 'Jun 2024 – Aug 2024',
    location: 'Shanghai, China',
    current: false,
    bullets: [
      'Merchant expansion module in Java + Spring Boot — integrated APIs from 6 overseas boutique retailers',
      'Token Bucket rate limiting — boutique API success rate up from 95% to 99%',
      'Redis distributed locks — 30% reduction in duplicate message processing',
    ],
  },
];

const SKILLS_GROUPS = [
  { label: 'Languages',     skills: ['Java', 'Python', 'Go', 'TypeScript', 'JavaScript', 'C/C++'] },
  { label: 'Frontend',      skills: ['React', 'Next.js', 'Tailwind CSS', 'HTML/CSS'] },
  { label: 'Backend',       skills: ['Spring Boot', 'FastAPI', 'Flask', 'REST API', 'gRPC'] },
  { label: 'Data',          skills: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB', 'pgvector'] },
  { label: 'Cloud & DevOps',skills: ['GCP', 'AWS', 'Azure', 'Docker', 'GitHub Actions'] },
  { label: 'AI / ML',       skills: ['LangChain', 'RAG', 'Vector Search', 'LLMs', 'Vertex AI'] },
];

function PhotoCarousel({ photos, school, isEmpathy }) {
  const [cur, setCur] = useState(0);
  if (!photos?.length) return null;
  const prev = () => setCur((c) => (c - 1 + photos.length) % photos.length);
  const next = () => setCur((c) => (c + 1) % photos.length);
  return (
    <div className="mt-4 relative rounded-xl overflow-hidden">
      <div className="relative h-[480px] w-full">
        {photos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${school} photo ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: i === cur ? 1 : 0 }}
          />
        ))}
        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      </div>

      {photos.length > 1 && (
        <>
          {/* 左右箭头 */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center text-sm transition-colors"
          >‹</button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center text-sm transition-colors"
          >›</button>

          {/* 小圆点 */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCur(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === cur ? 'bg-white scale-125' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function EducationCard({ edu, index }) {
  const { isEmpathy } = useTheme();
  const { ref, isVisible } = useScrollReveal(0.1);
  const accentCls = isEmpathy
    ? (edu.accent === 'a' ? 'border-rose-100 bg-rose-50 text-rose-600' : 'border-stone-100 bg-stone-50 text-stone-700')
    : (edu.accent === 'a' ? 'border-green-800/30 bg-green-950/20 text-green-300' : 'border-stone-700/30 bg-stone-900/20 text-stone-300');
  return (
    <div
      ref={ref}
      className={`p-6 rounded-2xl border transition-all duration-500 ${isEmpathy ? 'bg-white border-stone-100' : 'bg-white/[0.03] border-white/8'}`}
      style={{
        opacity:    isVisible ? 1 : 0,
        transform:  isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
      }}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className={`font-semibold text-lg ${isEmpathy ? 'text-stone-900' : 'text-white'}`}>{edu.school}</h3>
          <p className={isEmpathy ? 'text-stone-600' : 'text-stone-400'}>{edu.degree}</p>
          <p className={`text-xs mt-0.5 ${isEmpathy ? 'text-stone-400' : 'text-stone-500'}`}>{edu.period} · {edu.location}</p>
        </div>
        {edu.gpa && <div className={`text-center px-4 py-2 rounded-xl text-sm font-bold border ${accentCls}`}>GPA {edu.gpa}</div>}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {edu.courses.map((c) => (
          <span key={c} className={`text-xs px-2.5 py-1 rounded-lg ${isEmpathy ? 'bg-stone-100 text-stone-600' : 'bg-white/5 text-stone-400'}`}>{c}</span>
        ))}
      </div>
      <PhotoCarousel photos={edu.photos} school={edu.school} isEmpathy={isEmpathy} />
    </div>
  );
}

function ExperienceCard({ exp, index }) {
  const { isEmpathy } = useTheme();
  const { ref, isVisible } = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className={`p-6 rounded-2xl border transition-all duration-500 ${isEmpathy ? 'bg-stone-50 border-stone-100' : 'bg-[#070c07] border-white/8'}`}
      style={{
        opacity:    isVisible ? 1 : 0,
        transform:  isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
      }}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-semibold text-lg ${isEmpathy ? 'text-stone-900' : 'text-white'}`}>{exp.company}</h3>
            {exp.current && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Active
              </span>
            )}
          </div>
          <p className={isEmpathy ? 'text-stone-600' : 'text-stone-400'}>{exp.role}</p>
          <p className={`text-xs mt-0.5 ${isEmpathy ? 'text-stone-400' : 'text-stone-500'}`}>{exp.period} · {exp.location}</p>
        </div>
      </div>
      <ul className="space-y-2">
        {exp.bullets.map((b) => (
          <li key={b} className={`flex items-start gap-2 text-sm ${isEmpathy ? 'text-stone-600' : 'text-stone-400'}`}>
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0 opacity-40" />{b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Section({ children, alt }) {
  const { isEmpathy } = useTheme();
  return (
    <section className={`py-16 px-6 md:px-12 transition-colors duration-700 ${alt ? (isEmpathy ? 'bg-stone-50' : 'bg-[#0a120a]') : (isEmpathy ? 'bg-white' : 'bg-[#070c07]')}`}>
      <div className="max-w-4xl mx-auto">{children}</div>
    </section>
  );
}

function SectionLabel({ children }) {
  const { isEmpathy } = useTheme();
  return <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${isEmpathy ? 'text-rose-500' : 'text-green-400'}`}>— {children}</p>;
}

export default function AboutPage() {
  const { isEmpathy } = useTheme();
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0);

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isEmpathy ? 'bg-white' : 'bg-[#070c07]'}`}>
      {/* Hero */}
      <section
        className="relative overflow-hidden pt-32 pb-20 px-6 md:px-12"
        style={{
          background: isEmpathy
            ? 'linear-gradient(135deg, #ffffff 0%, #fff0f3 100%)'
            : 'linear-gradient(135deg, #070c07 0%, #0d1a0a 100%)',
        }}
      >
        <CatParticles />
        <div
          ref={heroRef}
          className="max-w-4xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center"
          style={{
            opacity:    heroVisible ? 1 : 0,
            transform:  heroVisible ? 'translateY(0)' : 'translateY(36px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div>
            <Link to="/" className={`flex w-fit items-center gap-1.5 text-sm font-medium mb-8 transition-colors ${isEmpathy ? 'text-stone-500 hover:text-stone-700' : 'text-stone-500 hover:text-stone-300'}`}>
              <ArrowLeft size={15} /> Back to Home
            </Link>
            <SectionLabel>About Me</SectionLabel>
            <h1 className={`font-serif leading-tight mb-4 ${isEmpathy ? 'text-stone-900' : 'text-white'}`}
                style={{ fontSize: 'clamp(2.8rem, 5vw, 4rem)' }}>
              Where Heart<br />
              <span className={isEmpathy ? 'text-gradient-empathy' : 'text-gradient-logic'}>Meets Code.</span>
            </h1>
            <p className={`text-sm leading-relaxed mb-6 ${isEmpathy ? 'text-stone-600' : 'text-stone-400'}`}>
              Social worker turned software engineer. I have spent years studying how people navigate difficult systems — now I build better ones.
            </p>
            <div className="flex flex-wrap gap-3 text-sm mb-4">
              <span className={`flex items-center gap-1.5 ${isEmpathy ? 'text-stone-500' : 'text-stone-400'}`}><MapPin size={13} /> Seattle, WA</span>
              <a href="mailto:qianyililynn@gmail.com" className={`flex items-center gap-1.5 transition-colors ${isEmpathy ? 'text-rose-500 hover:text-rose-600' : 'text-green-400 hover:text-green-300'}`}>
                <Mail size={13} /> qianyililynn@gmail.com
              </a>
            </div>
            <div className="flex gap-2">
              <a href="https://github.com/Li-qianyi-Lynn" target="_blank" rel="noreferrer" className={`p-2 rounded-lg transition-colors ${isEmpathy ? 'text-stone-500 hover:bg-stone-100' : 'text-stone-400 hover:bg-white/10'}`}><Github size={18} /></a>
              <a href="https://www.linkedin.com/in/qianyi-li-lynn/" target="_blank" rel="noreferrer" className={`p-2 rounded-lg transition-colors ${isEmpathy ? 'text-stone-500 hover:bg-stone-100' : 'text-stone-400 hover:bg-white/10'}`}><Linkedin size={18} /></a>
            </div>
          </div>

          <div className="relative group hidden md:block">
            <div className={`absolute -inset-3 rounded-3xl blur-xl opacity-25 pointer-events-none ${isEmpathy ? 'bg-rose-200' : 'bg-green-800/40'}`} />
            <div className={`relative z-10 aspect-[4/5] shadow-2xl ${isEmpathy ? 'rounded-[2.5rem] border-4 border-white/90' : 'rounded-2xl border border-green-900/30 grayscale hover:grayscale-0 transition-all duration-700'}`}>
              <div className={`absolute inset-0 overflow-hidden ${isEmpathy ? 'rounded-[2.5rem]' : 'rounded-2xl'}`}>
                <img src={lynnPhoto} alt="Lynn Li" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-12 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {['-15','15'].map((r,i)=>(
                  <svg key={i} viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${isEmpathy?'text-rose-300':'text-green-500'}`} style={{transform:`rotate(${r}deg)`}}>
                    <path d="M12 2L2 22h20L12 2z"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <Section alt>
        <SectionLabel>My Journey</SectionLabel>
        <h2 className={`text-3xl font-serif mb-6 ${isEmpathy ? 'text-stone-900' : 'text-white'}`}>From Human Systems to Intelligent Ones</h2>
        <div className={`space-y-4 text-sm leading-relaxed ${isEmpathy ? 'text-stone-600' : 'text-stone-400'}`}>
          <p>I started my academic journey studying <strong className={isEmpathy ? 'text-stone-900' : 'text-white'}>social work</strong> in Hong Kong — learning to listen, to understand systems of care, and to think about why people struggle with the structures meant to help them.</p>
          <p>Then I found code. I realized that software is just another kind of system — and one I could actually shape. I taught myself to build, applied to grad school, and moved to Seattle to pursue a Master&apos;s in Information Systems at Northeastern.</p>
          <p>Today, I work at <strong className={isEmpathy ? 'text-rose-600' : 'text-green-400'}>TMind.AI</strong>, building clinical training software for therapists. My social work background is not a detour — it is the reason I think differently about how systems should work for people.</p>
          <p className={`text-base font-medium italic ${isEmpathy ? 'text-rose-600' : 'text-green-400'}`}>
            "The best engineers I know are the ones who understand humans first."
          </p>
        </div>
      </Section>

      {/* Education */}
      <Section>
        <SectionLabel>Education</SectionLabel>
        <h2 className={`text-3xl font-serif mb-8 ${isEmpathy ? 'text-stone-900' : 'text-white'}`}>Where I Learned</h2>
        <div className="space-y-5">{EDUCATION.map((e, i) => <EducationCard key={e.school} edu={e} index={i} />)}</div>
      </Section>

      {/* Experience */}
      <Section alt>
        <SectionLabel>Experience</SectionLabel>
        <h2 className={`text-3xl font-serif mb-8 ${isEmpathy ? 'text-stone-900' : 'text-white'}`}>Where I Built</h2>
        <div className="space-y-5">{EXPERIENCE.map((e, i) => <ExperienceCard key={e.company} exp={e} index={i} />)}</div>
      </Section>

      {/* Skills */}
      <Section>
        <SectionLabel>Technical Skills</SectionLabel>
        <h2 className={`text-3xl font-serif mb-8 ${isEmpathy ? 'text-stone-900' : 'text-white'}`}>What I Work With</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS_GROUPS.map(({ label, skills }) => (
            <div key={label} className={`p-5 rounded-2xl border ${isEmpathy ? 'bg-white border-stone-100' : 'bg-white/[0.03] border-white/8'}`}>
              <h4 className={`text-xs font-bold tracking-wide uppercase mb-3 ${isEmpathy ? 'text-stone-400' : 'text-stone-500'}`}>{label}</h4>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <span key={s} className={`text-xs px-2.5 py-1 rounded-lg font-medium ${isEmpathy ? 'bg-stone-50 text-stone-700' : 'bg-white/5 text-stone-300'}`}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className={`py-20 px-6 md:px-12 text-center ${isEmpathy ? 'bg-gradient-to-r from-rose-50 to-stone-50' : 'bg-gradient-to-r from-green-950/20 to-stone-950/20'}`}>
        <div className="max-w-xl mx-auto">
          <h2 className={`text-3xl font-serif mb-4 ${isEmpathy ? 'text-stone-900' : 'text-white'}`}>Let&apos;s Connect</h2>
          <p className={`text-sm mb-8 ${isEmpathy ? 'text-stone-600' : 'text-stone-400'}`}>Open to full-time roles, research collaborations, and conversations about the intersection of psychology and AI.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="mailto:qianyililynn@gmail.com" className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 ${isEmpathy ? 'bg-gradient-to-r from-rose-500 to-pink-400 text-white shadow-lg' : 'bg-gradient-to-r from-green-600 to-emerald-500 text-white'}`}>
              <Mail size={15} /> Say Hello
            </a>
            <Link to="/projects" className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-medium transition-all hover:-translate-y-0.5 ${isEmpathy ? 'border-stone-200 text-stone-700 hover:bg-white' : 'border-stone-700 text-stone-300 hover:bg-stone-800/50'}`}>
              View Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
