import React, { useEffect } from 'react';
import { X, Shield, Lock, Eye, CheckCircle2, Scale, AlertTriangle, FileText, PhoneCall, MonitorCheck, Users, Languages, Mail } from 'lucide-react';

export type PolicyType = 'privacy' | 'terms' | 'accessibility';

interface PolicyModalProps {
  isOpen: boolean;
  type: PolicyType | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !type) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-[12px] sm:rounded-[14px] shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] mx-2 sm:mx-4 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#EBF1F6] text-[#12304A] flex items-center justify-center shrink-0">
              {type === 'privacy' && <Lock className="w-4 h-4 sm:w-4.5 sm:h-4.5" />}
              {type === 'terms' && <Scale className="w-4 h-4 sm:w-4.5 sm:h-4.5" />}
              {type === 'accessibility' && <Eye className="w-4 h-4 sm:w-4.5 sm:h-4.5" />}
            </div>
            <div>
              <h2 id="policy-modal-title" className="text-base sm:text-lg font-bold text-[#12304A]">
                {type === 'privacy' && 'Privacy Policy'}
                {type === 'terms' && 'Terms of Use'}
                {type === 'accessibility' && 'Accessibility Statement'}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                National Cyber Crime Reporting Portal &bull; Ministry of Home Affairs
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* PRIVACY POLICY CONTENT */}
          {type === 'privacy' && (
            <>
              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200/80 flex items-start gap-2.5 text-emerald-900 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Statutory Data Protection:</strong> Citizen data is strictly governed under the Digital Personal Data Protection (DPDP) Act 2023 and Information Technology Act 2000.
                </div>
              </div>

              <div>
                <h3 className="font-bold text-[#12304A] text-sm mb-1.5 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#1D60A1]" />
                  1. Information Collection & Sole Purpose
                </h3>
                <p>
                  Personal details (Aadhaar/OTP verified mobile number, name, state/district) and suspect indicators (bank accounts, UPI IDs, fraudulent URLs, phone numbers) are gathered strictly for cybercrime investigation, FIR lodging, and inter-bank fraud lien enforcement.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#12304A] text-sm mb-1.5 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#1D60A1]" />
                  2. Encryption & Zero Commercial Sharing
                </h3>
                <p>
                  All data in transit is encrypted using TLS 1.3, and evidence files are secured with AES-256 at rest within national NIC/CERT-In certified sovereign cloud data centres. Personal information is <strong>never</strong> sold, monetized, or shared with commercial entities.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#12304A] text-sm mb-1.5 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#1D60A1]" />
                  3. Authorized Inter-Agency Access
                </h3>
                <p>
                  Access is strictly limited to verified Investigating Officers (IO) of designated State Police Cyber Cells, RBI-regulated commercial banks (for automated transaction holds), and Telecom Service Providers (for SIM deactivation under DoT TAFCOP).
                </p>
              </div>
            </>
          )}

          {/* TERMS OF USE CONTENT */}
          {type === 'terms' && (
            <>
              <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200/80 flex items-start gap-2.5 text-amber-900 text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Statutory Declaration:</strong> Filing fabricated complaints or submitting forged evidence is punishable under Sections 217 & 227 of Bharatiya Nyaya Sanhita (BNS) 2023.
                </div>
              </div>

              <div>
                <h3 className="font-bold text-[#12304A] text-sm mb-1.5 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#1D60A1]" />
                  1. Official Portal Scope
                </h3>
                <p>
                  This portal is the official national incident reporting platform operated by the Indian Cybercrime Coordination Centre (I4C), Ministry of Home Affairs. Lodging an incident initiates triage and dispatch to the designated jurisdictional State Cyber Police Station.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#12304A] text-sm mb-1.5 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#1D60A1]" />
                  2. Evidence Handling & Chain of Custody
                </h3>
                <p>
                  Uploaded evidence artifacts (screenshots, transaction receipts, call records) are timestamped and assigned SHA-256 cryptographic checksums to ensure legal admissibility under Section 63 of Bharatiya Sakshya Adhiniyam 2023 (BSA).
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#12304A] text-sm mb-1.5 flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-[#8B2626]" />
                  3. Emergency 1930 Financial Fraud Protocol
                </h3>
                <p>
                  Victims of active banking/UPI scams should immediately dial <strong>1930</strong> within the "Golden Hour" to facilitate automated inter-bank account holds through the Citizen Financial Cyber Fraud Reporting System.
                </p>
              </div>
            </>
          )}

          {/* ACCESSIBILITY STATEMENT CONTENT */}
          {type === 'accessibility' && (
            <>
              <div className="p-3.5 rounded-lg bg-sky-50 border border-sky-200/80 flex items-start gap-2.5 text-sky-900 text-xs">
                <MonitorCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <strong>GIGW 2.0 & WCAG 2.1 AA Compliance:</strong> Designed and developed to ensure seamless usability for citizens of all physical, sensory, and cognitive abilities.
                </div>
              </div>

              <div>
                <h3 className="font-bold text-[#12304A] text-sm mb-1.5 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#1D60A1]" />
                  1. Built-in Assistive Controls
                </h3>
                <p>
                  Includes dynamic font scaling (<strong>A-, A, A+</strong>), full keyboard navigation with visible focus indicators, screen reader ARIA landmarks, and a skip-to-content mechanism.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#12304A] text-sm mb-1.5 flex items-center gap-2">
                  <Languages className="w-4 h-4 text-[#D8891C]" />
                  2. Multilingual Accessibility via Bhashini
                </h3>
                <p>
                  Supports instant content translation and voice input across 11 official Indian languages (Hindi, Bengali, Telugu, Marathi, Tamil, Gujarati, Kannada, Malayalam, Odia, Punjabi, and English).
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#12304A] text-sm mb-1.5 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#8B2626]" />
                  3. Accessibility Grievance Contact
                </h3>
                <p>
                  If you encounter accessibility barriers, email our nodal desk at <strong>accessibility-support@cybercrime.gov.in</strong> or call the 24x7 citizen helpline at <strong>1930</strong>.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-[10px] sm:text-[11px] text-slate-500">
            Official Document &bull; Government of India
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#12304A] text-white text-xs font-semibold hover:bg-[#0B2235] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
