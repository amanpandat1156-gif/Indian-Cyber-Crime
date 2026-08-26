/**
 * NCRP / I4C Mock Database Layer with LocalStorage Persistence
 */

import {
  User,
  Complaint,
  ComplaintStatus,
  VerificationResult,
  Notification,
  VolunteerApplication,
  CyberPoliceStation,
  NodalBankOfficer,
  OfficialContact,
} from '../types';

export const getStatusMeta = (status: ComplaintStatus) => {
  switch (status) {
    case 'SUBMITTED':
      return {
        display: "We've received your complaint",
        description: 'Your complaint is recorded and being routed to the designated cyber cell.',
      };
    case 'UNDER_REVIEW':
      return {
        display: "We're reviewing your complaint",
        description: 'Investigating officers and bank nodal teams are examining the submitted transaction details and evidence.',
      };
    case 'ACTION_REQUIRED':
      return {
        display: 'Action required from you',
        description: 'Additional documentation or clarification is needed to proceed with your complaint.',
      };
    case 'ADDITIONAL_EVIDENCE_REQUESTED':
      return {
        display: 'Additional evidence requested',
        description: 'Please upload supporting chat logs or detailed bank statements.',
      };
    case 'RESOLVED':
      return {
        display: 'Complaint resolved',
        description: 'Action completed by bank/law enforcement. Unauthorized funds frozen or account secured.',
      };
    case 'CLOSED':
      return {
        display: 'Complaint closed',
        description: 'Investigation concluded.',
      };
  }
};

export const MOCK_USERS: User[] = [
  {
    id: 'usr_priya_01',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.in',
    phone: '9812345678',
    accountType: 'active_complaint',
    createdAt: '2026-08-01T10:00:00Z',
  },
  {
    id: 'usr_rahul_02',
    name: 'Rahul Verma',
    email: 'rahul.verma@example.in',
    phone: '9876543210',
    accountType: 'resolved',
    createdAt: '2026-07-15T14:30:00Z',
  },
  {
    id: 'usr_new_03',
    name: 'Citizen User',
    email: 'citizen@example.in',
    phone: '9800000000',
    accountType: 'new',
    createdAt: '2026-08-25T08:00:00Z',
  },
  {
    id: 'usr_multi_04',
    name: 'Ananya Patel',
    email: 'ananya.patel@example.in',
    phone: '9822334455',
    accountType: 'multiple',
    createdAt: '2026-05-20T11:00:00Z',
  },
];

export const DEMO_USER_ALIASES: Record<string, string> = {
  // Priya Sharma
  'priya': 'usr_priya_01',
  'priya-sharma': 'usr_priya_01',
  'priya_sharma': 'usr_priya_01',
  'usr_priya_01': 'usr_priya_01',
  'priya.sharma@example.in': 'usr_priya_01',
  '9812345678': 'usr_priya_01',

  // Rahul Verma
  'rahul': 'usr_rahul_02',
  'rahul-verma': 'usr_rahul_02',
  'rahul_verma': 'usr_rahul_02',
  'usr_rahul_02': 'usr_rahul_02',
  'rahul.verma@example.in': 'usr_rahul_02',
  '9876543210': 'usr_rahul_02',
  '9811122334': 'usr_rahul_02',

  // New Citizen / Citizen User
  'new': 'usr_new_03',
  'new-citizen': 'usr_new_03',
  'new_citizen': 'usr_new_03',
  'citizen': 'usr_new_03',
  'citizen-user': 'usr_new_03',
  'usr_new_03': 'usr_new_03',
  'citizen@example.in': 'usr_new_03',
  'new.citizen@example.in': 'usr_new_03',
  '9800000000': 'usr_new_03',
  '9900011222': 'usr_new_03',

  // Ananya Patel
  'ananya': 'usr_multi_04',
  'ananya-patel': 'usr_multi_04',
  'ananya_patel': 'usr_multi_04',
  'usr_multi_04': 'usr_multi_04',
  'ananya.patel@example.in': 'usr_multi_04',
  '9822334455': 'usr_multi_04',
  '9765432100': 'usr_multi_04',
};

