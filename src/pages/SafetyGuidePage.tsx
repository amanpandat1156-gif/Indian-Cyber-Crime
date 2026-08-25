import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Key, AlertTriangle } from 'lucide-react';
import { Container } from '../components/common/Container';

export const SafetyGuidePage: React.FC = () => {
  return (
    <div className="w-full bg-[#F8F7F3] min-h-screen py-8 sm:py-12">
      <Container size="md">
        <div className="mb-8">
          <div className="text-[11px] sm:text-[12px] font-bold tracking-widest text-[#1D60A1] uppercase mb-1.5">
            CYBER HYGIENE & PREVENTATIVE GUIDANCE
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#12304A] tracking-tight">
            Cyber Safety & Fraud Prevention Guide
          </h1>
          <p className="mt-2 text-sm text-[#5E6B73] leading-relaxed">
            Essential digital hygiene rules to safeguard your bank accounts, personal identity, and devices against modern social engineering techniques.
          </p>
        </div>

        {/* 4 Core Safety Pillars */}
        <div className="space-y-6">
          {/* 1. UPI & QR Code Rules */}
          <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-6 shadow-card">
            <div className="flex items-start gap-3.5 mb-3">
              <div className="w-10 h-10 rounded-[8px] bg-emerald-50 text-[#237A57] flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#12304A]">
                  1. The Golden Rule of UPI: PIN is Only for Sending Money
                </h2>
                <p className="text-xs text-[#5E6B73] mt-1">
                  You NEVER need to enter your UPI PIN or scan a QR code to receive money, cashback, lottery winnings, or OLX payments.
                </p>
              </div>
            </div>

            <ul className="text-xs text-[#1C252C] space-y-1.5 pl-13 list-disc">
              <li>Scanning a QR code always deducts money from your account.</li>
              <li>Scammers pose as buyers on OLX/Marketplaces and send "Collect Request" QR codes claiming advance tokens.</li>
              <li>Always check the beneficiary name before confirming any transfer.</li>
            </ul>
          </div>

          {/* 2. Electricity Bill & APK Traps */}
          <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-6 shadow-card">
            <div className="flex items-start gap-3.5 mb-3">
              <div className="w-10 h-10 rounded-[8px] bg-amber-50 text-[#B7791F] flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#12304A]">
                  2. Never Install APK Files or Remote Access Software
                </h2>
                <p className="text-xs text-[#5E6B73] mt-1">
                  Fraudsters send SMS claiming power disconnection or blocked bank accounts and instruct victims to install apps like QuickSupport, AnyDesk, or APK files via WhatsApp.
                </p>
              </div>
            </div>

            <ul className="text-xs text-[#1C252C] space-y-1.5 pl-13 list-disc">
              <li>Power utilities and banks never send mobile phone numbers for bill payments.</li>
              <li>Remote screen sharing apps allow attackers to view your screen, read OTPs, and control your device.</li>
              <li>Only download verified apps from official stores (Google Play or Apple App Store).</li>
            </ul>
          </div>

          {/* 3. Account 2FA & Password Hygiene */}
          <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-6 shadow-card">
            <div className="flex items-start gap-3.5 mb-3">
              <div className="w-10 h-10 rounded-[8px] bg-blue-50 text-[#1D60A1] flex items-center justify-center shrink-0">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#12304A]">
                  3. Two-Factor Authentication (2FA) on Email & Social Apps
                </h2>
                <p className="text-xs text-[#5E6B73] mt-1">
                  Passwords alone are not sufficient. Turn on app-based 2FA on WhatsApp, Google, and Instagram accounts.
                </p>
              </div>
            </div>

            <ul className="text-xs text-[#1C252C] space-y-1.5 pl-13 list-disc">
              <li>Set a 6-digit WhatsApp Two-Step Verification PIN.</li>
              <li>Never forward 6-digit SMS verification codes to anyone, even if they claim to be a friend in distress.</li>
              <li>Use unique passwords for banking and primary recovery email accounts.</li>
            </ul>
          </div>
        </div>

        {/* Emergency Helpline Bottom Banner */}
        <div className="mt-8 p-6 bg-[#0B2235] text-white rounded-[10px] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-[#D8891C] uppercase tracking-wider">
              FACING CYBER FRAUD RIGHT NOW?
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Call 1930 immediately to freeze unauthorized debits
            </h3>
          </div>
          <Link
            to="/report/financial"
            className="px-5 py-2.5 rounded-md bg-[#8B2626] text-white text-xs font-bold hover:bg-[#731F1F] shrink-0"
          >
            File Financial Fraud Report &rarr;
          </Link>
        </div>
      </Container>
    </div>
  );
};
