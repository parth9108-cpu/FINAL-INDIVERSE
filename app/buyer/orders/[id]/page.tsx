'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useParams } from 'next/navigation';

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.id as string;

  const handleDownloadInvoice = () => {
    // Create invoice content
    const order = orderData[orderId] || orderData['1'];
    const invoiceContent = `
      INVOICE
      
      IndieVerse - Indian Commerce Ecosystem
      Order ID: ${order.orderId}
      Date: ${new Date().toLocaleDateString()}
      
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      
      CUSTOMER DETAILS:
      Name: John Doe
      Email: john.doe@example.com
      Phone: +91 98765 43210
      
      DELIVERY ADDRESS:
      123 Main Street, Apartment 4B
      Mumbai, Maharashtra 400001
      India
      
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      
      ORDER DETAILS:
      
      Product: ${order.name}
      Seller: ${order.seller}
      Quantity: ${order.quantity}
      Price: ${order.price}
      
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      
      PAYMENT SUMMARY:
      Subtotal: ${order.price}
      Shipping: FREE
      Tax (18%): ₹${Math.round(parseInt(order.price.replace(/[₹,]/g, '')) * 0.18)}
      
      Total: ₹${Math.round(parseInt(order.price.replace(/[₹,]/g, '')) * 1.18).toLocaleString()}
      
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      
      Status: ${order.status}
      Tracking ID: ${order.trackingId}
      Order Date: ${order.orderDate}
      Expected Delivery: ${order.expectedDelivery}
      
      Thank you for shopping with IndieVerse!
      Supporting Indian Artisans & Craftsmen
    `;

    // Create blob and download
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice-${order.orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleGetSupport = () => {
    const order = orderData[orderId] || orderData['1'];
    const subject = encodeURIComponent(`Support Request - Order ${order.orderId}`);
    const body = encodeURIComponent(`Hi IndieVerse Support Team,\n\nI need assistance with my order:\n\nOrder ID: ${order.orderId}\nProduct: ${order.name}\nTracking ID: ${order.trackingId}\n\nIssue: [Please describe your issue here]\n\nThank you!`);
    window.location.href = `mailto:support@indieverse.com?subject=${subject}&body=${body}`;
  };

  // Mock order data - in real app, fetch based on orderId
  const orderData: Record<string, any> = {
    '1': {
      id: '1',
      name: 'Handwoven Silk Saree',
      image: '/Handwoven Banarasi Silk Saree.jpg',
      price: '₹4,999',
      quantity: 1,
      status: 'Delivered',
      orderDate: '2024-10-20',
      deliveredDate: '2024-10-25',
      expectedDelivery: '2024-10-25',
      description: 'Beautiful handwoven Banarasi silk saree with traditional motifs and intricate craftsmanship.',
      seller: 'Banarasi Silk House',
      orderId: '#ORD-2024-10001',
      trackingId: 'TRK123456789IN',
      currentStep: 4,
    },
    '2': {
      id: '2',
      name: 'Block Print Fabric',
      image: '/jaipuri-hand-block-print-fabric-500x500.webp',
      price: '₹799',
      quantity: 2,
      status: 'In Transit',
      orderDate: '2024-10-23',
      expectedDelivery: '2024-10-28',
      description: 'Premium Jaipuri hand block printed fabric with traditional designs.',
      seller: 'Jaipur Handicrafts',
      orderId: '#ORD-2024-10002',
      trackingId: 'TRK987654321IN',
      currentStep: 2,
    },
    '3': {
      id: '3',
      name: 'Madhubani Painting',
      image: '/Madhubani Folk Art Painting.jpg',
      price: '₹1,499',
      quantity: 1,
      status: 'Processing',
      orderDate: '2024-10-24',
      expectedDelivery: '2024-10-30',
      description: 'Authentic Madhubani folk art painting featuring traditional Bihar art style.',
      seller: 'Bihar Art Gallery',
      orderId: '#ORD-2024-10003',
      trackingId: 'TRK456789123IN',
      currentStep: 1,
    },
  };

  const order = orderData[orderId] || orderData['1'];

  const trackingSteps = [
    { label: 'Order Placed', icon: Package, date: order.orderDate },
    { label: 'Processing', icon: Clock, date: order.orderDate },
    { label: 'Shipped', icon: Truck, date: order.currentStep >= 2 ? '2024-10-24' : '' },
    { label: 'Out for Delivery', icon: MapPin, date: order.currentStep >= 3 ? '2024-10-25' : '' },
    { label: 'Delivered', icon: CheckCircle, date: order.deliveredDate || '' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-green-50/30 to-blue-50/30">
      {/* Header */}
      <motion.div 
        className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/buyer/orders" className="inline-flex items-center text-gray-600 hover:text-green-600 transition-all gap-2 group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to Orders</span>
          </Link>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Order Details
              </h1>
              <p className="text-gray-600">Order ID: {order.orderId}</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleDownloadInvoice}
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Product Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <motion.div 
                      className="w-32 h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl overflow-hidden relative flex-shrink-0"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Image 
                        src={order.image} 
                        alt={order.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </motion.div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{order.name}</h2>
                      <p className="text-gray-600 mb-3">{order.description}</p>
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-sm text-gray-600">Quantity: <span className="font-semibold">{order.quantity}</span></span>
                        <span className="text-sm text-gray-600">Seller: <span className="font-semibold text-green-600">{order.seller}</span></span>
                      </div>
                      <div className="text-3xl font-bold text-green-600">{order.price}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tracking Timeline */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 border-b border-green-100">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent font-bold">
                      Order Tracking
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Progress</span>
                      <span className="text-sm font-bold text-green-600">
                        {Math.round((order.currentStep / (trackingSteps.length - 1)) * 100)}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-green-500 to-teal-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(order.currentStep / (trackingSteps.length - 1)) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Timeline Steps */}
                  <div className="space-y-6">
                    {trackingSteps.map((step, idx) => {
                      const isCompleted = idx <= order.currentStep;
                      const isCurrent = idx === order.currentStep;
                      
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + idx * 0.1 }}
                          className="flex items-start gap-4"
                        >
                          <motion.div 
                            className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                              isCompleted 
                                ? 'bg-gradient-to-br from-green-500 to-teal-500 shadow-lg' 
                                : 'bg-gray-200'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                            transition={isCurrent ? { duration: 2, repeat: Infinity } : {}}
                          >
                            <step.icon className={`w-6 h-6 ${isCompleted ? 'text-white' : 'text-gray-400'}`} />
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className={`font-bold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                                {step.label}
                              </h3>
                              {isCurrent && (
                                <motion.span 
                                  className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full"
                                  animate={{ scale: [1, 1.05, 1] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                  Current
                                </motion.span>
                              )}
                            </div>
                            {step.date && (
                              <p className="text-sm text-gray-600 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(step.date).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Tracking ID */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-200">
                    <p className="text-sm text-gray-600 mb-1">Tracking ID</p>
                    <p className="font-mono font-bold text-green-600">{order.trackingId}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Delivery Info */}
          <div className="space-y-6">
            {/* Expected Delivery */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-0 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-8 h-8" />
                    <h3 className="text-xl font-bold">Expected Delivery</h3>
                  </div>
                  <p className="text-3xl font-bold">
                    {new Date(order.expectedDelivery).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                  <p className="text-blue-100 mt-2">
                    {order.status === 'Delivered' ? 'Delivered on time!' : 'Estimated delivery date'}
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Order Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                  <CardTitle className="text-lg">Order Status</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full font-semibold ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status === 'Delivered' && <CheckCircle className="w-5 h-5 mr-2" />}
                    {order.status === 'In Transit' && <Truck className="w-5 h-5 mr-2" />}
                    {order.status === 'Processing' && <Clock className="w-5 h-5 mr-2" />}
                    {order.status}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Delivery Address */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">John Doe</p>
                    <p className="text-gray-600 text-sm mt-1">
                      123 Main Street, Apartment 4B<br />
                      Mumbai, Maharashtra 400001<br />
                      India
                    </p>
                  </div>
                  <div className="pt-3 border-t space-y-2">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-green-600" />
                      <span className="font-medium">+91 98765 43210</span>
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-green-600" />
                      <span className="font-medium">john.doe@example.com</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-50 to-red-50">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-4">Contact our customer support</p>
                  <Button 
                    onClick={handleGetSupport}
                    variant="outline" 
                    className="w-full border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white"
                  >
                    Get Support
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
