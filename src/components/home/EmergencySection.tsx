import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  MapPin,
  Landmark,
  ArrowUpRight,
  PhoneCall,
  ArrowRight,
} from "lucide-react";

export const EmergencySection: React.FC = () => {
  return (
    <aside
      className="w-full h-full bg-[#FAF2F0] rounded-[10px] border border-[#F0E2DF] p-6 sm:p-7 flex flex-col justify-between"
      aria-label="Emergency Financial Fraud Helpline"
    >
      {/* Top CTA Block */}
      <div>
        {/* Top Circular Phone Icon */}
        <div className="w-12 h-12 rounded-full bg-[#F5DDD8] text-[#8B2626] flex items-center justify-center mb-4">
          <Phone className="w-5 h-5 stroke-[2]" />
        </div>

        {/* Eyebrow */}
        <div className="text-[11.5px] font-bold tracking-wider uppercase text-[#8B2626] mb-1">
          FINANCIAL FRAUD? ACT FAST.
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12304A] tracking-tight">
          Call 1930
        </h2>

        {/* Supporting Copy */}
        <p className="mt-2 text-[13px] text-[#5E6B73] leading-relaxed">
          Report cyber financial fraud and get immediate assistance.
        </p>

        {/* Primary Maroon CTA Button */}
        <div className="mt-4">
          <a
            href="tel:1930"
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-[6px] bg-[#8B2626] hover:bg-[#771F1F] text-white text-[14px] font-bold shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2626]"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 1930</span>
          </a>
        </div>
      </div>

      {/* Centered Image Container */}
      <div className="w-full flex-1 flex items-center justify-center py-3 overflow-hidden">
        <img
          src="/helpline-banner.png.png"
          alt="Helpline Assistance"
          className="w-full h-auto max-h-56 object-contain rounded-lg"
        />
      </div>

      {/* Divider & Other Ways to Get Help */}
      <div className="pt-4 border-t border-[#EBDCDA]">
        <h3 className="text-[14px] font-bold text-[#1C252C] mb-3">
          Other ways to get help
        </h3>

        <div className="flex flex-col space-y-2.5">
          <Link
            to="/help#police-stations"
            className="flex items-center justify-between text-[13px] text-[#2C3840] hover:text-[#12304A] group py-0.5"
          >
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#5E6B73] group-hover:text-[#12304A] transition-colors" />
              <span>Find my cyber police station</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#5E6B73] group-hover:text-[#12304A] group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            to="/help#bank-assistance"
            className="flex items-center justify-between text-[13px] text-[#2C3840] hover:text-[#12304A] group py-0.5"
          >
            <div className="flex items-center gap-2.5">
              <Landmark className="w-4 h-4 text-[#5E6B73] group-hover:text-[#12304A] transition-colors" />
              <span>Bank-related assistance</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#5E6B73] group-hover:text-[#12304A] group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            to="/help#escalations"
            className="flex items-center justify-between text-[13px] text-[#2C3840] hover:text-[#12304A] group py-0.5"
          >
            <div className="flex items-center gap-2.5">
              <ArrowUpRight className="w-4 h-4 text-[#5E6B73] group-hover:text-[#12304A] transition-colors" />
              <span>Complaint escalation</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#5E6B73] group-hover:text-[#12304A] group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            to="/help#contacts"
            className="flex items-center justify-between text-[13px] text-[#2C3840] hover:text-[#12304A] group py-0.5"
          >
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#5E6B73] group-hover:text-[#12304A] transition-colors" />
              <span>Official contacts</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#5E6B73] group-hover:text-[#12304A] group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </aside>
  );
};