import React from 'react';
import { Github, Linkedin, PawPrint } from 'lucide-react';
import PawModal from './PawModal';

const PawSection = ({ viewMode, isModalOpen, onOpenModal, onCloseModal }) => {
  const isEmpathy = viewMode === 'empathy';

  return (
    <section
      id="contact"
      className={`py-32 px-8 transition-colors duration-500 ${
        isEmpathy ? 'bg-rose-50' : 'bg-black'
      }`}
    >
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-5xl font-black italic uppercase tracking-tighter">
            Leave a{' '}
            <span className={isEmpathy ? 'text-rose-500' : 'text-emerald-400'}>Paw Print</span>
          </h2>
          <p className="opacity-60 max-w-lg mx-auto">
            Click the paw to share your thoughts publicly or send me a private note.
          </p>
        </div>

        <div className="relative inline-block">
          <button
            type="button"
            onClick={onOpenModal}
            className={`p-12 rounded-full transition-all duration-500 transform hover:scale-110 relative z-10 ${
              isEmpathy
                ? 'bg-white text-rose-400 shadow-2xl'
                : 'bg-slate-900 text-emerald-500 border-2 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]'
            }`}
          >
            <PawPrint size={80} className="animate-pulse" />
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-black uppercase tracking-widest opacity-40">
              Click to Interact
            </div>
          </button>
        </div>

        <div className="flex justify-center gap-8 pt-12 opacity-30 hover:opacity-100 transition-opacity">
          <a
            href="https://github.com/Li-qianyi-Lynn"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-125 transition-transform"
          >
            <Github />
          </a>
          <a
            href="#"
            className="hover:scale-125 transition-transform"
          >
            <Linkedin />
          </a>
        </div>

        <p className="text-xs font-black opacity-30 tracking-[0.4em] uppercase pt-10">
          Hand-crafted by Lynn • Measured by Psychology • Powered by Logic
        </p>
      </div>

      <PawModal isOpen={isModalOpen} onClose={onCloseModal} viewMode={viewMode} />
    </section>
  );
};

export default PawSection;

