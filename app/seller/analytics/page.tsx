'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, ArrowUpRight, Calendar, Eye, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function SellerAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');

  const metrics = [
    {
      title: 'Total Revenue',
      value: formatCurrency(245680),
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Page Views',
      value: formatNumber(45678),
      change: '-2.3%',
      trend: 'down',
      icon: Eye,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const salesData = [
    { month: 'Jan', revenue: 45000, orders: 234 },
    { month: 'Feb', revenue: 52000, orders: 267 },
    { month: 'Mar', revenue: 48000, orders: 245 },
    { month: 'Apr', revenue: 61000, orders: 312 },
    { month: 'May', revenue: 55000, orders: 289 },
    { month: 'Jun', revenue: 67000, orders: 345 },
  ];

  const topCategories = [
    { name: 'Textiles', revenue: 98450, percentage: 40 },
    { name: 'Handicrafts', revenue: 73838, percentage: 30 },
    { name: 'Pottery', revenue: 49227, percentage: 20 },
    { name: 'Jewelry', revenue: 24613, percentage: 10 },
  ];

  const customerInsights = [
    { metric: 'New Customers', value: 234, change: '+15%' },
    { metric: 'Returning Customers', value: 658, change: '+8%' },
    { metric: 'Average Order Value', value: formatCurrency(1989), change: '+12%' },
    { metric: 'Customer Lifetime Value', value: formatCurrency(5678), change: '+18%' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics & Insights</h1>
          <p className="text-gray-600">Track your store performance and growth</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            className="border rounded-md px-4 py-2 text-sm"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <Badge variant={metric.trend === 'up' ? 'default' : 'destructive'} className="flex items-center space-x-1">
                    {metric.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>{metric.change}</span>
                  </Badge>
                </div>
                <div className="text-2xl font-bold mb-1">{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.title}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue & Orders Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesData.map((data, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                  <div className="w-16 text-sm font-medium text-gray-600">{data.month}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{formatCurrency(data.revenue)}</span>
                      <span className="text-xs text-gray-500">{data.orders} orders</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${(data.revenue / 70000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map((category) => (
                <div key={category.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm text-gray-600">{formatCurrency(category.revenue)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{category.percentage}% of total revenue</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Insights */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Customer Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {customerInsights.map((insight) => (
              <div key={insight.metric} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold mb-1">{insight.value}</div>
                <div className="text-sm text-gray-600 mb-2">{insight.metric}</div>
                <Badge variant="default" className="text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {insight.change}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Predictions */}
      <Card className="border-purple-200 bg-purple-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-purple-900 mb-2">AI-Powered Predictions</h3>
              <div className="space-y-3 mb-4">
                <div className="bg-white/50 rounded-lg p-3">
                  <div className="font-medium text-purple-900 mb-1">📈 Revenue Forecast</div>
                  <p className="text-sm text-purple-800">
                    Based on current trends, your revenue is projected to reach <strong>{formatCurrency(285000)}</strong> next month (+16% growth).
                  </p>
                </div>
                <div className="bg-white/50 rounded-lg p-3">
                  <div className="font-medium text-purple-900 mb-1">🎯 Demand Prediction</div>
                  <p className="text-sm text-purple-800">
                    High demand expected for <strong>Textiles</strong> and <strong>Handicrafts</strong> in the next 2 weeks. Consider restocking.
                  </p>
                </div>
                <div className="bg-white/50 rounded-lg p-3">
                  <div className="font-medium text-purple-900 mb-1">💡 Pricing Optimization</div>
                  <p className="text-sm text-purple-800">
                    Products in the ₹1000-₹2000 range have the highest conversion rate. Consider adjusting pricing strategy.
                  </p>
                </div>
              </div>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                View Detailed Predictions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { source: 'Direct', visits: 12456, percentage: 35 },
                { source: 'Organic Search', visits: 9876, percentage: 28 },
                { source: 'Social Media', visits: 7123, percentage: 20 },
                { source: 'Referral', visits: 4234, percentage: 12 },
                { source: 'Email', visits: 1789, percentage: 5 },
              ].map((source) => (
                <div key={source.source} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{source.source}</span>
                      <span className="text-sm text-gray-600">{formatNumber(source.visits)} visits</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all"
                        style={{ width: `${source.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Best Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Banarasi Silk Saree', sales: 234, revenue: 2103660 },
                { name: 'Block Print Kurta', sales: 456, revenue: 683544 },
                { name: 'Handwoven Basket', sales: 189, revenue: 151011 },
                { name: 'Pottery Set', sales: 123, revenue: 307377 },
                { name: 'Embroidered Cushion', sales: 312, revenue: 186888 },
              ].map((product, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded relative overflow-hidden flex-shrink-0">
                      <Image
                        src={[
                          '/Handwoven Banarasi Silk Saree.jpg',
                          '/jaipuri-hand-block-print-fabric-500x500.webp',
                          '/emery-ceramic-collection-202348-0006-open-box-emery-handcrafted-ceramic-vases-z.avif',
                          '/Kundan Meenakari Jewelry.jpg',
                          '/various-organic-indian-spices-powder-photography-cuisine_753390-10068.jpg'
                        ][idx] || '/Handwoven Banarasi Silk Saree.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-product.svg';
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-600">{product.sales} sales</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(product.revenue)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