export const INITIAL_COMPLAINTS: Complaint[] = [
  // PERSONA 1: PRIYA SHARMA - Active Financial Fraud with Action Required (NCRP-2026-849201)
  {
    id: 'cmp_849201',
    complaintNumber: 'NCRP-2026-849201',
    userId: 'usr_priya_01',
    type: 'FINANCIAL_FRAUD',
    title: 'Unauthorized UPI Transfer via Fake Electricity Bill QR',
    description: 'Received an urgent SMS claiming power disconnection at 9:30 PM. Scanned a QR code sent via WhatsApp which debited ₹48,500 from my SBI savings account to beneficiary VPA powerbill.desk@okaxis.',
    status: 'ACTION_REQUIRED',
    statusDisplay: 'Action Required: Bank Chargeback Form Requested',
    statusDescription: 'Investigating officer at IFSO Delhi requested stamped bank statement & chargeback form to initiate inter-bank lien placement.',
    createdAt: '2026-08-23T11:20:00Z',
    updatedAt: '2026-08-24T09:30:00Z',
    assignedTeam: {
      name: 'Special Cell Cyber Crime Unit (IFSO)',
      policeStation: 'Special Cell Cyber Crime Unit (IFSO)',
      district: 'South West Delhi',
      state: 'Delhi',
      officerName: 'DCP Hemant Tiwari',
      contactNumber: '011-28031130',
    },
    financialDetails: {
      amount: 48500,
      date: '2026-08-23',
      transactionId: 'TXN8923481092',
      bankName: 'State Bank of India',
      upiId: 'powerbill.desk@okaxis',
      beneficiaryAccount: 'XX4892 (Axis Bank)',
      paymentMode: 'UPI',
    },
    actionRequired: {
      id: 'act_stmt_01',
      title: 'Upload Bank Chargeback Form / August 2026 Statement',
      description: 'Please upload the bank chargeback dispute form or stamped PDF bank statement showing the unauthorized debit to enable inter-bank lien placement.',
      actionType: 'UPLOAD_STATEMENT',
      deadline: '2026-08-28',
      completed: false,
    },
    evidence: [
      {
        id: 'ev_01',
        complaintId: 'cmp_849201',
        fileName: 'sms_disconnection_threat.jpg',
        fileType: 'image/jpeg',
        fileSize: '1.2 MB',
        uploadedAt: '2026-08-23T11:25:00Z',
        status: 'processed',
      },
      {
        id: 'ev_02',
        complaintId: 'cmp_849201',
        fileName: 'upi_debit_screenshot.png',
        fileType: 'image/png',
        fileSize: '2.4 MB',
        uploadedAt: '2026-08-23T11:28:00Z',
        status: 'processed',
        extractedData: {
          amount: 48500,
          date: '2026-08-23',
          transactionId: 'TXN8923481092',
          bankName: 'State Bank of India',
          upiId: 'powerbill.desk@okaxis',
          paymentMode: 'UPI',
        },
      },
    ],
    timeline: [
      {
        id: 'tl_01',
        date: '23 Aug 2026, 11:20 AM',
        title: 'Complaint Submitted Online',
        description: 'Citizen filed financial fraud complaint with ₹48,500 loss amount.',
        status: 'SUBMITTED',
        actor: 'citizen',
      },
      {
        id: 'tl_02',
        date: '23 Aug 2026, 11:35 AM',
        title: '1930 Automated Intermediary Alert Dispatched',
        description: 'Freeze alert dispatched to beneficiary bank (Axis Bank) and intermediary UPI switch.',
        status: 'UNDER_REVIEW',
        actor: 'system',
      },
      {
        id: 'tl_03',
        date: '24 Aug 2026, 09:30 AM',
        title: 'Bank Chargeback Form Requested',
        description: 'Investigating officer at IFSO Delhi requested verified bank chargeback form to initiate lien freeze.',
        status: 'ACTION_REQUIRED',
        actor: 'investigator',
      },
    ],
  },

  // PERSONA 2: RAHUL VERMA - Resolved Cyber Harassment / Blackmail (NCRP-2026-410293)
  {
    id: 'cmp_410293',
    complaintNumber: 'NCRP-2026-410293',
    userId: 'usr_rahul_02',
    type: 'CYBER_HARASSMENT',
    title: 'Instagram Impersonation, Defamation & Extortion',
    description: 'Imposter created duplicate social accounts using private photographs and sent ransom messages demanding cryptocurrency funds.',
    status: 'RESOLVED',
    statusDisplay: 'Account Takedown Requested to Meta',
    statusDescription: 'Section 79(3)(b) IT Act notice issued to Meta Platforms. Fake profile deactivated and suspect IP logs preserved.',
    createdAt: '2026-07-10T15:00:00Z',
    updatedAt: '2026-07-18T16:45:00Z',
    assignedTeam: {
      name: 'BKC Cyber Crime Police Station',
      policeStation: 'BKC Cyber Police',
      district: 'Mumbai Suburban',
      state: 'Maharashtra',
      officerName: 'Senior Inspector Sunil Kulkarni',
      contactNumber: '022-26504000',
    },
    incidentDetails: {
      incidentDate: '2026-07-09',
      platform: 'Instagram / WhatsApp',
      suspectDetails: 'Phone +91-9870001122, Handle @fake_rahul_verma',
    },
    evidence: [
      {
        id: 'ev_11',
        complaintId: 'cmp_410293',
        fileName: 'chat_blackmail_transcripts.pdf',
        fileType: 'application/pdf',
        fileSize: '3.1 MB',
        uploadedAt: '2026-07-10T15:10:00Z',
        status: 'processed',
      },
      {
        id: 'ev_12',
        complaintId: 'cmp_410293',
        fileName: 'fake_profile_screenshot.png',
        fileType: 'image/png',
        fileSize: '1.9 MB',
        uploadedAt: '2026-07-10T15:12:00Z',
        status: 'processed',
      },
    ],
    timeline: [
      {
        id: 'tl_11',
        date: '10 Jul 2026, 03:00 PM',
        title: 'Complaint Registered',
        description: 'Cyber harassment and impersonation report logged under Section 66D IT Act.',
        status: 'SUBMITTED',
        actor: 'citizen',
      },
      {
        id: 'tl_12',
        date: '12 Jul 2026, 10:30 AM',
        title: 'Account Takedown Requested to Meta',
        description: 'Notice issued to intermediary platform for profile suspension and IP logs preservation.',
        status: 'UNDER_REVIEW',
        actor: 'investigator',
      },
      {
        id: 'tl_13',
        date: '18 Jul 2026, 04:45 PM',
        title: 'Account Deactivated & Case Resolved',
        description: 'Fake profile successfully taken down. Suspect IP geo-located and formal advisory served.',
        status: 'RESOLVED',
        actor: 'investigator',
      },
    ],
  },

  // CASE 3: ANONYMOUS REPORT TRACKING (NCRP-2026-103948)
  {
    id: 'cmp_103948',
    complaintNumber: 'NCRP-2026-103948',
    isAnonymous: true,
    type: 'ANONYMOUS_REPORT',
    title: '[Anonymous Tip] Malicious APK Phishing Network Distribution',
    description: 'Reported anonymous threat intel regarding bulk SMS gateway distributing trojanized power bill update APKs with C2 servers in Southeast Asia.',
    status: 'UNDER_REVIEW',
    statusDisplay: 'Threat Intelligence Analyzed & Monitored',
    statusDescription: 'Anonymous intake token verified. CERT-In and I4C technical threat cell analyzing C2 command servers.',
    createdAt: '2026-08-22T08:00:00Z',
    updatedAt: '2026-08-23T10:15:00Z',
    assignedTeam: {
      name: 'CERT-In Threat Analysis Cell',
      policeStation: 'CERT-In Incident Response Desk',
      district: 'New Delhi',
      state: 'Delhi',
      officerName: 'Director Cyber Threat Intelligence',
      contactNumber: '1800-11-4949',
    },
    evidence: [
      {
        id: 'ev_anon_1',
        complaintId: 'cmp_103948',
        fileName: 'c2_server_ip_logs.txt',
        fileType: 'text/plain',
        fileSize: '420 KB',
        uploadedAt: '2026-08-22T08:05:00Z',
        status: 'processed',
      },
    ],
    timeline: [
      {
        id: 'tl_an_1',
        date: '22 Aug 2026, 08:00 AM',
        title: 'Encrypted Anonymous Tip Submitted',
        description: 'Zero-knowledge intake token generated. Encrypted payload transmitted to national threat database.',
        status: 'SUBMITTED',
        actor: 'citizen',
      },
      {
        id: 'tl_an_2',
        date: '23 Aug 2026, 10:15 AM',
        title: 'CERT-In Threat Intelligence Dispatch',
        description: 'Malicious domain and command server blacklisting advisory initiated with major Indian telecom ISPs.',
        status: 'UNDER_REVIEW',
        actor: 'system',
      },
    ],
  },

  // Complaint for User C (Resolved Harassment Case)
  {
    id: 'cmp_119284',
    complaintNumber: 'NCRP-2026-119284',
    userId: 'usr_resolved_03',
    type: 'CYBER_HARASSMENT',
    title: 'Social Media Identity Theft and Extortion Threats',
    description: 'Imposter created duplicate social accounts using private photographs and sent ransom messages demanding funds.',
    status: 'RESOLVED',
    statusDisplay: getStatusMeta('RESOLVED').display,
    statusDescription: getStatusMeta('RESOLVED').description,
    createdAt: '2026-07-10T15:00:00Z',
    updatedAt: '2026-07-18T16:45:00Z',
    assignedTeam: {
      name: 'Cyber Crime Police Station, Bandra Kurla',
      policeStation: 'BKC Cyber Police',
      district: 'Mumbai Suburban',
      state: 'Maharashtra',
      officerName: 'Senior Inspector Sunil Kulkarni',
      contactNumber: '022-26504000',
    },
    incidentDetails: {
      incidentDate: '2026-07-09',
      platform: 'Instagram / WhatsApp',
      suspectDetails: 'Phone +91-9870001122, Handle @fake_vikram_singh',
    },
    evidence: [
      {
        id: 'ev_11',
        complaintId: 'cmp_119284',
        fileName: 'chat_blackmail_transcripts.pdf',
        fileType: 'application/pdf',
        fileSize: '3.1 MB',
        uploadedAt: '2026-07-10T15:10:00Z',
        status: 'processed',
      },
    ],
    timeline: [
      {
        id: 'tl_11',
        date: '10 Jul 2026, 03:00 PM',
        title: 'Complaint Registered',
        description: 'Cyber harassment and impersonation report logged under Section 66D IT Act.',
        status: 'SUBMITTED',
        actor: 'citizen',
      },
      {
        id: 'tl_12',
        date: '12 Jul 2026, 10:30 AM',
        title: 'Platform Takedown Notice Served',
        description: 'Notice issued to intermediary platform for profile suspension and IP logs preservation.',
        status: 'UNDER_REVIEW',
        actor: 'investigator',
      },
      {
        id: 'tl_13',
        date: '18 Jul 2026, 04:45 PM',
        title: 'Account Deactivated & Case Resolved',
        description: 'Fake profile successfully taken down. Suspect IP geo-located and formal advisory served.',
        status: 'RESOLVED',
        actor: 'investigator',
      },
    ],
  },

  // Multiple complaints for User D
  {
    id: 'cmp_902143',
    complaintNumber: 'NCRP-2026-902143',
    userId: 'usr_multi_04',
    type: 'HACKED_ACCOUNT',
    title: 'WhatsApp and Google Workspace Account Hijacking',
    description: 'Received phishing email claiming password expiry. Account access revoked and recovery email changed by unauthorized attacker.',
    status: 'UNDER_REVIEW',
    statusDisplay: getStatusMeta('UNDER_REVIEW').display,
    statusDescription: getStatusMeta('UNDER_REVIEW').description,
    createdAt: '2026-08-20T14:15:00Z',
    updatedAt: '2026-08-21T11:00:00Z',
    assignedTeam: {
      name: 'Cyber Crime Cell, Sector 20',
      policeStation: 'Cyber Crime Police Station, Gandhinagar',
      district: 'Gandhinagar',
      state: 'Gujarat',
      officerName: 'Inspector Hiren Dave',
    },
    evidence: [
      {
        id: 'ev_21',
        complaintId: 'cmp_902143',
        fileName: 'google_security_alert.png',
        fileType: 'image/png',
        fileSize: '840 KB',
        uploadedAt: '2026-08-20T14:20:00Z',
        status: 'processed',
      },
    ],
    timeline: [
      {
        id: 'tl_21',
        date: '20 Aug 2026, 02:15 PM',
        title: 'Incident Filed',
        description: 'Account hijacking reported with suspicious IP access details.',
        status: 'SUBMITTED',
        actor: 'citizen',
      },
      {
        id: 'tl_22',
        date: '21 Aug 2026, 11:00 AM',
        title: 'Session Revocation Advisory Issued',
        description: 'ISP and provider logs requested for session termination.',
        status: 'UNDER_REVIEW',
        actor: 'investigator',
      },
    ],
  },
  {
    id: 'cmp_382910',
    complaintNumber: 'NCRP-2026-382910',
    userId: 'usr_multi_04',
    type: 'FINANCIAL_FRAUD',
    title: 'Card Skimming at Unattended Fuel Station',
    description: 'Debit card cloned after paying at highway fuel pump. Multiple unauthorized ATM withdrawals of ₹25,000.',
    status: 'RESOLVED',
    statusDisplay: getStatusMeta('RESOLVED').display,
    statusDescription: getStatusMeta('RESOLVED').description,
    createdAt: '2026-06-04T12:00:00Z',
    updatedAt: '2026-06-25T17:30:00Z',
    assignedTeam: {
      name: 'Cyber Crime Branch, Ahmedabad',
      policeStation: 'Cyber Cell Police Station',
      district: 'Ahmedabad',
      state: 'Gujarat',
      officerName: 'DSP Neha Shah',
    },
    financialDetails: {
      amount: 25000,
      date: '2026-06-04',
      transactionId: 'ATM-WD-99128',
      bankName: 'HDFC Bank',
      paymentMode: 'DEBIT_CARD',
    },
    evidence: [],
    timeline: [
      {
        id: 'tl_31',
        date: '04 Jun 2026, 12:00 PM',
        title: 'Card Fraud Reported',
        description: 'Unauthorized ATM debit reported immediately after incident.',
        status: 'SUBMITTED',
        actor: 'citizen',
      },
      {
        id: 'tl_32',
        date: '25 Jun 2026, 05:30 PM',
        title: 'Bank Chargeback Credit Approved',
        description: 'Zero liability claim approved by bank. Full refund credited to account.',
        status: 'RESOLVED',
        actor: 'bank',
      },
    ],
  },
  {
    id: 'cmp_773192',
    complaintNumber: 'NCRP-2026-773192',
    userId: 'usr_multi_04',
    type: 'OTHER',
    title: 'Part-Time Job Telegram Investment Scam',
    description: 'Lured into Telegram group for daily task reviews. Invested ₹12,000 in fake trading portal with blocked withdrawals.',
    status: 'ADDITIONAL_EVIDENCE_REQUESTED',
    statusDisplay: getStatusMeta('ADDITIONAL_EVIDENCE_REQUESTED').display,
    statusDescription: getStatusMeta('ADDITIONAL_EVIDENCE_REQUESTED').description,
    createdAt: '2026-08-15T09:40:00Z',
    updatedAt: '2026-08-19T14:00:00Z',
    assignedTeam: {
      name: 'Cyber Crime Police Station',
      policeStation: 'Cyber Crime Unit, Sector 20',
      district: 'Gandhinagar',
      state: 'Gujarat',
      officerName: 'Inspector Hiren Dave',
    },
    evidence: [],
    timeline: [
      {
        id: 'tl_41',
        date: '15 Aug 2026, 09:40 AM',
        title: 'Job Scam Reported',
        description: 'Complaint submitted with telegram group handles.',
        status: 'SUBMITTED',
        actor: 'citizen',
      },
      {
        id: 'tl_42',
        date: '19 Aug 2026, 02:00 PM',
        title: 'Telegram Channel Links Requested',
        description: 'Investigating team requested direct message channel export or screenshot proof.',
        status: 'ADDITIONAL_EVIDENCE_REQUESTED',
        actor: 'investigator',
      },
    ],
  },
];

