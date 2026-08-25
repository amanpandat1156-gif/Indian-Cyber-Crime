/**
 * NCRP Cyber Volunteer Service
 */

import { VolunteerApplication } from '../types';
import { mockDb } from './mockDb';
import { simulatedApiCall, ApiResponse } from './mockApi';

export interface SubmitVolunteerInput {
  userId?: string;
  fullName: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  areasOfInterest: string[];
  experience: string;
}

class VolunteerService {
  async submitApplication(input: SubmitVolunteerInput): Promise<ApiResponse<VolunteerApplication>> {
    return simulatedApiCall(() => {
      if (!input.fullName?.trim()) {
        throw new Error('Please enter your full name as per Aadhaar or official ID.');
      }
      if (!input.phone?.trim()) {
        throw new Error('Please enter a valid 10-digit mobile number.');
      }
      if (!input.email?.trim() || !input.email.includes('@')) {
        throw new Error('Please enter a valid email address.');
      }
      if (!input.areasOfInterest || input.areasOfInterest.length === 0) {
        throw new Error('Please select at least one area of volunteer interest.');
      }

      const application: VolunteerApplication = {
        id: `vol_${Date.now()}`,
        userId: input.userId,
        fullName: input.fullName.trim(),
        email: input.email.trim(),
        phone: input.phone.trim(),
        state: input.state,
        city: input.city,
        areasOfInterest: input.areasOfInterest,
        experience: input.experience?.trim() || '',
        status: 'SUBMITTED',
        submittedAt: new Date().toISOString(),
      };

      mockDb.saveVolunteer(application);
      return application;
    }, 500, 800);
  }
}

export const volunteerService = new VolunteerService();
