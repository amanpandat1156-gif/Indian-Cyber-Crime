/**
 * NCRP Check & Verify Service
 */

import { VerificationResult, IdentifierType } from '../types';
import { mockDb } from './mockDb';
import { simulatedApiCall, ApiResponse } from './mockApi';

export interface ReportIdentifierInput {
  identifier: string;
  identifierType: IdentifierType;
  category: string;
  description: string;
  incidentDate?: string;
  state?: string;
}

class VerificationService {
  async verifyIdentifier(query: string, type?: IdentifierType): Promise<ApiResponse<VerificationResult>> {
    return simulatedApiCall(() => {
      const cleanQuery = query.trim().toLowerCase();
      if (!cleanQuery) {
        throw new Error('Please enter a phone number, UPI ID, bank account, email, or website to verify.');
      }

      const verifications = mockDb.getVerifications();
      const matched = verifications.find(
        (v) => v.identifier.toLowerCase() === cleanQuery || cleanQuery.includes(v.identifier.toLowerCase())
      );

      if (matched) {
        return matched;
      }

      // Outcome 2: No Reports Found (with standard non-guarantee safety disclaimer)
      const inferredType: IdentifierType =
        type ||
        (cleanQuery.includes('@')
          ? cleanQuery.includes('.com') || cleanQuery.includes('.in')
            ? 'EMAIL'
            : 'UPI_ID'
          : cleanQuery.includes('.')
          ? 'WEBSITE'
          : /^\d{10}$/.test(cleanQuery)
          ? 'MOBILE'
          : 'BANK_ACCOUNT');

      const noReportResult: VerificationResult = {
        id: `v_clean_${Date.now()}`,
        identifier: query.trim(),
        identifierType: inferredType,
        status: 'NO_REPORTS_FOUND',
        reportCount: 0,
        recentReports: [],
        commonPatterns: [],
        disclaimer:
          'No citizen reports are currently linked with this identifier in the NCRP repository. Please note: The absence of previous reports does not guarantee that an unknown caller or payment request is safe. Always verify bank accounts and never share UPI PINs or OTPs.',
      };

      return noReportResult;
    }, 400, 700);
  }

  async reportIdentifier(input: ReportIdentifierInput): Promise<ApiResponse<VerificationResult>> {
    return simulatedApiCall(() => {
      const cleanIdentifier = input.identifier.trim();
      if (!cleanIdentifier) {
        throw new Error('Please enter the suspect identifier.');
      }

      const verifications = mockDb.getVerifications();
      let record = verifications.find(
        (v) => v.identifier.toLowerCase() === cleanIdentifier.toLowerCase()
      );

      const now = new Date();
      const dateFormatted = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

      if (record) {
        record.reportCount += 1;
        record.lastReportedAt = now.toISOString();
        if (!record.commonPatterns.includes(input.category)) {
          record.commonPatterns.push(input.category);
        }
        record.recentReports.unshift({
          id: `r_${Date.now()}`,
          date: dateFormatted,
          category: input.category,
          pattern: input.description,
          state: input.state || 'National',
        });
      } else {
        record = {
          id: `v_${Date.now()}`,
          identifier: cleanIdentifier,
          identifierType: input.identifierType,
          status: 'SUSPICIOUS',
          reportCount: 1,
          recentReports: [
            {
              id: `r_${Date.now()}`,
              date: dateFormatted,
              category: input.category,
              pattern: input.description,
              state: input.state || 'National',
            },
          ],
          commonPatterns: [input.category],
          lastReportedAt: now.toISOString(),
          disclaimer:
            'Report recorded in national suspect repository. Cross-state intelligence analysis in progress.',
        };
      }

      mockDb.saveVerification(record);
      return record;
    }, 500, 800);
  }
}

export const verificationService = new VerificationService();
