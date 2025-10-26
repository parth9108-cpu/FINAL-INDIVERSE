'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Trash2, Plus, Minus, Tag, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/navigation/navbar';
import Footer from '@/components/navigation/footer';

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Handwoven Silk Saree', price: 4999, quantity: 1, image: '/Handwoven Banarasi Silk Saree.jpg', seller: 'Banarasi Silk House' },
    { id: '2', name: 'Block Print Fabric', price: 799, quantity: 2, image: '/jaipuri-hand-block-print-fabric-500x500.webp', seller: 'Jaipur Handicrafts' },
    { id: '3', name: 'Ceramic Vase', price: 1299, quantity: 1, image: '/emery-ceramic-collection-202348-0006-open-box-emery-handcrafted-ceramic-vases-z.avif', seller: 'Pottery Studio' },
  ]);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-100 to-pink-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-4 transition-all gap-2 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
            <ShoppingBag className="w-10 h-10 text-blue-600" />
            Shopping Cart ({cartItems.length} items)
          </h1>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <Card className="max-w-md mx-auto border-0 shadow-xl">
              <CardContent className="p-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                <p className="text-gray-600 mb-6">Add some amazing products to get started!</p>
                <Link href="/products">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Browse Products
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl overflow-hidden relative flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="128px"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-xl text-gray-900">{item.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">by {item.seller}</p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 p-2"
                            >
                              <Trash2 className="w-5 h-5" />
                            </motion.button>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-blue-50 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </motion.button>
                              <span className="w-12 text-center font-semibold">{item.quantity}</span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-blue-50 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </motion.button>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">₹{item.price.toLocaleString()} each</p>
                              <p className="text-2xl font-bold text-blue-600">
                                ₹{(item.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24 space-y-6"
              >
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="font-semibold">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Tax (18%)</span>
                        <span className="font-semibold">₹{tax.toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-xl font-bold text-gray-900">
                          <span>Total</span>
                          <span className="text-green-600">₹{total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-6 rounded-xl shadow-lg"
                        onClick={() => router.push('/checkout')}
                      >
                        Proceed to Checkout
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>

                {/* Benefits */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-teal-50">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Truck className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Free Shipping</p>
                        <p className="text-sm text-gray-600">On orders above ₹5,000</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Secure Payment</p>
                        <p className="text-sm text-gray-600">100% secure transactions</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <Tag className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Best Prices</p>
                        <p className="text-sm text-gray-600">Directly from artisans</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
