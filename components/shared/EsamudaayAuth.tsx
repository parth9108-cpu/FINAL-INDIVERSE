import { useState } from 'react';
import { useAuth } from '@/contexts/EsamudaayAuthContext';

export default function EsamudaayAuth() {
  const { user, loading, requestOTP, login, signup } = useAuth();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpRequested, setOtpRequested] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');

  const handleRequestOTP = async () => {
    try {
      await requestOTP(phone);
      setOtpRequested(true);
    } catch (error) {
      console.error('Error requesting OTP:', error);
    }
  };

  const handleLogin = async () => {
    try {
      await login(phone, otp);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleSignup = async () => {
    try {
      await signup({
        phone,
        email,
      });
      // After signup, request OTP for verification
      await requestOTP(phone);
      setOtpRequested(true);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return (
      <div>
        <h2>Welcome, {user.phone}</h2>
        <p>Email: {user.email || 'Not provided'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        {isSignup ? 'Create Account' : 'Login'}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter phone number"
          />
        </div>

        {isSignup && (
          <div>
            <label className="block text-sm font-medium mb-1">Email (Optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter email"
            />
          </div>
        )}

        {otpRequested ? (
          <div>
            <label className="block text-sm font-medium mb-1">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter OTP"
            />
            <button
              onClick={handleLogin}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Verify OTP
            </button>
          </div>
        ) : (
          <button
            onClick={isSignup ? handleSignup : handleRequestOTP}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isSignup ? 'Sign Up' : 'Request OTP'}
          </button>
        )}

        <button
          onClick={() => setIsSignup(!isSignup)}
          className="w-full mt-4 text-blue-600 hover:underline"
        >
          {isSignup ? 'Already have an account? Login' : 'New user? Create account'}
        </button>
      </div>
    </div>
  );
}