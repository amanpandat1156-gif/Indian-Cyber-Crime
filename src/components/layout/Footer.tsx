import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../common/Container';
import { ShieldCheck, Lock, Activity } from 'lucide-react';
import { PolicyModal, PolicyType } from '../common/PolicyModal';

export const Footer: React.FC = () => {
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);

  return (
    <>
      <footer className="bg-[#0B2235] text-slate-300 pt-8 sm:pt-12 pb-6 sm:pb-8 border-t border-slate-800" aria-label="Portal Footer">
        <Container size="full" className="max-w-[1400px]">
          {/* 1. Main Navigation & Identity Row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-slate-800/80 px-3.5 sm:px-4">
            {/* Left: National Emblem & Portal Title */}
            <div className="flex items-center gap-3.5 sm:gap-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                alt="State Emblem of India"
                className="w-9 sm:w-10 h-12 sm:h-14 object-contain brightness-0 invert opacity-90 shrink-0"
                loading="lazy"
              />

              <div className="flex flex-col">
                <span className="text-[14.5px] sm:text-[16px] font-bold text-white leading-tight">
                  National Cyber Crime<br />Reporting Portal
                </span>
                <span className="text-[11px] sm:text-[11.5px] text-slate-400 mt-0.5 font-medium">
                  Ministry of Home Affairs &bull; Government of India
                </span>
              </div>

              {/* Vertical separator */}
              <div className="hidden md:block h-10 w-[1px] bg-slate-700 mx-3"></div>
            </div>

            {/* Center: Legal & GIGW Mandatory Policy Links */}
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 text-[12px] sm:text-[12.5px] text-slate-300">
              <Link to="/about" className="hover:text-white hover:underline transition-colors min-h-[38px] sm:min-h-0 inline-flex items-center">
                About Us
              </Link>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <button
                type="button"
                onClick={() => setActivePolicy('privacy')}
                className="hover:text-white hover:underline transition-colors focus-visible:outline-none min-h-[38px] sm:min-h-0 inline-flex items-center"
              >
                Privacy
              </button>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <button
                type="button"
                onClick={() => setActivePolicy('terms')}
                className="hover:text-white hover:underline transition-colors focus-visible:outline-none min-h-[38px] sm:min-h-0 inline-flex items-center"
              >
                Terms of Use
              </button>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <button
                type="button"
                onClick={() => setActivePolicy('accessibility')}
                className="hover:text-white hover:underline transition-colors focus-visible:outline-none min-h-[38px] sm:min-h-0 inline-flex items-center"
              >
                Accessibility
              </button>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <Link to="/help" className="hover:text-white hover:underline transition-colors min-h-[38px] sm:min-h-0 inline-flex items-center">
                Contact Us
              </Link>
            </div>

          {/* Right: Social Follow Links */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs text-slate-400">
            <span className="text-[12px] text-slate-400">Follow us</span>
            
            {/* X (Twitter) - CyberDost */}
            <a
              href="https://x.com/CyberDost"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Official CyberDost on X (Twitter)"
              title="Official CyberDost on X (Twitter)"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* YouTube - CyberDost I4C */}
            <a
              href="https://www.youtube.com/@CyberDostI4C"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Official CyberDost I4C YouTube Channel"
              title="Official CyberDost I4C YouTube Channel"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* Facebook - CyberDost I4C */}
            <a
              href="https://www.facebook.com/CyberDostI4C"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Official CyberDost I4C Facebook Page"
              title="Official CyberDost I4C Facebook Page"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* LinkedIn - I4C */}
            <a
              href="https://www.linkedin.com/company/indian-cybercrime-coordination-centre"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Official Indian Cybercrime Coordination Centre LinkedIn"
              title="Official Indian Cybercrime Coordination Centre LinkedIn"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* 2. Mandatory Government Disclaimers, Hosting & GIGW Compliance Information */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 py-5 sm:py-6 border-b border-slate-800/80 text-[11.5px] text-slate-400 px-3.5 sm:px-4 leading-relaxed">
          <div className="md:col-span-8 space-y-1.5">
            <p className="text-slate-300 font-medium">
              Content Owned, Maintained and Updated by Ministry of Home Affairs, Government of India.
            </p>
            <p>
              Designed, Developed and Hosted by <strong>National Informatics Centre (NIC)</strong> / <strong>Indian Cybercrime Coordination Centre (I4C)</strong>.
            </p>
            <p className="text-slate-400">
              Portal conforms to Guidelines for Indian Government Websites (GIGW 2.0) and WCAG 2.1 Level AA standard.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col md:items-end justify-between gap-3">
            {/* Live Visitor Counter */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900/80 border border-slate-800 text-[11.5px]">
              <Activity className="w-3.5 h-3.5 text-[#2E9E74]" />
              <span className="text-slate-400">Total Visitors:</span>
              <strong className="text-white font-mono tracking-wider">48,219,830</strong>
            </div>

            {/* Compliance Certifications */}
            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#2E9E74]" /> GIGW 2.0</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-[#FFAE42]" /> 256-Bit SSL</span>
            </div>
          </div>
        </div>

        {/* 3. Copyright & Last Updated */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11.5px] text-slate-400 px-3.5 sm:px-4 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} National Cyber Crime Reporting Portal. All Rights Reserved.
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
            <span className="text-slate-400">Last updated: 24 April 2025</span>
            <span className="text-slate-700">&bull;</span>
            <span className="text-slate-400">v2.4.0 (GIGW Compliant)</span>
          </div>
        </div>
      </Container>
    </footer>

    {/* Accessible Policy Dialog Modal */}
    <PolicyModal
      isOpen={activePolicy !== null}
      type={activePolicy}
      onClose={() => setActivePolicy(null)}
    />
  </>
);
};