export const INITIAL_VERIFICATIONS: VerificationResult[] = [
  {
    id: 'v_01',
    identifier: '9876500000',
    identifierType: 'MOBILE',
    status: 'FREQUENTLY_REPORTED',
    reportCount: 1420,
    commonPatterns: ['Electricity bill disconnection SMS', 'Fake courier tracking link', 'APK malware distribution'],
    lastReportedAt: '2026-08-25T08:15:00Z',
    disclaimer: 'This identifier has been frequently reported by citizens across multiple states. Do not share OTPs, PINs, or install APK files.',
    recentReports: [
      { id: 'r1', date: '25 Aug 2026', category: 'Financial Fraud', pattern: 'Sent fake electricity disconnection SMS', state: 'Delhi' },
      { id: 'r2', date: '24 Aug 2026', category: 'APK Malware', pattern: 'Asked victim to download QuickSupport / AnyDesk', state: 'Maharashtra' },
      { id: 'r3', date: '23 Aug 2026', category: 'Financial Fraud', pattern: 'Demanded ₹10 bill update payment', state: 'Karnataka' },
    ],
  },
  {
    id: 'v_02',
    identifier: 'scam.deal@okaxis',
    identifierType: 'UPI_ID',
    status: 'FREQUENTLY_REPORTED',
    reportCount: 890,
    commonPatterns: ['OLX fake advance token', 'Fake hotel booking payment', 'QR code collect request fraud'],
    lastReportedAt: '2026-08-24T18:30:00Z',
    disclaimer: 'Multiple fraud reports are linked with this UPI VPA. Inter-bank freeze alert is active.',
    recentReports: [
      { id: 'r4', date: '24 Aug 2026', category: 'UPI Fraud', pattern: 'Sent QR code claiming to send money to victim', state: 'Uttar Pradesh' },
      { id: 'r5', date: '22 Aug 2026', category: 'E-commerce Fraud', pattern: 'Refused refund after collecting advance token', state: 'Gujarat' },
    ],
  },
  {
    id: 'v_03',
    identifier: 'fake-electricity-bill.in',
    identifierType: 'WEBSITE',
    status: 'FREQUENTLY_REPORTED',
    reportCount: 532,
    commonPatterns: ['Phishing domain', 'Fake bill payment portal', 'Credential harvesting'],
    lastReportedAt: '2026-08-25T06:00:00Z',
    disclaimer: 'This website domain impersonates official state power distribution portals. Takedown notice is in process.',
    recentReports: [
      { id: 'r6', date: '25 Aug 2026', category: 'Phishing', pattern: 'Impersonating state electricity portal login', state: 'Delhi' },
    ],
  },
  {
    id: 'v_04',
    identifier: '8923412345',
    identifierType: 'MOBILE',
    status: 'SUSPICIOUS',
    reportCount: 14,
    commonPatterns: ['Impersonating bank customer care', 'Unsolicited credit card upgrade calls'],
    lastReportedAt: '2026-08-22T14:10:00Z',
    disclaimer: 'Moderate reports found. Exercise caution when dealing with unsolicited calls from this number.',
    recentReports: [
      { id: 'r7', date: '22 Aug 2026', category: 'Impersonation', pattern: 'Claimed to be SBI credit card department', state: 'Rajasthan' },
    ],
  },
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_01',
    userId: 'usr_active_02',
    title: 'Action Required on Complaint NCRP-2026-482731',
    message: 'Investigating officer requested your bank statement for August 2026 to proceed with recovery.',
    type: 'ACTION_REQUIRED',
    complaintNumber: 'NCRP-2026-482731',
    read: false,
    createdAt: '2026-08-24T09:35:00Z',
  },
  {
    id: 'notif_02',
    userId: 'usr_active_02',
    title: 'Complaint Registered: NCRP-2026-482731',
    message: 'Your complaint regarding Unauthorized UPI Transfer has been registered with Cyber Crime Unit.',
    type: 'COMPLAINT_UPDATE',
    complaintNumber: 'NCRP-2026-482731',
    read: true,
    createdAt: '2026-08-23T11:20:00Z',
  },
  {
    id: 'notif_03',
    userId: 'usr_resolved_03',
    title: 'Complaint Resolved: NCRP-2026-119284',
    message: 'Your social media impersonation report has been successfully resolved. Fake accounts removed.',
    type: 'COMPLAINT_UPDATE',
    complaintNumber: 'NCRP-2026-119284',
    read: true,
    createdAt: '2026-07-18T16:45:00Z',
  },
  {
    id: 'notif_04',
    userId: 'usr_multi_04',
    title: 'Evidence Requested for NCRP-2026-773192',
    message: 'Please attach screenshots of Telegram group chats to aid investigation.',
    type: 'ACTION_REQUIRED',
    complaintNumber: 'NCRP-2026-773192',
    read: false,
    createdAt: '2026-08-19T14:00:00Z',
  },
];

