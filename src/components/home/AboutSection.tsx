import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, CheckCircle2, Lock } from 'lucide-react';
import { Container } from '../common/Container';

export const AboutSection: React.FC = () => {
  return (
    <section className="pb-12 sm:pb-16" aria-labelledby="about-portal-heading">
      <Container>
        <div className="bg-[#F2F5F8] rounded-card border border-ncrp-border p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-ncrp-saffron inline-block"></span>
                <span className="text-xs font-bold tracking-widest uppercase text-ncrp-muted">
                  ABOUT THE PORTAL
                </span>
              </div>
              <h2
                id="about-portal-heading"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-ncrp-navy"
              >
                We're here to help.
              </h2>
              <p className="mt-3 text-base text-ncrp-muted leading-relaxed">
                This portal makes it easier for you to report cybercrime, get support and stay informed. Our goal is a safer digital space for everyone.
              </p>

              <div className="mt-6">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-ncrp-navy hover:text-ncrp-darkNavy group"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 text-ncrp-muted group-hover:text-ncrp-navy group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Restrained Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:max-w-md shrink-0">
              <div className="p-3.5 bg-white rounded-subtle border border-ncrp-border flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-ncrp-green shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-ncrp-navy">Citizen-First Design</div>
                  <div className="text-[11px] text-ncrp-muted mt-0.5">Plain language, no confusing legal jargon.</div>
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-subtle border border-ncrp-border flex items-start gap-3">
                <Lock className="w-4 h-4 text-ncrp-navy shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-ncrp-navy">Safe & Confidential</div>
                  <div className="text-[11px] text-ncrp-muted mt-0.5">Protected data handling under law.</div>
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-subtle border border-ncrp-border flex items-start gap-3">
                <Shield className="w-4 h-4 text-ncrp-navy shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-ncrp-navy">National Coordination</div>
                  <div className="text-[11px] text-ncrp-muted mt-0.5">Connecting states, police, and banks.</div>
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-subtle border border-ncrp-border flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-ncrp-green shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-ncrp-navy">Case Transparency</div>
                  <div className="text-[11px] text-ncrp-muted mt-0.5">Clear timelines and next action guidance.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
