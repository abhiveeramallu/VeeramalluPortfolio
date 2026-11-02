import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Terminal, Sparkles } from 'lucide-react';
import { SoundToggle } from './SoundToggle';
import { soundManager } from '../utils/audio';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Playground', href: '#playground' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    soundManager.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#101014]/90 backdrop-blur-md border-b border-[#272733]/80 shadow-lg shadow-black/30'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            soundManager.playClick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center space-x-2.5 font-display text-lg sm:text-xl font-bold tracking-tight text-[#F4F0E6] hover:text-[#FF5B35] transition-colors"
          data-cursor="hover"
          data-cursor-text="TOP"
        >
          <div className="w-8 h-8 rounded-lg bg-[#16161c] border border-[#272733] flex items-center justify-center group-hover:border-[#FF5B35] transition-colors shadow-sm">
            <span className="font-mono text-sm font-extrabold text-[#FF5B35]">A</span>
          </div>
          <span className="tracking-wider">ABHIRAM<span className="text-[#FF5B35]">.DEV</span></span>
        </a>

        {/* Center Nav Links - Desktop */}
        <nav className="hidden lg:flex items-center space-x-1 border border-[#272733]/80 bg-[#16161c]/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="px-3.5 py-1.5 text-xs font-mono tracking-wide text-[#A7A3AD] hover:text-[#F4F0E6] hover:bg-[#22222d] rounded-full transition-all duration-200"
              data-cursor="hover"
              data-cursor-text="GO"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Actions: Sound + Status + Contact / Resume */}
        <div className="hidden sm:flex items-center space-x-3">
          <SoundToggle />

          {/* Status Badge */}
          <div className="hidden xl:flex items-center space-x-2 px-3 py-1.5 rounded-full border border-[#272733] bg-[#16161c] text-[11px] font-mono text-[#A7A3AD]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>VIT '27 • ACTIVE</span>
          </div>

          {/* Connect CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-[#FF5B35] hover:bg-[#ff4317] text-white text-xs font-mono font-medium tracking-wide transition-all shadow-md shadow-[#FF5B35]/25 hover:shadow-[#FF5B35]/40"
            data-cursor="hover"
            data-cursor-text="TALK"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center space-x-2">
          <SoundToggle />
          <button
            onClick={() => {
              soundManager.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-lg border border-[#272733] bg-[#16161c] text-[#F4F0E6] hover:border-[#FF5B35] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#FF5B35]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#101014]/98 border-b border-[#272733] px-6 py-6 space-y-4 backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-4 py-2.5 rounded-lg text-sm font-mono text-[#F4F0E6] hover:bg-[#1c1c24] hover:text-[#FF5B35] transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-[#A7A3AD]" />
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-[#272733] flex flex-col space-y-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="w-full py-2.5 rounded-lg bg-[#FF5B35] text-white font-mono text-center text-xs font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-[#FF5B35]/30"
            >
              <span>Initiate Transmission</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
