import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import lynnCatsWebImg from '../assets/miaoHome.png';
import CatParticles from '../components/ui/CatParticles';

const FEATURES = [
  {
    title: 'Cat Profiles',
    desc: 'Individual pages for each cat — name, age, breed, personality traits, and a personal backstory written from memory.',
  },
  {
    title: 'Bilingual Content',
    desc: 'All profiles available in English and Chinese (喵故事), making the site accessible to both communities.',
  },
  {
    title: 'Boarding Services',
    desc: 'Three care modes with pricing, a detailed FAQ, and a contact form — built for real booking inquiries.',
  },
  {
    title: 'Framer Motion Animations',
    desc: 'Smooth page transitions and entrance animations using Framer Motion, giving the site a polished, app-like feel.',
  },
  {
    title: 'Contact & Booking',
    desc: 'Integrated Formspree contact form plus WeChat and email options for clients to reach out directly.',
  },
  {
    title: 'Responsive Design',
    desc: 'Fully responsive across mobile, tablet, and desktop — styled with Tailwind CSS custom design tokens.',
  },
];

const TECH = [
  'React 18', 'Vite', 'Tailwind CSS', 'React Router v6',
  'Framer Motion', 'Lucide React', 'Formspree', 'Vercel',
];

const CATS = [
  { name: 'Didi',         trait: 'Agile · Affectionate',     breed: 'Tuxedo'       },
  { name: 'Sugar',        trait: 'Naughty · Mischievous',    breed: 'Devon Rex'    },
  { name: 'Sweet Potato', trait: 'Lazy · Gentle',            breed: 'Long-haired'  },
  { name: 'Red Bean',     trait: 'Independent · Fierce',     breed: 'Domestic'     },
  { name: 'Gaogao',       trait: 'Smart · Door opener',      breed: 'Tabby'        },
  { name: 'Xixi',         trait: 'Foodie · Squishy',         breed: 'Domestic'     },
  { name: 'Jiajia',       trait: 'Fearless · Lovable goof',  breed: 'Orange Tabby' },
  { name: 'Luoluo',       trait: 'Stealthy · Glowing eyes',  breed: 'Black Cat'    },
  { name: 'Spoon',        trait: 'Fierce-looking · Adorable',breed: 'Maine Coon'   },
  { name: 'Alan & Alex',  trait: 'Affectionate · Identical', breed: 'Domestic'     },
];

function FeatureCard({ feature, index }) {
  const { isEmpathy } = useTheme();
  const { ref, isVisible } = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className={`p-5 rounded-2xl border transition-all duration-500 hover:-translate-y-0.5 ${
        isEmpathy ? 'bg-white border-stone-100 hover:border-rose-100 hover:shadow-md' : 'bg-white/[0.03] border-white/8 hover:bg-white/[0.06]'
      }`}
      style={{
        opacity:    isVisible ? 1 : 0,
        transform:  isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms`,
      }}
    >
      <div className={`w-2 h-2 rounded-full mb-3 ${isEmpathy ? 'bg-rose-400' : 'bg-green-600'}`} />
      <h3 className={`font-semibold mb-1.5 ${isEmpathy ? 'text-stone-900' : 'text-white'}`}>{feature.title}</h3>
      <p className={`text-sm ${isEmpathy ? 'text-stone-500' : 'text-stone-400'}`}>{feature.desc}</p>
    </div>
  );
}

function CatPill({ cat, index }) {
  const { isEmpathy } = useTheme();
  const { ref, isVisible } = useScrollReveal(0.05);
  return (
    <div
      ref={ref}
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all hover:-translate-y-0.5 ${
        isEmpathy ? 'bg-white border-stone-100 hover:border-rose-100' : 'bg-white/[0.03] border-white/8 hover:bg-white/[0.05]'
      }`}
      style={{
        opacity:    isVisible ? 1 : 0,
        transform:  isVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 60}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 60}ms`,
      }}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
        isEmpathy ? 'bg-rose-50 text-rose-500' : 'bg-green-950/50 text-green-400'
      }`}>
        {cat.name[0]}
      </div>
      <div className="min-w-0">
        <p className={`text-sm font-semibold leading-tight ${isEmpathy ? 'text-stone-900' : 'text-white'}`}>{cat.name}</p>
        <p className={`text-xs truncate ${isEmpathy ? 'text-stone-400' : 'text-stone-500'}`}>{cat.breed} · {cat.trait}</p>
      </div>
    </div>
  );
}