export const POLICE_STATIONS: CyberPoliceStation[] = [
  {
    id: 'ps_del_01',
    name: 'Cyber Police Station, Central District',
    state: 'Delhi',
    district: 'Central Delhi',
    address: 'Police Station Kamla Market Complex, Asaf Ali Road, New Delhi - 110002',
    phone: '011-23210190',
    email: 'cybercell-central@delhipolice.gov.in',
    officerInCharge: 'Inspector Rajesh Malik',
  },
  {
    id: 'ps_del_02',
    name: 'Special Cell Cyber Crime Unit (IFSO)',
    state: 'Delhi',
    district: 'South West Delhi',
    address: 'Sector 16B, Dwarka, New Delhi - 110078',
    phone: '011-28031130',
    email: 'dcp-cybercell-dl@nic.in',
    officerInCharge: 'DCP Hemant Tiwari',
  },
  {
    id: 'ps_mum_01',
    name: 'BKC Cyber Crime Police Station',
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    address: 'Bandra Kurla Complex, Bandra East, Mumbai - 400051',
    phone: '022-26504000',
    email: 'cybercrime.bkc-mum@mahapolice.gov.in',
    officerInCharge: 'Senior Inspector Sunil Kulkarni',
  },
  {
    id: 'ps_blr_01',
    name: 'CID Cyber Crime Police Station, Bengaluru',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    address: 'Carlton House, Palace Road, Bengaluru - 560001',
    phone: '080-22094496',
    email: 'cybercrimeps@ksp.gov.in',
    officerInCharge: 'ACP Ravi Kumar',
  },
  {
    id: 'ps_chn_01',
    name: 'Cyber Crime Wing, Chennai City',
    state: 'Tamil Nadu',
    district: 'Chennai',
    address: 'Commissioner of Police Office, Vepery, Chennai - 600007',
    phone: '044-23452324',
    email: 'cybercrime.cop@tn.gov.in',
    officerInCharge: 'ADCP S. Meenakshi',
  },
  {
    id: 'ps_hyd_01',
    name: 'Cyber Crime Police Station, Hyderabad City',
    state: 'Telangana',
    district: 'Hyderabad',
    address: 'CCRB Building, Basheerbagh, Hyderabad - 500029',
    phone: '040-27852408',
    email: 'cybercrime-hyd@tspolice.gov.in',
    officerInCharge: 'ACP KVM Prasad',
  },
  {
    id: 'ps_ahd_01',
    name: 'Cyber Crime Police Station, Ahmedabad',
    state: 'Gujarat',
    district: 'Ahmedabad',
    address: 'Opp. Mithakhali Underbridge, Navrangpura, Ahmedabad - 380009',
    phone: '079-26462100',
    email: 'cyber-cell-ahd@gujarat.gov.in',
    officerInCharge: 'DSP Neha Shah',
  },
  {
    id: 'ps_up_01',
    name: 'State Cyber Crime Police Station, Lucknow',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    address: 'Cyber Crime Headquarter, Gomti Nagar Extension, Lucknow - 226010',
    phone: '0522-2978000',
    email: 'cyber-up@nic.in',
    officerInCharge: 'SP Cyber Crime Amit Pathak',
  },
];

