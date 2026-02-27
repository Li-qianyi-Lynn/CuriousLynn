import React, { useEffect, useState } from 'react';
import Header from './components/layout/Header';
import Hero from './components/hero/Hero';
import ProjectGrid from './components/projects/ProjectGrid';
import PawSection from './components/paw/PawSection';
import CuriosityMeter from './components/ui/CuriosityMeter';
import FloatingAssistant from './components/ui/FloatingAssistant';
import { projectCategories } from './data/projects';

const App = () => {
  const [viewMode, setViewMode] = useState('empathy');
  const [scrolled, setScrolled] = useState(false);
  const [isMeowing, setIsMeowing] = useState(false);
  const [showPawModal, setShowPawModal] = useState(false);
  const [exploreProgress, setExploreProgress] = useState({
    hero: false,
    projects: false,
    contact: false
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const markVisited = (step) => {
    setExploreProgress((prev) => (prev[step] ? prev : { ...prev, [step]: true }));
  };

  const handleLogoClick = () => {
    setIsMeowing(true);
    setTimeout(() => setIsMeowing(false), 2000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const themeClasses =
    viewMode === 'empathy'
      ? 'bg-[#fffcf9] text-slate-800 font-sans cursor-default'
      : 'bg-[#05080a] text-emerald-400 font-mono cursor-crosshair';

  return (
    <div
      className={`min-h-screen transition-all duration-700 ease-in-out selection:bg-rose-200 ${themeClasses}`}
    >
      <Header
        viewMode={viewMode}
        scrolled={scrolled}
        onToggleMode={() => setViewMode(viewMode === 'empathy' ? 'logic' : 'empathy')}
        onLogoClick={handleLogoClick}
      />

      {/* Hero Section with curiosity tracking */}
      <div onMouseEnter={() => markVisited('hero')}>
        <Hero viewMode={viewMode} isMeowing={isMeowing} />
      </div>

      {/* Projects Section */}
      <div onMouseEnter={() => markVisited('projects')}>
        <ProjectGrid categories={projectCategories} viewMode={viewMode} />
      </div>

      {/* Paw / Contact Section */}
      <div onMouseEnter={() => markVisited('contact')}>
        <PawSection
          viewMode={viewMode}
          isModalOpen={showPawModal}
          onOpenModal={() => setShowPawModal(true)}
          onCloseModal={() => setShowPawModal(false)}
        />
      </div>

      {/* Curiosity progress + floating helper */}
      <CuriosityMeter viewMode={viewMode} explored={exploreProgress} />
      <FloatingAssistant viewMode={viewMode} visible={scrolled} />
    </div>
  );
};

export default App;

