'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/EsamudaayAuthContext';

interface PhoneVerificationState {
  phone: string;
  otp: string;
  email?: string;
  isRegistering: boolean;
  otpSent: boolean;
  error: string | null;
  verificationStatus: 'idle' | 'sending' | 'verifying' | 'success' | 'error';
}

export default function PhoneVerification() {
  const { user, requestOTP, login, signup } = useAuth();
  const [state, setState] = useState<PhoneVerificationState>({
    phone: '',
    otp: '',
    email: '',
    isRegistering: false,
    otpSent: false,
    error: null,
    verificationStatus: 'idle',
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value.replace(/\D/g, '').slice(0, 10);
    setState(prev => ({ ...prev, phone, error: null }));
  };

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const otp = e.target.value.replace(/\D/g, '').slice(0, 6);
    setState(prev => ({ ...prev, otp, error: null }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, email: e.target.value, error: null }));
  };

  const handleRequestOTP = async () => {
    if (!state.phone || state.phone.length !== 10) {
      setState(prev => ({ ...prev, error: 'Please enter a valid 10-digit phone number' }));
      return;
    }

    try {
      setState(prev => ({ ...prev, verificationStatus: 'sending', error: null }));
      await requestOTP(state.phone);
      setState(prev => ({ ...prev, otpSent: true, verificationStatus: 'idle' }));
    } catch (error) {
      let errorMessage = 'Failed to send OTP';
      if (error instanceof Error) {
        // Check for configuration error
        if (error.message.includes('ESAMUDAAY_THIRD_PARTY_ID')) {
          errorMessage = 'Service configuration error. Please contact support.';
        } else {
          errorMessage = error.message;
        }
      }
      setState(prev => ({ 
        ...prev, 
        error: errorMessage, 
        verificationStatus: 'error',
        otpSent: false
      }));
    }
  };

  const handleVerifyOTP = async () => {
    if (!state.otp || state.otp.length !== 6) {
      setState(prev => ({ ...prev, error: 'Please enter a valid 6-digit OTP' }));
      return;
    }

    try {
      setState(prev => ({ ...prev, verificationStatus: 'verifying', error: null }));
      
      if (state.isRegistering) {
        await signup({
          phone: state.phone,
          email: state.email,
        });
      }
      
      await login(state.phone, state.otp);
      setState(prev => ({ 
        ...prev, 
        verificationStatus: 'success',
        error: null 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        verificationStatus: 'error',
        error: 'Invalid OTP. Please try again.' 
      }));
    }
  };

  if (user) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Verified Successfully</h2>
        <div className="space-y-2">
          <p>Phone: {user.phone}</p>
          {user.email && <p>Email: {user.email}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        {state.isRegistering ? 'Create Account' : 'Login'}
      </h2>

      {state.error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {state.error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">+91</div>
            <input
              type="tel"
              value={state.phone}
              onChange={handlePhoneChange}
              placeholder="Enter 10-digit phone number"
              className="w-full pl-12 p-2 border rounded focus:ring-2 focus:ring-blue-500"
              disabled={state.otpSent}
            />
          </div>
        </div>

        {state.isRegistering && !state.otpSent && (
          <div>
            <label className="block text-sm font-medium mb-1">Email (Optional)</label>
            <input
              type="email"
              value={state.email}
              onChange={handleEmailChange}
              placeholder="Enter email address"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {!state.otpSent ? (
          <button
            onClick={handleRequestOTP}
            disabled={state.verificationStatus === 'sending'}
            className={`w-full py-2 rounded text-white ${
              state.verificationStatus === 'sending'
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {state.verificationStatus === 'sending' ? 'Sending OTP...' : 'Request OTP'}
          </button>
        ) : (
          <div>
            <label className="block text-sm font-medium mb-1">Enter OTP</label>
            <input
              type="text"
              value={state.otp}
              onChange={handleOTPChange}
              placeholder="Enter 6-digit OTP"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <button
              onClick={handleVerifyOTP}
              disabled={state.verificationStatus === 'verifying'}
              className={`w-full py-2 rounded text-white ${
                state.verificationStatus === 'verifying'
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {state.verificationStatus === 'verifying' ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        )}

        <button
          onClick={() => setState(prev => ({ 
            ...prev, 
            isRegistering: !prev.isRegistering,
            error: null
          }))}
          className="w-full text-blue-600 hover:underline"
        >
          {state.isRegistering
            ? 'Already have an account? Login'
            : 'New user? Create account'}
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>Test Instructions:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Enter a valid 10-digit Indian phone number</li>
          <li>You will receive a 6-digit OTP on your phone</li>
          <li>Enter the OTP to verify your number</li>
          <li>For registration, you can optionally add an email</li>
        </ul>
      </div>
    </div>
  );
}