export default function CatWorldPage() {
  const { isEmpathy } = useTheme();
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0);

  const bg    = isEmpathy ? 'bg-white'      : 'bg-[#070c07]';
  const altBg = isEmpathy ? 'bg-stone-50'  : 'bg-[#0a120a]';

  return (
    <div className={`min-h-screen transition-colors duration-700 ${bg}`}>

      {/* Hero */}
      <section
        className="relative overflow-hidden pt-32 pb-20 px-6 md:px-12"
        style={{
          background: isEmpathy
            ? 'linear-gradient(135deg, #ffffff 0%, #fff0f3 100%)'
            : 'linear-gradient(135deg, #070c07 0%, #0f1a0a 100%)',
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

          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border mb-6 ${
            isEmpathy ? 'border-rose-200 bg-rose-50 text-rose-600' : 'border-green-800/40 bg-green-950/30 text-green-400'
          }`}>
            Personal Project · Open Source · Deployed on Vercel
          </div>

          <h1
            className={`font-serif leading-none mb-1 ${isEmpathy ? 'text-stone-900' : 'text-white'}`}
            style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
          >
            MiaoStories
          </h1>
          <p className={`text-xl font-light mb-1 ${isEmpathy ? 'text-stone-400' : 'text-stone-500'}`}>喵故事</p>
          <p className={`text-lg mb-6 ${isEmpathy ? 'text-rose-600' : 'text-green-400'}`}>
            Personal Cat Journal &amp; Boarding Site
          </p>
          <p className={`text-base leading-relaxed max-w-2xl mb-8 ${isEmpathy ? 'text-stone-600' : 'text-stone-400'}`}>
            A bilingual (EN/中文){' '}
            <span className={isEmpathy ? 'text-rose-600 font-medium' : 'text-green-400 font-medium'}>React + Framer Motion</span>
            {' '}site celebrating the 10 cats I&apos;ve cared for as a pet sitter in Seattle.
            Each cat gets their own profile, backstory, and personality write-up — plus a real booking system for boarding services.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://miao-stories.vercel.app/"
              target="_blank" rel="noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                isEmpathy ? 'bg-gradient-to-r from-rose-500 to-pink-400 text-white shadow-lg shadow-rose-200/40' : 'bg-gradient-to-r from-green-600 to-emerald-500 text-white'
              }`}
            >
              <ExternalLink size={15} /> Visit Live Site
            </a>
            <a
              href="https://github.com/Li-qianyi-Lynn/miaoHome"
              target="_blank" rel="noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-medium transition-all hover:-translate-y-0.5 ${
                isEmpathy ? 'border-rose-200 text-rose-600 hover:bg-rose-50' : 'border-green-800/40 text-green-400 hover:bg-green-950/30'
              }`}
            >
              <Github size={15} /> View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Screenshot */}
      <section className={`py-12 px-6 md:px-12 ${altBg}`}>
        <div className="max-w-4xl mx-auto">
          <div className={`rounded-3xl shadow-2xl border ${isEmpathy ? 'border-stone-200' : 'border-white/10'}`}>
            <img src={lynnCatsWebImg} alt="MiaoStories Screenshot" className="w-full rounded-3xl" />
          </div>
        </div>
      </section>

      {/* The Cats */}
      <section className={`py-16 px-6 md:px-12 ${bg}`}>
        <div className="max-w-4xl mx-auto">
          <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${isEmpathy ? 'text-rose-500' : 'text-green-400'}`}>— The Cast</p>
          <h2 className={`text-3xl font-serif mb-2 ${isEmpathy ? 'text-stone-900' : 'text-white'}`}>10 Cats, 10 Stories</h2>
          <p className={`text-sm mb-8 ${isEmpathy ? 'text-stone-500' : 'text-stone-400'}`}>Each one I cared for personally. Each one unforgettable.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CATS.map((cat, i) => <CatPill key={cat.name} cat={cat} index={i} />)}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={`py-16 px-6 md:px-12 ${altBg}`}>
        <div className="max-w-4xl mx-auto">
          <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${isEmpathy ? 'text-rose-500' : 'text-green-400'}`}>— What&apos;s Inside</p>
          <h2 className={`text-3xl font-serif mb-8 ${isEmpathy ? 'text-stone-900' : 'text-white'}`}>Features</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {FEATURES.map((f, i) => <FeatureCard key={f.title} feature={f} index={i} />)}
          </div>
        </div>
      </section>

      {/* Tech */}
      <section className={`py-16 px-6 md:px-12 ${bg}`}>
        <div className="max-w-4xl mx-auto">
          <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${isEmpathy ? 'text-rose-500' : 'text-green-400'}`}>— Tech Stack</p>
          <h2 className={`text-3xl font-serif mb-6 ${isEmpathy ? 'text-stone-900' : 'text-white'}`}>Built With</h2>
          <div className="flex flex-wrap gap-3">
            {TECH.map((t) => (
              <span key={t} className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all hover:-translate-y-0.5 ${
                isEmpathy ? 'bg-white border-stone-100 text-stone-700 hover:border-rose-100 hover:text-rose-700' : 'bg-white/5 border-white/10 text-stone-300 hover:border-green-900/50'
              }`}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-16 px-6 md:px-12 text-center ${isEmpathy ? 'bg-gradient-to-br from-rose-50 to-stone-50' : 'bg-gradient-to-br from-green-950/20 to-stone-950/20'}`}>
        <div className="max-w-xl mx-auto">
          <h2 className={`text-2xl font-serif mb-3 ${isEmpathy ? 'text-stone-900' : 'text-white'}`}>
            Made with <Heart size={16} className="inline text-rose-400" /> for every cat I&apos;ve met
          </h2>
          <p className={`text-sm mb-8 ${isEmpathy ? 'text-stone-500' : 'text-stone-400'}`}>
            Open source. Cat photos and boarding inquiries always welcome.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://miao-stories.vercel.app/"
              target="_blank" rel="noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 ${isEmpathy ? 'bg-gradient-to-r from-rose-500 to-pink-400 text-white shadow-lg' : 'bg-gradient-to-r from-green-600 to-emerald-500 text-white'}`}
            >
              <ExternalLink size={15} /> Visit Live Site
            </a>
            <a
              href="https://github.com/Li-qianyi-Lynn/miaoHome"
              target="_blank" rel="noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-medium transition-all hover:-translate-y-0.5 ${isEmpathy ? 'border-stone-200 text-stone-700 hover:bg-white' : 'border-stone-700 text-stone-300 hover:bg-stone-800/50'}`}
            >
              <Github size={15} /> GitHub
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
