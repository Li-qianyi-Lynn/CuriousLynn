import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import ProjectGrid from '../components/projects/ProjectGrid';
import ImmersiveCategoryOverlay from '../components/projects/ImmersiveCategoryOverlay';
import { projectCategories } from '../data/projects';
import CatParticles from '../components/ui/CatParticles';

const getBase = (id) => projectCategories.find((c) => c.id === id);
const immersiveConfig = {
  'ai-hci': (() => {
    const b = getBase('ai-hci');
    return b ? { ...b, tagline: 'Bridging Silicon and Synapse', longDesc: "My work in AI+HCI focuses on making AI feel more human and intuitive. By applying cognitive load theories and emotional design, I build interfaces that don't just process data — they understand human intent.", projects: [...b.projects] } : null;
  })(),
  frontend: (() => {
    const b = getBase('frontend');
    return b ? { ...b, tagline: 'Pixels with Purpose', longDesc: "Design is more than aesthetics; it's about guiding attention and reducing friction. I use React and motion design to create fluid, delightful interfaces that respect the user's mental model.", projects: [...b.projects] } : null;
  })(),
  'Full-Stack': (() => {
    const b = getBase('Full-Stack');
    return b ? { ...b, tagline: 'Building Bridges Between Frontend and Backend', longDesc: "I enjoy building full-stack projects that combine frontend and backend development to create a seamless user experience — from data modeling to cloud deployment.", projects: [...b.projects] } : null;
  })(),
};

export default function ProjectsPage() {
  const { isEmpathy, viewMode } = useTheme();
  const [expandedId, setExpandedId] = useState(null);
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0);
  const expanded = expandedId ? immersiveConfig[expandedId] : null;

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isEmpathy ? 'bg-white' : 'bg-[#070c07]'}`}>
      {/* Hero */}
      <section
        className="relative overflow-hidden pt-32 pb-16 px-6 md:px-12"
        style={{
          background: isEmpathy
            ? 'linear-gradient(135deg, #ffffff 0%, #fff0f3 100%)'
            : 'linear-gradient(135deg, #070c07 0%, #0d1a0a 100%)',
        }}
      >
        <CatParticles />
        <div
          ref={heroRef}
          className="max-w-4xl mx-auto relative z-10"
          style={{
            opacity:    heroVisible ? 1 : 0,
            transform:  heroVisible ? 'translateY(0)' : 'translateY(36px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <Link to="/" className={`flex w-fit items-center gap-1.5 text-sm font-medium mb-8 transition-colors ${isEmpathy ? 'text-stone-500 hover:text-stone-700' : 'text-stone-500 hover:text-stone-300'}`}>
            <ArrowLeft size={15} /> Back to Home
          </Link>

          <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${isEmpathy ? 'text-rose-500' : 'text-green-400'}`}>
            — All Projects
          </p>
          <h1
            className={`font-serif leading-tight mb-4 ${isEmpathy ? 'text-stone-900' : 'text-white'}`}
            style={{ fontSize: 'clamp(2.8rem, 5vw, 4rem)' }}
          >
            What I&apos;ve Built.
          </h1>
          <p className={`text-sm max-w-xl leading-relaxed ${isEmpathy ? 'text-stone-600' : 'text-stone-400'}`}>
            Three domains. Nine projects. One through-line: technology that understands people.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            {[
              { label: 'AI + HCI',         e: 'bg-rose-100 text-rose-600',      l: 'bg-green-950/40 text-green-300 border border-green-800/30' },
              { label: 'Frontend Design',  e: 'bg-stone-100 text-stone-700',    l: 'bg-stone-800/40 text-stone-300 border border-stone-700/30' },
              { label: 'Full-Stack',       e: 'bg-pink-50 text-rose-500',       l: 'bg-green-900/30 text-green-400 border border-green-800/30' },
            ].map(({ label, e, l }) => (
              <span key={label} className={`text-xs font-medium px-3 py-1.5 rounded-full ${isEmpathy ? e : l}`}>{label}</span>
            ))}
          </div>
        </div>
      </section>

      <ProjectGrid categories={projectCategories} viewMode={viewMode} onCategoryClick={setExpandedId} />

      {expanded && (
        <ImmersiveCategoryOverlay viewMode={viewMode} category={expanded} onClose={() => setExpandedId(null)} />
      )}
    </div>
  );
}
