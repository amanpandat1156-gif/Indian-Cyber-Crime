import React, { useState } from 'react';
import { X, Shield, Phone, ArrowRight, CheckCircle2, User, KeyRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, sendOtp, verifyOtp, switchAccount, testAccounts } = useAuth();
  const [step, setStep] = useState<'INPUT' | 'OTP'>('INPUT');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isLoginModalOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneOrEmail.trim()) {
      setError('Please enter your mobile number or email address.');
      return;
    }
    setError(null);
    setLoading(true);
    const res = await sendOtp(phoneOrEmail);
    setLoading(false);
    if (res.success) {
      setStep('OTP');
      setOtp('123456'); // Pre-fill test OTP for seamless testing
    } else {
      setError(res.error || 'Failed to send OTP.');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError('Please enter the 6-digit OTP.');
      return;
    }
    setError(null);
    setLoading(true);
    const res = await verifyOtp(phoneOrEmail, otp);
    setLoading(false);
    if (!res.success) {
      setError(res.error || 'Invalid OTP.');
    } else {
      setStep('INPUT');
      setPhoneOrEmail('');
      setOtp('');
    }
  };

  const handleQuickAccountSelect = async (userId: string) => {
    setLoading(true);
    await switchAccount(userId);
    setLoading(false);
    closeLoginModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-[10px] border border-[#DDE2E4] shadow-2xl p-5 sm:p-8 overflow-y-auto max-h-[90vh] mx-2 sm:mx-0">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeLoginModal}
          className="absolute top-4 right-4 p-1.5 rounded text-[#5E6B73] hover:text-[#12304A] hover:bg-[#F0F4F8] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-[8px] bg-[#12304A] text-white flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#12304A]">
              Citizen Portal Access
            </h2>
            <p className="text-xs text-[#5E6B73]">
              Ministry of Home Affairs &bull; Government of India
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-md bg-[#FDF2F2] border border-[#F8D7DA] text-xs text-[#992E2E] flex items-center gap-2">
            <span>{error}</span>
          </div>
        )}

        {step === 'INPUT' ? (
          <div>
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1C252C] mb-1.5">
                  Mobile Number or Email Address
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 w-4 h-4 text-[#5E6B73]" />
                  <input
                    type="text"
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    placeholder="e.g. 9812345678 or citizen@example.in"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-[#FBFBFA] border border-[#DDE2E4] rounded-md focus:bg-white focus:border-[#12304A] focus:outline-none"
                    autoFocus
                  />
                </div>
                <p className="mt-1 text-[11px] text-[#5E6B73]">
                  A 6-digit OTP will be sent to verify your identity.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-md bg-[#12304A] text-white text-sm font-semibold hover:bg-[#0B2235] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Sending OTP...' : 'Get Verification OTP'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Test Accounts for Development / Testing */}
            <div className="mt-6 pt-5 border-t border-[#DDE2E4]">
              <div className="text-[11px] font-bold text-[#5E6B73] uppercase tracking-wider mb-2.5 flex items-center justify-between">
                <span>Select Demo Test Account:</span>
                <span className="text-[10px] font-normal text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  Instant Switch
                </span>
              </div>

              <div className="space-y-1.5">
                {testAccounts.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleQuickAccountSelect(acc.id)}
                    className="w-full flex items-center justify-between p-2 rounded-md hover:bg-[#EDF3F7] text-left text-xs border border-transparent hover:border-[#12304A]/20 transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#5E6B73] group-hover:text-[#12304A]" />
                      <span className="font-semibold text-[#1C252C]">{acc.name}</span>
                      <span className="text-[10.5px] text-[#5E6B73]">
                        ({acc.accountType === 'active_complaint' ? 'Active Case' : acc.accountType === 'resolved' ? 'Resolved Case' : acc.accountType === 'multiple' ? '3 Cases' : 'New Citizen'})
                      </span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-[#5E6B73] group-hover:text-[#12304A]" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="p-3 bg-[#EDF3F7] rounded-md text-xs text-[#12304A] flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#237A57]" />
              <div>
                <span>OTP sent to <strong>{phoneOrEmail}</strong></span>
                <div className="mt-1 text-[11px] font-medium text-emerald-800">
                  Development Mode: Use test OTP <strong>123456</strong>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1C252C] mb-1.5">
                Enter 6-Digit OTP
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-[#5E6B73]" />
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  className="w-full pl-9 pr-3 py-2 text-base tracking-widest font-mono text-center bg-[#FBFBFA] border border-[#DDE2E4] rounded-md focus:bg-white focus:border-[#12304A] focus:outline-none"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep('INPUT')}
                className="w-1/3 py-2 px-3 rounded-md border border-[#DDE2E4] text-xs font-medium text-[#5E6B73] hover:bg-[#F8F7F3]"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-2/3 py-2 px-4 rounded-md bg-[#12304A] text-white text-sm font-semibold hover:bg-[#0B2235] transition-colors disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify & Continue'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
