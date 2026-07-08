import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import HeroSection from '../components/home/HeroSection';
import FeaturedSection from '../components/home/FeaturedSection';
import SkillsSection from '../components/home/SkillsSection';
import ProjectsPreview from '../components/home/ProjectsPreview';
import PawSection from '../components/paw/PawSection';

export default function HomePage() {
  const { viewMode } = useTheme();
  const [showPawModal, setShowPawModal] = useState(false);

  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <SkillsSection />
      <ProjectsPreview />
      <PawSection
        viewMode={viewMode}
        isModalOpen={showPawModal}
        onOpenModal={() => setShowPawModal(true)}
        onCloseModal={() => setShowPawModal(false)}
      />
    </>
  );
}
