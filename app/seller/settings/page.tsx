'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Store, Bell, Lock, CreditCard, Globe, Palette, Shield, Mail, Phone, MapPin, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'store', label: 'Store Settings', icon: Store },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: Palette },
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
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and store preferences</p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </motion.div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                      KW
                    </div>
                    <div>
                      <Button variant="outline">Change Photo</Button>
                      <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF. Max size 2MB</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Full Name</label>
                      <Input defaultValue="Kashi Weaves" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Business Name</label>
                      <Input defaultValue="Kashi Weaves Pvt Ltd" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input defaultValue="contact@kashiweaves.com" className="pl-10" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input defaultValue="+91 98765 43210" className="pl-10" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <textarea
                        className="w-full border rounded-lg px-10 py-2 min-h-[80px]"
                        defaultValue="123 Silk Market, Varanasi, Uttar Pradesh, 221001"
                      />
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'store' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Store Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Store Name</label>
                    <Input defaultValue="Kashi Weaves" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Store Description</label>
                    <textarea
                      className="w-full border rounded-lg px-3 py-2 min-h-[120px]"
                      defaultValue="Premium handwoven silk sarees and traditional textiles from Varanasi. Each piece is crafted with love by skilled artisans."
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Category</label>
                      <select className="w-full border rounded-lg px-3 py-2">
                        <option>Textiles</option>
                        <option>Handicrafts</option>
                        <option>Pottery</option>
                        <option>Jewelry</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">State</label>
                      <select className="w-full border rounded-lg px-3 py-2">
                        <option>Uttar Pradesh</option>
                        <option>Rajasthan</option>
                        <option>Gujarat</option>
                        <option>Karnataka</option>
                      </select>
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    Update Store
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: 'New Orders', description: 'Get notified when you receive a new order' },
                    { title: 'Order Updates', description: 'Notifications about order status changes' },
                    { title: 'Customer Messages', description: 'Alert when customers send you messages' },
                    { title: 'Product Reviews', description: 'Get notified about new product reviews' },
                    { title: 'Low Stock Alerts', description: 'Alert when products are running low' },
                    { title: 'Marketing Updates', description: 'Receive tips and promotional opportunities' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Current Password</label>
                    <Input type="password" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">New Password</label>
                    <Input type="password" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Confirm New Password</label>
                    <Input type="password" />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">Update Password</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Enable 2FA</h4>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <Badge variant="outline">Not Enabled</Badge>
                  </div>
                  <Button variant="outline" className="mt-4">Enable 2FA</Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'payments' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm opacity-80">Bank Account</p>
                        <p className="text-lg font-bold">HDFC Bank</p>
                      </div>
                      <Badge className="bg-white text-blue-600">Primary</Badge>
                    </div>
                    <p className="text-sm opacity-80 mb-1">Account Number</p>
                    <p className="text-lg font-mono">**** **** **** 4567</p>
                  </div>
                  <Button variant="outline" className="w-full">Add Payment Method</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payout Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <select className="w-full border rounded-lg px-3 py-2">
                    <option>Weekly (Every Monday)</option>
                    <option>Bi-weekly</option>
                    <option>Monthly</option>
                  </select>
                  <Button className="bg-blue-600 hover:bg-blue-700 mt-4">
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'preferences' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Display Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Language</label>
                    <select className="w-full border rounded-lg px-3 py-2">
                      <option>English</option>
                      <option>हिंदी (Hindi)</option>
                      <option>தமிழ் (Tamil)</option>
                      <option>বাংলা (Bengali)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Timezone</label>
                    <select className="w-full border rounded-lg px-3 py-2">
                      <option>IST (UTC +5:30)</option>
                      <option>EST (UTC -5:00)</option>
                      <option>PST (UTC -8:00)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Currency</label>
                    <select className="w-full border rounded-lg px-3 py-2">
                      <option>INR (₹)</option>
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                    </select>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
