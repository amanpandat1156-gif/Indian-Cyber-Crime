import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { ShieldCheck, ArrowLeft, Lock, Database, EyeOff, FileCheck2 } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
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
              <Lock className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#5E6B73]">
                DATA PROTECTION & CITIZEN PRIVACY
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#12304A] tracking-tight">
                Privacy Policy
              </h1>
            </div>
          </div>
          <p className="text-sm text-[#5E6B73] leading-relaxed max-w-3xl mt-2">
            Detailed information on how citizen data, digital evidence, and identity credentials are collected, securely encrypted, processed by automated triage systems, and accessed strictly by authorized Law Enforcement Agencies (LEAs).
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span><strong>Compliance:</strong> Digital Personal Data Protection (DPDP) Act 2023</span>
            <span>&bull;</span>
            <span><strong>Data Governance:</strong> Indian Cybercrime Coordination Centre (I4C), MHA</span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 text-sm text-[#2C3840] leading-relaxed">
          {/* Section 1 */}
          <div className="bg-white rounded-[12px] border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-[#12304A] font-bold text-base border-b border-slate-100 pb-3">
              <Database className="w-5 h-5 text-[#1D60A1]" />
              <h2>1. Data Collection & Sole Law Enforcement Purpose</h2>
            </div>
            <p>
              The National Cyber Crime Reporting Portal collects personal information solely for the purpose of crime reporting, FIR generation, inter-bank fraud lien placement, and judicial investigation:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>
                <strong>Complainant Identifiers:</strong> Full legal name, mobile number (verified via Aadhaar/Telecom OTP), email address, and residential state/district for jurisdictional police assignment.
              </li>
              <li>
                <strong>Suspect Identifiers:</strong> Bank account numbers, UPI IDs, fraudulent URL links, spoofed contact numbers, social media handles, and transaction UTR numbers.
              </li>
              <li>
                <strong>Digital Incident Footprint:</strong> Timestamps, IP access logs, transaction amounts, and evidence screenshots provided by the user.
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-[12px] border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-[#12304A] font-bold text-base border-b border-slate-100 pb-3">
              <ShieldCheck className="w-5 h-5 text-[#237A57]" />
              <h2>2. Multimodal AI Processing & Military-Grade Encryption</h2>
            </div>
            <p>
              To accelerate emergency response and transaction freeze times, the portal employs automated triage models under strict confidentiality safeguards:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>
                <strong>Zero Commercial Retention:</strong> AI extraction models (OCR parsing of bank SMS and transaction screenshots) operate statelessly in memory without storing raw citizen data in external third-party servers.
              </li>
              <li>
                <strong>Encryption in Transit & at Rest:</strong> All data is encrypted via TLS 1.3 in transit and AES-256 with Hardware Security Module (HSM) key management at rest within national NIC/CERT-In certified sovereign cloud data centres.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-[12px] border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-[#12304A] font-bold text-base border-b border-slate-100 pb-3">
              <EyeOff className="w-5 h-5 text-[#8B2626]" />
              <h2>3. Zero Third-Party Commercial Sharing</h2>
            </div>
            <p>
              Under no circumstances is citizen personal data sold, rented, monetized, or shared with commercial entities, advertising networks, or unauthorized third parties.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>
                <strong>Inter-Agency Data Sharing:</strong> Data is shared strictly with authorized stakeholders: designated State Police Cyber Cells, Reserve Bank of India (RBI) regulated commercial banks, NPCI (for UPI hold enforcement), and Telecom Service Providers (for fraudulent SIM deactivation under DoT TAFCOP).
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-[12px] border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-[#12304A] font-bold text-base border-b border-slate-100 pb-3">
              <FileCheck2 className="w-5 h-5 text-[#1D60A1]" />
              <h2>4. Citizen Data Rights & Retention</h2>
            </div>
            <p>
              In accordance with statutory mandates of the Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023 and the DPDP Act 2023:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>
                <strong>Audit Logs:</strong> Every access event by an investigating officer or bank nodal officer is cryptographically logged with Officer ID, timestamp, and purpose.
              </li>
              <li>
                <strong>Case Status Access:</strong> Citizens retain real-time rights to track case progression, FIR conversion status, and recovered lien amounts using their registered mobile number.
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
            to="/accessibility"
            className="text-xs font-semibold text-[#1D60A1] hover:underline"
          >
            Read Accessibility Statement &rarr;
          </Link>
        </div>
      </Container>
    </div>
  );
};
