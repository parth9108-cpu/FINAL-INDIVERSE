'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, MessageCircle, Video, FileText, HelpCircle, ChevronRight, Mail, Phone, Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const quickLinks = [
    { title: 'Getting Started', icon: Book, color: 'text-blue-600', bgColor: 'bg-blue-50', articles: 12 },
    { title: 'Product Management', icon: FileText, color: 'text-green-600', bgColor: 'bg-green-50', articles: 18 },
    { title: 'Order Processing', icon: MessageCircle, color: 'text-purple-600', bgColor: 'bg-purple-50', articles: 15 },
    { title: 'Video Tutorials', icon: Video, color: 'text-orange-600', bgColor: 'bg-orange-50', articles: 8 },
  ];

  const faqs = [
    {
      category: 'Account & Setup',
      questions: [
        { q: 'How do I verify my seller account?', a: 'To verify your account, go to Settings > Profile and upload your business documents. Verification typically takes 24-48 hours.' },
        { q: 'How can I update my store information?', a: 'Navigate to Settings > Store Settings to update your store name, description, and other details.' },
        { q: 'What documents are required for PAC verification?', a: 'You need to provide business registration, GST certificate, and artisan certification documents.' },
      ]
    },
    {
      category: 'Products & Inventory',
      questions: [
        { q: 'How do I add a new product?', a: 'Go to Products > Add New Product, fill in the details, upload images, and click Save.' },
        { q: 'What image specifications are recommended?', a: 'Use high-quality images (minimum 1000x1000px) in JPG or PNG format. Multiple angles are recommended.' },
        { q: 'How do I manage product inventory?', a: 'You can update stock levels from the Products page by clicking on any product and editing the inventory section.' },
      ]
    },
    {
      category: 'Orders & Shipping',
      questions: [
        { q: 'How do I process an order?', a: 'Go to Orders, select the order, update the status, and add tracking information if applicable.' },
        { q: 'What are the shipping guidelines?', a: 'Package items securely, use appropriate shipping materials, and provide tracking numbers within 24 hours of dispatch.' },
        { q: 'How do I handle returns?', a: 'Review the return request, approve or decline based on your policy, and process the refund if approved.' },
      ]
    },
  ];

  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold mb-2">How can we help you?</h1>
        <p className="text-gray-600 mb-6">Search for answers or browse our help topics</p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for help articles, guides, or FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg shadow-lg"
            />
          </div>
        </div>
      </motion.div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickLinks.map((link, index) => (
          <motion.div
            key={link.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6">
                <div className={`w-12 h-12 ${link.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <link.icon className={`w-6 h-6 ${link.color}`} />
                </div>
                <h3 className="font-bold text-lg mb-1">{link.title}</h3>
                <p className="text-sm text-gray-600">{link.articles} articles</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* FAQs */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-blue-600" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {faqs.map((category, catIndex) => (
                  <div key={catIndex}>
                    <h3 className="font-bold text-lg mb-3 text-blue-600">{category.category}</h3>
                    <div className="space-y-2">
                      {category.questions.map((faq, faqIndex) => {
                        const faqId = `${catIndex}-${faqIndex}`;
                        const isExpanded = expandedFaq === faqId;
                        
                        return (
                          <div key={faqIndex} className="border rounded-lg overflow-hidden">
                            <button
                              onClick={() => setExpandedFaq(isExpanded ? null : faqId)}
                              className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                            >
                              <span className="font-semibold">{faq.q}</span>
                              <ChevronRight className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                            </button>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-4 pb-4 text-gray-600 bg-gray-50"
                              >
                                {faq.a}
                              </motion.div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Contact Support */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <CardHeader>
                <CardTitle>Need More Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm opacity-90">Our support team is here to help you succeed</p>
                <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat with Support
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Email Support</p>
                    <p className="text-sm text-gray-600">support@indieverse.com</p>
                    <p className="text-xs text-gray-500 mt-1">Response within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone Support</p>
                    <p className="text-sm text-gray-600">1800-123-4567</p>
                    <p className="text-xs text-gray-500 mt-1">Mon-Sat, 9 AM - 6 PM IST</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Business Hours</p>
                    <p className="text-sm text-gray-600">Monday - Saturday</p>
                    <p className="text-xs text-gray-500 mt-1">9:00 AM - 6:00 PM IST</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-between">
                  <span>Seller Handbook</span>
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-between">
                  <span>Video Tutorials</span>
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-between">
                  <span>Community Forum</span>
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-between">
                  <span>API Documentation</span>
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
