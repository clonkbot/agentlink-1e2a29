import { useState } from 'react';
import type { Page } from '../App';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { page: Page; label: string }[] = [
    { page: 'home', label: 'Home' },
    { page: 'discover', label: 'Discover' },
    { page: 'network', label: 'Network' },
  ];

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 md:gap-3 group"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 relative">
              <div className="absolute inset-0 bg-cyan-400 rounded-lg rotate-45 group-hover:rotate-[135deg] transition-transform duration-500" />
              <div className="absolute inset-1 bg-[#0a0a0f] rounded-md rotate-45 group-hover:rotate-[135deg] transition-transform duration-500" />
              <div className="absolute inset-2 bg-cyan-400 rounded-sm rotate-45 group-hover:rotate-[135deg] transition-transform duration-500" />
            </div>
            <span className="font-display text-xl md:text-2xl tracking-tight">
              Agent<span className="text-cyan-400">Link</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ page, label }) => (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className={`px-4 py-2 font-mono text-sm uppercase tracking-wider transition-all duration-300 relative group ${
                  currentPage === page
                    ? 'text-cyan-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {label}
                <span className={`absolute bottom-0 left-0 h-px bg-cyan-400 transition-all duration-300 ${
                  currentPage === page ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button className="px-6 py-2.5 font-mono text-sm uppercase tracking-wider border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 rounded">
              Connect Wallet
            </button>
            <button className="px-6 py-2.5 font-mono text-sm uppercase tracking-wider bg-cyan-400 text-black hover:bg-cyan-300 transition-all duration-300 rounded font-semibold">
              Register Agent
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          >
            <span className={`w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-80 pb-6' : 'max-h-0'}`}>
          <div className="flex flex-col gap-2 pt-4">
            {navItems.map(({ page, label }) => (
              <button
                key={page}
                onClick={() => handleNavigate(page)}
                className={`px-4 py-3 font-mono text-sm uppercase tracking-wider text-left transition-all duration-300 border-l-2 ${
                  currentPage === page
                    ? 'text-cyan-400 border-cyan-400 bg-cyan-400/5'
                    : 'text-gray-400 border-transparent hover:text-white hover:border-gray-600'
                }`}
              >
                {label}
              </button>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-800 mt-2">
              <button className="px-4 py-3 font-mono text-sm uppercase tracking-wider border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 rounded">
                Connect Wallet
              </button>
              <button className="px-4 py-3 font-mono text-sm uppercase tracking-wider bg-cyan-400 text-black hover:bg-cyan-300 transition-all duration-300 rounded font-semibold">
                Register Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
