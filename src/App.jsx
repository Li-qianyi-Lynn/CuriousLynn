import React, { useEffect, useState } from 'react';
import Header from './components/layout/Header';
import Hero from './components/hero/Hero';
import ProjectGrid from './components/projects/ProjectGrid';
import ImmersiveCategoryOverlay from './components/projects/ImmersiveCategoryOverlay';
import PawSection from './components/paw/PawSection';
import CuriosityMeter from './components/ui/CuriosityMeter';
import FloatingAssistant from './components/ui/FloatingAssistant';
import { projectCategories } from './data/projects';

const App = () => {
  const [viewMode, setViewMode] = useState('empathy');
  const [scrolled, setScrolled] = useState(false);
  const [isMeowing, setIsMeowing] = useState(false);
  const [showPawModal, setShowPawModal] = useState(false);
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
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

  // 为沉浸式详情页提供每个领域的额外文案 + 独立项目列表（可以多于主页）
  const getBaseCategory = (id) => projectCategories.find((c) => c.id === id);

  const immersiveConfigById = {
    'ai-hci': (() => {
      const base = getBaseCategory('ai-hci');
      if (!base) return null;
      return {
        id: base.id,
        title: base.title,
        tagline: 'Bridging Silicon and Synapse',
        longDesc:
          "My work in AI+HCI focuses on making artificial intelligence feel more human and intuitive. By applying cognitive load theories and emotional design, I build interfaces that don't just process data, but understand human intent.",
        bannerImage: base.bannerImage,
        projects: [
          ...base.projects,
          {
            name: 'AI + HCI Lab Notes',
            description:
              'Conceptual explorations, prototypes and notebooks around human-centered AI behaviors.',
            link: 'https://github.com/Li-qianyi-Lynn'
          }
        ]
      };
    })(),
    frontend: (() => {
      const base = getBaseCategory('frontend');
      if (!base) return null;
      return {
        id: base.id,
        title: base.title,
        tagline: 'Pixels with Purpose',
        longDesc:
          "Design is more than aesthetics; it's about guiding attention and reducing friction. I use React and motion design to create fluid, delightful interfaces that respect the user's mental model.",
        bannerImage: base.bannerImage,
        projects: [
          ...base.projects,
          {
            name: 'Micro-interaction Playground',
            description:
              'Collection of motion studies and UX micro-interactions for future interfaces.',
            link: 'https://github.com/Li-qianyi-Lynn'
          }
        ]
      };
    })(),
    'good-tools': (() => {
      const base = getBaseCategory('good-tools');
      if (!base) return null;
      return {
        id: base.id,
        title: base.title,
        tagline: 'Bridging Systems and Policy',
        longDesc:
          "I enjoy building practical, end-to-end tools that move messy data into structured insight—from CSV cleaning pipelines and URL utilities to NLP workflows for reading long policy PDFs.",
        bannerImage: base.bannerImage,
        projects: [
          ...base.projects,
          {
            name: 'Ops & Policy Notebook',
            description:
              'A collection of experiments and notes on how infrastructure tooling and policy analysis can inform each other.',
            link: 'https://github.com/Li-qianyi-Lynn'
          }
        ]
      };
    })()
  };

  const expandedCategory = expandedCategoryId
    ? immersiveConfigById[expandedCategoryId]
    : null;

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
        <ProjectGrid
          categories={projectCategories}
          viewMode={viewMode}
          onCategoryClick={setExpandedCategoryId}
        />
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

      {/* 沉浸式项目详情页 (Expanded Interface) */}
      {expandedCategory && (
        <ImmersiveCategoryOverlay
          viewMode={viewMode}
          category={expandedCategory}
          onClose={() => setExpandedCategoryId(null)}
        />
      )}
    </div>
  );
};

export default App;

