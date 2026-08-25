/**
 * NCRP Complaint Management Service
 */

import { Complaint, ComplaintType, ExtractedFinancialData, Evidence, TimelineEvent } from '../types';
import { mockDb, getStatusMeta, POLICE_STATIONS } from './mockDb';
import { simulatedApiCall, ApiResponse } from './mockApi';

export interface CreateComplaintInput {
  userId?: string;
  type: ComplaintType;
  title: string;
  description: string;
  isAnonymous?: boolean;
  financialDetails?: ExtractedFinancialData;
  incidentDetails?: {
    incidentDate: string;
    platform?: string;
    suspectDetails?: string;
  };
  evidence?: Evidence[];
}

class ComplaintService {
  private generateComplaintNumber(): string {
    const year = new Date().getFullYear();
    const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
    return `NCRP-${year}-${randomSixDigits}`;
  }

  async createComplaint(input: CreateComplaintInput): Promise<ApiResponse<Complaint>> {
    return simulatedApiCall(() => {
      if (!input.title?.trim()) {
        throw new Error('Please provide a brief title or summary of what happened.');
      }
      if (!input.description?.trim()) {
        throw new Error('Please describe the incident in detail.');
      }

      const complaintNumber = this.generateComplaintNumber();
      const randomStation = POLICE_STATIONS[Math.floor(Math.random() * POLICE_STATIONS.length)];
      const now = new Date();

      const initialTimeline: TimelineEvent[] = [
        {
          id: `tl_${Date.now()}_1`,
          date: now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          title: 'Complaint Submitted Online',
          description: input.isAnonymous
            ? 'Anonymous report recorded securely on national portal.'
            : `Complaint filed by citizen. Case routed to ${randomStation.name}.`,
          status: 'SUBMITTED',
          actor: 'citizen',
        },
      ];

      if (input.type === 'FINANCIAL_FRAUD') {
        initialTimeline.push({
          id: `tl_${Date.now()}_2`,
          date: now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          title: '1930 Financial Intermediary Freeze Dispatched',
          description: 'Automated alert generated to beneficiary bank and payment switch to freeze unauthorized transfers.',
          status: 'UNDER_REVIEW',
          actor: 'system',
        });
      }

      const newComplaint: Complaint = {
        id: `cmp_${Date.now()}`,
        complaintNumber,
        userId: input.userId,
        isAnonymous: input.isAnonymous || false,
        type: input.type,
        title: input.title.trim(),
        description: input.description.trim(),
        status: input.type === 'FINANCIAL_FRAUD' ? 'UNDER_REVIEW' : 'SUBMITTED',
        statusDisplay: getStatusMeta(input.type === 'FINANCIAL_FRAUD' ? 'UNDER_REVIEW' : 'SUBMITTED').display,
        statusDescription: getStatusMeta(input.type === 'FINANCIAL_FRAUD' ? 'UNDER_REVIEW' : 'SUBMITTED').description,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        assignedTeam: {
          name: 'Cyber Crime Investigation Division',
          policeStation: randomStation.name,
          district: randomStation.district,
          state: randomStation.state,
          officerName: randomStation.officerInCharge,
          contactNumber: randomStation.phone,
        },
        financialDetails: input.financialDetails,
        incidentDetails: input.incidentDetails,
        evidence: input.evidence || [],
        timeline: initialTimeline,
      };

      mockDb.saveComplaint(newComplaint);

      // Create notification for logged-in user
      if (input.userId) {
        mockDb.saveNotification({
          id: `notif_${Date.now()}`,
          userId: input.userId,
          title: `Complaint Registered: ${complaintNumber}`,
          message: `Your complaint "${newComplaint.title}" has been received and assigned to ${randomStation.name}.`,
          type: 'COMPLAINT_UPDATE',
          complaintNumber,
          read: false,
          createdAt: now.toISOString(),
        });
      }

      return newComplaint;
    }, 900, 1200);
  }

  async getComplaintByNumber(complaintNumber: string): Promise<ApiResponse<Complaint>> {
    return simulatedApiCall(() => {
      const cleanNumber = complaintNumber.trim();
      if (!cleanNumber) {
        throw new Error('Please enter a valid complaint number or acknowledgement token.');
      }
      const found = mockDb.getComplaintByNumber(cleanNumber);
      if (!found) {
        throw new Error(`We couldn't find a complaint matching "${cleanNumber}". Please double-check the number or log in to view your filed complaints.`);
      }
      return found;
    }, 400, 700);
  }

  async getUserComplaints(userId: string): Promise<ApiResponse<Complaint[]>> {
    return simulatedApiCall(() => {
      return mockDb.getComplaintsByUserId(userId);
    }, 300, 500);
  }

  async resolveActionRequired(complaintId: string, newEvidence: Evidence): Promise<ApiResponse<Complaint>> {
    return simulatedApiCall(() => {
      const complaints = mockDb.getComplaints();
      const complaint = complaints.find((c) => c.id === complaintId);
      if (!complaint) {
        throw new Error('Complaint not found.');
      }

      const now = new Date();
      complaint.evidence.push(newEvidence);
      complaint.actionRequired = undefined;
      complaint.status = 'UNDER_REVIEW';
      complaint.statusDisplay = getStatusMeta('UNDER_REVIEW').display;
      complaint.statusDescription = getStatusMeta('UNDER_REVIEW').description;
      complaint.updatedAt = now.toISOString();

      complaint.timeline.unshift({
        id: `tl_${Date.now()}`,
        date: now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        title: 'Action Completed: Requested Evidence Attached',
        description: `Citizen uploaded "${newEvidence.fileName}". Status changed to Under Review.`,
        status: 'UNDER_REVIEW',
        actor: 'citizen',
      });

      mockDb.saveComplaint(complaint);

      if (complaint.userId) {
        mockDb.saveNotification({
          id: `notif_${Date.now()}`,
          userId: complaint.userId,
          title: `Action Completed for ${complaint.complaintNumber}`,
          message: `Your document (${newEvidence.fileName}) has been attached. Investigation has resumed.`,
          type: 'EVIDENCE_CONFIRMED',
          complaintNumber: complaint.complaintNumber,
          read: false,
          createdAt: now.toISOString(),
        });
      }

      return complaint;
    }, 500, 800);
  }

  async addAdditionalEvidence(complaintId: string, evidence: Evidence): Promise<ApiResponse<Complaint>> {
    return simulatedApiCall(() => {
      const complaints = mockDb.getComplaints();
      const complaint = complaints.find((c) => c.id === complaintId);
      if (!complaint) {
        throw new Error('Complaint not found.');
      }

      const now = new Date();
      complaint.evidence.push(evidence);
      complaint.updatedAt = now.toISOString();

      complaint.timeline.unshift({
        id: `tl_${Date.now()}`,
        date: now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        title: 'Supplementary Evidence Added',
        description: `Citizen attached "${evidence.fileName}" (${evidence.fileSize}) to case records.`,
        status: complaint.status,
        actor: 'citizen',
      });

      mockDb.saveComplaint(complaint);
      return complaint;
    }, 400, 700);
  }
}

export const complaintService = new ComplaintService();
