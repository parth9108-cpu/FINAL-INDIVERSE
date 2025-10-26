'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Store, Mail, Lock, Loader2, Sparkles, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { login, isAuthenticated, hasRole } from '@/lib/auth';

export default function SellerLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Redirect if already logged in as seller
    if (isAuthenticated() && hasRole('seller')) {
      router.push('/seller');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate inputs
      if (!email || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      // Login
      const user = login(email, password, 'seller');
      
      // Set cookies for middleware
      document.cookie = `auth_token=${user.id}; path=/; max-age=86400`;
      document.cookie = `user_role=seller; path=/; max-age=86400`;

      // Redirect to seller dashboard
      router.push('/seller');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-300 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
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
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto shadow-lg relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0"
                  animate={{
                    x: [-100, 100],
                    transition: { duration: 2, repeat: Infinity, repeatDelay: 1 }
                  }}
                />
                <Store className="w-10 h-10 text-white relative z-10" />
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
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Seller Login</CardTitle>
              <p className="text-gray-600 mt-2 flex items-center justify-center gap-2">
                <Shield className="w-4 h-4 text-purple-600" />
                Access your seller dashboard
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
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-600 transition-colors" />
                  <Input
                    type="email"
                    placeholder="seller@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-2 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all rounded-xl"
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
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-600 transition-colors" />
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-2 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all rounded-xl"
                    required
                  />
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center justify-between text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <label className="flex items-center cursor-pointer group">
                  <input type="checkbox" className="mr-2 w-4 h-4 accent-purple-600 cursor-pointer" />
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
                </label>
                <Link href="/seller/forgot-password" className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                  Forgot password?
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      Login to Dashboard
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
              transition={{ delay: 1 }}
            >
              <p className="text-gray-600 text-sm">
                Don&apos;t have a seller account?{' '}
                <Link href="/seller/signup" className="text-purple-600 hover:text-purple-700 font-semibold transition-colors">
                  Sign up
                </Link>
              </p>
            </motion.div>

            <motion.div 
              className="mt-4 pt-4 border-t border-gray-200 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <Link href="/buyer/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-2 group">
                Are you a buyer? <span className="text-green-600 font-semibold group-hover:gap-3 transition-all">Login as Buyer →</span>
              </Link>
            </motion.div>
          </CardContent>
        </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