export const BANK_OFFICERS: NodalBankOfficer[] = [
  {
    id: 'bk_01',
    bankName: 'State Bank of India (SBI)',
    category: 'Public Sector',
    nodalOfficerName: 'Rameshwar Prasad (DGM Cyber Security)',
    email: 'nodal.cyber@sbi.co.in',
    phone: '1800-11-2211',
    escalationLevel: 'Level 1 Nodal Desk',
  },
  {
    id: 'bk_02',
    bankName: 'HDFC Bank',
    category: 'Private Sector',
    nodalOfficerName: 'Pooja Bhattacharya (VP Fraud Risk)',
    email: 'fraudcontrol.nodal@hdfcbank.com',
    phone: '1800-258-3838',
    escalationLevel: 'Level 1 Nodal Desk',
  },
  {
    id: 'bk_03',
    bankName: 'ICICI Bank',
    category: 'Private Sector',
    nodalOfficerName: 'Sanjay Deshmukh (Head Cyber Fraud Response)',
    email: 'cyberfraudcell@icicibank.com',
    phone: '1800-1080',
    escalationLevel: 'Level 1 Nodal Desk',
  },
  {
    id: 'bk_04',
    bankName: 'Punjab National Bank (PNB)',
    category: 'Public Sector',
    nodalOfficerName: 'Harpreet Singh (Chief Manager IT Fraud)',
    email: 'nodal.itfraud@pnb.co.in',
    phone: '1800-180-2222',
    escalationLevel: 'Level 1 Nodal Desk',
  },
  {
    id: 'bk_05',
    bankName: 'Axis Bank',
    category: 'Private Sector',
    nodalOfficerName: 'Vikas Nambiar (Nodal Officer - Cybercrime)',
    email: 'cybercell.liaison@axisbank.com',
    phone: '1860-419-5555',
    escalationLevel: 'Level 1 Nodal Desk',
  },
  {
    id: 'bk_06',
    bankName: 'Bank of Baroda',
    category: 'Public Sector',
    nodalOfficerName: 'Alok Ranjan (DGM Information Security)',
    email: 'cyberfraud.ho@bankofbaroda.com',
    phone: '1800-258-4455',
    escalationLevel: 'Level 1 Nodal Desk',
  },
  {
    id: 'bk_07',
    bankName: 'Paytm Payments Bank',
    category: 'Payment Bank',
    nodalOfficerName: 'Naveen Aggarwal (Nodal Fraud Officer)',
    email: 'cybercell@paytmbank.com',
    phone: '0120-4456-456',
    escalationLevel: 'Level 1 Nodal Desk',
  },
];

