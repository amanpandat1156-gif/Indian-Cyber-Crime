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
import { InteractiveGridBackground } from "../common/InteractiveGridBackground";
import { useLanguage } from "../../context/LanguageContext";

export const EmergencySection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <aside
      className="relative w-full h-full bg-[#FAF2F0] rounded-[10px] border border-[#F0E2DF] p-5 sm:p-7 flex flex-col justify-between overflow-hidden group"
      aria-label="Emergency Financial Fraud Helpline"
    >
      <InteractiveGridBackground
        theme="maroon"
        baseColor="rgba(139, 38, 38, 0.08)"
        activeColor="rgba(139, 38, 38, 0.65)"
        gridSpacing={26}
        interactionRadius={130}
      />

      {/* Top CTA Block */}
      <div className="relative z-10">
        {/* Top Circular Phone Icon */}
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#F5DDD8] text-[#8B2626] flex items-center justify-center mb-3 sm:mb-4">
          <Phone className="w-5 h-5 stroke-[2]" />
        </div>

        {/* Eyebrow */}
        <div className="text-[11px] sm:text-[11.5px] font-bold tracking-wider uppercase text-[#8B2626] mb-1">
          {t('home.emergencyBadge')}
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#12304A] tracking-tight">
          {t('home.emergencyTitle')}
        </h2>

        {/* Supporting Copy */}
        <p className="mt-2 text-[12.5px] sm:text-[13px] text-[#5E6B73] leading-relaxed">
          {t('home.emergencySubtitle')}
        </p>

        {/* Primary Maroon CTA Button */}
        <div className="mt-4">
          <a
            href="tel:1930"
            className="w-full min-h-[48px] inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-[6px] bg-[#8B2626] hover:bg-[#771F1F] text-white text-[14px] font-bold shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2626]"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{t('home.call1930Now')}</span>
          </a>
        </div>
      </div>

      {/* Centered Image Container */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center py-3 overflow-hidden">
        <img
          src="/helpline-banner.png.png"
          alt="Helpline Assistance"
          className="w-full h-auto max-h-44 sm:max-h-56 object-contain rounded-lg"
        />
      </div>

      {/* Divider & Other Ways to Get Help */}
      <div className="relative z-10 pt-4 border-t border-[#EBDCDA]">
        <h3 className="text-[13.5px] sm:text-[14px] font-bold text-[#1C252C] mb-2.5 sm:mb-3">
          {t('home.otherWaysHelp')}
        </h3>

        <div className="flex flex-col space-y-1.5 sm:space-y-2">
          <Link
            to="/help#police-stations"
            className="min-h-[40px] flex items-center justify-between text-[12.5px] sm:text-[13px] text-[#2C3840] hover:text-[#12304A] group py-1.5"
          >
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#5E6B73] group-hover:text-[#12304A] transition-colors shrink-0" />
              <span>{t('home.findPoliceStation')}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#5E6B73] group-hover:text-[#12304A] group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>

          <Link
            to="/help#bank-assistance"
            className="min-h-[40px] flex items-center justify-between text-[12.5px] sm:text-[13px] text-[#2C3840] hover:text-[#12304A] group py-1.5"
          >
            <div className="flex items-center gap-2.5">
              <Landmark className="w-4 h-4 text-[#5E6B73] group-hover:text-[#12304A] transition-colors shrink-0" />
              <span>{t('home.bankAssistance')}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#5E6B73] group-hover:text-[#12304A] group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>

          <Link
            to="/help#escalations"
            className="min-h-[40px] flex items-center justify-between text-[12.5px] sm:text-[13px] text-[#2C3840] hover:text-[#12304A] group py-1.5"
          >
            <div className="flex items-center gap-2.5">
              <ArrowUpRight className="w-4 h-4 text-[#5E6B73] group-hover:text-[#12304A] transition-colors shrink-0" />
              <span>{t('home.complaintEscalation')}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#5E6B73] group-hover:text-[#12304A] group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>

          <Link
            to="/help#contacts"
            className="min-h-[40px] flex items-center justify-between text-[12.5px] sm:text-[13px] text-[#2C3840] hover:text-[#12304A] group py-1.5"
          >
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#5E6B73] group-hover:text-[#12304A] transition-colors shrink-0" />
              <span>{t('home.officialContacts')}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#5E6B73] group-hover:text-[#12304A] group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>
        </div>
      </div>
    </aside>
  );
};