import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Cat, Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Footer() {
  const { isEmpathy } = useTheme();

  const bg         = isEmpathy ? 'bg-white'         : 'bg-[#040804]';
  const border     = isEmpathy ? 'border-stone-300/60' : 'border-white/5';
  const textMain   = isEmpathy ? 'text-stone-500'   : 'text-stone-400';
  const textSub    = isEmpathy ? 'text-stone-400'   : 'text-stone-500';
  const heading    = isEmpathy ? 'text-stone-800'   : 'text-white';
  const brand      = isEmpathy ? 'text-stone-900'   : 'text-white';
  const accent     = isEmpathy ? 'text-rose-500 hover:text-rose-600' : 'text-green-500 hover:text-green-400';
  const iconColor  = isEmpathy ? 'text-stone-400 hover:text-stone-800' : 'text-stone-500 hover:text-white';
  const linkHover  = isEmpathy ? 'hover:text-stone-800' : 'hover:text-white';
  const catIcon    = isEmpathy ? 'text-rose-400'    : 'text-green-500';
  const copy       = isEmpathy ? 'text-stone-400'   : 'text-stone-600';
  const mono       = isEmpathy ? 'text-stone-400'   : 'text-stone-700';

  return (
    <footer className={`${bg} ${textMain} py-16 px-6 md:px-12 transition-colors duration-700`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-3">
            <div className={`flex items-center gap-2 font-bold text-lg ${brand}`}>
              <Cat size={20} className={catIcon} />
              CURIOUSLYNN
            </div>
            <p className={`text-sm leading-relaxed max-w-xs ${textSub}`}>
              Building at the intersection of human psychology and intelligent systems.
            </p>
            <div className="flex gap-4 pt-2">
              {[
                { icon: Github,   href: 'https://github.com/Li-qianyi-Lynn',           label: 'GitHub'   },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/qianyi-li-lynn/', label: 'LinkedIn' },
                { icon: Mail,     href: 'mailto:qianyililynn@gmail.com',               label: 'Email'    },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className={`${iconColor} transition-colors hover:-translate-y-0.5 inline-block duration-200`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className={`text-sm font-semibold tracking-wide ${heading}`}>Explore</h4>
            <nav className="flex flex-col gap-2">
              {[
                { to: '/about',           label: 'About & Resume', external: false },
                { to: '/projects',        label: 'All Projects',   external: false },
                { to: '/cats',            label: 'MiaoStories',    external: false },
                { to: 'https://tmind.ai/', label: 'TMind.AI ↗',   external: true  },
              ].map(({ to, label, external }) =>
                external ? (
                  <a
                    key={to}
                    href={to}
                    target="_blank"
                    rel="noreferrer"
                    className={`text-sm ${textSub} ${linkHover} transition-colors duration-200`}
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    key={to}
                    to={to}
                    className={`text-sm ${textSub} ${linkHover} transition-colors duration-200`}
                  >
                    {label}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className={`text-sm font-semibold tracking-wide ${heading}`}>Say Hello</h4>
            <p className={`text-sm ${textSub}`}>
              Open to full-time roles, research collaborations, and interesting conversations.
            </p>
            <a
              href="mailto:qianyililynn@gmail.com"
              className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${accent}`}
            >
              <Mail size={14} /> qianyililynn@gmail.com
            </a>
          </div>
        </div>

        <div className={`pt-6 border-t ${border} flex flex-col md:flex-row justify-between items-center gap-3`}>
          <p className={`text-xs ${copy}`}>
            © 2026 Lynn Li. Crafted with curiosity.
          </p>
          <p className={`text-xs font-mono ${mono}`}>
            Psychology × AI × Open Source
          </p>
        </div>
      </div>
    </footer>
  );
}
