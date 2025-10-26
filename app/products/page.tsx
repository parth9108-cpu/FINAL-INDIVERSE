'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Filter, SlidersHorizontal, Heart, Star, CheckCircle, MapPin } from 'lucide-react';
import Navbar from '@/components/navigation/navbar';
import Footer from '@/components/navigation/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { generateMockProducts, formatCurrency, getIndianStates } from '@/lib/utils';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);
  
  // Real products that match the product detail page
  const allProducts = [
    { id: '1', name: 'Handwoven Banarasi Silk Saree', price: 8999, originalPrice: 15999, rating: 4.8, reviews: 234, seller: 'Kashi Weaves', state: 'Uttar Pradesh', category: 'Textiles', verified: true, image: '/Handwoven Banarasi Silk Saree.jpg' },
    { id: '2', name: 'Traditional Block Print Fabric', price: 2499, originalPrice: 4999, rating: 4.6, reviews: 156, seller: 'Artisan 2', state: 'Rajasthan', category: 'Textiles', verified: true, image: '/jaipuri-hand-block-print-fabric-500x500.webp' },
    { id: '3', name: 'Madhubani Folk Art Painting', price: 1499, originalPrice: 2999, rating: 4.7, reviews: 145, seller: 'Bihar Artisans', state: 'Bihar', category: 'Art', verified: true, image: '/Madhubani Folk Art Painting.jpg' },
    { id: '4', name: 'Ceramic Pottery Set', price: 899, originalPrice: 1799, rating: 4.8, reviews: 89, seller: 'Artisan 3', state: 'Karnataka', category: 'Pottery', verified: true, image: '/emery-ceramic-collection-202348-0006-open-box-emery-handcrafted-ceramic-vases-z.avif' },
    { id: '5', name: 'Organic Indian Spice Collection', price: 599, originalPrice: 999, rating: 4.9, reviews: 287, seller: 'Kerala Spice Co.', state: 'Kerala', category: 'Spices', verified: true, image: '/various-organic-indian-spices-powder-photography-cuisine_753390-10068.jpg' },
    { id: '6', name: 'Pure Cotton Khadi Kurta', price: 1299, originalPrice: 2499, rating: 4.9, reviews: 203, seller: 'Khadi Collective', state: 'Gujarat', category: 'Textiles', verified: true, image: '/Pure Cotton Khadi Kurta.webp' },
    ...generateMockProducts(18).map((p, idx) => ({ ...p, id: String(idx + 7) }))
  ];

  const products = allProducts;
  const categories = ['All', 'Textiles', 'Handicrafts', 'Pottery', 'Jewelry', 'Spices', 'Art'];
  const states = ['All', ...getIndianStates()];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-2">Discover Authentic Indian Products</h1>
          <p className="text-gray-600">Explore {products.length}+ verified products from artisans across India</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <Button variant="ghost" size="sm">Clear All</Button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* State Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Region</h4>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  >
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {['Under ₹500', '₹500 - ₹1000', '₹1000 - ₹2500', 'Above ₹2500'].map((range) => (
                      <label key={range} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Verification */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Verification</h4>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">PAC Verified Only</span>
                  </label>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="font-semibold mb-3">Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-blue-600" />
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm ml-1">{rating}+ Stars</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4 flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Sort
              </Button>
            </div>

            {/* Sort Bar */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-gray-600">{products.length} products found</p>
              <select className="border rounded-md px-4 py-2 text-sm">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
                <option>Rating: High to Low</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <Card className="card-hover overflow-hidden h-full">
                    <div className="relative aspect-square bg-gray-200 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-product.svg';
                        }}
                      />
                      <div className="absolute top-2 right-2 z-10">
                        <Button size="icon" variant="ghost" className="bg-white/80 hover:bg-white">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      {product.verified && (
                        <Badge className="absolute top-2 left-2 bg-green-500">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          PAC Verified
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPin className="w-3 h-3 mr-1" />
                        {product.state}
                      </div>
                      <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">by {product.seller}</p>
                      <div className="flex items-center mb-3">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm ml-1">{product.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold">{formatCurrency(product.price)}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {formatCurrency(product.originalPrice)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <Button variant="outline" disabled>Previous</Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
