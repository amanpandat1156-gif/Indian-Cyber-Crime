import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../common/Container';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B2235] text-slate-300 pt-10 pb-8 border-t border-slate-800">
      <Container size="full" className="max-w-[1400px]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 px-2 sm:px-4">
          {/* Left: National Emblem & Portal Title */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-10 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 40 50" className="w-8 h-10 fill-white opacity-90">
                <path d="M20 2C18.5 2 17.5 3 17.5 4.5C17.5 5.5 18 6.3 19 6.7V9C15.5 9.5 13 12 13 15.5C13 17 13.8 18.3 15 19.1V22C12 22.5 9 24.5 9 28C9 30.5 10.8 32.5 13 33.2V36C10.5 36.8 8.5 39 8.5 42H31.5C31.5 39 29.5 36.8 27 36V33.2C29.2 32.5 31 30.5 31 28C31 24.5 28 22.5 25 22V19.1C26.2 18.3 27 17 27 15.5C27 12 24.5 9.5 21 9V6.7C22 6.3 22.5 5.5 22.5 4.5C22.5 3 21.5 2 20 2ZM18 43H22V45H18V43ZM15 46H25V47.5H15V46Z"/>
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-white leading-tight">
                National Cyber Crime<br />Reporting Portal
              </span>
              <span className="text-[10.5px] text-slate-400 mt-0.5">
                Ministry of Home Affairs | Government of India
              </span>
            </div>

            {/* Vertical separator */}
            <div className="hidden md:block h-8 w-[1px] bg-slate-700 mx-2"></div>
          </div>

          {/* Center: Legal & Policy Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[12px] text-slate-300">
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <span className="text-slate-600">|</span>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span className="text-slate-600">|</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <span className="text-slate-600">|</span>
            <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
            <span className="text-slate-600">|</span>
            <Link to="/help" className="hover:text-white transition-colors">Contact Us</Link>
          </div>

          {/* Right: Social Follow & Last Updated */}
          <div className="flex flex-col items-center lg:items-end gap-1.5 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-[11.5px] text-slate-400">Follow us</span>
              
              {/* X (Twitter) */}
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white transition-colors" aria-label="X (Twitter)">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>

            <span className="text-[10.5px] text-slate-500">
              Last updated: 24 April 2025
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
