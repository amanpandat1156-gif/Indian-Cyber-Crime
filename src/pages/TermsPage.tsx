import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Shield, ArrowLeft, FileText, Scale, AlertTriangle, PhoneCall } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F8F7F3] min-h-screen py-8 sm:py-12">
      <Container size="full" className="max-w-[1000px] px-4 sm:px-6">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#12304A] hover:text-[#1D60A1] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Header Hero */}
        <div className="bg-white rounded-[12px] border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-[8px] bg-[#EBF1F6] text-[#12304A] flex items-center justify-center">
              <Scale className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#5E6B73]">
                LEGAL & STATUTORY FRAMEWORK
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#12304A] tracking-tight">
                Terms of Use
              </h1>
            </div>
          </div>
          <p className="text-sm text-[#5E6B73] leading-relaxed max-w-3xl mt-2">
            Official operational guidelines and citizen terms governing the National Cyber Crime Reporting Portal (NCRP), operated by the Indian Cybercrime Coordination Centre (I4C), Ministry of Home Affairs, Government of India.
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span><strong>Effective Date:</strong> January 1, 2026</span>
            <span>&bull;</span>
            <span><strong>Jurisdiction:</strong> Republic of India (IT Act 2000 & Bharatiya Nyaya Sanhita 2023)</span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 text-sm text-[#2C3840] leading-relaxed">
          {/* Section 1 */}
          <div className="bg-white rounded-[12px] border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-[#12304A] font-bold text-base border-b border-slate-100 pb-3">
              <Shield className="w-5 h-5 text-[#1D60A1]" />
              <h2>1. Official Portal Scope & Authorization</h2>
            </div>
            <p>
              The National Cyber Crime Reporting Portal (<strong>cybercrime.gov.in</strong>) is an initiative of the Ministry of Home Affairs, Government of India, to facilitate citizens, victims, and complainants in reporting cybercrime incidents online.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>
                <strong>Nodal Agency:</strong> The Indian Cybercrime Coordination Centre (I4C) acts as the central apex coordination body for inter-state cyber fraud mitigation, intelligence collation, and automated banking lien coordination.
              </li>
              <li>
                <strong>State Jurisdiction:</strong> Complaints registered on this portal are securely triaged and routed directly to the designated Cyber Police Station or State Crime Branch having territorial jurisdiction.
              </li>
              <li>
                <strong>Non-Replacement of Emergency Services:</strong> In scenarios involving physical threat, immediate abduction, or active bodily harm, citizens must contact <strong>112</strong> immediately.
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-[12px] border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-[#12304A] font-bold text-base border-b border-slate-100 pb-3">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h2>2. User Responsibilities & Truthful Declarations</h2>
            </div>
            <p>
              Citizens filing complaints are legally obligated to provide true, accurate, and complete information to the best of their knowledge:
            </p>
            <div className="p-4 rounded-[8px] bg-[#FAF2F0] border border-[#F0E2DF] text-xs text-[#8B2626] leading-relaxed">
              <strong>Statutory Warning under Section 217 & 227 of Bharatiya Nyaya Sanhita (BNS) 2023:</strong> Furnishing false information, lodging fabricated criminal complaints, or submitting manipulated digital evidence to public authorities is a punishable offense carrying imprisonment and fiscal penalties.
            </div>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>You shall not use this portal for frivolous, vexatious, defamatory, or commercially motivated grievances.</li>
              <li>You agree to cooperate with law enforcement officers during subsequent verification, formal statement recording, or court proceedings.</li>
              <li>You are responsible for safeguarding your Complaint Acknowledgment Number and access OTP credentials.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-[12px] border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-[#12304A] font-bold text-base border-b border-slate-100 pb-3">
              <FileText className="w-5 h-5 text-[#237A57]" />
              <h2>3. Digital Evidence & Chain of Custody</h2>
            </div>
            <p>
              Digital artifacts uploaded during complaint lodging (bank transaction receipts, screenshot captures, WhatsApp chat exports, audio clips, and email headers) are ingested into the NCRP Evidence Vault under digital chain of custody protocols:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>
                <strong>SHA-256 Checksumming:</strong> Uploaded evidence files receive immediate cryptographic hashes upon submission to ensure evidential integrity under Section 63 of Bharatiya Sakshya Adhiniyam 2023 (BSA).
              </li>
              <li>
                <strong>Access Restricted to Authorized Law Enforcement:</strong> Evidence is strictly accessible only to verified Investigating Officers (IO) assigned to your case docket.
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-[12px] border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-[#12304A] font-bold text-base border-b border-slate-100 pb-3">
              <PhoneCall className="w-5 h-5 text-[#8B2626]" />
              <h2>4. Citizen Golden Hour & 1930 Helpline Protocol</h2>
            </div>
            <p>
              For financial frauds reported within the critical initial window ("Golden Hour"):
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>
                Immediate telephonic reporting via <strong>1930</strong> initiates automated inter-bank holds through the Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS).
              </li>
              <li>
                Online submission must be supplemented by immediate intimation to your originating bank's fraud monitoring desk.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-200">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[8px] bg-[#12304A] text-white text-sm font-semibold hover:bg-[#0B2235] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            to="/privacy"
            className="text-xs font-semibold text-[#1D60A1] hover:underline"
          >
            Read Privacy Policy &rarr;
          </Link>
        </div>
      </Container>
    </div>
  );
};