export const OFFICIAL_CONTACTS: OfficialContact[] = [
  {
    id: 'cnt_01',
    agency: 'National Cyber Financial Fraud Helpline',
    role: 'Immediate Inter-bank Transaction Freeze Coordination',
    tollFree: '1930',
    email: 'citizen-support@i4c.gov.in',
    timings: '24 Hours x 7 Days',
  },
  {
    id: 'cnt_02',
    agency: 'Indian Cybercrime Coordination Centre (I4C)',
    role: 'Ministry of Home Affairs, Government of India',
    tollFree: '011-23438207',
    email: 'i4c-mha@gov.in',
    timings: '09:30 AM to 06:00 PM (Working Days)',
  },
  {
    id: 'cnt_03',
    agency: 'CERT-In (Indian Computer Emergency Response Team)',
    role: 'Cyber Incident Response & Vulnerability Reporting',
    tollFree: '1800-11-4949',
    email: 'incident@cert-in.org.in',
    timings: '24 Hours Helpdesk',
  },
];

// LocalStorage Persistence Keys
const STORAGE_KEYS = {
  USERS: 'ncrp_db_users',
  CURRENT_USER_ID: 'ncrp_db_current_user_id',
  COMPLAINTS: 'ncrp_db_complaints',
  VERIFICATIONS: 'ncrp_db_verifications',
  NOTIFICATIONS: 'ncrp_db_notifications',
  VOLUNTEERS: 'ncrp_db_volunteers',
};

