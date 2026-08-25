/**
 * NCRP Authentication Service
 */

import { User } from '../types';
import { mockDb, MOCK_USERS } from './mockDb';
import { simulatedApiCall, ApiResponse } from './mockApi';

class AuthService {
  async sendOtp(phoneOrEmail: string): Promise<ApiResponse<{ message: string; testOtp: string }>> {
    return simulatedApiCall(() => {
      const cleanInput = phoneOrEmail.trim();
      if (!cleanInput) {
        throw new Error('Please enter a valid mobile number or email address.');
      }
      return {
        message: `OTP sent successfully to ${cleanInput}.`,
        testOtp: '123456',
      };
    }, 400, 700);
  }

  async verifyOtp(phoneOrEmail: string, otp: string): Promise<ApiResponse<User>> {
    return simulatedApiCall(() => {
      const cleanOtp = otp.trim();
      if (cleanOtp !== '123456') {
        throw new Error('Invalid OTP entered. Please enter 123456 for demo verification.');
      }

      const cleanInput = phoneOrEmail.trim();
      const users = mockDb.getUsers();
      let matchedUser = users.find(
        (u) => u.phone === cleanInput || u.email.toLowerCase() === cleanInput.toLowerCase()
      );

      if (!matchedUser) {
        // Create new citizen user if not exists
        matchedUser = {
          id: `usr_${Date.now()}`,
          name: 'Citizen User',
          phone: cleanInput.includes('@') ? '9876599999' : cleanInput,
          email: cleanInput.includes('@') ? cleanInput : 'citizen@example.in',
          accountType: 'new',
          createdAt: new Date().toISOString(),
        };
        const allUsers = [...users, matchedUser];
        localStorage.setItem('ncrp_db_users', JSON.stringify(allUsers));
      }

      mockDb.setCurrentUserId(matchedUser.id);
      return matchedUser;
    }, 500, 800);
  }

  async getCurrentUser(): Promise<ApiResponse<User | null>> {
    return simulatedApiCall(() => {
      const currentId = mockDb.getCurrentUserId();
      if (!currentId) return null;
      const user = mockDb.getUserById(currentId);
      return user || null;
    }, 100, 200);
  }

  async switchAccount(userId: string): Promise<ApiResponse<User>> {
    return simulatedApiCall(() => {
      const user = mockDb.getUserById(userId);
      if (!user) {
        throw new Error('Selected mock account was not found.');
      }
      mockDb.setCurrentUserId(user.id);
      return user;
    }, 200, 400);
  }

  async logout(): Promise<ApiResponse<boolean>> {
    return simulatedApiCall(() => {
      mockDb.setCurrentUserId('');
      return true;
    }, 200, 300);
  }

  getMockTestAccounts(): User[] {
    return MOCK_USERS;
  }
}

export const authService = new AuthService();
