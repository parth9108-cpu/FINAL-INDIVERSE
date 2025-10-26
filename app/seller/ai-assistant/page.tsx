'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Upload, Wand2, CheckCircle, Image as ImageIcon, Tag, DollarSign, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function AIAssistantPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Sparkles className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold">AI Assistant</h1>
        </div>
        <p className="text-gray-600">Let AI help you create perfect product listings in seconds</p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ImageIcon className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-1">Image Recognition</h3>
            <p className="text-xs text-gray-600">AI identifies product type from images</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-1">Auto Descriptions</h3>
            <p className="text-xs text-gray-600">Generate compelling product descriptions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Tag className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-1">Smart Tags</h3>
            <p className="text-xs text-gray-600">Automatic category and tag suggestions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold mb-1">Price Optimization</h3>
            <p className="text-xs text-gray-600">AI-powered pricing recommendations</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Product Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-purple-500 transition cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop images here, or click to browse</p>
              <p className="text-sm text-gray-500">Support for JPG, PNG (Max 5MB)</p>
              <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                <Upload className="w-4 h-4 mr-2" />
                Choose Files
              </Button>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-3">Uploaded Images (3)</h4>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((idx) => (
                  <div key={idx} className="aspect-square bg-gray-200 rounded-lg relative overflow-hidden">
                    <Image
                      src={[
                        '/Handwoven Banarasi Silk Saree.jpg',
                        '/jaipuri-hand-block-print-fabric-500x500.webp',
                        '/emery-ceramic-collection-202348-0006-open-box-emery-handcrafted-ceramic-vases-z.avif'
                      ][idx - 1] || '/Handwoven Banarasi Silk Saree.jpg'}
                      alt={`Uploaded product image ${idx}`}
                      fill
                      className="object-cover"
                      sizes="150px"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-product.svg';
                      }}
                    />
                    <Badge className="absolute top-2 right-2 bg-green-500 z-10">
                      <CheckCircle className="w-3 h-3" />
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Product Details
            </Button>
          </CardContent>
        </Card>

        {/* AI Generated Content */}
        <Card>
          <CardHeader>
            <CardTitle>AI Generated Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Product Title */}
            <div>
              <label className="block text-sm font-semibold mb-2">Product Title</label>
              <Input 
                value="Handwoven Banarasi Silk Saree with Traditional Motifs"
                className="mb-2"
              />
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Generated
                </Badge>
                <Button variant="ghost" size="sm">Regenerate</Button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea 
                className="w-full border rounded-md px-3 py-2 text-sm min-h-[120px]"
                value="Exquisite handwoven Banarasi silk saree featuring traditional Mughal-inspired motifs and intricate zari work. This masterpiece represents centuries of weaving tradition from Varanasi, taking 15-20 days to create by skilled artisans."
              />
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Generated
                </Badge>
                <Button variant="ghost" size="sm">Regenerate</Button>
              </div>
            </div>

            {/* Category & Tags */}
            <div>
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select className="w-full border rounded-md px-3 py-2 text-sm mb-3">
                <option>Textiles</option>
                <option>Handicrafts</option>
                <option>Pottery</option>
                <option>Jewelry</option>
              </select>

              <label className="block text-sm font-semibold mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {['Silk', 'Handwoven', 'Banarasi', 'Traditional', 'Saree', 'Zari Work'].map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <Button variant="ghost" size="sm">
                <Sparkles className="w-3 h-3 mr-1" />
                Generate More Tags
              </Button>
            </div>

            {/* Pricing */}
            <div>
              <label className="block text-sm font-semibold mb-2">Suggested Price</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Input 
                    type="number"
                    value="8999"
                    className="mb-1"
                  />
                  <p className="text-xs text-gray-500">Recommended Price</p>
                </div>
                <div>
                  <Input 
                    type="number"
                    value="15999"
                    className="mb-1"
                  />
                  <p className="text-xs text-gray-500">Original Price</p>
                </div>
              </div>
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>AI Insight:</strong> Similar products in this category sell best at ₹8,000-₹10,000 range.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                Create Product
              </Button>
              <Button variant="outline" className="flex-1">
                Save as Draft
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tips Section */}
      <Card className="mt-8 border-purple-200 bg-purple-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-purple-900 mb-3">💡 Tips for Better Results</h3>
          <ul className="space-y-2 text-sm text-purple-800">
            <li>• Upload clear, well-lit images from multiple angles</li>
            <li>• Include close-up shots of unique details and craftsmanship</li>
            <li>• Review and customize AI-generated content to add your personal touch</li>
            <li>• Use the suggested tags to improve product discoverability</li>
            <li>• Consider the AI pricing recommendations but adjust based on your costs</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
