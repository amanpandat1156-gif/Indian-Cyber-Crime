import React, { useState } from 'react';
import {
  Search,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Flag,
  Info,
  Loader2,
  X,
  Phone,
  CreditCard,
  Globe,
  Mail
} from 'lucide-react';
import { Container } from '../components/common/Container';
import { AutoFillDemoButton } from '../components/common/AutoFillDemoButton';
import { useDemo } from '../context/DemoContext';
import { verificationService } from '../services/verificationService';
import { VerificationResult, IdentifierType } from '../types';

export const VerifyPage: React.FC = () => {
  const { scenarios } = useDemo();
  const [searchQuery, setSearchQuery] = useState('');
  const [identifierType, setIdentifierType] = useState<IdentifierType>('MOBILE');
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAutoFill = () => {
    const mobile = scenarios.suspectCheck.mobile;
    setSearchQuery(mobile);
    setIdentifierType('MOBILE');
    setLoading(true);
    verificationService.verifyIdentifier(mobile, 'MOBILE').then((res) => {
      setLoading(false);
      if (res.success && res.data) {
        setResult(res.data);
      }
    });
  };

  // Report Identifier Modal State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportCategory, setReportCategory] = useState('Electricity bill disconnection scam');
  const [reportDescription, setReportDescription] = useState('');
  const [reportingInProgress, setReportingInProgress] = useState(false);
  const [reportSuccessMessage, setReportSuccessMessage] = useState<string | null>(null);

  const handleVerify = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter an identifier to verify.');
      return;
    }

    setError(null);
    setLoading(true);
    const res = await verificationService.verifyIdentifier(searchQuery, identifierType);
    setLoading(false);

    if (res.success && res.data) {
      setResult(res.data);
    } else {
      setError(res.error || 'Failed to verify identifier.');
    }
  };

  const handleQuickSearch = (query: string, type: IdentifierType) => {
    setSearchQuery(query);
    setIdentifierType(type);
    verificationService.verifyIdentifier(query, type).then((res) => {
      if (res.success && res.data) {
        setResult(res.data);
      }
    });
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportDescription.trim()) return;

    setReportingInProgress(true);
    const res = await verificationService.reportIdentifier({
      identifier: searchQuery.trim(),
      identifierType,
      category: reportCategory,
      description: reportDescription.trim(),
    });
    setReportingInProgress(false);

    if (res.success && res.data) {
      setResult(res.data);
      setIsReportModalOpen(false);
      setReportDescription('');
      setReportSuccessMessage(`Identifier "${searchQuery}" has been reported to the national suspect intelligence database.`);
      setTimeout(() => setReportSuccessMessage(null), 5000);
    }
  };

  return (
    <div className="w-full bg-[#F8F7F3] min-h-screen py-8 sm:py-12">
      <Container size="md">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <div className="text-[11px] sm:text-[12px] font-bold tracking-widest text-[#1D60A1] uppercase mb-1.5">
              CITIZEN INTELLIGENCE REPOSITORY
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#12304A] tracking-tight">
              Check & Verify Suspicious Numbers or UPI IDs
            </h1>
            <p className="mt-2 text-sm text-[#5E6B73] leading-relaxed">
              Verify unknown mobile numbers, UPI VPAs, bank accounts, or websites against cross-state cybercrime reports before making payments or sharing information.
            </p>
          </div>

          <AutoFillDemoButton onAutoFill={handleAutoFill} label="Verify Flagged Scam Number" />
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-6 sm:p-7 shadow-card mb-8">
          {/* Type Selector Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { type: 'MOBILE' as IdentifierType, label: 'Mobile Number', icon: Phone },
              { type: 'UPI_ID' as IdentifierType, label: 'UPI VPA', icon: CreditCard },
              { type: 'WEBSITE' as IdentifierType, label: 'Website / URL', icon: Globe },
              { type: 'EMAIL' as IdentifierType, label: 'Email Address', icon: Mail },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.type}
                  type="button"
                  onClick={() => setIdentifierType(tab.type)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    identifierType === tab.type
                      ? 'bg-[#12304A] text-white'
                      : 'bg-[#FBFBFA] text-[#5E6B73] border border-[#DDE2E4] hover:bg-[#F3F6F8]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleVerify} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#5E6B73]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  identifierType === 'MOBILE'
                    ? 'Enter 10-digit mobile number (e.g. 9876500000)'
                    : identifierType === 'UPI_ID'
                    ? 'Enter UPI ID (e.g. scam.deal@okaxis)'
                    : identifierType === 'WEBSITE'
                    ? 'Enter website domain (e.g. fake-electricity-bill.in)'
                    : 'Enter email address'
                }
                className="w-full pl-10 pr-4 py-2.5 bg-[#FBFBFA] border border-[#DDE2E4] rounded-[8px] text-sm text-[#1C252C] focus:bg-white focus:border-[#12304A] focus:outline-none shadow-xs font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#12304A] text-white rounded-[8px] text-sm font-semibold hover:bg-[#0B2235] transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify'}
            </button>
          </form>

          {/* Quick Demo Pre-Searches */}
          <div className="mt-3.5 flex items-center gap-2 flex-wrap text-xs text-[#5E6B73]">
            <span>Try sample searches:</span>
            <button
              type="button"
              onClick={() => handleQuickSearch('9876500000', 'MOBILE')}
              className="font-mono text-[11px] underline text-[#12304A] hover:font-bold"
            >
              9876500000 (Electricity Scam)
            </button>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => handleQuickSearch('scam.deal@okaxis', 'UPI_ID')}
              className="font-mono text-[11px] underline text-[#12304A] hover:font-bold"
            >
              scam.deal@okaxis (UPI QR)
            </button>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => handleQuickSearch('fake-electricity-bill.in', 'WEBSITE')}
              className="font-mono text-[11px] underline text-[#12304A] hover:font-bold"
            >
              fake-electricity-bill.in
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-[#FDF2F2] border border-[#F8D7DA] rounded-[8px] text-sm text-[#992E2E]">
            {error}
          </div>
        )}

        {reportSuccessMessage && (
          <div className="mb-6 p-4 bg-[#E6F4EA] border border-[#C3E6CB] rounded-[8px] text-sm text-[#237A57] flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{reportSuccessMessage}</span>
          </div>
        )}

        {/* VERIFICATION RESULT DISPLAY */}
        {result && (
          <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-6 sm:p-8 shadow-card space-y-6 animate-in fade-in duration-200">
            {/* Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#F0F2F3]">
              <div>
                <span className="text-[11px] font-bold tracking-wider text-[#5E6B73] uppercase block mb-1">
                  VERIFICATION TARGET
                </span>
                <h3 className="text-xl font-bold font-mono text-[#12304A]">
                  {result.identifier}
                </h3>
              </div>

              <div>
                {result.status === 'FREQUENTLY_REPORTED' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-badge bg-[#FDE8E8] text-[#8B2626] text-xs font-bold uppercase tracking-wide border border-[#F8D7DA]">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Frequently Reported ({result.reportCount} Reports)</span>
                  </span>
                ) : result.status === 'SUSPICIOUS' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-badge bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wide border border-amber-200">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Suspicious Reports Found ({result.reportCount})</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-badge bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wide border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>No Reports Found</span>
                  </span>
                )}
              </div>
            </div>

            {/* Pattern Insights */}
            {result.commonPatterns.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#12304A] mb-2">
                  Common Modus Operandi & Patterns
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.commonPatterns.map((p, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-badge bg-[#EDF3F7] text-[#12304A] text-xs font-medium"
                    >
                      &bull; {p}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Reports Stream */}
            {result.recentReports.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#12304A] mb-3">
                  Recent Citizen Reports Linked to this Identifier
                </h4>
                <div className="space-y-2 text-xs">
                  {result.recentReports.map((r) => (
                    <div
                      key={r.id}
                      className="p-3 rounded-[6px] bg-[#F8F9FA] border border-[#DDE2E4] flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-[#1C252C]">{r.pattern}</div>
                        <div className="text-[11px] text-[#5E6B73] mt-0.5">
                          Category: {r.category} &bull; Jurisdiction: {r.state}
                        </div>
                      </div>
                      <span className="text-[11px] text-[#5E6B73] shrink-0">{r.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mandatory Transparent Disclaimer */}
            <div className="p-4 rounded-[8px] bg-[#F8F9FA] border border-[#E2E6E8] flex items-start gap-3 text-xs text-[#5E6B73] leading-relaxed">
              <Info className="w-4 h-4 text-[#12304A] shrink-0 mt-0.5" />
              <span>{result.disclaimer}</span>
            </div>

            {/* CTA to Report Identifier */}
            <div className="pt-4 border-t border-[#F0F2F3] flex items-center justify-between">
              <span className="text-xs text-[#5E6B73]">
                Did you face fraud or suspicious messages from this identifier?
              </span>
              <button
                type="button"
                onClick={() => setIsReportModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#12304A] text-white text-xs font-bold hover:bg-[#0B2235] transition-colors"
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Report this Identifier</span>
              </button>
            </div>
          </div>
        )}

        {/* Modal: Report Identifier */}
        {isReportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-[10px] border border-[#DDE2E4] shadow-2xl p-6 sm:p-8 max-w-md w-full relative">
              <button
                type="button"
                onClick={() => setIsReportModalOpen(false)}
                className="absolute top-4 right-4 text-[#5E6B73] hover:text-[#12304A]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 mb-3 text-[#12304A]">
                <Flag className="w-5 h-5 text-[#8B2626]" />
                <h3 className="text-base font-bold">Report Suspicious Identifier</h3>
              </div>

              <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#1C252C] mb-1">
                    Identifier to Report
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    disabled
                    className="w-full px-3 py-2 bg-slate-100 border border-[#DDE2E4] rounded font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1C252C] mb-1">
                    Suspected Fraud Category
                  </label>
                  <select
                    value={reportCategory}
                    onChange={(e) => setReportCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FBFBFA] border border-[#DDE2E4] rounded text-xs focus:bg-white"
                  >
                    <option>Electricity bill disconnection scam</option>
                    <option>Fake courier / delivery parcel link</option>
                    <option>Part-time job / task review scam</option>
                    <option>Fake KYC update threat</option>
                    <option>OLX / QR Code advance token fraud</option>
                    <option>Blackmail / Impersonation call</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#1C252C] mb-1">
                    What message or demand did you receive?
                  </label>
                  <textarea
                    rows={3}
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    placeholder="Briefly state what the caller/sender demanded (e.g. Sent fake SMS asking to call back for bill payment)."
                    className="w-full px-3 py-2 bg-[#FBFBFA] border border-[#DDE2E4] rounded text-xs focus:bg-white focus:outline-none"
                    required
                  />
                </div>

                <div className="pt-3 border-t border-[#E2E6E8] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsReportModalOpen(false)}
                    className="px-3 py-1.5 rounded border border-[#DDE2E4] text-[#5E6B73]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={reportingInProgress}
                    className="px-5 py-1.5 rounded bg-[#12304A] text-white font-bold hover:bg-[#0B2235]"
                  >
                    {reportingInProgress ? 'Submitting Report...' : 'Confirm & Save Report'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
