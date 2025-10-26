'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, Heart, ShoppingCart, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function BuyerWishlistPage() {
  const wishlistItems = [
    { id: '1', name: 'Handwoven Silk Saree', price: '₹4,999', rating: 4.8, image: '/Handwoven Banarasi Silk Saree.jpg' },
    { id: '2', name: 'Block Print Fabric', price: '₹799', rating: 4.6, image: '/jaipuri-hand-block-print-fabric-500x500.webp' },
    { id: '3', name: 'Madhubani Painting', price: '₹1,499', rating: 4.9, image: '/Madhubani Folk Art Painting.jpg' },
    { id: '4', name: 'Ceramic Vase', price: '₹1,299', rating: 4.7, image: '/emery-ceramic-collection-202348-0006-open-box-emery-handcrafted-ceramic-vases-z.avif' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50/20 to-purple-50/20">
      <motion.div 
        className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/buyer" className="inline-flex items-center text-gray-600 hover:text-pink-600 transition-all gap-2 group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
              <Heart className="w-10 h-10 text-pink-600 fill-pink-200" />
              My Wishlist
            </h1>
            <p className="text-gray-600 mt-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-600" />
              {wishlistItems.length} items saved for later
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <div className="relative aspect-square bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button 
                      size="icon" 
                      className="absolute top-3 right-3 bg-white hover:bg-pink-50 shadow-lg z-10"
                    >
                      <Heart className="w-5 h-5 fill-pink-500 text-pink-500" />
                    </Button>
                  </motion.div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-pink-600 transition-colors line-clamp-1">{item.name}</h3>
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < Math.floor(item.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                    <span className="text-sm ml-2 font-medium text-gray-700">{item.rating}</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600 mb-4">{item.price}</p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 shadow-md hover:shadow-lg transition-all font-semibold">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
