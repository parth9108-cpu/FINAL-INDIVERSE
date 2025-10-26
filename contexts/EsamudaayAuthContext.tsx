'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/lib/esamudaay-api';
import { User, UserProfile } from '@/lib/types/esamudaay';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  token: string | null;
  loading: boolean;
  login: (phone: string, otp: string) => Promise<void>;
  logout: () => void;
  signup: (userData: {
    phone: string;
    email?: string;
    password?: string;
  }) => Promise<void>;
  requestOTP: (phone: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored token and restore session
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      auth.getUserInfo(storedToken)
        .then((response) => {
          setToken(storedToken);
          setUser(response.data.user);
        })
        .catch(() => {
          localStorage.removeItem('auth_token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const requestOTP = async (phone: string) => {
    const thirdPartyId = process.env.NEXT_PUBLIC_ESAMUDAAY_THIRD_PARTY_ID;
    if (!thirdPartyId) {
      throw new Error('ESAMUDAAY_THIRD_PARTY_ID is not configured');
    }
    // Add +91 prefix if not present
    const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;
    await auth.requestOTP(formattedPhone, thirdPartyId);
  };

  const login = async (phone: string, otp: string) => {
    const thirdPartyId = process.env.NEXT_PUBLIC_ESAMUDAAY_THIRD_PARTY_ID;
    if (!thirdPartyId) {
      throw new Error('ESAMUDAAY_THIRD_PARTY_ID is not configured');
    }
    // Add +91 prefix if not present
    const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;
    const response = await auth.verifyOTP(formattedPhone, otp, thirdPartyId);
    const { token: newToken, user: userData } = response.data;
    
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('auth_token', newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setProfile(null);
    localStorage.removeItem('auth_token');
  };

  const signup = async (userData: {
    phone: string;
    email?: string;
    password?: string;
  }) => {
    const thirdPartyId = process.env.NEXT_PUBLIC_ESAMUDAAY_THIRD_PARTY_ID;
    if (!thirdPartyId) {
      throw new Error('ESAMUDAAY_THIRD_PARTY_ID is not configured');
    }
    // Add +91 prefix if not present
    const formattedPhone = userData.phone.startsWith('+91') ? userData.phone : `+91${userData.phone}`;
    await auth.signup({
      ...userData,
      phone: formattedPhone,
      third_party_id: thirdPartyId,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        token,
        loading,
        login,
        logout,
        signup,
        requestOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}