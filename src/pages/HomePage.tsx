import React from 'react';
import { Container } from '../components/common/Container';
import { primaryIntentCards } from '../data/intentCards';
import { IntentCard } from '../components/cards/IntentCard';
import { TrackComplaintBanner } from '../components/home/TrackComplaintBanner';
import { EmergencySection } from '../components/home/EmergencySection';
import { LowerCardsSection } from '../components/home/LowerCardsSection';
import { QuickLinksSection } from '../components/home/QuickLinksSection';
import { InteractiveGridBackground } from '../components/common/InteractiveGridBackground';
import { useLanguage } from '../context/LanguageContext';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-[#F8F7F3] min-h-screen">
      <Container size="full" className="max-w-[1400px] py-5 sm:py-10 px-3.5 sm:px-6 lg:px-8">
        {/* Top 2-Column Hero & Services Area */}
        <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 lg:gap-7 items-stretch">
          {/* Left Column (Hero + 6 Intent Cards + Track Banner) */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            {/* Hero Header Card with Interactive Grid */}
            <div className="relative rounded-[12px] p-4.5 sm:p-7 mb-4 sm:mb-6 border border-[#E2E6E8] bg-white shadow-2xs overflow-hidden group">
              <InteractiveGridBackground theme="light" gridSpacing={24} interactionRadius={140} />
              
              <div className="relative z-10">
                <div className="text-[10.5px] sm:text-[12px] font-bold tracking-widest text-[#1D60A1] uppercase mb-1.5 sm:mb-2">
                  {t('home.heroBadge')}
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-[#12304A] tracking-tight leading-tight">
                  {t('home.howCanWeHelp')}
                </h1>
                <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm md:text-[15px] text-[#5E6B73] leading-relaxed max-w-2xl">
                  {t('home.heroSubtitle')}
                </p>
              </div>
            </div>

            {/* 6 Intent Cards: 3 columns x 2 rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
              {primaryIntentCards.map((card) => (
                <IntentCard key={card.id} item={card} />
              ))}
            </div>

            {/* Wide "Already reported something?" Banner */}
            <TrackComplaintBanner />
          </div>

          {/* Right Column (Emergency Sidebar - Constrained Max-Width matching reference image) */}
          <div className="w-full lg:w-[330px] xl:w-[355px] shrink-0 flex flex-col">
            <EmergencySection />
          </div>
        </div>

        {/* Lower 2-Card Row: Stay Safe Online + About the Portal */}
        <LowerCardsSection />

        {/* Bottom 4-Item Quick Links Bar */}
        <QuickLinksSection />
      </Container>
    </div>
  );
};
