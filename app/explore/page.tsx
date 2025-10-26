'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, TrendingUp, Users, Package } from 'lucide-react';
import Navbar from '@/components/navigation/navbar';
import Footer from '@/components/navigation/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getIndianStates } from '@/lib/utils';

export default function ExplorePage() {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const stateData = {
    'Rajasthan': {
      products: 2456,
      artisans: 342,
      crafts: ['Block Printing', 'Blue Pottery', 'Bandhani', 'Miniature Painting'],
      featured: ['Jaipur', 'Jodhpur', 'Udaipur'],
      description: 'Known for vibrant textiles, intricate jewelry, and traditional handicrafts.'
    },
    'Gujarat': {
      products: 1823,
      artisans: 267,
      crafts: ['Bandhani', 'Patola Silk', 'Rogan Art', 'Kutch Embroidery'],
      featured: ['Ahmedabad', 'Bhuj', 'Patan'],
      description: 'Famous for colorful textiles, mirror work, and traditional embroidery.'
    },
    'Uttar Pradesh': {
      products: 3124,
      artisans: 456,
      crafts: ['Chikankari', 'Banarasi Silk', 'Zardozi', 'Brass Work'],
      featured: ['Varanasi', 'Lucknow', 'Agra'],
      description: 'Home to exquisite silk weaving, delicate embroidery, and metalwork.'
    },
    'West Bengal': {
      products: 1956,
      artisans: 298,
      crafts: ['Kantha', 'Terracotta', 'Dokra', 'Baluchari Saree'],
      featured: ['Kolkata', 'Murshidabad', 'Bankura'],
      description: 'Renowned for traditional textiles, terracotta art, and metal casting.'
    },
    'Karnataka': {
      products: 1678,
      artisans: 234,
      crafts: ['Mysore Silk', 'Sandalwood Carving', 'Bidriware', 'Ilkal Saree'],
      featured: ['Mysore', 'Bangalore', 'Bidar'],
      description: 'Famous for silk sarees, sandalwood products, and metal inlay work.'
    },
    'Tamil Nadu': {
      products: 2234,
      artisans: 312,
      crafts: ['Kanchipuram Silk', 'Tanjore Painting', 'Bronze Casting', 'Stone Carving'],
      featured: ['Kanchipuram', 'Thanjavur', 'Mahabalipuram'],
      description: 'Known for temple art, silk weaving, and traditional bronze work.'
    }
  };

  const states = getIndianStates();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 via-white to-green-500 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <MapPin className="w-16 h-16 mx-auto mb-6 text-blue-600" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore India's Rich Heritage</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Discover authentic products from every corner of India. Each region tells a unique story through its crafts and traditions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Interactive Map of India</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Simplified Map Representation */}
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-24 h-24 text-blue-600 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Interactive map visualization</p>
                      <p className="text-sm text-gray-500">Click on states below to explore regional products</p>
                    </div>
                  </div>
                  
                  {/* Sample State Markers */}
                  <div className="absolute top-1/4 left-1/4 group cursor-pointer" onClick={() => setSelectedState('Rajasthan')}>
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                      <div className="bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                        Rajasthan
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-1/3 right-1/3 group cursor-pointer" onClick={() => setSelectedState('Uttar Pradesh')}>
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                      <div className="bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                        Uttar Pradesh
                      </div>
                    </div>
                  </div>
                </div>

                {/* State Grid */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Object.keys(stateData).map((state) => (
                    <Button
                      key={state}
                      variant={selectedState === state ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedState(state)}
                      className="text-xs"
                    >
                      {state}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Selected State Details */}
            {selectedState && stateData[selectedState as keyof typeof stateData] && (
              <Card className="mt-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">{selectedState}</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => setSelectedState(null)}>
                      Close
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6">
                    {stateData[selectedState as keyof typeof stateData].description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold">
                        {stateData[selectedState as keyof typeof stateData].products}
                      </div>
                      <div className="text-sm text-gray-600">Products</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold">
                        {stateData[selectedState as keyof typeof stateData].artisans}
                      </div>
                      <div className="text-sm text-gray-600">Artisans</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold">
                        {stateData[selectedState as keyof typeof stateData].crafts.length}
                      </div>
                      <div className="text-sm text-gray-600">Crafts</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Traditional Crafts</h4>
                    <div className="flex flex-wrap gap-2">
                      {stateData[selectedState as keyof typeof stateData].crafts.map((craft) => (
                        <Badge key={craft} variant="secondary">{craft}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Featured Cities</h4>
                    <div className="flex flex-wrap gap-2">
                      {stateData[selectedState as keyof typeof stateData].featured.map((city) => (
                        <Badge key={city} className="bg-blue-600">{city}</Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full">
                    Explore {selectedState} Products
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total States</span>
                  <span className="text-2xl font-bold">28</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Artisans</span>
                  <span className="text-2xl font-bold">50K+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Products Listed</span>
                  <span className="text-2xl font-bold">1M+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Traditional Crafts</span>
                  <span className="text-2xl font-bold">200+</span>
                </div>
              </CardContent>
            </Card>

            {/* Popular Regions */}
            <Card>
              <CardHeader>
                <CardTitle>Trending Regions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(stateData).slice(0, 5).map(([state, data]) => (
                    <button
                      key={state}
                      onClick={() => setSelectedState(state)}
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold">{state}</span>
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-sm text-gray-600">
                        {data.products} products • {data.artisans} artisans
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* All States List */}
            <Card>
              <CardHeader>
                <CardTitle>All States & UTs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {states.map((state) => (
                    <Link
                      key={state}
                      href={`/products?state=${state}`}
                      className="block p-2 rounded hover:bg-gray-50 transition text-sm"
                    >
                      {state}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
