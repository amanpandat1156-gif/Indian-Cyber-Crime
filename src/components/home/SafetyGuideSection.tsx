import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock, Key, Smartphone } from 'lucide-react';
import { Container } from '../common/Container';

export const SafetyGuideSection: React.FC = () => {
  return (
    <section className="pb-12 sm:pb-16" aria-labelledby="safety-guide-heading">
      <Container>
        <div className="bg-white rounded-card border border-ncrp-border p-6 sm:p-8 lg:p-10 shadow-card">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-ncrp-saffron inline-block"></span>
                <span className="text-xs font-bold tracking-widest uppercase text-ncrp-muted">
                  STAY SAFE ONLINE
                </span>
              </div>
              <h2
                id="safety-guide-heading"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-ncrp-navy"
              >
                Simple steps. Stronger security.
              </h2>
              <p className="mt-3 text-base text-ncrp-muted leading-relaxed">
                Learn practical steps to protect yourself from common cyber threats, secure your digital accounts, and easily recognize online scams.
              </p>

              <div className="mt-6">
                <Link
                  to="/safety-guide"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-ncrp-navy hover:text-ncrp-darkNavy group"
                >
                  <span>Visit our safety guide</span>
                  <ArrowRight className="w-4 h-4 text-ncrp-muted group-hover:text-ncrp-navy group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Restrained 3 Safety Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:max-w-lg w-full">
              <div className="p-4 rounded-subtle bg-[#F8F9FA] border border-ncrp-border/60">
                <div className="w-8 h-8 rounded-subtle bg-[#EDF3F7] text-ncrp-navy flex items-center justify-center mb-3">
                  <Key className="w-4 h-4 stroke-[1.75]" />
                </div>
                <h3 className="text-sm font-bold text-ncrp-navy">2-Factor Auth</h3>
                <p className="mt-1 text-xs text-ncrp-muted leading-relaxed">
                  Turn on OTP or app authenticators across email and social apps.
                </p>
              </div>

              <div className="p-4 rounded-subtle bg-[#F8F9FA] border border-ncrp-border/60">
                <div className="w-8 h-8 rounded-subtle bg-[#EDF3F7] text-ncrp-navy flex items-center justify-center mb-3">
                  <Smartphone className="w-4 h-4 stroke-[1.75]" />
                </div>
                <h3 className="text-sm font-bold text-ncrp-navy">UPI PIN Safety</h3>
                <p className="mt-1 text-xs text-ncrp-muted leading-relaxed">
                  Never enter your UPI PIN to receive funds or cashbacks.
                </p>
              </div>

              <div className="p-4 rounded-subtle bg-[#F8F9FA] border border-ncrp-border/60">
                <div className="w-8 h-8 rounded-subtle bg-[#EDF3F7] text-ncrp-navy flex items-center justify-center mb-3">
                  <Lock className="w-4 h-4 stroke-[1.75]" />
                </div>
                <h3 className="text-sm font-bold text-ncrp-navy">Verify Links</h3>
                <p className="mt-1 text-xs text-ncrp-muted leading-relaxed">
                  Avoid clicking unsolicited SMS links claiming account blocks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
