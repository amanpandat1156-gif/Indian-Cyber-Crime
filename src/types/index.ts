/**
 * NCRP / I4C Core Domain Models & Types
 */

export type AccountType = 'new' | 'active_complaint' | 'resolved' | 'multiple';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  accountType: AccountType;
  createdAt: string;
}

export type ComplaintStatus =
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'ACTION_REQUIRED'
  | 'ADDITIONAL_EVIDENCE_REQUESTED'
  | 'RESOLVED'
  | 'CLOSED';

export type ComplaintType =
  | 'FINANCIAL_FRAUD'
  | 'CYBER_HARASSMENT'
  | 'HACKED_ACCOUNT'
  | 'ANONYMOUS_REPORT'
  | 'OTHER';

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  status: ComplaintStatus;
  actor: 'system' | 'citizen' | 'investigator' | 'bank';
}

export interface ExtractedFinancialData {
  amount: number;
  date: string;
  transactionId: string;
  bankName: string;
  upiId?: string;
  beneficiaryAccount?: string;
  paymentMode?: 'UPI' | 'NET_BANKING' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'WALLET';
}

export interface Evidence {
  id: string;
  complaintId?: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  uploadedAt: string;
  status: 'uploading' | 'processing' | 'processed' | 'failed';
  extractedData?: ExtractedFinancialData;
  previewUrl?: string;
}

export interface ActionRequired {
  id: string;
  title: string;
  description: string;
  actionType: 'UPLOAD_STATEMENT' | 'CONFIRM_TRANSACTION' | 'SUBMIT_ID_PROOF';
  deadline?: string;
  completed: boolean;
}

export interface AssignedTeam {
  name: string;
  policeStation: string;
  district: string;
  state: string;
  officerName: string;
  contactNumber?: string;
}

export interface Complaint {
  id: string;
  complaintNumber: string;
  userId?: string;
  isAnonymous?: boolean;
  type: ComplaintType;
  title: string;
  description: string;
  status: ComplaintStatus;
  statusDisplay: string;
  statusDescription: string;
  createdAt: string;
  updatedAt: string;
  assignedTeam: AssignedTeam;
  timeline: TimelineEvent[];
  actionRequired?: ActionRequired;
  evidence: Evidence[];
  financialDetails?: ExtractedFinancialData;
  incidentDetails?: {
    incidentDate: string;
    platform?: string;
    suspectDetails?: string;
  };
}

export type IdentifierType = 'MOBILE' | 'UPI_ID' | 'BANK_ACCOUNT' | 'EMAIL' | 'WEBSITE' | 'SOCIAL_HANDLE';

export interface VerificationReportItem {
  id: string;
  date: string;
  category: string;
  pattern: string;
  state?: string;
}

export interface VerificationResult {
  id: string;
  identifier: string;
  identifierType: IdentifierType;
  status: 'FREQUENTLY_REPORTED' | 'NO_REPORTS_FOUND' | 'SUSPICIOUS';
  reportCount: number;
  recentReports: VerificationReportItem[];
  commonPatterns: string[];
  lastReportedAt?: string;
  disclaimer: string;
}

export type NotificationType =
  | 'COMPLAINT_UPDATE'
  | 'ACTION_REQUIRED'
  | 'EVIDENCE_CONFIRMED'
  | 'SECURITY_ALERT';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  complaintNumber?: string;
  read: boolean;
  createdAt: string;
}

export interface VolunteerApplication {
  id: string;
  userId?: string;
  fullName: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  areasOfInterest: string[];
  experience: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED';
  submittedAt: string;
}

export interface CyberPoliceStation {
  id: string;
  name: string;
  state: string;
  district: string;
  address: string;
  phone: string;
  email: string;
  officerInCharge: string;
}

export interface NodalBankOfficer {
  id: string;
  bankName: string;
  category: 'Public Sector' | 'Private Sector' | 'Payment Bank' | 'Fintech';
  nodalOfficerName: string;
  email: string;
  phone: string;
  escalationLevel: string;
}

export interface OfficialContact {
  id: string;
  agency: string;
  role: string;
  tollFree: string;
  email: string;
  timings: string;
}
