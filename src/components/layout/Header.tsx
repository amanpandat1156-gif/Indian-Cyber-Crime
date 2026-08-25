import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { mainNavItems } from '../../data/navigation';
import { Container } from '../common/Container';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLang, setCurrentLang] = useState<'en' | 'hi'>('en');
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[#E2E6E8]">
      <Container size="full" className="max-w-[1400px]">
        <div className="flex items-center justify-between h-20 px-2 sm:px-4">
          {/* Official Emblem & Portal Identity */}
          <Link
            to="/"
            className="flex items-center gap-3.5 group focus-visible:outline-none"
            aria-label="National Cyber Crime Reporting Portal Home"
          >
            {/* Ashoka Lion Emblem */}
            <div className="w-10 h-12 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 40 50" className="w-9 h-11 fill-[#12304A]">
                {/* Ashoka Emblem Vector representation */}
                <path d="M20 2C18.5 2 17.5 3 17.5 4.5C17.5 5.5 18 6.3 19 6.7V9C15.5 9.5 13 12 13 15.5C13 17 13.8 18.3 15 19.1V22C12 22.5 9 24.5 9 28C9 30.5 10.8 32.5 13 33.2V36C10.5 36.8 8.5 39 8.5 42H31.5C31.5 39 29.5 36.8 27 36V33.2C29.2 32.5 31 30.5 31 28C31 24.5 28 22.5 25 22V19.1C26.2 18.3 27 17 27 15.5C27 12 24.5 9.5 21 9V6.7C22 6.3 22.5 5.5 22.5 4.5C22.5 3 21.5 2 20 2ZM18 43H22V45H18V43ZM15 46H25V47.5H15V46Z" fill="#1C252C" opacity="0.85"/>
                <circle cx="20" cy="44.5" r="1.5" fill="#D8891C"/>
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="text-[15px] sm:text-[17px] font-bold text-[#12304A] leading-snug tracking-tight">
                National Cyber Crime<br className="hidden sm:inline" /> Reporting Portal
              </span>
              <span className="text-[11px] sm:text-xs text-[#5E6B73] font-normal mt-0.5">
                Ministry of Home Affairs | Government of India
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[14px]" aria-label="Main Navigation">
            {mainNavItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`relative py-2 font-medium transition-colors duration-150 ${
                    isActive
                      ? 'text-[#12304A] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#12304A]'
                      : 'text-[#4A5560] hover:text-[#12304A]'
                  }`}
                >
                  {currentLang === 'hi' && item.labelHi ? item.labelHi : item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Utilities (Language & Search) */}
          <div className="hidden lg:flex items-center gap-5 text-sm">
            {/* Language Text Toggle */}
            <div className="flex items-center gap-1.5 text-[13px] text-[#4A5560]">
              <button
                type="button"
                onClick={() => setCurrentLang('en')}
                className={`transition-colors ${currentLang === 'en' ? 'font-semibold text-[#12304A]' : 'hover:text-[#12304A]'}`}
              >
                English
              </button>
              <span className="text-[#C4CDD2]">|</span>
              <button
                type="button"
                onClick={() => setCurrentLang('hi')}
                className={`transition-colors ${currentLang === 'hi' ? 'font-semibold text-[#12304A]' : 'hover:text-[#12304A]'}`}
              >
                हिन्दी
              </button>
            </div>

            {/* Search Icon Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 text-[#4A5560] hover:text-[#12304A] transition-colors focus-visible:outline-none"
              aria-label="Search"
            >
              <Search className="w-4 h-4 stroke-[2]" />
            </button>
          </div>

          {/* Mobile Menu & Search Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#4A5560] hover:text-[#12304A]"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#12304A]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Expandable Search Bar */}
      {searchOpen && (
        <div className="bg-[#F8F7F3] border-t border-[#DDE2E4] py-3 px-4">
          <Container size="md">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 w-4 h-4 text-[#5E6B73]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cybercrime guidance, 1930 helpline, or police stations..."
                className="w-full pl-10 pr-20 py-2 text-sm bg-white rounded-md border border-[#DDE2E4] focus:border-[#12304A] focus:outline-none text-[#1C252C]"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="absolute right-2 px-2.5 py-1 text-xs text-[#5E6B73] hover:text-[#12304A] font-medium"
              >
                Close
              </button>
            </div>
          </Container>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#DDE2E4] bg-white py-4 px-4 shadow-md">
          <nav className="flex flex-col space-y-2">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded text-sm font-medium ${
                  location.pathname === item.href
                    ? 'bg-[#EDF3F7] text-[#12304A] font-semibold'
                    : 'text-[#4A5560] hover:bg-[#F8F7F3]'
                }`}
              >
                {currentLang === 'hi' && item.labelHi ? item.labelHi : item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-[#DDE2E4] flex items-center justify-between text-xs text-[#5E6B73]">
            <span>Language:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentLang('en')}
                className={`px-2 py-1 rounded ${currentLang === 'en' ? 'bg-[#12304A] text-white font-semibold' : 'bg-gray-100'}`}
              >
                English
              </button>
              <button
                onClick={() => setCurrentLang('hi')}
                className={`px-2 py-1 rounded ${currentLang === 'hi' ? 'bg-[#12304A] text-white font-semibold' : 'bg-gray-100'}`}
              >
                हिन्दी
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
