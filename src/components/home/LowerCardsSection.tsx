import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight } from 'lucide-react';
import { InteractiveGridBackground } from '../common/InteractiveGridBackground';

export const LowerCardsSection: React.FC = () => {
  return (
    <section className="mt-8" aria-label="Cyber Safety and Portal Information">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Card: Stay Safe Online with Laptop Illustration */}
        <div className="relative lg:col-span-7 bg-[#EBF1F6] rounded-[10px] border border-[#DCE4EC] p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden group">
          <InteractiveGridBackground
            theme="navy"
            baseColor="rgba(18, 48, 74, 0.06)"
            activeColor="rgba(29, 96, 161, 0.65)"
            gridSpacing={26}
            interactionRadius={130}
          />
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-6 h-6 rounded-[5px] bg-[#DDE7F0] text-[#12304A] flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 stroke-[2]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#5E6B73]">
                STAY SAFE ONLINE
              </span>
            </div>

            <h2 className="text-[19px] sm:text-[21px] font-bold text-[#12304A] tracking-tight leading-snug">
              Simple steps. Stronger security.
            </h2>

            <p className="mt-2 text-[12.5px] text-[#5E6B73] leading-relaxed max-w-sm">
              Learn how to protect yourself from common cyber threats, keep your accounts safe and spot potential scams.
            </p>

            <div className="mt-4">
              <Link
                to="/safety-guide"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#12304A] hover:underline group"
              >
                <span>Visit our safety guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Minimalist Laptop & Plant Illustration */}
          <div className="relative z-10 shrink-0 w-44 sm:w-52 h-36 flex items-end justify-center">
            <svg viewBox="0 0 200 130" className="w-full h-full">
              {/* Ground Shadow */}
              <ellipse cx="100" cy="115" rx="85" ry="8" fill="#D5E0EA" />
              
              {/* Laptop Base */}
              <rect x="25" y="105" width="130" height="7" rx="3" fill="#12304A" />
              <rect x="75" y="105" width="30" height="2.5" rx="1.2" fill="#DDE2E4" />

              {/* Laptop Screen Bezel */}
              <rect x="40" y="32" width="100" height="74" rx="5" fill="#1C252C" />
              
              {/* Screen Inner */}
              <rect x="45" y="37" width="90" height="64" rx="3" fill="#F8F9FA" />

              {/* Shield Motif on Screen */}
              <path d="M90 52L80 56V65C80 72 84.5 78 90 80C95.5 78 100 72 100 65V56L90 52Z" fill="#12304A" />
              <path d="M90 55L83 58V65C83 70.5 86.5 75 90 76.5V55Z" fill="#1D60A1" />

              {/* Plant Leaves */}
              <path d="M165 110C165 95 155 85 150 82C155 95 160 105 165 110Z" fill="#1E7755" />
              <path d="M167 110C170 95 180 88 185 85C178 95 172 105 167 110Z" fill="#2E9E74" />
              <path d="M166 110C166 85 168 70 170 65C165 75 163 95 166 110Z" fill="#237A57" />

              {/* Plant Pot */}
              <polygon points="158,110 174,110 171,122 161,122" fill="#D8891C" opacity="0.85" />
            </svg>
          </div>
        </div>

        {/* Right Card: About the Portal */}
        <div className="lg:col-span-5 bg-white rounded-[10px] border border-[#DDE2E4] p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#5E6B73] mb-2.5">
              ABOUT THE PORTAL
            </div>

            <h2 className="text-[19px] sm:text-[21px] font-bold text-[#12304A] tracking-tight leading-snug">
              We're here to help.
            </h2>

            <p className="mt-2.5 text-[12.5px] text-[#5E6B73] leading-relaxed">
              This portal makes it easier for you to report cybercrime, get support and stay informed. Our goal is a safer digital space for everyone.
            </p>
          </div>

          <div className="mt-5 pt-2">
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#12304A] hover:underline group"
            >
              <span>Learn more</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
