'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, Search, Filter, X, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function BuyerOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const allOrders = [
    { id: '1', name: 'Handwoven Silk Saree', status: 'Delivered', date: '2024-10-20', price: '₹4,999', priceValue: 4999, image: '/Handwoven Banarasi Silk Saree.jpg' },
    { id: '2', name: 'Block Print Fabric', status: 'In Transit', date: '2024-10-23', price: '₹799', priceValue: 799, image: '/jaipuri-hand-block-print-fabric-500x500.webp' },
    { id: '3', name: 'Madhubani Painting', status: 'Processing', date: '2024-10-24', price: '₹1,499', priceValue: 1499, image: '/Madhubani Folk Art Painting.jpg' },
    { id: '4', name: 'Ceramic Vase', status: 'Delivered', date: '2024-10-15', price: '₹1,299', priceValue: 1299, image: '/emery-ceramic-collection-202348-0006-open-box-emery-handcrafted-ceramic-vases-z.avif' },
  ];

  // Filter orders based on all criteria
  const filteredOrders = useMemo(() => {
    return allOrders.filter(order => {
      // Search filter
      const matchesSearch = order.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Status filter
      const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
      
      // Price filter
      let matchesPrice = true;
      if (priceRange === 'under-1000') matchesPrice = order.priceValue < 1000;
      else if (priceRange === '1000-3000') matchesPrice = order.priceValue >= 1000 && order.priceValue <= 3000;
      else if (priceRange === 'above-3000') matchesPrice = order.priceValue > 3000;
      
      // Date filter
      let matchesDate = true;
      if (dateFilter === 'last-7-days') {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        matchesDate = new Date(order.date) >= weekAgo;
      } else if (dateFilter === 'last-30-days') {
        const monthAgo = new Date();
        monthAgo.setDate(monthAgo.getDate() - 30);
        matchesDate = new Date(order.date) >= monthAgo;
      } else if (dateFilter === 'last-90-days') {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setDate(threeMonthsAgo.getDate() - 90);
        matchesDate = new Date(order.date) >= threeMonthsAgo;
      }
      
      return matchesSearch && matchesStatus && matchesPrice && matchesDate;
    });
  }, [searchQuery, selectedStatus, priceRange, dateFilter]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedStatus('all');
    setPriceRange('all');
    setDateFilter('all');
  };

  const activeFiltersCount = [
    selectedStatus !== 'all',
    priceRange !== 'all',
    dateFilter !== 'all',
    searchQuery !== ''
  ].filter(Boolean).length;

  const orders = filteredOrders;

  const getStatusIcon = (status: string) => {
    if (status === 'Delivered') return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (status === 'In Transit') return <Truck className="w-5 h-5 text-blue-600" />;
    return <Package className="w-5 h-5 text-yellow-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/20 to-blue-50/20">
      <motion.div 
        className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/buyer" className="inline-flex items-center text-gray-600 hover:text-green-600 transition-all gap-2 group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
                <Package className="w-10 h-10 text-green-600" />
                My Orders
              </h1>
              <p className="text-gray-600">
                {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
                {activeFiltersCount > 0 && ` (${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} active)`}
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="relative"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-green-50/30 to-blue-50/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Filter className="w-5 h-5 text-green-600" />
                    Filter Orders
                  </h3>
                  {activeFiltersCount > 0 && (
                    <Button 
                      onClick={clearAllFilters}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Clear All
                    </Button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Search */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      Search
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search by product name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 border-2 focus:border-green-500"
                      />
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Status
                    </label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    >
                      <option value="all">All Status</option>
                      <option value="Delivered">Delivered</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Processing">Processing</option>
                    </select>
                  </div>

                  {/* Price Range Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Price Range
                    </label>
                    <select
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    >
                      <option value="all">All Prices</option>
                      <option value="under-1000">Under ₹1,000</option>
                      <option value="1000-3000">₹1,000 - ₹3,000</option>
                      <option value="above-3000">Above ₹3,000</option>
                    </select>
                  </div>

                  {/* Date Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Order Date
                    </label>
                    <select
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    >
                      <option value="all">All Time</option>
                      <option value="last-7-days">Last 7 Days</option>
                      <option value="last-30-days">Last 30 Days</option>
                      <option value="last-90-days">Last 90 Days</option>
                    </select>
                  </div>
                </div>

                {/* Active Filters Display */}
                {activeFiltersCount > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex flex-wrap gap-2">
                      {searchQuery && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          Search: "{searchQuery}"
                          <button onClick={() => setSearchQuery('')} className="hover:bg-green-200 rounded-full p-0.5">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                      {selectedStatus !== 'all' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          Status: {selectedStatus}
                          <button onClick={() => setSelectedStatus('all')} className="hover:bg-blue-200 rounded-full p-0.5">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                      {priceRange !== 'all' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                          Price: {priceRange === 'under-1000' ? 'Under ₹1,000' : priceRange === '1000-3000' ? '₹1,000-₹3,000' : 'Above ₹3,000'}
                          <button onClick={() => setPriceRange('all')} className="hover:bg-purple-200 rounded-full p-0.5">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                      {dateFilter !== 'all' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                          Date: {dateFilter.replace('-', ' ')}
                          <button onClick={() => setDateFilter('all')} className="hover:bg-orange-200 rounded-full p-0.5">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Orders List */}
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Card className="border-0 shadow-xl">
              <CardContent className="p-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders found</h2>
                <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
                {activeFiltersCount > 0 && (
                  <Button onClick={clearAllFilters} className="bg-gradient-to-r from-green-600 to-teal-600">
                    Clear All Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="space-y-3">
          {orders.map((order, idx) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden group">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                    {/* Product Image */}
                    <motion.div 
                      className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl overflow-hidden shadow-md relative flex-shrink-0"
                      whileHover={{ scale: 1.05, rotate: 2 }}
                    >
                      <Image 
                        src={order.image} 
                        alt={order.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 80px, 96px"
                      />
                    </motion.div>
                    
                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg sm:text-xl text-gray-900 group-hover:text-green-600 transition-colors line-clamp-1">
                        {order.name}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                          <span className="truncate">{order.date}</span>
                        </div>
                        
                        <motion.div 
                          className="flex items-center"
                          whileHover={{ scale: 1.03 }}
                        >
                          {getStatusIcon(order.status)}
                          <span className={`text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status}
                          </span>
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Price and Action */}
                    <div className="flex flex-col items-end justify-between sm:ml-4 mt-2 sm:mt-0">
                      <p className="text-xl sm:text-2xl font-bold text-green-600 whitespace-nowrap">
                        {order.price}
                      </p>
                      <Link href={`/buyer/orders/${order.id}`} className="w-full sm:w-auto">
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="w-full sm:w-auto border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all font-semibold text-sm sm:text-base"
                          >
                            View Details
                          </Button>
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}
