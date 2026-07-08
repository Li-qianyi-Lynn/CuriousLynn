import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingAssistant from './components/ui/FloatingAssistant';

import HomePage    from './pages/HomePage';
import AboutPage   from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import CatWorldPage from './pages/CatWorldPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Thin scroll-progress bar at top
function ScrollProgressBar() {
  const { isEmpathy } = useTheme();
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      setPct(el.scrollTop / (el.scrollHeight - el.clientHeight));
    };
    window.addEventListener('scroll', update);
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div
      className="fixed top-0 left-0 z-[60] h-[3px] origin-left transition-none"
      style={{
        width: `${pct * 100}%`,
        background: isEmpathy
          ? 'linear-gradient(90deg, #be123c, #fb7185)'
          : 'linear-gradient(90deg, #4ade80, #22c55e)',
      }}
    />
  );
}

function AppShell() {
  const { viewMode, isEmpathy } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const themeRoot = isEmpathy
    ? 'bg-white text-stone-800 font-sans cursor-default selection:bg-rose-100'
    : 'bg-[#070c07] text-stone-200 font-sans cursor-default selection:bg-green-900/40';

  return (
    <div className={`min-h-screen transition-all duration-700 ${themeRoot}`}>
      <ScrollToTop />
      <ScrollProgressBar />
      <Header scrolled={scrolled} />

      <main>
        <Routes>
          <Route path="/"         element={<HomePage />}     />
          <Route path="/about"    element={<AboutPage />}    />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/cats"     element={<CatWorldPage />} />
        </Routes>
      </main>

      <Footer />
      <FloatingAssistant viewMode={viewMode} visible={scrolled} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ThemeProvider>
  );
}
