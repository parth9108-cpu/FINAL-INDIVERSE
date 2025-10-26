'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Mail, Phone, MapPin, ShoppingBag, TrendingUp, Star, Calendar, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const customers = [
    { id: 1, name: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '+91 98765 43210', location: 'Mumbai, Maharashtra', orders: 12, totalSpent: 45680, lastOrder: '2 days ago', status: 'VIP', rating: 4.9 },
    { id: 2, name: 'Rahul Verma', email: 'rahul.v@email.com', phone: '+91 98765 43211', location: 'Delhi, Delhi', orders: 8, totalSpent: 23450, lastOrder: '5 days ago', status: 'Regular', rating: 4.7 },
    { id: 3, name: 'Anita Desai', email: 'anita.d@email.com', phone: '+91 98765 43212', location: 'Bangalore, Karnataka', orders: 15, totalSpent: 67890, lastOrder: '1 day ago', status: 'VIP', rating: 5.0 },
    { id: 4, name: 'Vikram Singh', email: 'vikram.s@email.com', phone: '+91 98765 43213', location: 'Jaipur, Rajasthan', orders: 5, totalSpent: 12340, lastOrder: '1 week ago', status: 'New', rating: 4.5 },
    { id: 5, name: 'Meera Patel', email: 'meera.p@email.com', phone: '+91 98765 43214', location: 'Ahmedabad, Gujarat', orders: 20, totalSpent: 89000, lastOrder: 'Today', status: 'VIP', rating: 4.8 },
  ];

  const stats = [
    { title: 'Total Customers', value: '892', change: '+12.5%', icon: ShoppingBag, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { title: 'VIP Customers', value: '45', change: '+8.2%', icon: Star, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { title: 'New This Month', value: '23', change: '+15.3%', icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-50' },
    { title: 'Avg. Order Value', value: '₹2,450', change: '+5.1%', icon: TrendingUp, color: 'text-orange-600', bgColor: 'bg-orange-50' },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Customers</h1>
        <p className="text-gray-600">Manage and engage with your customer base</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <Badge variant="secondary" className="text-green-600 bg-green-50">
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search customers by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Customers List */}
      <div className="space-y-4">
        {customers.map((customer, index) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Customer Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{customer.name}</h3>
                        <Badge variant={customer.status === 'VIP' ? 'default' : customer.status === 'New' ? 'secondary' : 'outline'}>
                          {customer.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {customer.phone}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {customer.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-6 lg:gap-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{customer.orders}</div>
                      <div className="text-xs text-gray-500">Orders</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">₹{customer.totalSpent.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Total Spent</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-lg font-bold">{customer.rating}</span>
                      </div>
                      <div className="text-xs text-gray-500">Rating</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {customer.lastOrder}
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
