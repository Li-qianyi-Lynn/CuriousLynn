import {
  ArrowLeft,
  Brain,
  Cat,
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react';
import React from 'react';

const ImmersiveCategoryOverlay = ({ viewMode, category, onClose }) => {
  if (!category) return null;

  const isEmpathy = viewMode === 'empathy';
  const projects = category.projects || [];

  return (
    <div className="fixed inset-0 z-[300] flex flex-col animate-in fade-in zoom-in-95 duration-500">
      {/* 背景层 */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isEmpathy ? 'bg-white' : 'bg-[#0a0f14]'
        }`}
      />

      {/* 顶栏工具条 */}
      <div
        className={`relative z-10 px-8 py-6 flex justify-between items-center border-b ${
          isEmpathy ? 'border-rose-100' : 'border-emerald-900/30'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 font-bold uppercase tracking-widest hover:scale-105 transition-transform"
        >
          <ArrowLeft size={18} /> Back to Hub
        </button>
        <div className="flex items-center gap-3">
          <Cat className={isEmpathy ? 'text-rose-400' : 'text-emerald-500'} />
          <span className="text-xs font-mono opacity-40">
            Section: {category.id}.lx
          </span>
        </div>
      </div>

      {/* 可滚动内容区 */}
      <div className="relative z-10 flex-1 overflow-y-auto px-8 py-16 custom-scrollbar">
        <div className="max-w-5xl mx-auto space-y-20">
          {/* 头部详情 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div
                className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                  isEmpathy
                    ? 'bg-rose-100 text-rose-600'
                    : 'bg-emerald-900/40 text-emerald-500'
                }`}
              >
                Domain Expertise
              </div>
              <h2 className="text-5xl md:text-7xl font-black leading-none">
                {category.title}
              </h2>
              {category.tagline && (
                <p className="text-2xl font-serif italic opacity-60 leading-tight">
                  "{category.tagline}"
                </p>
              )}
              {category.longDesc && (
                <p className="text-lg opacity-80 leading-relaxed">
                  {category.longDesc}
                </p>
              )}
            </div>
            {/* 分类头部图：由 projects 数据中的 bannerImage 控制 */}
            <div
              className={`aspect-video rounded-3xl overflow-hidden flex items-center justify-center border-4 ${
                isEmpathy
                  ? 'bg-rose-50 border-white shadow-xl'
                  : 'bg-slate-900 border-emerald-900/20'
              }`}
            >
              {category.bannerImage ? (
                <img
                  src={category.bannerImage}
                  alt={`${category.title} visualization`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center space-y-3 opacity-30">
                  <ImageIcon size={64} className="mx-auto" />
                  <p className="text-xs uppercase font-bold tracking-[0.2em]">
                    [Concept Visualization]
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 具体项目列表 */}
          {projects.length > 0 && (
            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-[0.4em] opacity-40">
                Selected GitHub Projects
              </h4>
              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((p) => (
                  <div
                    key={p.name}
                    className={`p-10 rounded-[2.5rem] border transition-all duration-500 group ${
                      isEmpathy
                        ? 'bg-[#fffcf9] border-rose-50 hover:bg-white hover:shadow-2xl'
                        : 'bg-black/40 border-emerald-900/30 hover:border-emerald-500'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <h5 className="text-2xl font-black">{p.name}</h5>
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-full bg-slate-100/10 hover:scale-110 transition-transform"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                    {p.description && (
                      <p className="opacity-70 mb-4 leading-relaxed">
                        {p.description}
                      </p>
                    )}

                    {/* 项目预览图 */}
                    {p.image ? (
                      <div className="mt-4 aspect-video rounded-2xl overflow-hidden border border-slate-200/40">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div
                        className={`mt-8 aspect-video rounded-2xl overflow-hidden flex items-center justify-center border ${
                          isEmpathy
                            ? 'bg-rose-100/20 border-rose-50'
                            : 'bg-slate-900/50 border-emerald-900/20'
                        }`}
                      >
                        <div className="text-center space-y-2 opacity-20 group-hover:opacity-40 transition-opacity">
                          <ImageIcon size={32} className="mx-auto" />
                          <p className="text-[10px] uppercase font-bold tracking-widest">
                            [Project Preview]
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 跨学科见解 */}
          <div
            className={`p-12 rounded-[3rem] text-center space-y-6 ${
              isEmpathy
                ? 'bg-rose-50 text-rose-800'
                : 'bg-emerald-900/10 text-emerald-400 border border-emerald-900/20'
            }`}
          >
            <Brain size={40} className="mx-auto opacity-50" />
            <h5 className="text-xl font-bold italic">Interdisciplinary Perspective</h5>
            <p className="max-w-2xl mx-auto opacity-80 leading-relaxed">
              {isEmpathy
                ? 'In this field, my psychology background allows me to foresee potential user friction points before a single line of code is written.'
                : "Using computer science methodologies, I treat human behavior as complex but structured data streams that can be optimized for better well-being."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImmersiveCategoryOverlay;

