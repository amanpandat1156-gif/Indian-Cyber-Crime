import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Lock, X } from 'lucide-react';
import { Container } from '../../components/common/Container';
import { MultilingualVoiceTextarea } from '../../components/common/MultilingualVoiceTextarea';
import { AutoFillDemoButton } from '../../components/common/AutoFillDemoButton';
import { useLanguage } from '../../context/LanguageContext';
import { useDemo } from '../../context/DemoContext';
import { ParsedIncidentIntent } from '../../services/aiService';
import { complaintService } from '../../services/complaintService';
import { evidenceService } from '../../services/evidenceService';
import { Evidence, Complaint } from '../../types';

export const AnonymousReportPage: React.FC = () => {
  const { t } = useLanguage();
  const { scenarios } = useDemo();
  const [step, setStep] = useState<1 | 2>(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Cyber Terrorism / Extremism Material');
  const [evidenceList, setEvidenceList] = useState<Evidence[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [createdComplaint, setCreatedComplaint] = useState<Complaint | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAiAutoDraft = (parsed: ParsedIncidentIntent) => {
    if (parsed.suggestedTitle) setTitle(parsed.suggestedTitle);
  };

  const handleAutoFill = () => {
    const sc = scenarios.anonymous;
    setCategory(sc.category);
    setTitle(sc.title);
    setDescription(sc.description);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const res = await evidenceService.processFileUpload(file);
    if (res.success && res.data) {
      setEvidenceList((prev) => [...prev, res.data!]);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      setError('Please provide incident title and details.');
      return;
    }
    setError(null);
    setSubmitting(true);
    const res = await complaintService.createComplaint({
      isAnonymous: true,
      type: 'ANONYMOUS_REPORT',
      title: `[Anonymous Tip] ${title}`,
      description: `Category: ${category}\n\n${description}`,
      evidence: evidenceList,
    });
    setSubmitting(false);

    if (res.success && res.data) {
      setCreatedComplaint(res.data);
      setStep(2);
    } else {
      setError(res.error || 'Failed to submit anonymous tip.');
    }
  };

  return (
    <div className="w-full bg-[#F8F7F3] min-h-screen py-5 sm:py-12">
      <Container size="md" className="px-3.5 sm:px-6">
        <div className="mb-5 sm:mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5E6B73] hover:text-[#12304A]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('common.backToHome')}</span>
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-[8px] bg-[#FDF2F2] border border-[#F8D7DA] text-sm text-[#992E2E]">
            {error}
          </div>
        )}

        {step === 1 ? (
          <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-4.5 sm:p-8 shadow-card">
            {/* Transparent Privacy Disclosure */}
            <div className="mb-6 p-3.5 sm:p-4 rounded-md bg-[#EDF3F7] border border-[#CCDCE8] text-xs text-[#12304A]">
              <div className="flex items-center gap-2 font-bold mb-1">
                <Lock className="w-4 h-4 text-[#1D60A1] shrink-0" />
                <span>Transparent Privacy Disclosure</span>
              </div>
              <p className="leading-relaxed text-[#334155]">
                Anonymous reporting does not collect your name, email, or mobile number. An encrypted acknowledgement token will be issued for you to monitor investigative actions without identifying yourself.
              </p>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <div className="text-[10.5px] sm:text-[11px] font-bold tracking-widest text-[#1D60A1] uppercase mb-1">
                  {t('form.anonymous.badge')}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#12304A] tracking-tight">
                  {t('form.anonymous.title')}
                </h1>
                <p className="mt-1.5 text-xs sm:text-sm text-[#5E6B73]">
                  {t('form.anonymous.subtitle')}
                </p>
              </div>

              <AutoFillDemoButton onAutoFill={handleAutoFill} className="w-full sm:w-auto" />
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-[#1C252C] mb-1.5">
                  {t('form.anonymous.categoryLabel')}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#FBFBFA] border border-[#DDE2E4] rounded-md focus:bg-white focus:border-[#12304A] focus:outline-none"
                >
                  <option>Child Sexual Exploitation Material (CSAM)</option>
                  <option>Cyber Terrorism / Extremism Material</option>
                  <option>Ransomware Gang Infrastructure</option>
                  <option>Illegal SIM / Payment Gateway Aggregator Ring</option>
                  <option>Other Serious Cyber Crime</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C252C] mb-1.5">
                  {t('form.anonymous.titleLabel')} <span className="text-[#8B2626]">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Malicious website distributing remote access trojan"
                  className="w-full px-3 py-2 text-sm bg-[#FBFBFA] border border-[#DDE2E4] rounded-md focus:bg-white focus:border-[#12304A] focus:outline-none"
                  required
                />
              </div>

              <MultilingualVoiceTextarea
                id="anonymous-details"
                label={
                  <>
                    {t('form.anonymous.detailsLabel')} <span className="text-[#8B2626]">*</span>
                  </>
                }
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onAutoDraft={handleAiAutoDraft}
                placeholder="Provide URLs, server IPs, group links, and timestamps."
                required
              />

              {/* Attach optional evidence */}
              <div>
                <label className="block text-xs font-bold text-[#1C252C] mb-1.5">
                  Attach Screenshots or Log Files (Optional)
                </label>
                <div className="border border-dashed border-[#CCD3D6] rounded-md p-4 bg-[#FBFBFA] text-center">
                  <input
                    type="file"
                    id="anon-file"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="anon-file" className="cursor-pointer text-xs text-[#12304A] font-bold hover:underline">
                    + Click here to browse and attach file
                  </label>
                </div>

                {evidenceList.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {evidenceList.map((e) => (
                      <div key={e.id} className="text-xs text-[#5E6B73] flex items-center justify-between p-1.5 bg-[#F8F9FA] rounded">
                        <span>{e.fileName} ({e.fileSize})</span>
                        <button type="button" onClick={() => setEvidenceList(evidenceList.filter(item => item.id !== e.id))}>
                          <X className="w-3.5 h-3.5 text-slate-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#DDE2E4] flex justify-end">
              <button
                type="button"
                disabled={submitting}
                onClick={handleSubmit}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-[#12304A] text-white text-sm font-bold hover:bg-[#0B2235]"
              >
                <span>{submitting ? 'Registering Report...' : t('form.anonymous.submitBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-5 sm:p-8 shadow-card text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#E6F4EA] text-[#237A57] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-badge mb-2">
              ANONYMOUS ACKNOWLEDGEMENT TOKEN
            </div>
            <h1 className="text-2xl font-bold text-[#12304A]">{createdComplaint?.complaintNumber}</h1>
            <p className="mt-2 text-xs sm:text-sm text-[#5E6B73] max-w-md leading-relaxed">
              Your tip has been forwarded to the Special Cyber Intelligence Unit. Save your acknowledgement token to track the progress of this inquiry.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                to={`/track?number=${createdComplaint?.complaintNumber}`}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center px-6 py-2.5 rounded-md bg-[#12304A] text-white text-sm font-bold hover:bg-[#0B2235]"
              >
                Track Anonymous Token
              </Link>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
