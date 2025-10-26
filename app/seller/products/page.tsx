'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, Copy, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

export default function SellerProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    {
      id: 1,
      name: 'Handwoven Banarasi Silk Saree',
      sku: 'BSS-001',
      category: 'Textiles',
      price: 8999,
      stock: 12,
      sales: 234,
      status: 'active',
      verified: true,
      image: '/Handwoven Banarasi Silk Saree.jpg'
    },
    {
      id: 2,
      name: 'Block Print Cotton Kurta',
      sku: 'BPK-045',
      category: 'Textiles',
      price: 1499,
      stock: 45,
      sales: 456,
      status: 'active',
      verified: true,
      image: '/jaipuri-hand-block-print-fabric-500x500.webp'
    },
    {
      id: 3,
      name: 'Handmade Terracotta Vase',
      sku: 'TCV-023',
      category: 'Pottery',
      price: 799,
      stock: 8,
      sales: 89,
      status: 'active',
      verified: false,
      image: '/emery-ceramic-collection-202348-0006-open-box-emery-handcrafted-ceramic-vases-z.avif'
    },
    {
      id: 4,
      name: 'Traditional Brass Diya Set',
      sku: 'BDS-012',
      category: 'Handicrafts',
      price: 1299,
      stock: 0,
      sales: 167,
      status: 'out_of_stock',
      verified: true,
      image: '/41XHeCo-9hL._AC_.jpg'
    },
    {
      id: 5,
      name: 'Embroidered Cushion Cover',
      sku: 'ECC-089',
      category: 'Home Decor',
      price: 599,
      stock: 34,
      sales: 312,
      status: 'active',
      verified: true,
      image: '/Kundan Meenakari Jewelry.jpg'
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Products</h1>
          <p className="text-gray-600">Manage your product listings</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Product
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search products by name, SKU, or category..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <select className="border rounded-md px-4 py-2 text-sm">
              <option>All Categories</option>
              <option>Textiles</option>
              <option>Handicrafts</option>
              <option>Pottery</option>
              <option>Home Decor</option>
            </select>
            <select className="border rounded-md px-4 py-2 text-sm">
              <option>All Status</option>
              <option>Active</option>
              <option>Out of Stock</option>
              <option>Draft</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold mb-1">156</div>
            <div className="text-sm text-gray-600">Total Products</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold mb-1">142</div>
            <div className="text-sm text-gray-600">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold mb-1">8</div>
            <div className="text-sm text-gray-600">Out of Stock</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold mb-1">6</div>
            <div className="text-sm text-gray-600">Drafts</div>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3 relative overflow-hidden flex-shrink-0">
                          <Image
                            src={product.image || '/placeholder-product.svg'}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder-product.svg';
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          {product.verified && (
                            <Badge variant="success" className="mt-1 text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              PAC Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="secondary">{product.category}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${product.stock === 0 ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.sales}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge 
                        variant={product.status === 'active' ? 'default' : 'destructive'}
                      >
                        {product.status === 'active' ? 'Active' : 'Out of Stock'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" title="View">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Duplicate">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Delete">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-600">Showing 1 to 5 of 156 products</p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>

      {/* AI Assistant Card */}
      <Card className="mt-6 border-purple-200 bg-purple-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-purple-900 mb-2">AI-Assisted Product Listing</h3>
              <p className="text-purple-800 mb-3">
                Upload product images and let our AI generate titles, descriptions, tags, and pricing suggestions automatically.
              </p>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                Try AI Assistant
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
