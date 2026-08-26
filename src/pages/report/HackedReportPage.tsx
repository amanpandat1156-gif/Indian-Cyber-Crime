import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, ArrowRight, CheckCircle2, Check, AlertCircle } from 'lucide-react';
import { Container } from '../../components/common/Container';
import { AutoFillDemoButton } from '../../components/common/AutoFillDemoButton';
import { MultilingualVoiceTextarea } from '../../components/common/MultilingualVoiceTextarea';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useDemo } from '../../context/DemoContext';
import { ParsedIncidentIntent } from '../../services/aiService';
import { ExtractedIncidentDetails } from '../../services/geminiService';
import { complaintService } from '../../services/complaintService';
import { Complaint } from '../../types';

export const HackedReportPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { scenarios } = useDemo();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Security checklist
  const [checklist, setChecklist] = useState({
    revokedSessions: false,
    changedPassword: false,
    enabled2FA: false,
    informedContacts: false,
  });

  const [triageError, setTriageError] = useState<string | null>(null);

  const [accountType, setAccountType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [compromiseDetails, setCompromiseDetails] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ title?: string; description?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [createdComplaint, setCreatedComplaint] = useState<Complaint | null>(null);

  const handleAiAutoDraft = (parsed: ParsedIncidentIntent) => {
    if (parsed.suggestedTitle) {
      setTitle(parsed.suggestedTitle);
      setFieldErrors((prev) => ({ ...prev, title: undefined }));
    }
  };

  const handleAiExtract = (extracted: ExtractedIncidentDetails) => {
    if (extracted.accountType) setAccountType(extracted.accountType);
    if (extracted.summaryTitle) setTitle(extracted.summaryTitle);
    if (extracted.incidentSummary) setDescription(extracted.incidentSummary);
    if (extracted.scammerDemands) setCompromiseDetails(extracted.scammerDemands);
    setFieldErrors({});
  };

  const handleAutoFill = () => {
    const sc = scenarios.hacked;
    setChecklist({
      revokedSessions: true,
      changedPassword: true,
      enabled2FA: true,
      informedContacts: true,
    });
    setTriageError(null);
    setAccountType(sc.accountType);
    setTitle(sc.title);
    setDescription(sc.description);
    setCompromiseDetails(sc.compromiseDetails);
    setFieldErrors({});
  };

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
    setTriageError(null);
  };

  const isChecklistAcknowledged =
    checklist.revokedSessions ||
    checklist.changedPassword ||
    checklist.enabled2FA ||
    checklist.informedContacts;

  const handleProceedToStep2 = () => {
    if (!isChecklistAcknowledged) {
      setTriageError(
        'Please acknowledge the containment steps above (or click ✨ Auto-Fill Demo Scenario) to proceed.'
      );
      return;
    }
    setTriageError(null);
    setStep(2);
  };

  const handleSubmit = async () => {
    const errors: { title?: string; description?: string } = {};
    if (!title.trim()) {
      errors.title = 'Summary Title is required.';
    }
    if (!description.trim()) {
      errors.description = 'Please describe how the compromise happened.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setSubmitting(true);
    const res = await complaintService.createComplaint({
      userId: user?.id,
      type: 'HACKED_ACCOUNT',
      title: title || `Compromised Account: ${accountType}`,
      description: `${description} \n\nCompromise details: ${compromiseDetails}`,
      incidentDetails: {
        incidentDate: new Date().toISOString().split('T')[0],
        platform: accountType || 'Social Media',
      },
    });
    setSubmitting(false);

    if (res.success && res.data) {
      setCreatedComplaint(res.data);
      setStep(3);
    }
  };

  const isStep2Valid = title.trim().length > 0 && description.trim().length > 0;

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

        {/* STEP 1: CRITICAL IMMEDIATE SECURITY TRIAGE */}
        {step === 1 && (
          <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-4.5 sm:p-8 shadow-card">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-badge bg-rose-50 border border-rose-200 text-[10.5px] sm:text-[11px] font-bold text-[#8B2626] uppercase mb-2">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  {t('form.hacked.triageBadge')}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#12304A] tracking-tight">
                  {t('form.hacked.title')}
                </h1>
                <p className="mt-1.5 text-xs sm:text-sm text-[#5E6B73]">
                  {t('form.hacked.subtitle')}
                </p>
              </div>

              <AutoFillDemoButton onAutoFill={handleAutoFill} className="w-full sm:w-auto shrink-0" />
            </div>

            {triageError && (
              <div className="mb-6 p-3.5 rounded-md bg-rose-50 border border-rose-200 text-xs text-[#8B2626] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#8B2626] shrink-0" />
                <span className="font-semibold">{triageError}</span>
              </div>
            )}

            {/* Checklist items */}
            <div className="space-y-3 mb-8">
              <div
                onClick={() => toggleCheck('revokedSessions')}
                className={`p-3.5 sm:p-4 rounded-md border cursor-pointer transition-all flex items-start gap-3.5 ${
                  checklist.revokedSessions
                    ? 'bg-[#EDF3F7] border-[#12304A]'
                    : 'bg-[#FBFBFA] border-[#DDE2E4] hover:bg-white'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                    checklist.revokedSessions ? 'bg-[#12304A] text-white' : 'border border-[#CCD3D6]'
                  }`}
                >
                  {checklist.revokedSessions && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <strong className="text-xs font-bold text-[#12304A] block">
                    1. Log out all active sessions from other devices
                  </strong>
                  <span className="text-xs text-[#5E6B73] mt-0.5 block">
                    Go to your app settings &rarr; Security / Linked Devices &rarr; "Log out from all other devices".
                  </span>
                </div>
              </div>

              <div
                onClick={() => toggleCheck('changedPassword')}
                className={`p-3.5 sm:p-4 rounded-md border cursor-pointer transition-all flex items-start gap-3.5 ${
                  checklist.changedPassword
                    ? 'bg-[#EDF3F7] border-[#12304A]'
                    : 'bg-[#FBFBFA] border-[#DDE2E4] hover:bg-white'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                    checklist.changedPassword ? 'bg-[#12304A] text-white' : 'border border-[#CCD3D6]'
                  }`}
                >
                  {checklist.changedPassword && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <strong className="text-xs font-bold text-[#12304A] block">
                    2. Change your primary recovery email & password
                  </strong>
                  <span className="text-xs text-[#5E6B73] mt-0.5 block">
                    Update your Google / Apple / Microsoft account credentials linked to the device.
                  </span>
                </div>
              </div>

              <div
                onClick={() => toggleCheck('enabled2FA')}
                className={`p-3.5 sm:p-4 rounded-md border cursor-pointer transition-all flex items-start gap-3.5 ${
                  checklist.enabled2FA
                    ? 'bg-[#EDF3F7] border-[#12304A]'
                    : 'bg-[#FBFBFA] border-[#DDE2E4] hover:bg-white'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                    checklist.enabled2FA ? 'bg-[#12304A] text-white' : 'border border-[#CCD3D6]'
                  }`}
                >
                  {checklist.enabled2FA && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <strong className="text-xs font-bold text-[#12304A] block">
                    3. Enable Two-Factor Authentication (2FA)
                  </strong>
                  <span className="text-xs text-[#5E6B73] mt-0.5 block">
                    Turn on 2FA using an Authenticator app or SMS OTP code.
                  </span>
                </div>
              </div>

              <div
                onClick={() => toggleCheck('informedContacts')}
                className={`p-3.5 sm:p-4 rounded-md border cursor-pointer transition-all flex items-start gap-3.5 ${
                  checklist.informedContacts
                    ? 'bg-[#EDF3F7] border-[#12304A]'
                    : 'bg-[#FBFBFA] border-[#DDE2E4] hover:bg-white'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                    checklist.informedContacts ? 'bg-[#12304A] text-white' : 'border border-[#CCD3D6]'
                  }`}
                >
                  {checklist.informedContacts && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <strong className="text-xs font-bold text-[#12304A] block">
                    4. Inform close contacts & family
                  </strong>
                  <span className="text-xs text-[#5E6B73] mt-0.5 block">
                    Alert friends that your account was compromised so they do not respond to fake emergency money requests.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#DDE2E4] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="text-xs text-[#5E6B73]">
                Secured what you could? Continue to official incident report.
              </span>
              <button
                type="button"
                onClick={handleProceedToStep2}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-[#12304A] text-white text-sm font-semibold hover:bg-[#0B2235] transition-colors"
              >
                <span>{t('form.hacked.proceedBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: INCIDENT REPORTING */}
        {step === 2 && (
          <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-4.5 sm:p-8 shadow-card">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#12304A] tracking-tight">
                  Report Account Compromise
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#5E6B73]">
                  Provide details about how the account was accessed or if it is currently being used to scam others.
                </p>
              </div>

              <AutoFillDemoButton onAutoFill={handleAutoFill} className="w-full sm:w-auto shrink-0" />
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-[#1C252C] mb-1.5">
                  Account Type
                </label>
                <input
                  type="text"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  placeholder="e.g. Social Media (Instagram / WhatsApp / Facebook)"
                  className="w-full px-3 py-2 text-sm bg-[#FBFBFA] border border-[#DDE2E4] rounded-md focus:bg-white focus:border-[#12304A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C252C] mb-1.5">
                  Summary Title <span className="text-[#8B2626]">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (e.target.value.trim()) {
                      setFieldErrors((prev) => ({ ...prev, title: undefined }));
                    }
                  }}
                  placeholder="e.g. WhatsApp takeover via fake verification code"
                  className={`w-full px-3 py-2 text-sm bg-[#FBFBFA] border rounded-md focus:bg-white focus:border-[#12304A] focus:outline-none ${
                    fieldErrors.title ? 'border-[#B33A3A] bg-rose-50/20' : 'border-[#DDE2E4]'
                  }`}
                  required
                />
                {fieldErrors.title && (
                  <p className="mt-1 text-xs text-[#B33A3A] font-semibold">{fieldErrors.title}</p>
                )}
              </div>

              <div>
                <MultilingualVoiceTextarea
                  id="hacked-description"
                  label={
                    <>
                      How did the compromise happen? <span className="text-[#8B2626]">*</span>
                    </>
                  }
                  rows={4}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (e.target.value.trim()) {
                      setFieldErrors((prev) => ({ ...prev, description: undefined }));
                    }
                  }}
                  categoryContext="Account Compromise & Hijacking"
                  onAutoDraft={handleAiAutoDraft}
                  onAiExtract={handleAiExtract}
                  placeholder="Explain whether you received a phishing link, shared an OTP, or if your password was altered without your knowledge."
                  required
                />
                {fieldErrors.description && (
                  <p className="mt-1 text-xs text-[#B33A3A] font-semibold">{fieldErrors.description}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C252C] mb-1.5">
                  Are scammers demanding money from your contacts?
                </label>
                <input
                  type="text"
                  value={compromiseDetails}
                  onChange={(e) => setCompromiseDetails(e.target.value)}
                  placeholder="e.g. Attacker is messaging contacts asking for emergency UPI transfers of ₹5,000."
                  className="w-full px-3 py-2 text-sm bg-[#FBFBFA] border border-[#DDE2E4] rounded-md focus:bg-white focus:border-[#12304A] focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#DDE2E4] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full sm:w-auto min-h-[44px] flex items-center justify-center px-4 py-2 rounded-md border border-[#DDE2E4] text-xs font-semibold text-[#5E6B73] hover:bg-slate-50 transition-colors"
              >
                Back to Containment Steps
              </button>

              <button
                type="button"
                disabled={submitting || !isStep2Valid}
                onClick={handleSubmit}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-[#12304A] text-white text-sm font-bold hover:bg-[#0B2235] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? 'Filing Incident...' : 'Submit Incident Report'}
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
              INCIDENT REGISTERED
            </div>
            <h1 className="text-2xl font-bold text-[#12304A]">{createdComplaint.complaintNumber}</h1>
            <p className="mt-2 text-xs sm:text-sm text-[#5E6B73] max-w-md">
              Your account hijacking report has been registered. Takedown and intermediary logs notices have been queued.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                to={`/track?number=${createdComplaint.complaintNumber}`}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center px-6 py-2.5 rounded-md bg-[#12304A] text-white text-sm font-bold hover:bg-[#0B2235]"
              >
                Track Case Progress
              </Link>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default HackedReportPage;
