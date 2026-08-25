import React from 'react';
import { Container } from '../common/Container';

export const HeroSection: React.FC = () => {
  return (
    <section className="pt-12 sm:pt-16 pb-8 sm:pb-10" aria-labelledby="hero-heading">
      <Container>
        <div className="max-w-3xl">
          {/* Restrained Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-badge bg-[#EBF1F5] text-ncrp-navy text-[11px] font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-ncrp-saffron"></span>
            SAFE CITIZENS. A SAFER DIGITAL INDIA.
          </div>

          {/* Dominant Intent-First Question */}
          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ncrp-navy leading-[1.15]"
          >
            How can we help?
          </h1>

          {/* Empathetic & Clear Supporting Copy */}
          <p className="mt-4 text-base sm:text-lg text-ncrp-muted leading-relaxed max-w-2xl">
            Tell us what happened. We'll guide you through the next steps and help you get the right support.
          </p>
        </div>
      </Container>
    </section>
  );
};
