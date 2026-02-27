import React from 'react';
import { Sparkles, Layout, Database, FileSearch } from 'lucide-react';
import ProjectItemCard from './ProjectItemCard';

const ICONS = {
  sparkles: Sparkles,
  layout: Layout,
  database: Database,
  'file-search': FileSearch
};

const ProjectCategoryCard = ({ category, viewMode, onClick }) => {
  const isEmpathy = viewMode === 'empathy';
  const Icon = ICONS[category.icon] || Sparkles;

  return (
    <div
      onClick={onClick}
      className={`p-8 rounded-[2.5rem] border transition-all duration-500 ${
        isEmpathy
          ? 'bg-[#fffcf9] border-rose-100 hover:shadow-2xl'
          : 'bg-slate-900/40 border-emerald-900/30 hover:border-emerald-500'
      } ${onClick ? 'cursor-pointer hover:-translate-y-3' : ''}`}
    >
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${
          isEmpathy ? 'bg-rose-400 text-white' : 'bg-emerald-500 text-slate-900'
        }`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold mb-4">{category.title}</h3>
      <p className="text-sm opacity-70 mb-8">{category.desc}</p>
      <div className="space-y-2">
        {category.projects.map((project) => (
          <ProjectItemCard
            key={project.name}
            project={project}
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCategoryCard;

