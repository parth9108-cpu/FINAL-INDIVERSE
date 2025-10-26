'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, X, Heart, MapPin, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getCurrentUser, logout, User as UserType } from '@/lib/auth';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-white to-green-500 rounded-lg flex items-center justify-center font-bold text-blue-600">
              IV
            </div>
            <span className="text-xl font-bold text-gradient">IndieVerse</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search for authentic Indian products..."
                className="pl-10 pr-4 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/explore" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition">
              <MapPin className="w-5 h-5" />
              <span>Explore</span>
            </Link>
            {!user && (
              <Link href="/seller/login" className="text-gray-700 hover:text-blue-600 transition">
                Become a Seller
              </Link>
            )}
            {user && user.role === 'buyer' && (
              <>
                <Link href="/buyer/wishlist">
                  <Button variant="ghost" size="icon">
                    <Heart className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      3
                    </span>
                  </Button>
                </Link>
              </>
            )}
            {user ? (
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <User className="w-5 h-5" />
                </Button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-blue-600 mt-1 capitalize">{user.role} Account</p>
                    </div>
                    <Link 
                      href={user.role === 'seller' ? '/seller' : '/buyer'}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href={user.role === 'seller' ? '/seller/profile' : '/buyer/profile'}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Profile Settings
                    </Link>
                    {user.role === 'buyer' && (
                      <Link 
                        href="/buyer/orders"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Orders
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        document.cookie = 'auth_token=; path=/; max-age=0';
                        document.cookie = 'user_role=; path=/; max-age=0';
                        setUser(null);
                        setShowUserMenu(false);
                        router.push('/');
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/buyer/login">
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 w-full"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link href="/explore" className="flex items-center space-x-2 py-2 text-gray-700">
              <MapPin className="w-5 h-5" />
              <span>Explore India</span>
            </Link>
            {user ? (
              <>
                <Link href={user.role === 'seller' ? '/seller' : '/buyer'} className="flex items-center space-x-2 py-2 text-gray-700">
                  <User className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                {user.role === 'buyer' && (
                  <>
                    <Link href="/buyer/wishlist" className="flex items-center space-x-2 py-2 text-gray-700">
                      <Heart className="w-5 h-5" />
                      <span>Wishlist</span>
                    </Link>
                    <Link href="/cart" className="flex items-center space-x-2 py-2 text-gray-700">
                      <ShoppingCart className="w-5 h-5" />
                      <span>Cart (3)</span>
                    </Link>
                    <Link href="/buyer/orders" className="flex items-center space-x-2 py-2 text-gray-700">
                      <span>My Orders</span>
                    </Link>
                  </>
                )}
                <Link href={user.role === 'seller' ? '/seller/profile' : '/buyer/profile'} className="flex items-center space-x-2 py-2 text-gray-700">
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    document.cookie = 'auth_token=; path=/; max-age=0';
                    document.cookie = 'user_role=; path=/; max-age=0';
                    setUser(null);
                    setIsMenuOpen(false);
                    router.push('/');
                  }}
                  className="flex items-center space-x-2 py-2 text-red-600 w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/seller/login" className="block py-2 text-gray-700">
                  Become a Seller
                </Link>
                <Link href="/buyer/login" className="flex items-center space-x-2 py-2 text-gray-700">
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
