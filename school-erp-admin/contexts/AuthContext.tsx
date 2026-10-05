'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AuthUser, LoginCredentials } from '@/types/auth';
import { authService } from '@/services/auth.service';
import { useToast } from '@/components/ui/Toast';

const STORAGE_KEY = 'greenwood_erp_session';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginUser: (credentials: LoginCredentials) => Promise<void>;
  loginAdmin: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Restore session on initial load
  useEffect(() => {
    try {
      const storedSession = localStorage.getItem(STORAGE_KEY);
      if (storedSession) {
        const parsedUser: AuthUser = JSON.parse(storedSession);
        setUser(parsedUser);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveSession = (authUser: AuthUser) => {
    setUser(authUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
  };

  const loginUser = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await authService.loginUser(credentials);
      if (response.success && response.data) {
        const authUser: AuthUser = {
          id: response.data.id,
          email: response.data.email,
          role: 'STAFF',
          name: response.data.email.split('@')[0],
        };
        saveSession(authUser);
        router.push('/dashboard');
      } else {
        throw new Error(response.message || 'Invalid user credentials');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loginAdmin = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await authService.loginAdmin(credentials);
      if (response.success) {
        const authUser: AuthUser = {
          id: 1,
          email: credentials.email,
          role: 'ADMIN',
          name: 'School Administrator',
        };
        saveSession(authUser);
        router.push('/dashboard');
      } else {
        throw new Error(response.message || 'Invalid administrator credentials');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        loginUser,
        loginAdmin,
        logout,
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
