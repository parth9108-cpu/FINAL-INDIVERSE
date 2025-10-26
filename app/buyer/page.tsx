'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShoppingBag, Package, Heart, User, MapPin, Star, TrendingUp, Sparkles, ArrowRight, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCurrentUser } from '@/lib/auth';

export default function BuyerDashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'buyer') {
      router.push('/buyer/login');
    } else {
      setUser(currentUser);
    }
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  const stats = [
    { title: 'Orders', value: '12', icon: Package, color: 'from-blue-500 to-blue-600', bgGradient: 'from-blue-50 to-blue-100' },
    { title: 'Wishlist', value: '28', icon: Heart, color: 'from-pink-500 to-pink-600', bgGradient: 'from-pink-50 to-pink-100' },
    { title: 'Cart Items', value: '5', icon: ShoppingBag, color: 'from-green-500 to-green-600', bgGradient: 'from-green-50 to-green-100' },
    { title: 'Rewards', value: '₹250', icon: TrendingUp, color: 'from-purple-500 to-purple-600', bgGradient: 'from-purple-50 to-purple-100' },
  ];

  const recentOrders = [
    { id: '1', name: 'Handwoven Silk Saree', status: 'Delivered', date: '2024-10-20', price: '₹4,999' },
    { id: '2', name: 'Block Print Fabric', status: 'In Transit', date: '2024-10-23', price: '₹799' },
    { id: '3', name: 'Madhubani Painting', status: 'Processing', date: '2024-10-24', price: '₹1,499' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-100 to-pink-100 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-green-400/30 to-teal-400/30 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-pink-400/30 to-orange-400/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>
      {/* Header */}
      <motion.div 
        className="bg-white/90 backdrop-blur-xl border-b border-purple-200/50 sticky top-0 z-50 shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div 
                className="w-10 h-10 bg-gradient-to-br from-orange-500 via-white to-green-500 rounded-lg flex items-center justify-center font-bold text-blue-600 shadow-md"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                IV
              </motion.div>
              <span className="text-xl font-bold group-hover:text-green-600 transition-colors">IndieVerse</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/products">
                <Button variant="ghost" className="hover:bg-green-50 hover:text-green-600 transition-all">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Browse Products
                </Button>
              </Link>
              <Link href="/buyer/profile">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-green-50">
                    <User className="w-5 h-5" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Welcome Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Welcome back, {user.name}!
            </h1>
            <motion.div
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Sparkles className="w-8 h-8 text-yellow-500" />
            </motion.div>
          </div>
          <p className="text-gray-600 text-lg flex items-center gap-2">
            <Gift className="w-5 h-5 text-green-600" />
            Here&apos;s what&apos;s happening with your orders
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer bg-gradient-to-br ${stat.bgGradient}`}>
                <CardContent className="pt-6 relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/40"
                    initial={{ x: '-100%', opacity: 0 }}
                    whileHover={{ x: '100%', opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm text-gray-700 mb-2 font-semibold">{stat.title}</p>
                      <motion.p 
                        className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + idx * 0.1, type: "spring" }}
                      >
                        {stat.value}
                      </motion.p>
                    </div>
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="w-8 h-8 text-white drop-shadow-lg" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-green-50/30 to-blue-50/30">
              <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 border-b border-green-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent font-bold">Recent Orders</span>
                  </CardTitle>
                  <Link href="/buyer/orders">
                    <Button variant="link" className="text-green-600 hover:text-green-700 group font-semibold">
                      View All
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentOrders.map((order, idx) => (
                    <motion.div 
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + idx * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="group"
                    >
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-green-50/30 rounded-xl hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-green-200">
                        <div className="flex items-center space-x-4">
                          <motion.div 
                            className="w-14 h-14 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center"
                            whileHover={{ rotate: 10 }}
                          >
                            <Package className="w-6 h-6 text-green-600" />
                          </motion.div>
                          <div>
                            <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">{order.name}</h4>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-900">{order.price}</p>
                          <motion.p 
                            className={`text-sm font-medium px-3 py-1 rounded-full inline-block ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                              order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {order.status}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="border-0 shadow-2xl sticky top-24 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 opacity-60"></div>
              <CardHeader className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm border-b border-purple-300 relative">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <motion.div 
                    className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-7 h-7 text-purple-600" />
                  </motion.div>
                  <span className="text-white font-bold drop-shadow-lg">Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-6 relative">
                {[
                  { href: '/products', icon: ShoppingBag, label: 'Browse Products', gradient: 'from-green-500 to-emerald-600' },
                  { href: '/buyer/orders', icon: Package, label: 'My Orders', gradient: 'from-blue-500 to-indigo-600' },
                  { href: '/buyer/wishlist', icon: Heart, label: 'Wishlist', gradient: 'from-pink-500 to-rose-600' },
                  { href: '/buyer/profile', icon: User, label: 'Profile Settings', gradient: 'from-purple-500 to-violet-600' },
                  { href: '/explore', icon: MapPin, label: 'Explore India', gradient: 'from-orange-500 to-red-600' },
                ].map((action, idx) => (
                  <motion.div
                    key={action.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    whileHover={{ scale: 1.03, x: 8 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href={action.href}>
                      <Button 
                        className="w-full justify-start bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 border-0 hover:shadow-xl transition-all group h-14 rounded-xl"
                        variant="outline"
                      >
                        <motion.div 
                          className={`w-10 h-10 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center mr-4 shadow-lg`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <action.icon className="w-5 h-5 text-white" />
                        </motion.div>
                        <span className="font-bold text-base">{action.label}</span>
                        <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-purple-600" />
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Card className="mt-6 border-0 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    Recommended for You
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    {[
                      { id: '4', name: 'Ceramic Pottery Set', rating: 4.8, price: '₹899' },
                      { id: '6', name: 'Khadi Cotton Kurta', rating: 4.9, price: '₹1,299' }
                    ].map((product, idx) => (
                      <Link key={product.id} href={`/product/${product.id}`}>
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.1 + idx * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className="group cursor-pointer"
                        >
                          <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all">
                            <motion.div 
                              className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center"
                              whileHover={{ rotate: 5 }}
                            >
                              <ShoppingBag className="w-8 h-8 text-green-600" />
                            </motion.div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm group-hover:text-green-600 transition-colors">{product.name}</h4>
                              <div className="flex items-center mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-3 h-3 ${
                                      i < Math.floor(product.rating) 
                                        ? 'text-yellow-400 fill-current' 
                                        : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                                <span className="text-xs ml-1 font-medium">{product.rating}</span>
                              </div>
                              <p className="text-base font-bold mt-1 text-green-600">{product.price}</p>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
