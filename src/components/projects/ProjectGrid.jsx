import React from 'react';
import ProjectCategoryCard from './ProjectCategoryCard';

const ProjectGrid = ({ categories, viewMode }) => {
  return (
    <section
      id="projects"
      className={`py-32 px-8 transition-colors duration-500 ${
        viewMode === 'empathy' ? 'bg-white' : 'bg-[#030507]'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 flex items-center gap-4">
          <h2 className="text-4xl md:text-5xl font-black italic uppercase">
            Core Focus
          </h2>
          <span
            className={`h-[2px] flex-1 ${
              viewMode === 'empathy' ? 'bg-rose-100' : 'bg-emerald-900'
            }`}
          />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <ProjectCategoryCard
              key={cat.id}
              category={cat}
              viewMode={viewMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;

