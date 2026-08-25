import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const TrackComplaintBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="mt-4 bg-[#EBF1F6] rounded-[10px] border border-[#DCE4EC] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-[8px] bg-[#DDE7F0] text-[#12304A] flex items-center justify-center shrink-0">
          <FileText className="w-5 h-5 stroke-[1.8]" />
        </div>
        <div>
          <h2 className="text-[15px] font-bold text-[#12304A] tracking-tight">
            {t('home.trackBannerTitle')}
          </h2>
          <p className="text-[12.5px] text-[#5E6B73] mt-0.5">
            {t('home.trackBannerSubtitle')}
          </p>
        </div>
      </div>

      <Link
        to="/track"
        className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[6px] bg-[#12304A] text-white text-[13px] font-semibold hover:bg-[#0B2235] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12304A]"
      >
        <span>{t('home.trackNow')}</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};
