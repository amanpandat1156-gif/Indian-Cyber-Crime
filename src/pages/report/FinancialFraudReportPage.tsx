import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  IndianRupee,
  Calendar,
  ShieldCheck,
  Edit2,
  X,
  PhoneCall,
  Loader2,
  Sparkles
} from 'lucide-react';
import { Container } from '../../components/common/Container';
import { MultilingualVoiceTextarea } from '../../components/common/MultilingualVoiceTextarea';
import { AutoFillDemoButton } from '../../components/common/AutoFillDemoButton';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useDemo } from '../../context/DemoContext';
import { aiService, ParsedIncidentIntent } from '../../services/aiService';
import { evidenceService } from '../../services/evidenceService';
import { complaintService } from '../../services/complaintService';
import { Evidence, ExtractedFinancialData, Complaint } from '../../types';

export const FinancialFraudReportPage: React.FC = () => {
  const { user, openLoginModal } = useAuth();
  const { t } = useLanguage();
  const { scenarios } = useDemo();

  // Wizard Steps: 1 = Incident Details, 2 = Evidence Upload & OCR, 3 = Extracted Data Review, 4 = Final Review, 5 = Submitted
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [incidentDate, setIncidentDate] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [paymentMode, setPaymentMode] = useState<'UPI' | 'NET_BANKING' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'WALLET'>('UPI');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // AI Auto-Drafted Flags
  const [aiDraftedFields, setAiDraftedFields] = useState<{
    amount?: boolean;
    date?: boolean;
    paymentMode?: boolean;
    title?: boolean;
  }>({});

  // Evidence & OCR State
  const [evidenceList, setEvidenceList] = useState<Evidence[]>([]);
  const [uploadingStatus, setUploadingStatus] = useState<'idle' | 'uploading' | 'processing' | 'processed'>('idle');
  const [extractedData, setExtractedData] = useState<ExtractedFinancialData | null>(null);
  const [isEditingExtracted, setIsEditingExtracted] = useState(false);
  const [extractedConfirmed, setExtractedConfirmed] = useState(false);
  const [ocrConfidence, setOcrConfidence] = useState<number>(0.98);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdComplaint, setCreatedComplaint] = useState<Complaint | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    amount?: string;
    incidentDate?: string;
    title?: string;
    description?: string;
  }>({});

  const handleAutoFill = () => {
    const sc = scenarios.financialFraud;
    setAmount(sc.amount);
    setIncidentDate(sc.incidentDate);
    setPaymentMode(sc.paymentMode);
    setTitle(sc.title);
    setDescription(sc.description);
    setFieldErrors({});
    setFormError(null);
    setExtractedData({
      amount: Number(sc.amount),
      date: sc.incidentDate,
      transactionId: sc.transactionId,
      bankName: sc.bankName,
      upiId: sc.suspectVpa,
      paymentMode: sc.paymentMode,
    });
    setAiDraftedFields({
      amount: true,
      date: true,
      paymentMode: true,
      title: true,
    });
  };

  const handleAiAutoDraft = (parsed: ParsedIncidentIntent) => {
    if (parsed.amount) {
      setAmount(String(parsed.amount));
    }
    if (parsed.incidentDate) {
      setIncidentDate(parsed.incidentDate);
    }
    if (parsed.paymentMethod) {
      setPaymentMode(parsed.paymentMethod);
    }
    if (parsed.suggestedTitle) {
      setTitle(parsed.suggestedTitle);
    }
    setAiDraftedFields({
      amount: Boolean(parsed.amount),
      date: Boolean(parsed.incidentDate),
      paymentMode: Boolean(parsed.paymentMethod),
      title: Boolean(parsed.suggestedTitle),
    });
  };

  // Handle Mock/Real File Upload with AI OCR
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormError(null);
    setUploadingStatus('uploading');

    const res = await evidenceService.processFileUpload(file, (status) => {
      setUploadingStatus(status);
    });

    if (res.success && res.data) {
      const ocr = await aiService.extractTransactionFromImage(file);
      setOcrConfidence(ocr.confidence);
      setEvidenceList((prev) => [...prev, res.data!]);
      setExtractedData({
        amount: ocr.amount || Number(amount) || 48500,
        date: ocr.date || incidentDate || new Date().toISOString().split('T')[0],
        transactionId: ocr.transactionId || 'TXN8923481092',
        bankName: ocr.bankName || 'State Bank of India',
        upiId: ocr.upiId || 'powerbill.desk@okaxis',
        beneficiaryAccount: ocr.beneficiaryAccount || 'XX4892 (Axis Bank)',
        paymentMode: ocr.paymentMode || paymentMode,
      });
      setUploadingStatus('idle');
    } else {
      setUploadingStatus('idle');
      setFormError(res.error || 'Failed to process evidence file.');
    }
  };

  // One-Click Judge Sample OCR Handlers
  const handleAddSampleEvidence = async (sampleType: 'gpay' | 'sms' | 'chat' = 'gpay') => {
    setFormError(null);
    setUploadingStatus('uploading');

    let fileName = 'gpay_receipt_48500.png';
    if (sampleType === 'sms') fileName = 'sbi_debit_sms_alert.png';
    if (sampleType === 'chat') fileName = 'whatsapp_extortion_chat.pdf';

    const sampleFile = new File(['sample receipt data'], fileName, {
      type: sampleType === 'chat' ? 'application/pdf' : 'image/png',
    });

    const res = await evidenceService.processFileUpload(sampleFile, (status) => {
      setUploadingStatus(status);
    });

    if (res.success && res.data) {
      const ocr = await aiService.extractTransactionFromImage(fileName, sampleType);
      setOcrConfidence(ocr.confidence);
      setEvidenceList((prev) => [...prev, res.data!]);
      if (ocr.amount) {
        setAmount(String(ocr.amount));
      }
      setExtractedData({
        amount: ocr.amount || Number(amount) || 48500,
        date: ocr.date || incidentDate || new Date().toISOString().split('T')[0],
        transactionId: ocr.transactionId || 'TXN8923481092',
        bankName: ocr.bankName || 'State Bank of India',
        upiId: ocr.upiId || 'powerbill.desk@okaxis',
        beneficiaryAccount: ocr.beneficiaryAccount || 'XX4892 (Axis Bank)',
        paymentMode: ocr.paymentMode || paymentMode,
      });
      setUploadingStatus('idle');
    }
  };

  const handleRemoveEvidence = (id: string) => {
    setEvidenceList((prev) => prev.filter((item) => item.id !== id));
    if (evidenceList.length <= 1) {
      setExtractedData(null);
      setExtractedConfirmed(false);
    }
  };

  const handleSubmitComplaint = async () => {
    setFormError(null);
    setIsSubmitting(true);

    const res = await complaintService.createComplaint({
      userId: user?.id,
      type: 'FINANCIAL_FRAUD',
      title: title.trim(),
      description: description.trim(),
      financialDetails: extractedData || {
        amount: Number(amount) || 0,
        date: incidentDate,
        transactionId: `TXN${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        bankName: 'State Bank of India',
        paymentMode,
      },
      evidence: evidenceList,
      incidentDetails: {
        incidentDate,
        platform: paymentMode,
      },
    });

    setIsSubmitting(false);

    if (res.success && res.data) {
      setCreatedComplaint(res.data);
      setCurrentStep(5);
    } else {
      setFormError(res.error || 'Failed to submit complaint.');
    }
  };

  return (
    <div className="w-full bg-[#F8F7F3] min-h-screen py-5 sm:py-12">
      <Container size="md" className="px-3.5 sm:px-6">
        {/* Top Breadcrumb & 1930 Notice */}
        <div className="mb-5 sm:mb-6 flex flex-wrap items-center justify-between gap-2.5">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5E6B73] hover:text-[#12304A]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('common.backToHome')}</span>
          </Link>

          <a
            href="tel:1930"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FDE8E8] text-[#8B2626] text-xs font-bold hover:bg-[#FCD8D8] transition-colors"
          >
            <PhoneCall className="w-3 h-3" />
            <span>{t('header.goldenHourHelpline')}</span>
          </a>
        </div>

        {/* Step Progression Bar */}
        {currentStep < 5 && (
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between text-[10.5px] sm:text-xs font-semibold text-[#5E6B73] mb-2">
              <span className={currentStep >= 1 ? 'text-[#12304A] font-bold' : ''}>{t('form.financial.step1')}</span>
              <span className={currentStep >= 2 ? 'text-[#12304A] font-bold' : ''}>{t('form.financial.step2')}</span>
              <span className={currentStep >= 3 ? 'text-[#12304A] font-bold' : ''}>{t('form.financial.step3')}</span>
              <span className={currentStep >= 4 ? 'text-[#12304A] font-bold' : ''}>{t('form.financial.step4')}</span>
            </div>
            <div className="w-full h-1.5 bg-[#E2E6E8] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#12304A] transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {formError && (
          <div className="mb-6 p-4 rounded-[8px] bg-[#FDF2F2] border border-[#F8D7DA] text-sm text-[#992E2E] flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* STEP 1: INCIDENT OVERVIEW & DETAILS */}
        {currentStep === 1 && (
          <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-4.5 sm:p-8 shadow-card">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <div className="text-[10.5px] sm:text-[11px] font-bold tracking-widest text-[#1D60A1] uppercase mb-1">
                  {t('form.financial.badge')}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#12304A] tracking-tight">
                  {t('form.financial.title')}
                </h1>
                <p className="mt-1.5 text-xs sm:text-sm text-[#5E6B73]">
                  {t('form.financial.subtitle')}
                </p>
              </div>

              <AutoFillDemoButton onAutoFill={handleAutoFill} className="w-full sm:w-auto" />
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-[#1C252C]">
                      {t('form.financial.amountLabel')} <span className="text-[#8B2626]">*</span>
                    </label>
                    {aiDraftedFields.amount && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 border border-emerald-300 text-emerald-800 font-semibold inline-flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                        <span>AI Drafted</span>
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-2.5 w-4 h-4 text-[#5E6B73]" />
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                        setAiDraftedFields((prev) => ({ ...prev, amount: false }));
                        if (e.target.value) {
                          setFieldErrors((prev) => ({ ...prev, amount: undefined }));
                        }
                      }}
                      placeholder="e.g. 48500"
                      className={`w-full pl-9 pr-3 py-2 text-sm bg-[#FBFBFA] border rounded-md focus:bg-white focus:border-[#12304A] focus:outline-none transition-colors ${
                        fieldErrors.amount
                          ? 'border-[#B33A3A] bg-rose-50/20'
                          : aiDraftedFields.amount
                          ? 'border-emerald-400 bg-emerald-50/30'
                          : 'border-[#DDE2E4]'
                      }`}
                      required
                    />
                  </div>
                  {fieldErrors.amount && (
                    <p className="mt-1 text-xs text-[#B33A3A] font-semibold">{fieldErrors.amount}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-[#1C252C]">
                      {t('form.financial.dateLabel')} <span className="text-[#8B2626]">*</span>
                    </label>
                    {aiDraftedFields.date && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 border border-emerald-300 text-emerald-800 font-semibold inline-flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                        <span>AI Drafted</span>
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-[#5E6B73]" />
                    <input
                      type="date"
                      value={incidentDate}
                      onChange={(e) => {
                        setIncidentDate(e.target.value);
                        setAiDraftedFields((prev) => ({ ...prev, date: false }));
                        if (e.target.value) {
                          setFieldErrors((prev) => ({ ...prev, incidentDate: undefined }));
                        }
                      }}
                      className={`w-full pl-9 pr-3 py-2 text-sm bg-[#FBFBFA] border rounded-md focus:bg-white focus:border-[#12304A] focus:outline-none transition-colors ${
                        fieldErrors.incidentDate
                          ? 'border-[#B33A3A] bg-rose-50/20'
                          : aiDraftedFields.date
                          ? 'border-emerald-400 bg-emerald-50/30'
                          : 'border-[#DDE2E4]'
                      }`}
                      required
                    />
                  </div>
                  {fieldErrors.incidentDate && (
                    <p className="mt-1 text-xs text-[#B33A3A] font-semibold">{fieldErrors.incidentDate}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#1C252C]">
                    {t('form.financial.paymentMethod')}
                  </label>
                  {aiDraftedFields.paymentMode && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 border border-emerald-300 text-emerald-800 font-semibold inline-flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                      <span>AI Detected</span>
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                  {[
                    { key: 'UPI', label: 'UPI (GPay / PhonePe)' },
                    { key: 'NET_BANKING', label: 'Net Banking' },
                    { key: 'DEBIT_CARD', label: 'Debit Card' },
                    { key: 'CREDIT_CARD', label: 'Credit Card' },
                    { key: 'WALLET', label: 'Wallet / Others' },
                  ].map((mode) => (
                    <button
                      key={mode.key}
                      type="button"
                      onClick={() => {
                        setPaymentMode(mode.key as any);
                        setAiDraftedFields((prev) => ({ ...prev, paymentMode: false }));
                      }}
                      className={`py-2 px-3 rounded border text-center font-medium transition-colors ${
                        paymentMode === mode.key
                          ? 'bg-[#12304A] text-white border-[#12304A] font-bold'
                          : 'bg-[#FBFBFA] text-[#1C252C] border-[#DDE2E4] hover:bg-[#F3F6F8]'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#1C252C]">
                    {t('form.financial.titleLabel')} <span className="text-[#8B2626]">*</span>
                  </label>
                  {aiDraftedFields.title && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 border border-emerald-300 text-emerald-800 font-semibold inline-flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                      <span>AI Generated Title</span>
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setAiDraftedFields((prev) => ({ ...prev, title: false }));
                    if (e.target.value.trim()) {
                      setFieldErrors((prev) => ({ ...prev, title: undefined }));
                    }
                  }}
                  placeholder={t('form.financial.titlePlaceholder')}
                  className={`w-full px-3 py-2 text-sm bg-[#FBFBFA] border rounded-md focus:bg-white focus:border-[#12304A] focus:outline-none transition-colors ${
                    fieldErrors.title
                      ? 'border-[#B33A3A] bg-rose-50/20'
                      : aiDraftedFields.title
                      ? 'border-emerald-400 bg-emerald-50/30'
                      : 'border-[#DDE2E4]'
                  }`}
                  required
                />
                {fieldErrors.title && (
                  <p className="mt-1 text-xs text-[#B33A3A] font-semibold">{fieldErrors.title}</p>
                )}
              </div>

              <div>
                <MultilingualVoiceTextarea
                  id="fraud-description"
                  label={
                    <>
                      {t('form.financial.narrativeLabel')} <span className="text-[#8B2626]">*</span>
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
                  onAutoDraft={handleAiAutoDraft}
                  placeholder={t('form.financial.narrativePlaceholder')}
                  required
                />
                {fieldErrors.description && (
                  <p className="mt-1 text-xs text-[#B33A3A] font-semibold">{fieldErrors.description}</p>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#DDE2E4] flex justify-end">
              <button
                type="button"
                disabled={!amount || !title.trim() || !description.trim()}
                onClick={() => {
                  const errors: typeof fieldErrors = {};
                  if (!amount || Number(amount) <= 0) {
                    errors.amount = 'Valid estimated loss amount (₹) is required.';
                  }
                  if (!incidentDate) {
                    errors.incidentDate = 'Date of incident is required.';
                  }
                  if (!title.trim()) {
                    errors.title = 'Incident title is required.';
                  }
                  if (!description.trim()) {
                    errors.description = 'Narrative explanation is required.';
                  }

                  if (Object.keys(errors).length > 0) {
                    setFieldErrors(errors);
                    setFormError('Please complete all required fields (*)');
                    return;
                  }
                  setFieldErrors({});
                  setFormError(null);
                  setCurrentStep(2);
                }}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-[#12304A] text-white text-sm font-semibold hover:bg-[#0B2235] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span>{t('form.financial.continueToEvidence')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: EVIDENCE UPLOAD & OCR EXTRACTION SIMULATION */}
        {currentStep === 2 && (
          <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-4.5 sm:p-8 shadow-card">
            <div className="mb-6">
              <div className="text-[10.5px] sm:text-[11px] font-bold tracking-widest text-[#1D60A1] uppercase mb-1">
                STEP 2 OF 4 &bull; MULTIMODAL VISION OCR
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#12304A] tracking-tight">
                {t('form.financial.uploadTitle')}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#5E6B73]">
                {t('form.financial.uploadSubtitle')}
              </p>
            </div>

            {/* Drag and Drop Zone */}
            <div className="w-full border-2 border-dashed border-[#CCD3D6] hover:border-[#12304A] rounded-[10px] p-5 sm:p-8 text-center bg-[#FBFBFA] transition-colors">
              <input
                type="file"
                id="evidence-file-input"
                onChange={handleFileUpload}
                accept="image/*,application/pdf"
                className="hidden"
              />
              <label
                htmlFor="evidence-file-input"
                className="cursor-pointer flex flex-col items-center justify-center w-full"
              >
                <div className="w-12 h-12 rounded-full bg-[#EDF3F7] text-[#12304A] flex items-center justify-center mb-3">
                  <UploadCloud className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div className="text-sm font-bold text-[#12304A]">
                  Click to select or drag & drop files
                </div>
                <div className="mt-1 text-xs text-[#5E6B73]">
                  Supports PNG, JPG, PDF up to 10 MB (Auto-OCR enabled)
                </div>
              </label>

              {/* One-Click Judge Sample OCR Buttons */}
              <div className="mt-5 pt-4 border-t border-[#E2E6E8]">
                <div className="text-[11px] font-bold text-[#12304A] uppercase tracking-wider mb-2">
                  ✨ Instant Judge OCR Test Samples:
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddSampleEvidence('gpay')}
                    className="w-full sm:w-auto min-h-[38px] flex items-center justify-center text-xs font-semibold px-3 py-1.5 rounded-md bg-[#EDF3F7] text-[#12304A] border border-[#CCDCE8] hover:bg-[#DDE7F0] transition-colors"
                  >
                    📄 Sample: GPay Screenshot ₹48,500
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddSampleEvidence('sms')}
                    className="w-full sm:w-auto min-h-[38px] flex items-center justify-center text-xs font-semibold px-3 py-1.5 rounded-md bg-[#EDF3F7] text-[#12304A] border border-[#CCDCE8] hover:bg-[#DDE7F0] transition-colors"
                  >
                    📄 Sample: Bank SMS ₹15,000
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddSampleEvidence('chat')}
                    className="w-full sm:w-auto min-h-[38px] flex items-center justify-center text-xs font-semibold px-3 py-1.5 rounded-md bg-[#EDF3F7] text-[#12304A] border border-[#CCDCE8] hover:bg-[#DDE7F0] transition-colors"
                  >
                    📄 Sample: WhatsApp Extortion Chat
                  </button>
                </div>
              </div>
            </div>

            {/* Uploading / Processing Animation */}
            {uploadingStatus !== 'idle' && (
              <div className="mt-6 p-4 rounded-[8px] bg-[#EDF3F7] border border-[#CCDCE8] flex items-center gap-3 animate-pulse">
                <Loader2 className="w-5 h-5 text-[#12304A] animate-spin shrink-0" />
                <div className="text-xs text-[#12304A]">
                  {uploadingStatus === 'uploading'
                    ? 'Uploading evidence file securely...'
                    : 'Extracting transaction details, reference IDs, and bank metadata...'}
                </div>
              </div>
            )}

            {/* Attached Evidence List */}
            {evidenceList.length > 0 && (
              <div className="mt-6 space-y-2.5">
                <h3 className="text-xs font-bold text-[#1C252C] uppercase tracking-wider">
                  Attached Files ({evidenceList.length})
                </h3>
                {evidenceList.map((ev) => (
                  <div
                    key={ev.id}
                    className="flex items-center justify-between p-3.5 bg-[#F8F9FA] rounded-[8px] border border-[#DDE2E4]"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-[#12304A] shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-[#1C252C]">{ev.fileName}</div>
                        <div className="text-[11px] text-[#5E6B73]">{ev.fileSize} &bull; {ev.status}</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveEvidence(ev.id)}
                      className="p-1 text-[#5E6B73] hover:text-[#992E2E]"
                      title="Remove file"
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
                onClick={() => setCurrentStep(1)}
                className="w-full sm:w-auto min-h-[44px] flex items-center justify-center px-4 py-2 rounded-md border border-[#DDE2E4] text-xs font-semibold text-[#5E6B73] hover:bg-[#F8F7F3]"
              >
                {t('common.back')}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (evidenceList.length === 0) {
                    handleAddSampleEvidence().then(() => setCurrentStep(3));
                  } else {
                    setCurrentStep(3);
                  }
                }}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-[#12304A] text-white text-sm font-semibold hover:bg-[#0B2235] transition-colors"
              >
                <span>{t('form.financial.reviewExtractedTitle')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CITIZEN REVIEW OF EXTRACTED INFORMATION (OCR) */}
        {currentStep === 3 && (
          <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-4.5 sm:p-8 shadow-card">
            <div className="mb-6">
              <div className="text-[10.5px] sm:text-[11px] font-bold tracking-widest text-[#1D60A1] uppercase mb-1">
                AI ASSISTS. CITIZEN CONFIRMS.
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#12304A] tracking-tight">
                {t('form.financial.reviewExtractedTitle')}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#5E6B73]">
                {t('form.financial.reviewExtractedSubtitle')}
              </p>
            </div>

            {/* Extracted Details Card */}
            <div className="bg-[#F8F9FA] rounded-[10px] border border-[#DDE2E4] p-4 sm:p-6 mb-6">
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#E2E6E8] mb-4 gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <ShieldCheck className="w-5 h-5 text-[#237A57] shrink-0" />
                  <span className="text-xs font-bold text-[#12304A] uppercase tracking-wider">
                    Extracted Transaction Record
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold">
                    {(ocrConfidence * 100).toFixed(0)}% Vision OCR Confidence
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingExtracted(!isEditingExtracted)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#12304A] hover:underline"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>{isEditingExtracted ? 'Done Editing' : 'Edit Details'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 text-xs">
                <div>
                  <span className="text-[#5E6B73] block mb-1">Debited Amount</span>
                  {isEditingExtracted ? (
                    <input
                      type="number"
                      value={extractedData?.amount || amount}
                      onChange={(e) =>
                        setExtractedData((prev) => ({
                          ...prev!,
                          amount: Number(e.target.value),
                        }))
                      }
                      className="w-full px-2.5 py-1.5 bg-white border border-[#DDE2E4] rounded font-bold text-sm"
                    />
                  ) : (
                    <strong className="text-sm text-[#12304A]">
                      ₹{(extractedData?.amount || Number(amount)).toLocaleString('en-IN')}
                    </strong>
                  )}
                </div>

                <div>
                  <span className="text-[#5E6B73] block mb-1">Transaction Ref / UTR</span>
                  {isEditingExtracted ? (
                    <input
                      type="text"
                      value={extractedData?.transactionId || 'TXN8923481092'}
                      onChange={(e) =>
                        setExtractedData((prev) => ({
                          ...prev!,
                          transactionId: e.target.value,
                        }))
                      }
                      className="w-full px-2.5 py-1.5 bg-white border border-[#DDE2E4] rounded font-mono text-xs"
                    />
                  ) : (
                    <strong className="text-xs font-mono text-[#1C252C] break-all">
                      {extractedData?.transactionId || 'TXN8923481092'}
                    </strong>
                  )}
                </div>

                <div>
                  <span className="text-[#5E6B73] block mb-1">Debited Bank</span>
                  {isEditingExtracted ? (
                    <input
                      type="text"
                      value={extractedData?.bankName || 'State Bank of India'}
                      onChange={(e) =>
                        setExtractedData((prev) => ({
                          ...prev!,
                          bankName: e.target.value,
                        }))
                      }
                      className="w-full px-2.5 py-1.5 bg-white border border-[#DDE2E4] rounded text-xs"
                    />
                  ) : (
                    <span className="font-semibold text-[#1C252C]">
                      {extractedData?.bankName || 'State Bank of India'}
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-[#5E6B73] block mb-1">Beneficiary Suspect UPI VPA</span>
                  {isEditingExtracted ? (
                    <input
                      type="text"
                      value={extractedData?.upiId || 'powerbill.desk@okaxis'}
                      onChange={(e) =>
                        setExtractedData((prev) => ({
                          ...prev!,
                          upiId: e.target.value,
                        }))
                      }
                      className="w-full px-2.5 py-1.5 bg-white border border-[#DDE2E4] rounded text-xs font-mono"
                    />
                  ) : (
                    <span className="font-mono text-xs text-[#992E2E] bg-rose-50 px-2 py-0.5 rounded border border-rose-200 break-all inline-block">
                      {extractedData?.upiId || 'powerbill.desk@okaxis'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Citizen Confirmation Checkbox */}
            <label className="flex items-start gap-2.5 p-3 rounded-md bg-[#EDF3F7] cursor-pointer">
              <input
                type="checkbox"
                checked={extractedConfirmed}
                onChange={(e) => setExtractedConfirmed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#12304A] focus:ring-[#12304A] shrink-0"
              />
              <span className="text-xs text-[#12304A] font-medium leading-relaxed">
                {t('form.financial.confirmCheckbox')}
              </span>
            </label>

            <div className="mt-8 pt-6 border-t border-[#DDE2E4] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="w-full sm:w-auto min-h-[44px] flex items-center justify-center px-4 py-2 rounded-md border border-[#DDE2E4] text-xs font-semibold text-[#5E6B73] hover:bg-[#F8F7F3]"
              >
                {t('common.back')}
              </button>

              <button
                type="button"
                disabled={!extractedConfirmed}
                onClick={() => setCurrentStep(4)}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-[#12304A] text-white text-sm font-semibold hover:bg-[#0B2235] transition-colors disabled:opacity-50"
              >
                <span>{t('form.financial.proceedFinal')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: FINAL REVIEW & OFFICIAL SUBMISSION */}
        {currentStep === 4 && (
          <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-4.5 sm:p-8 shadow-card">
            <div className="mb-6">
              <div className="text-[10.5px] sm:text-[11px] font-bold tracking-widest text-[#1D60A1] uppercase mb-1">
                STEP 4 OF 4
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#12304A] tracking-tight">
                {t('form.financial.finalReviewTitle')}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#5E6B73]">
                {t('form.financial.finalReviewSubtitle')}
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-md bg-[#FBFBFA] border border-[#DDE2E4]">
                <div className="text-xs font-bold text-[#12304A] uppercase tracking-wider mb-2">
                  Incident Overview
                </div>
                <div className="space-y-1 text-[#1C252C]">
                  <div><strong>Title:</strong> {title}</div>
                  <div><strong>Description:</strong> {description}</div>
                  <div><strong>Incident Date:</strong> {incidentDate}</div>
                </div>
              </div>

              <div className="p-4 rounded-md bg-[#FBFBFA] border border-[#DDE2E4]">
                <div className="text-xs font-bold text-[#12304A] uppercase tracking-wider mb-2">
                  Financial Loss Summary
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#1C252C]">
                  <div><strong>Loss Amount:</strong> ₹{(extractedData?.amount || Number(amount)).toLocaleString('en-IN')}</div>
                  <div><strong>Transaction ID:</strong> {extractedData?.transactionId || 'TXN8923481092'}</div>
                  <div><strong>Bank:</strong> {extractedData?.bankName || 'State Bank of India'}</div>
                  <div><strong>Beneficiary UPI:</strong> {extractedData?.upiId || 'powerbill.desk@okaxis'}</div>
                </div>
              </div>

              <div className="p-4 rounded-md bg-[#FBFBFA] border border-[#DDE2E4]">
                <div className="text-xs font-bold text-[#12304A] uppercase tracking-wider mb-2">
                  Evidence Files Attached ({evidenceList.length})
                </div>
                <ul className="list-disc list-inside text-[#5E6B73]">
                  {evidenceList.map((e) => (
                    <li key={e.id}>{e.fileName} ({e.fileSize})</li>
                  ))}
                </ul>
              </div>
            </div>

            {!user && (
              <div className="mt-5 p-3.5 rounded-md bg-[#EDF3F7] text-xs text-[#12304A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span>You are currently not logged in. An acknowledgement token will be provided for tracking.</span>
                <button
                  type="button"
                  onClick={openLoginModal}
                  className="font-bold underline shrink-0"
                >
                  Log in to link complaint
                </button>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-[#DDE2E4] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="w-full sm:w-auto min-h-[44px] flex items-center justify-center px-4 py-2 rounded-md border border-[#DDE2E4] text-xs font-semibold text-[#5E6B73] hover:bg-[#F8F7F3]"
              >
                {t('common.back')}
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmitComplaint}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#12304A] text-white text-sm font-bold hover:bg-[#0B2235] transition-colors disabled:opacity-50 shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t('form.financial.submitting')}</span>
                  </>
                ) : (
                  <>
                    <span>{t('form.financial.submitBtn')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: SUBMISSION CONFIRMATION & CASE ID ROUTING */}
        {currentStep === 5 && createdComplaint && (
          <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-5 sm:p-10 shadow-card text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#E6F4EA] text-[#237A57] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-badge bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-3">
              {t('form.financial.successTitle')}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#12304A] tracking-tight">
              {createdComplaint.complaintNumber}
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-[#5E6B73] max-w-md leading-relaxed">
              Your financial fraud complaint has been dispatched to <strong>{createdComplaint.assignedTeam.policeStation}</strong> and the 1930 inter-bank freeze protocol has been triggered.
            </p>

            <div className="w-full max-w-md bg-[#FBFBFA] border border-[#DDE2E4] rounded-md p-4 my-6 text-left text-xs space-y-1.5">
              <div><strong>Status:</strong> {createdComplaint.statusDisplay}</div>
              <div><strong>Assigned Cell:</strong> {createdComplaint.assignedTeam.name}</div>
              <div><strong>Reporting Amount:</strong> ₹{createdComplaint.financialDetails?.amount.toLocaleString('en-IN')}</div>
              <div><strong>Next Step:</strong> Reviewing bank logs & intermediary payment switches.</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                to={`/track?number=${createdComplaint.complaintNumber}`}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-[#12304A] text-white text-sm font-bold hover:bg-[#0B2235] transition-colors"
              >
                <span>{t('form.financial.trackBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/"
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center px-4 py-2.5 rounded-md border border-[#DDE2E4] text-sm font-semibold text-[#5E6B73] hover:bg-[#F8F7F3]"
              >
                {t('common.backToHome')}
              </Link>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