class MockDatabase {
  private getStorage<T>(key: string, defaultData: T): T {
    try {
      const item = localStorage.getItem(key);
      if (!item) {
        localStorage.setItem(key, JSON.stringify(defaultData));
        return defaultData;
      }
      return JSON.parse(item);
    } catch {
      return defaultData;
    }
  }

  private setStorage<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to write to mock database storage', e);
    }
  }

  // Users
  getUsers(): User[] {
    return this.getStorage(STORAGE_KEYS.USERS, MOCK_USERS);
  }

  getUserById(idOrKey: string): User | undefined {
    if (!idOrKey) return undefined;
    const cleanKey = idOrKey.trim().toLowerCase();
    const resolvedId = DEMO_USER_ALIASES[cleanKey] || idOrKey;

    const users = this.getUsers();
    let found = users.find(
      (u) =>
        u.id === resolvedId ||
        u.id.toLowerCase() === cleanKey ||
        u.email.toLowerCase() === cleanKey ||
        u.phone === cleanKey ||
        u.name.toLowerCase() === cleanKey
    );

    if (!found) {
      found = MOCK_USERS.find(
        (u) =>
          u.id === resolvedId ||
          u.id.toLowerCase() === cleanKey ||
          u.email.toLowerCase() === cleanKey ||
          u.phone === cleanKey ||
          u.name.toLowerCase() === cleanKey
      );
    }
    return found;
  }

  getCurrentUserId(): string {
    return this.getStorage(STORAGE_KEYS.CURRENT_USER_ID, MOCK_USERS[0].id); // Defaults to Priya Sharma (Active Complaint)
  }

  setCurrentUserId(id: string): void {
    this.setStorage(STORAGE_KEYS.CURRENT_USER_ID, id);
  }

  // Complaints
  getComplaints(): Complaint[] {
    return this.getStorage(STORAGE_KEYS.COMPLAINTS, INITIAL_COMPLAINTS);
  }

  getComplaintByNumber(complaintNumber: string): Complaint | undefined {
    const cleanNumber = complaintNumber.trim().toUpperCase();
    return this.getComplaints().find(
      (c) => c.complaintNumber.toUpperCase() === cleanNumber || c.id.toUpperCase() === cleanNumber
    );
  }

  getComplaintsByUserId(userId: string): Complaint[] {
    return this.getComplaints().filter((c) => c.userId === userId);
  }

  saveComplaint(complaint: Complaint): void {
    const complaints = this.getComplaints();
    const index = complaints.findIndex((c) => c.id === complaint.id);
    if (index >= 0) {
      complaints[index] = complaint;
    } else {
      complaints.unshift(complaint);
    }
    this.setStorage(STORAGE_KEYS.COMPLAINTS, complaints);
  }

  // Verifications
  getVerifications(): VerificationResult[] {
    return this.getStorage(STORAGE_KEYS.VERIFICATIONS, INITIAL_VERIFICATIONS);
  }

  saveVerification(result: VerificationResult): void {
    const list = this.getVerifications();
    const index = list.findIndex((v) => v.identifier.toLowerCase() === result.identifier.toLowerCase());
    if (index >= 0) {
      list[index] = result;
    } else {
      list.unshift(result);
    }
    this.setStorage(STORAGE_KEYS.VERIFICATIONS, list);
  }

  // Notifications
  getNotifications(): Notification[] {
    return this.getStorage(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  }

  getNotificationsByUserId(userId: string): Notification[] {
    return this.getNotifications().filter((n) => n.userId === userId);
  }

  saveNotification(notification: Notification): void {
    const list = this.getNotifications();
    list.unshift(notification);
    this.setStorage(STORAGE_KEYS.NOTIFICATIONS, list);
  }

  updateNotification(notification: Notification): void {
    const list = this.getNotifications();
    const index = list.findIndex((n) => n.id === notification.id);
    if (index >= 0) {
      list[index] = notification;
      this.setStorage(STORAGE_KEYS.NOTIFICATIONS, list);
    }
  }

  // Volunteers
  getVolunteers(): VolunteerApplication[] {
    return this.getStorage(STORAGE_KEYS.VOLUNTEERS, []);
  }

  saveVolunteer(app: VolunteerApplication): void {
    const list = this.getVolunteers();
    list.unshift(app);
    this.setStorage(STORAGE_KEYS.VOLUNTEERS, list);
  }

  // Reset entire database to factory seeds
  resetDatabase(): void {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(MOCK_USERS));
    localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(INITIAL_COMPLAINTS));
    localStorage.setItem(STORAGE_KEYS.VERIFICATIONS, JSON.stringify(INITIAL_VERIFICATIONS));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
    localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, JSON.stringify(MOCK_USERS[0].id));
  }
}

export const mockDb = new MockDatabase();
