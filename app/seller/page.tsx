'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Package, ShoppingCart, Users, DollarSign, ArrowUpRight, Star, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function SellerDashboard() {
  const stats = [
    {
      title: 'Total Revenue',
      value: formatCurrency(245680),
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Products Listed',
      value: '156',
      change: '+3',
      trend: 'up',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Total Customers',
      value: '892',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'Priya Sharma', product: 'Banarasi Silk Saree', amount: 8999, status: 'Delivered' },
    { id: 'ORD-002', customer: 'Rahul Verma', product: 'Block Print Kurta', amount: 1499, status: 'Shipped' },
    { id: 'ORD-003', customer: 'Anita Desai', product: 'Handwoven Basket', amount: 799, status: 'Processing' },
    { id: 'ORD-004', customer: 'Vikram Singh', product: 'Pottery Set', amount: 2499, status: 'Pending' },
  ];

  const topProducts = [
    { name: 'Banarasi Silk Saree', sales: 234, revenue: 2103660, rating: 4.8 },
    { name: 'Block Print Kurta', sales: 456, revenue: 683544, rating: 4.6 },
    { name: 'Handwoven Basket', sales: 189, revenue: 151011, rating: 4.9 },
    { name: 'Pottery Set', sales: 123, revenue: 307377, rating: 4.7 },
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome back, Kashi Weaves! 👋
        </h1>
        <p className="text-gray-600 text-lg">Here's what's happening with your store today.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="card-hover border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center shadow-md`}
                    >
                      <Icon className={`w-7 h-7 ${stat.color}`} />
                    </motion.div>
                    <Badge variant={stat.trend === 'up' ? 'default' : 'destructive'} className="flex items-center space-x-1 text-xs px-3 py-1">
                      {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{stat.change}</span>
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.title}</div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Recent Orders</CardTitle>
                <Link href="/seller/orders">
                  <Button variant="ghost" size="sm" className="hover:bg-white/50">
                    View All <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {recentOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex-1">
                      <div className="font-bold text-blue-600 mb-1">{order.id}</div>
                      <div className="text-sm font-semibold text-gray-800">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.product}</div>
                    </div>
                    <div className="text-right mr-4">
                      <div className="font-bold text-lg text-gray-900">{formatCurrency(order.amount)}</div>
                    </div>
                    <Badge 
                      variant={
                        order.status === 'Delivered' ? 'default' : 
                        order.status === 'Shipped' ? 'secondary' : 
                        'outline'
                      }
                      className="px-3 py-1"
                    >
                      {order.status}
                    </Badge>
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
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/seller/products" className="block">
                  <Button className="w-full justify-between bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur">
                    <div className="flex items-center">
                      <Package className="w-4 h-4 mr-2" />
                      Add New Product
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/seller/orders" className="block">
                  <Button className="w-full justify-between bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur">
                    <div className="flex items-center">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Process Orders
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/seller/customers" className="block">
                  <Button className="w-full justify-between bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      View Customers
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/seller/products" className="block">
                  <Button className="w-full justify-between bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-2" />
                      Manage Reviews
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardHeader className="border-b bg-gradient-to-r from-green-50 to-blue-50">
              <CardTitle className="text-xl flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                Top Performing Products
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {topProducts.map((product, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + idx * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50/30 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 mb-1">{product.name}</div>
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <span className="font-semibold">{product.sales} sales</span>
                        <span>•</span>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                          <span className="font-semibold">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-green-600">{formatCurrency(product.revenue)}</div>
                      <div className="text-xs text-gray-500 font-medium">Revenue</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sales by Region */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardHeader className="border-b bg-gradient-to-r from-orange-50 to-purple-50">
              <CardTitle className="text-xl flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                Sales by Region
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-5">
                {[
                  { state: 'Maharashtra', sales: 45234, percentage: 28, color: 'from-blue-500 to-blue-600' },
                  { state: 'Delhi', sales: 38456, percentage: 24, color: 'from-purple-500 to-purple-600' },
                  { state: 'Karnataka', sales: 32189, percentage: 20, color: 'from-green-500 to-green-600' },
                  { state: 'Tamil Nadu', sales: 28934, percentage: 18, color: 'from-orange-500 to-orange-600' },
                  { state: 'Gujarat', sales: 16123, percentage: 10, color: 'from-pink-500 to-pink-600' },
                ].map((region, idx) => (
                  <motion.div
                    key={region.state}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + idx * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold text-gray-900">{region.state}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-700">{formatCurrency(region.sales)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${region.percentage}%` }}
                        transition={{ duration: 1, delay: 0.9 + idx * 0.1 }}
                        className={`bg-gradient-to-r ${region.color} h-3 rounded-full shadow-sm`}
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mt-6"
      >
        <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          <CardContent className="p-8 relative z-10">
            <div className="flex items-start space-x-4">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl mb-2 flex items-center gap-2">
                  AI-Powered Insights
                  <Badge className="bg-white/20 text-white border-0">New</Badge>
                </h3>
                <p className="text-white/90 mb-4 text-lg">
                  Demand for handmade pottery is up 20% this month. Consider increasing your inventory and running a promotional campaign.
                </p>
                <Link href="/seller/ai-assistant">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold shadow-lg">
                    View Detailed Analysis
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
