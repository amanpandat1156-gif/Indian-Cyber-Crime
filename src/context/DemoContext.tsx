/**
 * NCRP / I4C Hackathon Demo Engine Context
 * Enables Instant Judge Personas, Scenario Auto-Fillers, and Seamless Mock Backend Interactions
 */

import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { mockDb } from '../services/mockDb';

export interface DemoPersona {
  id: string;
  name: string;
  role: string;
  badge: string;
  subtitle: string;
  complaintNumber?: string;
  statusBadge: string;
}

export const DEMO_PERSONAS: DemoPersona[] = [
  {
    id: 'usr_priya_01',
    name: 'Priya Sharma',
    role: 'Victim - Electricity Bill UPI Scam',
    badge: 'Active Case (Action Required)',
    subtitle: 'Pre-fills active pending complaint: NCRP-2026-849201',
    complaintNumber: 'NCRP-2026-849201',
    statusBadge: 'Action Required: Bank Chargeback Form Requested',
  },
  {
    id: 'usr_rahul_02',
    name: 'Rahul Verma',
    role: 'Victim - Instagram Impersonation / Blackmail',
    badge: 'Resolved Case',
    subtitle: 'Pre-fills resolved complaint: NCRP-2026-410293',
    complaintNumber: 'NCRP-2026-410293',
    statusBadge: 'Account Takedown Requested to Meta',
  },
  {
    id: 'usr_new_03',
    name: 'New Citizen',
    role: 'Fresh Session',
    badge: 'Clean State',
    subtitle: 'Clean zero-complaint session to test submission from scratch',
    statusBadge: 'Fresh Intake',
  },
];

export const DEMO_SCENARIOS = {
  financialFraud: {
    amount: '48500',
    incidentDate: '2026-08-23',
    bankName: 'State Bank of India',
    paymentMode: 'UPI' as const,
    title: 'Unauthorized UPI transfer via fake electricity bill QR scan',
    description: 'Received an urgent SMS claiming my home power connection would be cut off at 9:30 PM. The caller directed me to scan an update QR code on WhatsApp, which automatically debited ₹48,500 from my SBI account to suspect VPA powerbill.desk@okaxis.',
    suspectVpa: 'powerbill.desk@okaxis',
    suspectPhone: '9876500000',
    transactionId: 'TXN8923481092',
  },
  harassment: {
    platform: 'Instagram / WhatsApp',
    title: 'Blackmail messages & impersonation from unknown caller',
    description: 'An unknown perpetrator created a duplicate Instagram profile with my personal photos and sent threatening messages to my family and friends demanding money. They are calling repeatedly from a virtual VOIP number.',
    suspectDetails: 'Phone: +91-9870001122, Instagram Handle: @fake_profile_victim',
  },
  hacked: {
    accountType: 'Instagram & WhatsApp',
    title: 'WhatsApp account takeover via malicious SMS OTP link',
    description:
      'Received a fake verification SMS appearing to be from support, clicked the phishing link, and entered the OTP. Lost access within 10 minutes.',
    compromiseDetails:
      'Attacker is currently messaging my family contacts requesting emergency UPI transfers of ₹5,000.',
  },
  anonymous: {
    category: 'Cyber Terrorism / Extremism Material',
    title: 'Telegram network distributing unauthorized APK malware and credential sniffers',
    description: 'Found an open Telegram channel (t.me/fake_banking_apk_tools) distributing repackaged Indian banking APKs that intercept SMS OTPs and exfiltrate credentials to server 194.26.29.110.',
  },
  suspectCheck: {
    mobile: '9876500000',
    upi: 'scam.deal@okaxis',
    website: 'fake-electricity-bill.in',
  },
};

interface DemoContextType {
  personas: DemoPersona[];
  switchToPersona: (personaId: string, autoNavigateToTrack?: boolean) => Promise<void>;
  resetDatabase: () => Promise<void>;
  scenarios: typeof DEMO_SCENARIOS;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { switchAccount, refreshUser } = useAuth();
  const navigate = useNavigate();

  const switchToPersona = async (personaId: string, autoNavigateToTrack = false) => {
    await switchAccount(personaId);
    const persona = DEMO_PERSONAS.find((p) => p.id === personaId);

    if (autoNavigateToTrack && persona?.complaintNumber) {
      navigate(`/track?number=${persona.complaintNumber}`);
    } else if (personaId === 'usr_new_03') {
      navigate('/');
    }
  };

  const resetDatabase = async () => {
    mockDb.resetDatabase();
    await refreshUser();
    window.location.reload();
  };

  return (
    <DemoContext.Provider
      value={{
        personas: DEMO_PERSONAS,
        switchToPersona,
        resetDatabase,
        scenarios: DEMO_SCENARIOS,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
