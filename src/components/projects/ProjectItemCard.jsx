import React from 'react';
import { PawPrint } from 'lucide-react';

const ProjectItemCard = ({ project, viewMode }) => {
  if (!project) return null;

  const isEmpathy = viewMode === 'empathy';

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`group text-xs flex items-start gap-2 p-3 rounded-xl border transition-all ${
        isEmpathy
          ? 'bg-white border-rose-50 hover:border-rose-200 hover:shadow-sm'
          : 'bg-black/30 border-emerald-900 hover:border-emerald-500/60'
      }`}
    >
      <PawPrint
        size={12}
        className={`mt-0.5 flex-shrink-0 transition-transform ${
          isEmpathy ? 'text-rose-400' : 'text-emerald-400'
        } group-hover:scale-110`}
      />
      <div>
        <div
          className={`font-semibold ${
            isEmpathy ? 'text-slate-800' : 'text-emerald-400'
          }`}
        >
          {project.name}
        </div>
        {project.description && (
          <p
            className={`mt-1 text-sm leading-snug opacity-70 ${
              isEmpathy ? 'font-serif' : 'font-mono'
            }`}
          >
            {project.description}
          </p>
        )}
      </div>
    </a>
  );
};

export default ProjectItemCard;

