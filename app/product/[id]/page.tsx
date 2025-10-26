'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Share2, ShoppingCart, Star, CheckCircle, MapPin, Shield, Truck, RotateCcw, QrCode, ChevronRight } from 'lucide-react';
import Navbar from '@/components/navigation/navbar';
import Footer from '@/components/navigation/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { formatCurrency } from '@/lib/utils';

// Product database
const productsDatabase: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Handwoven Banarasi Silk Saree',
    price: 8999,
    originalPrice: 15999,
    rating: 4.8,
    reviews: 234,
    seller: 'Kashi Weaves',
    state: 'Uttar Pradesh',
    city: 'Varanasi',
    category: 'Textiles',
    verified: true,
    inStock: true,
    description: 'Exquisite handwoven Banarasi silk saree featuring traditional motifs and intricate zari work. This masterpiece takes 15-20 days to create and represents centuries of weaving tradition from Varanasi.',
    features: [
      'Pure silk fabric with gold zari work',
      'Traditional Mughal-inspired motifs',
      'Handwoven by master artisans',
      'Comes with authenticity certificate',
      'Dry clean only'
    ],
    specifications: {
      'Material': 'Pure Silk',
      'Length': '6.5 meters',
      'Blouse': 'Included (0.8m)',
      'Weight': '650 grams',
      'Craft': 'Handloom',
      'Origin': 'Varanasi, UP'
    },
    mainImage: '/Handwoven Banarasi Silk Saree.jpg',
    images: [
      '/Handwoven Banarasi Silk Saree.jpg',
      '/Handwoven Banarasi Silk Saree.jpg',
      '/Handwoven Banarasi Silk Saree.jpg',
      '/Handwoven Banarasi Silk Saree.jpg'
    ]
  },
  '2': {
    id: '2',
    name: 'Traditional Block Print Fabric',
    price: 2499,
    originalPrice: 4999,
    rating: 4.6,
    reviews: 156,
    seller: 'Artisan 2',
    state: 'Rajasthan',
    city: 'Jaipur',
    category: 'Textiles',
    verified: true,
    inStock: true,
    description: 'Authentic Jaipuri hand block print fabric featuring traditional floral patterns. Each piece is hand-printed by skilled artisans using natural dyes and wooden blocks.',
    features: [
      '100% cotton fabric',
      'Hand block printed',
      'Natural dyes used',
      'Traditional Rajasthani patterns',
      'Machine washable'
    ],
    specifications: {
      'Material': '100% Cotton',
      'Length': '2.5 meters',
      'Width': '44 inches',
      'Weight': '200 grams',
      'Craft': 'Block Printing',
      'Origin': 'Jaipur, Rajasthan'
    },
    mainImage: '/jaipuri-hand-block-print-fabric-500x500.webp',
    images: [
      '/jaipuri-hand-block-print-fabric-500x500.webp',
      '/jaipuri-hand-block-print-fabric-500x500.webp',
      '/jaipuri-hand-block-print-fabric-500x500.webp',
      '/jaipuri-hand-block-print-fabric-500x500.webp'
    ]
  },
  '4': {
    id: '4',
    name: 'Ceramic Pottery Set',
    price: 899,
    originalPrice: 1799,
    rating: 4.8,
    reviews: 89,
    seller: 'Artisan 3',
    state: 'Karnataka',
    city: 'Bangalore',
    category: 'Pottery',
    verified: true,
    inStock: true,
    description: 'Handcrafted ceramic pottery set featuring elegant blue glaze. Each piece is individually crafted and fired, making every set unique.',
    features: [
      'Handcrafted ceramic',
      'Food-safe glaze',
      'Microwave and dishwasher safe',
      'Set includes 2 vases',
      'Unique artisan design'
    ],
    specifications: {
      'Material': 'Ceramic',
      'Set Includes': '2 Vases',
      'Height': '8-12 inches',
      'Weight': '1.2 kg',
      'Craft': 'Pottery',
      'Origin': 'Bangalore, Karnataka'
    },
    mainImage: '/emery-ceramic-collection-202348-0006-open-box-emery-handcrafted-ceramic-vases-z.avif',
    images: [
      '/emery-ceramic-collection-202348-0006-open-box-emery-handcrafted-ceramic-vases-z.avif',
      '/emery-ceramic-collection-202348-0006-open-box-emery-handcrafted-ceramic-vases-z.avif',
      '/emery-ceramic-collection-202348-0006-open-box-emery-handcrafted-ceramic-vases-z.avif',
      '/emery-ceramic-collection-202348-0006-open-box-emery-handcrafted-ceramic-vases-z.avif'
    ]
  },
  '3': {
    id: '3',
    name: 'Madhubani Folk Art Painting',
    price: 1499,
    originalPrice: 2999,
    rating: 4.7,
    reviews: 145,
    seller: 'Bihar Artisans',
    state: 'Bihar',
    city: 'Madhubani',
    category: 'Art',
    verified: true,
    inStock: true,
    description: 'Authentic Madhubani folk art painting created by traditional artists from Bihar. This vibrant artwork depicts ancient Indian mythology and nature using natural dyes and traditional techniques passed down through generations.',
    features: [
      'Hand-painted by skilled Madhubani artists',
      'Natural and eco-friendly colors',
      'Traditional folk art style',
      'Comes with certificate of authenticity',
      'Ready to frame'
    ],
    specifications: {
      'Material': 'Handmade paper',
      'Size': '16 x 20 inches',
      'Medium': 'Natural dyes',
      'Weight': '150 grams',
      'Craft': 'Madhubani Painting',
      'Origin': 'Madhubani, Bihar'
    },
    mainImage: '/Madhubani Folk Art Painting.jpg',
    images: [
      '/Madhubani Folk Art Painting.jpg',
      '/Madhubani Folk Art Painting.jpg',
      '/Madhubani Folk Art Painting.jpg',
      '/Madhubani Folk Art Painting.jpg'
    ]
  },
  '5': {
    id: '5',
    name: 'Organic Indian Spice Collection',
    price: 599,
    originalPrice: 999,
    rating: 4.9,
    reviews: 287,
    seller: 'Kerala Spice Co.',
    state: 'Kerala',
    city: 'Kochi',
    category: 'Spices',
    verified: true,
    inStock: true,
    description: 'Premium collection of organic Indian spices sourced directly from Kerala farms. This curated set includes turmeric, cardamom, black pepper, and cinnamon - all grown without pesticides and processed traditionally.',
    features: [
      '100% organic and pesticide-free',
      'Sourced from Kerala farms',
      'Traditional processing methods',
      'Airtight packaging for freshness',
      'Set of 4 premium spices'
    ],
    specifications: {
      'Contents': 'Turmeric, Cardamom, Black Pepper, Cinnamon',
      'Total Weight': '400 grams',
      'Packaging': 'Airtight containers',
      'Shelf Life': '12 months',
      'Type': 'Organic',
      'Origin': 'Kochi, Kerala'
    },
    mainImage: '/various-organic-indian-spices-powder-photography-cuisine_753390-10068.jpg',
    images: [
      '/various-organic-indian-spices-powder-photography-cuisine_753390-10068.jpg',
      '/various-organic-indian-spices-powder-photography-cuisine_753390-10068.jpg',
      '/various-organic-indian-spices-powder-photography-cuisine_753390-10068.jpg',
      '/various-organic-indian-spices-powder-photography-cuisine_753390-10068.jpg'
    ]
  },
  '6': {
    id: '6',
    name: 'Pure Cotton Khadi Kurta',
    price: 1299,
    originalPrice: 2499,
    rating: 4.9,
    reviews: 203,
    seller: 'Khadi Collective',
    state: 'Gujarat',
    city: 'Ahmedabad',
    category: 'Textiles',
    verified: true,
    inStock: true,
    description: 'Premium khadi cotton kurta handwoven by skilled artisans. Breathable, comfortable, and perfect for all seasons. Supports traditional handloom weavers.',
    features: [
      '100% pure khadi cotton',
      'Handwoven fabric',
      'Breathable and comfortable',
      'Traditional craftsmanship',
      'Machine washable'
    ],
    specifications: {
      'Material': 'Khadi Cotton',
      'Size': 'M, L, XL available',
      'Length': '38 inches',
      'Weight': '250 grams',
      'Craft': 'Handloom',
      'Origin': 'Ahmedabad, Gujarat'
    },
    mainImage: '/Pure Cotton Khadi Kurta.webp',
    images: [
      '/Pure Cotton Khadi Kurta.webp',
      '/Pure Cotton Khadi Kurta.webp',
      '/Pure Cotton Khadi Kurta.webp',
      '/Pure Cotton Khadi Kurta.webp'
    ]
  },
  '7': {
    id: '7',
    name: 'Kundan Meenakari Jewelry',
    price: 3499,
    originalPrice: 5999,
    rating: 4.9,
    reviews: 412,
    seller: 'Royal Jewelers',
    state: 'Rajasthan',
    city: 'Jaipur',
    category: 'Jewelry',
    verified: true,
    inStock: true,
    description: 'Exquisite Kundan Meenakari jewelry set featuring traditional Rajasthani craftsmanship. This stunning piece combines precious stones with intricate enamel work.',
    features: [
      'Authentic Kundan stones',
      'Traditional Meenakari work',
      'Gold-plated base',
      'Handcrafted by master jewelers',
      'Comes with authenticity certificate'
    ],
    specifications: {
      'Material': 'Gold-plated with Kundan stones',
      'Set Includes': 'Necklace and Earrings',
      'Weight': '45 grams',
      'Stones': 'Kundan and Meenakari',
      'Craft': 'Traditional Rajasthani',
      'Origin': 'Jaipur, Rajasthan'
    },
    mainImage: '/Kundan Meenakari Jewelry.jpg',
    images: [
      '/Kundan Meenakari Jewelry.jpg',
      '/Kundan Meenakari Jewelry.jpg',
      '/Kundan Meenakari Jewelry.jpg',
      '/Kundan Meenakari Jewelry.jpg'
    ]
  },
  '8': {
    id: '8',
    name: 'Brass Handicraft Diya Set',
    price: 1599,
    originalPrice: 2999,
    rating: 4.4,
    reviews: 198,
    seller: 'Artisan Crafts',
    state: 'Uttar Pradesh',
    city: 'Moradabad',
    category: 'Handicrafts',
    verified: true,
    inStock: true,
    description: 'Beautiful brass diya set perfect for festivals and home decoration. Each piece is handcrafted using traditional techniques and polished to perfection.',
    features: [
      'Pure brass construction',
      'Hand-polished finish',
      'Traditional design',
      'Perfect for festivals',
      'Eco-friendly and durable'
    ],
    specifications: {
      'Material': 'Pure Brass',
      'Set Includes': '2 Diyas with stands',
      'Height': '4-6 inches',
      'Weight': '800 grams',
      'Finish': 'Hand-polished',
      'Origin': 'Moradabad, UP'
    },
    mainImage: '/41XHeCo-9hL._AC_.jpg',
    images: [
      '/41XHeCo-9hL._AC_.jpg',
      '/41XHeCo-9hL._AC_.jpg',
      '/41XHeCo-9hL._AC_.jpg',
      '/41XHeCo-9hL._AC_.jpg'
    ]
  }
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Get product from database based on ID
  const product = productsDatabase[params.id] || productsDatabase['1'];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/products" className="hover:text-blue-600">Products</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/products?category=${product.category}`} className="hover:text-blue-600">{product.category}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div>
            <div className="sticky top-24">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 relative overflow-hidden">
                {product.verified && (
                  <Badge className="absolute top-4 left-4 bg-green-500 z-10">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    PAC Verified
                  </Badge>
                )}
                <Image
                  src={product.images[selectedImage] || product.mainImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-product.svg';
                  }}
                />
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition relative ${
                      selectedImage === idx ? 'border-blue-600' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - Image ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="100px"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-product.svg';
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{product.city}, {product.state}</span>
            </div>

            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded">
                <span className="font-semibold">{product.rating}</span>
                <Star className="w-4 h-4 ml-1 fill-current" />
              </div>
              <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
            </div>

            {/* Seller */}
            <div className="mb-6">
              <Link href={`/seller/${product.seller}`} className="text-blue-600 hover:underline">
                by {product.seller}
              </Link>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold">{formatCurrency(product.price)}</span>
                <span className="text-xl text-gray-500 line-through">{formatCurrency(product.originalPrice)}</span>
                <Badge variant="destructive" className="text-sm">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-2">Inclusive of all taxes</p>
            </div>

            {/* Blockchain Verification */}
            <Card className="mb-6 border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-900 mb-1">Blockchain Verified Authenticity</h4>
                    <p className="text-sm text-green-700 mb-2">
                      This product comes with a PAC (Product Authenticity Certificate) stored on blockchain.
                    </p>
                    <Button variant="outline" size="sm" className="border-green-600 text-green-600">
                      <QrCode className="w-4 h-4 mr-2" />
                      View Certificate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Quantity</label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <Button size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center space-x-3 text-sm">
                <Truck className="w-5 h-5 text-gray-600" />
                <span>Free delivery on orders above ₹999</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <RotateCcw className="w-5 h-5 text-gray-600" />
                <span>7 days return & exchange policy</span>
              </div>
            </div>

            {/* Product Description */}
            <div className="border-t pt-6 mb-6">
              <h3 className="font-semibold text-lg mb-3">Product Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div className="border-t pt-6 mb-6">
              <h3 className="font-semibold text-lg mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-lg mb-3">Specifications</h3>
              <div className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]: [string, unknown]) => (
                  <div key={key} className="flex py-2 border-b last:border-0">
                    <span className="w-1/3 text-gray-600">{key}</span>
                    <span className="w-2/3 font-medium">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Artisan Story Section */}
        <div className="mt-16 border-t pt-16">
          <h2 className="text-2xl font-bold mb-8">Meet the Artisan</h2>
          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="aspect-video bg-gray-200 rounded-lg relative overflow-hidden">
                  <Image
                    src="/jaipuri-hand-block-print-fabric-500x500.webp"
                    alt={`${product.seller} artisan story`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-product.svg';
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">The Story of {product.seller}</h3>
                  <p className="text-gray-700 mb-4">
                    For over three generations, Kashi Weaves has been preserving the ancient art of Banarasi silk weaving. 
                    Each saree is a labor of love, taking weeks to complete and representing the rich cultural heritage of Varanasi.
                  </p>
                  <Button variant="outline">
                    Learn More About Our Craft
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 border-t pt-16">
          <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-5xl font-bold mb-2">{product.rating}</div>
                <div className="flex items-center justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600">{product.reviews} reviews</p>
              </div>
            </div>
            <div className="md:col-span-2 space-y-4">
              {[1, 2, 3].map((idx) => (
                <Card key={idx}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Avatar name={`Customer ${idx}`} size="md" className="mr-3" />
                        <div>
                          <div className="font-semibold">Customer {idx}</div>
                          <div className="text-sm text-gray-500">Verified Purchase</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-semibold">5.0</span>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Absolutely beautiful saree! The quality is exceptional and the craftsmanship is evident in every detail. 
                      Highly recommend supporting these talented artisans.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
