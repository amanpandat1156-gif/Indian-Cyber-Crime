import React from 'react';
import { Container } from '../components/common/Container';
import { primaryIntentCards } from '../data/intentCards';
import { IntentCard } from '../components/cards/IntentCard';
import { TrackComplaintBanner } from '../components/home/TrackComplaintBanner';
import { EmergencySection } from '../components/home/EmergencySection';
import { LowerCardsSection } from '../components/home/LowerCardsSection';
import { QuickLinksSection } from '../components/home/QuickLinksSection';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full bg-[#F8F7F3] min-h-screen">
      <Container size="full" className="max-w-[1400px] py-8 sm:py-10 px-3 sm:px-6 lg:px-8">
        {/* Top 2-Column Hero & Services Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-start">
          {/* Left Column (approx 68% width on desktop) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            {/* Hero Header */}
            <div className="mb-6">
              <div className="text-[11px] sm:text-[12px] font-bold tracking-widest text-[#1D60A1] uppercase mb-2">
                SAFE CITIZENS. A SAFER DIGITAL INDIA.
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#12304A] tracking-tight leading-tight">
                How can we help?
              </h1>
              <p className="mt-2.5 text-sm sm:text-[15px] text-[#5E6B73] leading-relaxed max-w-2xl">
                Tell us what happened. We'll guide you through the next steps and help you get the right support.
              </p>
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

          {/* Right Column (approx 32% width on desktop) */}
          <div className="lg:col-span-4 flex flex-col">
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
