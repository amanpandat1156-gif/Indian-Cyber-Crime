import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, FileText, UploadCloud, X, Loader2 } from 'lucide-react';
import { Container } from '../../components/common/Container';
import { MultilingualVoiceTextarea } from '../../components/common/MultilingualVoiceTextarea';
import { AutoFillDemoButton } from '../../components/common/AutoFillDemoButton';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useDemo } from '../../context/DemoContext';
import { ParsedIncidentIntent } from '../../services/aiService';
import { complaintService } from '../../services/complaintService';
import { evidenceService } from '../../services/evidenceService';
import { Evidence, Complaint } from '../../types';

export const HarassmentReportPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { scenarios } = useDemo();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const handleAutoFill = () => {
    const sc = scenarios.harassment;
    setPlatform(sc.platform);
    setTitle(sc.title);
    setDescription(sc.description);
    setSuspectDetails(sc.suspectDetails);
  };

  const handleAiAutoDraft = (parsed: ParsedIncidentIntent) => {
    if (parsed.suggestedTitle) setTitle(parsed.suggestedTitle);
    if (parsed.suspectIdentifiers.socialHandle) setSuspectDetails(parsed.suspectIdentifiers.socialHandle);
    else if (parsed.suspectIdentifiers.phone) setSuspectDetails(`+91-${parsed.suspectIdentifiers.phone}`);
    if (parsed.suspectIdentifiers.website) setPlatform(parsed.suspectIdentifiers.website);
  };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [platform, setPlatform] = useState('');
  const [suspectDetails, setSuspectDetails] = useState('');
  const [evidenceList, setEvidenceList] = useState<Evidence[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [createdComplaint, setCreatedComplaint] = useState<Complaint | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const res = await evidenceService.processFileUpload(file);
    setUploading(false);
    if (res.success && res.data) {
      setEvidenceList((prev) => [...prev, res.data!]);
    }
  };

  const handleAddSampleChat = async () => {
    setUploading(true);
    const sampleFile = new File(['mock chat evidence'], 'threatening_chat_export.pdf', { type: 'application/pdf' });
    const res = await evidenceService.processFileUpload(sampleFile);
    setUploading(false);
    if (res.success && res.data) {
      setEvidenceList((prev) => [...prev, res.data!]);
    }
  };

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);
    const res = await complaintService.createComplaint({
      userId: user?.id,
      type: 'CYBER_HARASSMENT',
      title: title || 'Cyber Harassment & Threat Report',
      description,
      incidentDetails: {
        incidentDate: new Date().toISOString().split('T')[0],
        platform,
        suspectDetails,
      },
      evidence: evidenceList,
    });
    setSubmitting(false);

    if (res.success && res.data) {
      setCreatedComplaint(res.data);
      setStep(3);
    } else {
      setError(res.error || 'Failed to submit complaint.');
    }
  };

  return (
    <div className="w-full bg-[#F8F7F3] min-h-screen py-5 sm:py-12">
      <Container size="md" className="px-3.5 sm:px-6">
        <div className="mb-5 sm:mb-6 flex items-center justify-between">
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

        {step === 1 && (
          <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-4.5 sm:p-8 shadow-card">
            {/* Safety Alert Banner */}
            <div className="mb-6 p-3.5 sm:p-4 rounded-md bg-[#FFF9E6] border border-[#FFE082] text-xs text-[#7A5800] flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-[#B7791F] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">{t('form.harassment.safetyNoticeTitle')}</strong>
                {t('form.harassment.safetyNotice')}
              </div>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <div className="text-[10.5px] sm:text-[11px] font-bold tracking-widest text-[#1D60A1] uppercase mb-1">
                  {t('form.harassment.badge')}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#12304A] tracking-tight">
                  {t('form.harassment.title')}
                </h1>
                <p className="mt-1.5 text-xs sm:text-sm text-[#5E6B73]">
                  {t('form.harassment.subtitle')}
                </p>
              </div>

              <AutoFillDemoButton onAutoFill={handleAutoFill} className="w-full sm:w-auto" />
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-[#1C252C] mb-1.5">
                  {t('form.harassment.platformLabel')}
                </label>
                <input
                  type="text"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  placeholder={t('form.harassment.platformPlaceholder')}
                  className="w-full px-3 py-2 text-sm bg-[#FBFBFA] border border-[#DDE2E4] rounded-md focus:bg-white focus:border-[#12304A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C252C] mb-1.5">
                  {t('form.harassment.titleLabel')} <span className="text-[#8B2626]">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t('form.harassment.titlePlaceholder')}
                  className="w-full px-3 py-2 text-sm bg-[#FBFBFA] border border-[#DDE2E4] rounded-md focus:bg-white focus:border-[#12304A] focus:outline-none"
                  required
                />
              </div>

              <MultilingualVoiceTextarea
                id="harassment-description"
                label={
                  <>
                    {t('form.harassment.narrativeLabel')} <span className="text-[#8B2626]">*</span>
                  </>
                }
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onAutoDraft={handleAiAutoDraft}
                placeholder={t('form.harassment.narrativePlaceholder')}
                required
              />

              <div>
                <label className="block text-xs font-bold text-[#1C252C] mb-1.5">
                  {t('form.harassment.suspectLabel')}
                </label>
                <input
                  type="text"
                  value={suspectDetails}
                  onChange={(e) => setSuspectDetails(e.target.value)}
                  placeholder={t('form.harassment.suspectPlaceholder')}
                  className="w-full px-3 py-2 text-sm bg-[#FBFBFA] border border-[#DDE2E4] rounded-md focus:bg-white focus:border-[#12304A] focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#DDE2E4] flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (!title.trim() || !description.trim()) {
                    setError('Please complete the required fields.');
                    return;
                  }
                  setError(null);
                  setStep(2);
                }}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-[#12304A] text-white text-sm font-semibold hover:bg-[#0B2235] transition-colors"
              >
                <span>{t('form.harassment.continueProof')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-4.5 sm:p-8 shadow-card">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#12304A] tracking-tight">
                {t('form.harassment.uploadProofTitle')}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#5E6B73]">
                {t('form.harassment.uploadProofSubtitle')}
              </p>
            </div>

            <div className="w-full border-2 border-dashed border-[#CCD3D6] hover:border-[#12304A] rounded-[10px] p-5 sm:p-8 text-center bg-[#FBFBFA]">
              <input
                type="file"
                id="harassment-file"
                onChange={handleFileUpload}
                accept="image/*,application/pdf"
                className="hidden"
              />
              <label htmlFor="harassment-file" className="cursor-pointer flex flex-col items-center w-full">
                <div className="w-12 h-12 rounded-full bg-[#EDF3F7] text-[#12304A] flex items-center justify-center mb-3">
                  <UploadCloud className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div className="text-sm font-bold text-[#12304A]">Click to select files</div>
                <div className="text-xs text-[#5E6B73] mt-1">PNG, JPG, PDF up to 10 MB</div>
              </label>

              <div className="mt-4 pt-4 border-t border-[#E2E6E8] flex justify-center">
                <button
                  type="button"
                  onClick={handleAddSampleChat}
                  className="w-full sm:w-auto min-h-[38px] flex items-center justify-center text-xs font-semibold px-3 py-1.5 rounded-md bg-[#EDF3F7] text-[#12304A] hover:bg-[#DDE7F0]"
                >
                  + Add Sample Chat Log (Auto-Test)
                </button>
              </div>
            </div>

            {uploading && (
              <div className="mt-4 p-3 bg-[#EDF3F7] rounded text-xs text-[#12304A] flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                <span>Processing uploaded file...</span>
              </div>
            )}

            {evidenceList.length > 0 && (
              <div className="mt-6 space-y-2">
                {evidenceList.map((ev) => (
                  <div key={ev.id} className="flex items-center justify-between p-3 bg-[#F8F9FA] rounded border border-[#DDE2E4] text-xs">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-[#12304A] shrink-0" />
                      <span className="font-bold text-[#1C252C]">{ev.fileName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEvidenceList(evidenceList.filter((e) => e.id !== ev.id))}
                      className="text-[#5E6B73] hover:text-[#992E2E] p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-[#DDE2E4] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full sm:w-auto min-h-[44px] flex items-center justify-center px-4 py-2 rounded-md border border-[#DDE2E4] text-xs font-semibold text-[#5E6B73]"
              >
                {t('common.back')}
              </button>

              <button
                type="button"
                disabled={submitting}
                onClick={handleSubmit}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-[#12304A] text-white text-sm font-bold hover:bg-[#0B2235]"
              >
                {submitting ? t('form.harassment.submitting') : t('form.harassment.submitBtn')}
              </button>
            </div>
          </div>
        )}

        {step === 3 && createdComplaint && (
          <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-5 sm:p-8 shadow-card text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#E6F4EA] text-[#237A57] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-badge mb-2">
              {t('form.harassment.successTitle')}
            </div>
            <h1 className="text-2xl font-bold text-[#12304A]">{createdComplaint.complaintNumber}</h1>
            <p className="mt-2 text-xs sm:text-sm text-[#5E6B73] max-w-md">
              Your report has been routed to <strong>{createdComplaint.assignedTeam.policeStation}</strong> for immediate review and platform preservation notices.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                to={`/track?number=${createdComplaint.complaintNumber}`}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center px-6 py-2.5 rounded-md bg-[#12304A] text-white text-sm font-bold hover:bg-[#0B2235]"
              >
                {t('form.harassment.trackTimeline')}
              </Link>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
