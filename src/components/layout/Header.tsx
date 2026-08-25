import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, PhoneCall, ChevronDown, Eye, Check, User, LogOut, Shield } from 'lucide-react';
import { mainNavItems } from '../../data/navigation';
import { Container } from '../common/Container';
import { NationalEmblem } from '../common/NationalEmblem';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { NotificationDrawer } from '../notifications/NotificationDrawer';
import { LoginModal } from '../auth/LoginModal';

const navItemKeyMap: Record<string, string> = {
  '/': 'nav.home',
  '/track': 'nav.track',
  '/verify': 'nav.verify',
  '/help': 'nav.help',
  '/volunteer': 'nav.volunteer',
};

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { fontSize, setFontSize, contrastMode, toggleContrast } = useAccessibility();
  const { user, openLoginModal, logout } = useAuth();
  const { currentLang, setCurrentLang, t, languages, currentLangOption } = useLanguage();

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setLangDropdownOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-[#E2E6E8] shadow-xs">
        {/* 1. GIGW Top Bar */}
        <div className="bg-[#0B2235] text-white text-[11.5px] border-b border-[#1A3854]">
          <Container size="full" className="max-w-[1400px]">
            <div className="flex items-center justify-between h-9 px-2 sm:px-4">
              {/* Government of India Identity Flag */}
              <div className="flex items-center gap-2 text-slate-300">
                <div className="flex items-center gap-[2px]">
                  <span className="w-2.5 h-1.5 bg-[#FF9933] rounded-[1px]"></span>
                  <span className="w-2.5 h-1.5 bg-white rounded-[1px]"></span>
                  <span className="w-2.5 h-1.5 bg-[#138808] rounded-[1px]"></span>
                </div>
                <span className="font-semibold tracking-wide text-white">{t('header.govTitle')}</span>
                <span className="text-slate-500 hidden md:inline">|</span>
                <span className="hidden md:inline text-slate-300">{t('header.ministry')}</span>
              </div>

              {/* Right: Accessibility Controls + Multi-Language + Prominent 1930 Helpline */}
              <div className="flex items-center gap-2 sm:gap-4">
                <a
                  href="#main-content"
                  className="sr-only focus:not-sr-only focus:absolute focus:top-1 focus:left-2 focus:z-50 focus:px-3 focus:py-1 focus:bg-[#12304A] focus:text-white focus:rounded text-xs"
                >
                  {t('header.skipToContent')}
                </a>

                {/* Font Resizer */}
                <div className="hidden sm:flex items-center bg-[#12304A] rounded px-1.5 py-0.5 border border-slate-700 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setFontSize('normal')}
                    className={`px-1.5 py-0.5 hover:text-white transition-colors ${fontSize === 'normal' ? 'text-[#D8891C] font-bold' : 'text-slate-300'}`}
                    title="Standard Font Size"
                  >
                    A-
                  </button>
                  <span className="text-slate-600">|</span>
                  <button
                    type="button"
                    onClick={() => setFontSize('large')}
                    className={`px-1.5 py-0.5 hover:text-white transition-colors ${fontSize === 'large' ? 'text-[#D8891C] font-bold' : 'text-slate-300'}`}
                    title="Large Font Size"
                  >
                    A
                  </button>
                  <span className="text-slate-600">|</span>
                  <button
                    type="button"
                    onClick={() => setFontSize('larger')}
                    className={`px-1.5 py-0.5 hover:text-white transition-colors ${fontSize === 'larger' ? 'text-[#D8891C] font-bold' : 'text-slate-300'}`}
                    title="Extra Large Font Size"
                  >
                    A+
                  </button>
                </div>

                {/* High Contrast Mode */}
                <button
                  type="button"
                  onClick={toggleContrast}
                  className="hidden sm:inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-[#12304A] border border-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Toggle High Contrast"
                >
                  <Eye className="w-3 h-3 text-[#D8891C]" />
                  <span>{contrastMode === 'high-contrast' ? t('header.normalMode') : t('header.highContrast')}</span>
                </button>

                {/* Multi-lingual Language Selector */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                    className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#12304A] border border-slate-700 text-white text-[11px] font-medium hover:border-slate-500 transition-colors"
                    aria-label="Select website language"
                  >
                    <span>{currentLangOption.native}</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  {langDropdownOpen && (
                    <div className="absolute right-0 mt-1 w-44 bg-white text-[#1C252C] rounded-md shadow-lg border border-slate-200 py-1.5 z-50 max-h-60 overflow-y-auto">
                      <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                        Official Languages
                      </div>
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            setCurrentLang(lang.code);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left hover:bg-[#F0F4F8] transition-colors ${
                            currentLang === lang.code ? 'font-bold text-[#12304A] bg-[#EDF3F7]' : 'text-[#334155]'
                          }`}
                        >
                          <span>{lang.native} ({lang.label})</span>
                          {currentLang === lang.code && <Check className="w-3 h-3 text-[#12304A]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Fixed Top-Right 1930 Helpline */}
                <a
                  href="tel:1930"
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#8B2626] hover:bg-[#731F1F] text-white font-bold tracking-wide transition-colors border border-[#A63838] shadow-xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  <PhoneCall className="w-3 h-3 text-white" />
                  <span>{t('header.helpline')}</span>
                </a>
              </div>
            </div>
          </Container>
        </div>

        {/* 2. Main Institutional Identity & Navigation Bar */}
        <Container size="full" className="max-w-[1400px]">
          <div className="flex items-center justify-between h-20 px-2 sm:px-4">
            {/* Official Ashoka Emblem & Portal Brand */}
            <Link
              to="/"
              className="flex items-center gap-3.5 group focus-visible:outline-none"
              aria-label="National Cyber Crime Reporting Portal Home"
            >
              <NationalEmblem size="md" variant="dark" />

              <div className="flex flex-col">
                <span className="text-[16px] sm:text-[18px] font-bold text-[#12304A] leading-snug tracking-tight">
                  {t('header.portalTitle')}
                </span>
                <span className="text-[11.5px] sm:text-xs text-[#5E6B73] font-medium mt-0.5">
                  {t('header.portalSubtitle')}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-[14.5px]" aria-label="Main Navigation">
              {mainNavItems.map((item) => {
                const isActive = location.pathname === item.href;
                const translatedLabel = t(navItemKeyMap[item.href] || item.label, item.label);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`relative py-2 font-medium transition-colors duration-150 ${
                      isActive
                        ? 'text-[#12304A] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#12304A]'
                        : 'text-[#4A5560] hover:text-[#12304A]'
                    }`}
                  >
                    {translatedLabel}
                  </Link>
                );
              })}
            </nav>

            {/* Right Utilities (Search + Notifications + User Auth) */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Notification Bell */}
              <NotificationDrawer />

              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1.5 text-[#4A5560] hover:text-[#12304A] hover:bg-[#F3F6F8] rounded-md transition-colors focus-visible:outline-none"
                aria-label="Search portal"
              >
                <Search className="w-4.5 h-4.5 stroke-[2]" />
              </button>

              {/* User Profile / Login */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#EDF3F7] text-[#12304A] text-xs font-semibold hover:bg-[#DDE7F0] transition-colors border border-[#CCDCE8]"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>{user.name.split(' ')[0]}</span>
                    <ChevronDown className="w-3 h-3 text-[#5E6B73]" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-[10px] border border-[#DDE2E4] shadow-xl py-2 z-50 animate-in fade-in duration-150 text-xs">
                      <div className="px-3 py-2 border-b border-[#F0F2F3]">
                        <div className="font-bold text-[#12304A]">{user.name}</div>
                        <div className="text-[11px] text-[#5E6B73]">{user.phone}</div>
                      </div>

                      <Link
                        to="/track"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-[#1C252C] hover:bg-[#EDF3F7] font-medium"
                      >
                        <Shield className="w-3.5 h-3.5 text-[#12304A]" />
                        <span>My Filed Complaints</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-[#8B2626] hover:bg-rose-50 text-left font-semibold border-t border-[#F0F2F3] mt-1"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={openLoginModal}
                  className="px-3.5 py-1.5 rounded-md bg-[#12304A] text-white text-xs font-semibold hover:bg-[#0B2235] transition-colors"
                >
                  {t('header.login')}
                </button>
              )}
            </div>

            {/* Mobile Menu & Search Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <NotificationDrawer />
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
          <div className="bg-[#F8F7F3] border-t border-[#DDE2E4] py-3.5 px-4 animate-in fade-in duration-150">
            <Container size="md">
              <div className="relative flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 text-[#5E6B73]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('header.searchPlaceholder')}
                  className="w-full pl-10 pr-20 py-2 text-sm bg-white rounded-md border border-[#DDE2E4] focus:border-[#12304A] focus:outline-none text-[#1C252C] shadow-xs"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-2.5 px-2.5 py-1 text-xs text-[#5E6B73] hover:text-[#12304A] font-medium"
                >
                  Close
                </button>
              </div>
            </Container>
          </div>
        )}

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#DDE2E4] bg-white py-4 px-4 shadow-lg animate-in slide-in-from-top-2 duration-150">
            <nav className="flex flex-col space-y-1.5">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 rounded-md text-sm font-medium ${
                    location.pathname === item.href
                      ? 'bg-[#EDF3F7] text-[#12304A] font-semibold'
                      : 'text-[#4A5560] hover:bg-[#F8F7F3]'
                  }`}
                >
                  {t(navItemKeyMap[item.href] || item.label, item.label)}
                </Link>
              ))}
            </nav>

            <div className="mt-4 pt-4 border-t border-[#DDE2E4] flex flex-col gap-3">
              {user ? (
                <div className="flex items-center justify-between p-2.5 bg-[#EDF3F7] rounded-md text-xs">
                  <div className="font-bold text-[#12304A]">{user.name} ({user.phone})</div>
                  <button onClick={logout} className="text-[#8B2626] font-bold">Logout</button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openLoginModal();
                  }}
                  className="w-full py-2.5 rounded-md bg-[#12304A] text-white text-xs font-semibold"
                >
                  {t('header.login')}
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Global Login Modal Component */}
      <LoginModal />
    </>
  );
};
