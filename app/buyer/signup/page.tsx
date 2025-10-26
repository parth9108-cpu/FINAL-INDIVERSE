'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Mail, Lock, User, Loader2, Phone, Sparkles, Shield, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { signup, isAuthenticated, hasRole } from '@/lib/auth';

export default function BuyerSignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Redirect if already logged in as buyer
    if (isAuthenticated() && hasRole('buyer')) {
      router.push('/buyer');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate inputs
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      // Signup
      const user = signup(formData.name, formData.email, formData.password, 'buyer');
      
      // Set cookies for middleware
      document.cookie = `auth_token=${user.id}; path=/; max-age=86400`;
      document.cookie = `user_role=buyer; path=/; max-age=86400`;

      // Redirect to buyer dashboard
      router.push('/buyer');
    } catch (err) {
      setError('Failed to create account. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-teal-600 to-blue-700 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-300 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </motion.div>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link 
            href="/" 
            className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-all hover:gap-3 gap-2 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
        <Card className="shadow-2xl backdrop-blur-sm bg-white/95 border-0 overflow-hidden">
          <CardHeader className="space-y-4 pb-6 relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 via-teal-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto shadow-lg relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0"
                  animate={{
                    x: [-100, 100],
                    transition: { duration: 2, repeat: Infinity, repeatDelay: 1 }
                  }}
                />
                <ShoppingBag className="w-10 h-10 text-white relative z-10" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </motion.div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Create Buyer Account</CardTitle>
              <p className="text-gray-600 mt-2 flex items-center justify-center gap-2">
                <UserPlus className="w-4 h-4 text-green-600" />
                Start shopping authentic Indian products
              </p>
            </motion.div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                  {error}
                </motion.div>
              )}

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="text-sm font-semibold text-gray-700">Full Name *</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-green-600 transition-colors" />
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 border-2 focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all rounded-xl"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="text-sm font-semibold text-gray-700">Email *</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-green-600 transition-colors" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="buyer@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 border-2 focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all rounded-xl"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <label className="text-sm font-semibold text-gray-700">Phone (Optional)</label>
                <div className="relative group">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-green-600 transition-colors" />
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10 border-2 focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all rounded-xl"
                  />
                </div>
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <label className="text-sm font-semibold text-gray-700">Password *</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-green-600 transition-colors" />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Create a password (min. 6 characters)"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 border-2 focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all rounded-xl"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
              >
                <label className="text-sm font-semibold text-gray-700">Confirm Password *</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-green-600 transition-colors" />
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 border-2 focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all rounded-xl"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                className="text-sm text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <label className="flex items-start cursor-pointer group">
                  <input type="checkbox" className="mr-2 mt-1 w-4 h-4 accent-green-600 cursor-pointer" required />
                  <span className="group-hover:text-gray-900 transition-colors">
                    I agree to the{' '}
                    <Link href="/terms" className="text-green-600 hover:text-green-700 font-medium">
                      Terms & Conditions
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-green-600 hover:text-green-700 font-medium">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 hover:from-green-700 hover:via-teal-700 hover:to-blue-700 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Buyer Account
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="ml-2"
                      >
                        →
                      </motion.span>
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <Link href="/buyer/login" className="text-green-600 hover:text-green-700 font-semibold transition-colors">
                  Login
                </Link>
              </p>
            </motion.div>

            <motion.div
              className="mt-4 pt-4 border-t border-gray-200 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <Link href="/seller/signup" className="text-sm text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-2 group">
                Want to sell instead? <span className="text-purple-600 font-semibold group-hover:gap-3 transition-all">Sign up as Seller →</span>
              </Link>
            </motion.div>
          </CardContent>
        </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
