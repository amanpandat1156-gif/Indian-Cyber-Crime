import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../components/common/Container';
import { NationalEmblem } from '../components/common/NationalEmblem';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F8F7F3] min-h-screen py-5 sm:py-12">
      <Container size="md" className="px-3.5 sm:px-6">
        <div className="mb-6 sm:mb-8">
          <div className="text-[10.5px] sm:text-[12px] font-bold tracking-widest text-[#1D60A1] uppercase mb-1 sm:mb-1.5">
            ABOUT THE PORTAL & MANDATE
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#12304A] tracking-tight">
            National Cyber Crime Reporting Portal
          </h1>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#5E6B73] leading-relaxed">
            An official initiative of the Indian Cybercrime Coordination Centre (I4C), Ministry of Home Affairs, Government of India.
          </p>
        </div>

        <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-4.5 sm:p-8 shadow-card space-y-5 sm:space-y-6 text-xs sm:text-sm text-[#1C252C] leading-relaxed">
          <div className="flex items-center gap-3.5 sm:gap-4 pb-5 sm:pb-6 border-b border-[#F0F2F3]">
            <NationalEmblem size="lg" variant="dark" />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#12304A]">
                Indian Cybercrime Coordination Centre (I4C)
              </h2>
              <p className="text-[11px] sm:text-xs text-[#5E6B73]">
                Ministry of Home Affairs &bull; Government of India
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#12304A] mb-2">
              Our Mission
            </h3>
            <p>
              The National Cyber Crime Reporting Portal (NCRP) provides a centralized, citizen-centric platform to report cyber incidents, financial fraud, and online crimes. The system coordinates complaints directly with State & UT Police Cyber Crime Units, commercial banks, payment aggregators, and financial intermediaries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-2">
            <div className="p-3.5 sm:p-4 rounded-md bg-[#FBFBFA] border border-[#DDE2E4]">
              <h4 className="font-bold text-[#12304A] mb-1">Citizen-First Design</h4>
              <p className="text-xs text-[#5E6B73]">
                Focuses on plain language and "What happened to you" rather than requiring citizens to know complex legal sections or police jurisdictions.
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-md bg-[#FBFBFA] border border-[#DDE2E4]">
              <h4 className="font-bold text-[#12304A] mb-1">National 1930 Integration</h4>
              <p className="text-xs text-[#5E6B73]">
                Direct automated dispatch of transaction freeze alerts across 250+ banks, payment gateways, and wallet providers.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#F0F2F3] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
            <span className="text-[#5E6B73]">Need immediate assistance?</span>
            <Link to="/help" className="font-bold text-[#12304A] hover:underline flex items-center gap-1 min-h-[38px] sm:min-h-0">
              <span>View Official Support Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
