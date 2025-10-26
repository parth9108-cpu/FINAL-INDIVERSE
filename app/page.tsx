'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shield, Sparkles, TrendingUp, MapPin, Heart, Star, CheckCircle } from 'lucide-react';
import Navbar from '@/components/navigation/navbar';
import Footer from '@/components/navigation/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { generateMockProducts, formatCurrency } from '@/lib/utils';

export default function HomePage() {
  // Use the same products as the products page for consistency
  const featuredProducts = [
    { id: '1', name: 'Handwoven Banarasi Silk Saree', price: 8999, originalPrice: 15999, rating: 4.8, reviews: 234, seller: 'Kashi Weaves', state: 'Uttar Pradesh', category: 'Textiles', verified: true, image: '/Handwoven Banarasi Silk Saree.jpg' },
    { id: '2', name: 'Traditional Block Print Fabric', price: 2499, originalPrice: 4999, rating: 4.6, reviews: 156, seller: 'Rajasthan Crafts', state: 'Rajasthan', category: 'Textiles', verified: true, image: '/jaipuri-hand-block-print-fabric-500x500.webp' },
    { id: '3', name: 'Madhubani Folk Art Painting', price: 1499, originalPrice: 2999, rating: 4.7, reviews: 145, seller: 'Bihar Artisans', state: 'Bihar', category: 'Art', verified: true, image: '/Madhubani Folk Art Painting.jpg' },
    { id: '4', name: 'Handcrafted Ceramic Pottery Set', price: 899, originalPrice: 1799, rating: 4.8, reviews: 89, seller: 'Karnataka Pottery', state: 'Karnataka', category: 'Pottery', verified: true, image: '/emery-ceramic-collection-202348-0006-open-box-emery-handcrafted-ceramic-vases-z.avif' },
    { id: '5', name: 'Organic Indian Spice Collection', price: 599, originalPrice: 999, rating: 4.9, reviews: 287, seller: 'Kerala Spice Co.', state: 'Kerala', category: 'Spices', verified: true, image: '/various-organic-indian-spices-powder-photography-cuisine_753390-10068.jpg' },
    { id: '6', name: 'Pure Cotton Khadi Kurta', price: 1299, originalPrice: 2499, rating: 4.9, reviews: 203, seller: 'Khadi Collective', state: 'Gujarat', category: 'Textiles', verified: true, image: '/Pure Cotton Khadi Kurta.webp' },
    { id: '7', name: 'Kundan Meenakari Jewelry', price: 3499, originalPrice: 5999, rating: 4.9, reviews: 412, seller: 'Royal Jewelers', state: 'Rajasthan', category: 'Jewelry', verified: true, image: '/Kundan Meenakari Jewelry.jpg' },
    { id: '8', name: 'Brass Handicraft Diya Set', price: 1599, originalPrice: 2999, rating: 4.4, reviews: 198, seller: 'Artisan Crafts', state: 'Uttar Pradesh', category: 'Handicrafts', verified: true, image: '/41XHeCo-9hL._AC_.jpg' }
  ];
  const categories = [
    { name: 'Textiles', icon: '🧵', count: 1234 },
    { name: 'Handicrafts', icon: '🎨', count: 856 },
    { name: 'Jewelry', icon: '💎', count: 642 },
    { name: 'Pottery', icon: '🏺', count: 423 },
    { name: 'Spices', icon: '🌶️', count: 789 },
    { name: 'Art', icon: '🖼️', count: 567 },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-mesh opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge className="bg-white/20 text-white border-white/30">
                <Sparkles className="w-4 h-4 mr-1" />
                Powered by AI & Blockchain
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Discover Authentic Indian Products
              </h1>
              <p className="text-xl text-blue-100">
                Connect with local artisans, verify authenticity with blockchain, and support Made in India.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    Start Shopping
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/seller/signup">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 border-2 border-white font-semibold">
                    Become a Seller
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div>
                  <div className="text-3xl font-bold">1M+</div>
                  <div className="text-blue-200">Products</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">50K+</div>
                  <div className="text-blue-200">Artisans</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">28</div>
                  <div className="text-blue-200">States</div>
                </div>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="relative z-10 grid grid-cols-2 gap-4">
                {[
                  '/jaipuri-hand-block-print-fabric-500x500.webp',
                  '/emery-ceramic-collection-202348-0006-open-box-emery-handcrafted-ceramic-vases-z.avif',
                  '/various-organic-indian-spices-powder-photography-cuisine_753390-10068.jpg',
                  '/Madhubani Folk Art Painting.jpg'
                ].map((img, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 animate-float overflow-hidden"
                    style={{ animationDelay: `${idx * 0.2}s` }}
                  >
                    <div className="aspect-square rounded-lg mb-3 overflow-hidden relative">
                      <Image 
                        src={img} 
                        alt="Indian craft" 
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-product.svg';
                        }}
                      />
                    </div>
                    <div className="h-3 bg-white/30 rounded mb-2"></div>
                    <div className="h-2 bg-white/20 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose IndieVerse?</h2>
            <p className="text-gray-600 text-lg">The most trusted platform for authentic Indian products</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Blockchain Verified</h3>
                <p className="text-gray-600">
                  Every product comes with a PAC (Product Authenticity Certificate) stored on blockchain.
                </p>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Discovery</h3>
                <p className="text-gray-600">
                  Smart recommendations help you find the perfect Indian alternatives to global brands.
                </p>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Empower Artisans</h3>
                <p className="text-gray-600">
                  Direct support to local sellers and artisans with transparent pricing and fair trade.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Shop by Category</h2>
            <Link href="/categories" className="text-blue-600 hover:text-blue-700 flex items-center">
              View All <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, idx) => (
              <Link
                key={idx}
                href={`/products?category=${category.name}`}
                className="group"
              >
                <Card className="card-hover text-center">
                  <CardContent className="pt-6 pb-6">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold mb-1 group-hover:text-blue-600 transition">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">{category.count} items</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Trending Products</h2>
            <Link href="/products" className="text-blue-600 hover:text-blue-700 flex items-center">
              View All <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card className="card-hover overflow-hidden">
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <Image 
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
                    <div className="flex items-center mb-2">
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
        </div>
      </section>

      {/* Regional Explorer CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 via-white to-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MapPin className="w-16 h-16 mx-auto mb-6 text-blue-600" />
          <h2 className="text-4xl font-bold mb-4">Explore India's Rich Heritage</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Discover authentic products from every corner of India. From Kashmir to Kanyakumari, explore regional crafts and traditions.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Explore Regional Map
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Artisan Stories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Artisans</h2>
            <p className="text-gray-600 text-lg">Stories of craftsmanship and tradition</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((idx) => (
              <Card key={idx} className="card-hover overflow-hidden">
                <div className="aspect-video bg-gray-100 overflow-hidden relative">
                  <Image 
                    src={[
                      '/Handwoven Banarasi Silk Saree.jpg',
                      '/jaipuri-hand-block-print-fabric-500x500.webp',
                      '/emery-ceramic-collection-202348-0006-open-box-emery-handcrafted-ceramic-vases-z.avif'
                    ][idx - 1]}
                    alt="Artisan craft"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-product.svg';
                    }}
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3">Rajasthan</Badge>
                  <h3 className="text-xl font-semibold mb-2">Traditional Block Printing</h3>
                  <p className="text-gray-600 mb-4">
                    Learn how Ramesh Kumar continues his family's 200-year-old tradition of hand block printing.
                  </p>
                  <Button variant="link" className="p-0">
                    Read Story <ArrowRight className="ml-1 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
