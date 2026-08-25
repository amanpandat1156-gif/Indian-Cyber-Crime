/**
 * NCRP Authentication Context Provider
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  sendOtp: (phoneOrEmail: string) => Promise<{ success: boolean; error?: string; message?: string }>;
  verifyOtp: (phoneOrEmail: string, otp: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  switchAccount: (userId: string) => Promise<void>;
  logout: () => Promise<void>;
  testAccounts: User[];
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const refreshUser = useCallback(async () => {
    try {
      const res = await authService.getCurrentUser();
      if (res.success && res.data) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const sendOtp = async (phoneOrEmail: string) => {
    const res = await authService.sendOtp(phoneOrEmail);
    return {
      success: res.success,
      error: res.error,
      message: res.data?.message,
    };
  };

  const verifyOtp = async (phoneOrEmail: string, otp: string) => {
    const res = await authService.verifyOtp(phoneOrEmail, otp);
    if (res.success && res.data) {
      setUser(res.data);
      setIsLoginModalOpen(false);
      return { success: true, user: res.data };
    }
    return { success: false, error: res.error };
  };

  const switchAccount = async (userId: string) => {
    setIsLoading(true);
    const res = await authService.switchAccount(userId);
    if (res.success && res.data) {
      setUser(res.data);
    }
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    await authService.logout();
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isLoginModalOpen,
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),
        sendOtp,
        verifyOtp,
        switchAccount,
        logout,
        testAccounts: authService.getMockTestAccounts(),
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
