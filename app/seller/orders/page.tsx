'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, Search, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

export default function SellerOrdersPage() {
  const orders = [
    {
      id: 'ORD-001234',
      customer: 'Priya Sharma',
      date: '2024-01-15',
      products: 2,
      amount: 10498,
      status: 'delivered',
      tracking: 'TRK123456789'
    },
    {
      id: 'ORD-001235',
      customer: 'Rahul Verma',
      date: '2024-01-16',
      products: 1,
      amount: 1499,
      status: 'shipped',
      tracking: 'TRK123456790'
    },
    {
      id: 'ORD-001236',
      customer: 'Anita Desai',
      date: '2024-01-16',
      products: 3,
      amount: 4297,
      status: 'processing',
      tracking: null
    },
    {
      id: 'ORD-001237',
      customer: 'Vikram Singh',
      date: '2024-01-17',
      products: 1,
      amount: 2499,
      status: 'pending',
      tracking: null
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      delivered: { variant: 'default', icon: CheckCircle },
      shipped: { variant: 'secondary', icon: Truck },
      processing: { variant: 'warning', icon: Package },
      pending: { variant: 'outline', icon: Clock },
    };
    
    const config = variants[status];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center space-x-1">
        <Icon className="w-3 h-3" />
        <span className="capitalize">{status}</span>
      </Badge>
    );
  };

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-2">Orders</h1>
        <p className="text-gray-600">Manage and track your orders</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">18</div>
                  <div className="text-sm text-gray-600">Processing</div>
                </div>
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">32</div>
                  <div className="text-sm text-gray-600">Shipped</div>
                </div>
                <Truck className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-sm text-gray-600">Delivered</div>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
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
                placeholder="Search by order ID, customer name..."
                className="pl-10"
              />
            </div>
            <select className="border rounded-md px-4 py-2 text-sm">
              <option>All Status</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
          >
            <Card className="card-hover transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-lg">{order.id}</h3>
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Customer: <span className="font-medium">{order.customer}</span></div>
                    <div>Date: {new Date(order.date).toLocaleDateString('en-IN')}</div>
                    <div>Products: {order.products} items</div>
                    {order.tracking && (
                      <div>Tracking: <span className="font-mono text-blue-600">{order.tracking}</span></div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold">{formatCurrency(order.amount)}</div>
                    <div className="text-sm text-gray-600">Total Amount</div>
                  </div>
                  <Button variant="outline">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <motion.div 
        className="mt-6 flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1 }}
      >
        <p className="text-sm text-gray-600">Showing 1 to 4 of 230 orders</p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </motion.div>
    </div>
  );
}
