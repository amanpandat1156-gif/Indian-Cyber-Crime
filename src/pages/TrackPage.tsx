import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  AlertCircle,
  CheckCircle2,
  FileText,
  Upload,
  Building2,
  Plus,
  Loader2,
  X
} from 'lucide-react';
import { Container } from '../components/common/Container';
import { useAuth } from '../context/AuthContext';
import { complaintService } from '../services/complaintService';
import { evidenceService } from '../services/evidenceService';
import { Complaint } from '../types';

export const TrackPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, openLoginModal } = useAuth();

  const [searchInput, setSearchInput] = useState(searchParams.get('number') || '');
  const [currentComplaint, setCurrentComplaint] = useState<Complaint | null>(null);
  const [userComplaints, setUserComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add evidence modal & action resolution state
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [uploadingEvidence, setUploadingEvidence] = useState(false);
  const [evidenceSuccess, setEvidenceSuccess] = useState<string | null>(null);

  // Load user's complaints if logged in
  useEffect(() => {
    if (user) {
      complaintService.getUserComplaints(user.id).then((res) => {
        if (res.success && res.data) {
          setUserComplaints(res.data);
        }
      });
    } else {
      setUserComplaints([]);
    }
  }, [user]);

  // Load complaint from URL query or default to user's active complaint
  useEffect(() => {
    const queryNumber = searchParams.get('number');
    if (queryNumber) {
      setSearchInput(queryNumber);
      handleSearch(queryNumber);
    } else if (userComplaints.length > 0 && !currentComplaint) {
      setCurrentComplaint(userComplaints[0]);
    }
  }, [searchParams, userComplaints]);

  const handleSearch = async (numToSearch?: string) => {
    const target = numToSearch || searchInput;
    if (!target.trim()) {
      setError('Please enter a complaint number.');
      return;
    }
    setError(null);
    setLoading(true);
    const res = await complaintService.getComplaintByNumber(target);
    setLoading(false);
    if (res.success && res.data) {
      setCurrentComplaint(res.data);
      setSearchParams({ number: res.data.complaintNumber });
    } else {
      setCurrentComplaint(null);
      setError(res.error || 'Complaint not found.');
    }
  };

  // Complete "Action Required" by uploading the requested document
  const handleResolveAction = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentComplaint) return;

    setUploadingEvidence(true);
    const uploadRes = await evidenceService.processFileUpload(file);
    if (uploadRes.success && uploadRes.data) {
      const resolveRes = await complaintService.resolveActionRequired(currentComplaint.id, uploadRes.data);
      setUploadingEvidence(false);
      if (resolveRes.success && resolveRes.data) {
        setCurrentComplaint(resolveRes.data);
        setEvidenceSuccess('Requested bank statement successfully verified and attached to case records.');
        setTimeout(() => setEvidenceSuccess(null), 5000);
      }
    } else {
      setUploadingEvidence(false);
    }
  };

  // Attach supplementary evidence
  const handleAddSupplementaryEvidence = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentComplaint) return;

    setUploadingEvidence(true);
    const uploadRes = await evidenceService.processFileUpload(file);
    if (uploadRes.success && uploadRes.data) {
      const addRes = await complaintService.addAdditionalEvidence(currentComplaint.id, uploadRes.data);
      setUploadingEvidence(false);
      setIsEvidenceModalOpen(false);
      if (addRes.success && addRes.data) {
        setCurrentComplaint(addRes.data);
        setEvidenceSuccess('Additional evidence attached to case file.');
        setTimeout(() => setEvidenceSuccess(null), 5000);
      }
    } else {
      setUploadingEvidence(false);
    }
  };

  return (
    <div className="w-full bg-[#F8F7F3] min-h-screen py-5 sm:py-12">
      <Container size="full" className="max-w-[1400px] px-3.5 sm:px-6 lg:px-8">
        {/* Top Header & Search Bar */}
        <div className="mb-6 sm:mb-8 max-w-3xl">
          <div className="text-[10.5px] sm:text-[12px] font-bold tracking-widest text-[#1D60A1] uppercase mb-1 sm:mb-1.5">
            CASE UNDERSTANDING & STATUS
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#12304A] tracking-tight">
            Track Your Complaint
          </h1>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#5E6B73] leading-relaxed">
            Enter your complaint number or token below to understand what happened, what is happening now, and what actions you need to take.
          </p>

          {/* Search Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="mt-4 sm:mt-5 flex flex-col sm:flex-row gap-2 sm:gap-2.5"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#5E6B73]" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="e.g. NCRP-2026-482731"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DDE2E4] rounded-[8px] text-sm text-[#1C252C] focus:border-[#12304A] focus:outline-none shadow-xs font-mono min-h-[44px]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-[#12304A] text-white rounded-[8px] text-sm font-semibold hover:bg-[#0B2235] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Track'}
            </button>
          </form>

          {/* Sample Hackathon Case Pickers */}
          <div className="mt-4 p-3 bg-white rounded-[8px] border border-[#DDE2E4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-[#12304A] flex items-center gap-1">
                <span>✨ Sample Test Cases:</span>
              </span>
              {[
                { number: 'NCRP-2026-849201', label: 'Financial Fraud (Action Required)' },
                { number: 'NCRP-2026-410293', label: 'Harassment (Resolved)' },
                { number: 'NCRP-2026-103948', label: 'Anonymous Token' },
              ].map((sample) => (
                <button
                  key={sample.number}
                  type="button"
                  onClick={() => {
                    setSearchInput(sample.number);
                    handleSearch(sample.number);
                  }}
                  className={`px-2.5 py-1.5 sm:py-1 rounded-[6px] border font-mono transition-all text-xs font-semibold min-h-[36px] sm:min-h-0 ${
                    currentComplaint?.complaintNumber === sample.number
                      ? 'bg-[#12304A] text-white border-[#12304A] shadow-xs'
                      : 'bg-[#FBFBFA] text-[#12304A] border-[#CCD3D6] hover:bg-[#EDF3F7]'
                  }`}
                >
                  {sample.number}
                </button>
              ))}
            </div>
          </div>

          {/* User's complaints quick picker (if logged in) */}
          {user && userComplaints.length > 0 && (
            <div className="mt-2.5 flex items-center gap-2 flex-wrap text-xs">
              <span className="text-[#5E6B73] font-medium">Your filed cases:</span>
              {userComplaints.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setSearchInput(c.complaintNumber);
                    handleSearch(c.complaintNumber);
                  }}
                  className={`px-2.5 py-1 rounded-[6px] border font-mono transition-colors ${
                    currentComplaint?.id === c.id
                      ? 'bg-[#12304A] text-white border-[#12304A] font-bold'
                      : 'bg-white text-[#12304A] border-[#DDE2E4] hover:bg-[#EDF3F7]'
                  }`}
                >
                  {c.complaintNumber}
                </button>
              ))}
            </div>
          )}
        </div>

        {error && (
          <div className="mb-6 sm:mb-8 p-4 bg-[#FDF2F2] border border-[#F8D7DA] rounded-[10px] text-sm text-[#992E2E] flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {evidenceSuccess && (
          <div className="mb-6 sm:mb-8 p-4 bg-[#E6F4EA] border border-[#C3E6CB] rounded-[10px] text-sm text-[#237A57] flex items-center gap-3 animate-in fade-in duration-150">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{evidenceSuccess}</span>
          </div>
        )}

        {/* COMPLAINT CASE DETAIL VIEW */}
        {currentComplaint ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-start">
            {/* Left Column (8 Cols): Status Banner + Action Required + Timeline */}
            <div className="lg:col-span-8 space-y-5 sm:space-y-6">
              {/* 1. Human-First Status Banner */}
              <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-4.5 sm:p-6 shadow-card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-[#F0F2F3]">
                  <div>
                    <span className="text-[10.5px] sm:text-[11px] font-bold tracking-wider text-[#5E6B73] uppercase block mb-1">
                      COMPLAINT ACKNOWLEDGEMENT
                    </span>
                    <h2 className="text-lg sm:text-2xl font-bold font-mono text-[#12304A] break-all">
                      {currentComplaint.complaintNumber}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-badge text-xs font-bold uppercase tracking-wider ${
                        currentComplaint.status === 'RESOLVED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : currentComplaint.status === 'ACTION_REQUIRED'
                          ? 'bg-amber-100 text-amber-800 animate-pulse'
                          : 'bg-blue-50 text-blue-800'
                      }`}
                    >
                      {currentComplaint.statusDisplay}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-base font-bold text-[#1C252C]">
                    {currentComplaint.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#5E6B73] leading-relaxed">
                    {currentComplaint.statusDescription}
                  </p>
                </div>
              </div>

              {/* 2. Interactive Action Required Banner (If active) */}
              {currentComplaint.actionRequired && !currentComplaint.actionRequired.completed && (
                <div className="bg-[#FFF9E6] rounded-[10px] border-2 border-[#FFE082] p-6 shadow-card">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#FFE082] text-[#7A5800] flex items-center justify-center shrink-0">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#B7791F]">
                        ACTION REQUIRED FROM YOU
                      </div>
                      <h4 className="text-base font-bold text-[#1C252C] mt-0.5">
                        {currentComplaint.actionRequired.title}
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-[#5E6B73] leading-relaxed">
                        {currentComplaint.actionRequired.description}
                      </p>

                      <div className="mt-4">
                        <input
                          type="file"
                          id="action-required-upload"
                          onChange={handleResolveAction}
                          accept="application/pdf,image/*"
                          className="hidden"
                        />
                        <label
                          htmlFor="action-required-upload"
                          className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#12304A] text-white text-xs font-bold hover:bg-[#0B2235] transition-colors shadow-xs"
                        >
                          {uploadingEvidence ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Uploading & Verifying Statement...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4" />
                              <span>Upload Bank Statement to Complete Action</span>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Case Chronological Timeline */}
              <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-6 sm:p-7 shadow-card">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#F0F2F3]">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#12304A]">
                    Case Progression Timeline
                  </h3>
                  <span className="text-xs text-[#5E6B73]">Chronological Log</span>
                </div>

                <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DDE2E4]">
                  {currentComplaint.timeline.map((event, idx) => (
                    <div key={event.id} className="relative group">
                      <span
                        className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-white ${
                          idx === 0 ? 'bg-[#12304A] ring-4 ring-[#EDF3F7]' : 'bg-[#94A3B8]'
                        }`}
                      ></span>

                      <div className="text-xs font-semibold text-[#5E6B73] mb-0.5">
                        {event.date} &bull; <span className="capitalize">{event.actor}</span>
                      </div>
                      <div className="text-sm font-bold text-[#1C252C] leading-snug">
                        {event.title}
                      </div>
                      <p className="mt-1 text-xs text-[#5E6B73] leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (4 Cols): Case Details + Assigned Cell + Evidence Vault */}
            <div className="lg:col-span-4 space-y-6">
              {/* Assigned Law Enforcement Cell */}
              <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-5 shadow-card">
                <div className="flex items-center gap-2.5 mb-3 text-[#12304A]">
                  <Building2 className="w-4 h-4 text-[#12304A]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    Assigned Cyber Unit
                  </h4>
                </div>

                <div className="text-xs space-y-2 text-[#1C252C]">
                  <div><strong>Station:</strong> {currentComplaint.assignedTeam.policeStation}</div>
                  <div><strong>District:</strong> {currentComplaint.assignedTeam.district}, {currentComplaint.assignedTeam.state}</div>
                  <div><strong>Officer In Charge:</strong> {currentComplaint.assignedTeam.officerName}</div>
                  {currentComplaint.assignedTeam.contactNumber && (
                    <div className="pt-2 border-t border-[#F0F2F3] flex items-center justify-between">
                      <span>Helpdesk:</span>
                      <strong className="text-[#12304A]">{currentComplaint.assignedTeam.contactNumber}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Financial Snapshot */}
              {currentComplaint.financialDetails && (
                <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-5 shadow-card">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#12304A] mb-3">
                    Transaction Details
                  </h4>
                  <div className="text-xs space-y-2 text-[#1C252C]">
                    <div className="flex justify-between">
                      <span className="text-[#5E6B73]">Reported Loss:</span>
                      <strong className="text-sm text-[#8B2626]">
                        ₹{currentComplaint.financialDetails.amount.toLocaleString('en-IN')}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5E6B73]">Mode:</span>
                      <span className="font-semibold">{currentComplaint.financialDetails.paymentMode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5E6B73]">Bank:</span>
                      <span>{currentComplaint.financialDetails.bankName}</span>
                    </div>
                    {currentComplaint.financialDetails.upiId && (
                      <div className="flex justify-between">
                        <span className="text-[#5E6B73]">Suspect VPA:</span>
                        <span className="font-mono text-[11px] text-[#992E2E]">{currentComplaint.financialDetails.upiId}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Attached Evidence Vault */}
              <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-5 shadow-card">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#12304A]">
                    Evidence Vault ({currentComplaint.evidence.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsEvidenceModalOpen(true)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#12304A] hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Evidence</span>
                  </button>
                </div>

                {currentComplaint.evidence.length === 0 ? (
                  <p className="text-xs text-[#5E6B73]">No files attached yet.</p>
                ) : (
                  <div className="space-y-2">
                    {currentComplaint.evidence.map((ev) => (
                      <div
                        key={ev.id}
                        className="p-2.5 bg-[#F8F9FA] rounded-[6px] border border-[#DDE2E4] text-xs flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-3.5 h-3.5 text-[#12304A] shrink-0" />
                          <span className="truncate text-[#1C252C]">{ev.fileName}</span>
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          {ev.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-12 text-center max-w-md mx-auto shadow-card">
            <div className="w-12 h-12 rounded-full bg-[#EDF3F7] text-[#12304A] flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#12304A]">
              Search a Complaint to View Updates
            </h3>
            <p className="mt-1 text-xs text-[#5E6B73] leading-relaxed">
              Enter your complaint acknowledgement number above or log in with your mobile number to view all filed grievances.
            </p>
            {!user && (
              <div className="mt-5">
                <button
                  type="button"
                  onClick={openLoginModal}
                  className="px-5 py-2 rounded-md bg-[#12304A] text-white text-xs font-semibold hover:bg-[#0B2235]"
                >
                  Log In to View My Complaints
                </button>
              </div>
            )}
          </div>
        )}

        {/* Modal: Add Additional Evidence */}
        {isEvidenceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-[10px] border border-[#DDE2E4] shadow-2xl p-6 max-w-md w-full relative">
              <button
                type="button"
                onClick={() => setIsEvidenceModalOpen(false)}
                className="absolute top-4 right-4 text-[#5E6B73] hover:text-[#12304A]"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-base font-bold text-[#12304A] mb-2">
                Attach Additional Evidence
              </h3>
              <p className="text-xs text-[#5E6B73] mb-4">
                You can attach additional bank debit statements, chat screenshots, or FIR copies to complaint <strong>{currentComplaint?.complaintNumber}</strong>.
              </p>

              <div className="border-2 border-dashed border-[#CCD3D6] rounded-[8px] p-6 text-center bg-[#FBFBFA]">
                <input
                  type="file"
                  id="supp-file-input"
                  onChange={handleAddSupplementaryEvidence}
                  className="hidden"
                />
                <label htmlFor="supp-file-input" className="cursor-pointer flex flex-col items-center">
                  <Upload className="w-6 h-6 text-[#12304A] mb-2" />
                  <span className="text-xs font-bold text-[#12304A]">Choose File to Upload</span>
                  <span className="text-[11px] text-[#5E6B73] mt-1">PNG, JPG, PDF up to 10 MB</span>
                </label>
              </div>

              {uploadingEvidence && (
                <div className="mt-3 p-2 bg-[#EDF3F7] rounded text-xs text-[#12304A] flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing and attaching file...</span>
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
