import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">IndieVerse</h3>
            <p className="text-sm mb-4">
              Discover, Buy, and Sell Authentic Indian Products — powered by AI, verified by Blockchain.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white transition">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-white transition">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-white transition">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-white transition">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-white transition">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-white transition">Categories</Link></li>
              <li><Link href="/explore" className="hover:text-white transition">Explore by Region</Link></li>
              <li><Link href="/artisans" className="hover:text-white transition">Meet Artisans</Link></li>
            </ul>
          </div>

          {/* Sell */}
          <div>
            <h4 className="text-white font-semibold mb-4">Sell</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/seller" className="hover:text-white transition">Seller Dashboard</Link></li>
              <li><Link href="/seller/register" className="hover:text-white transition">Register as Seller</Link></li>
              <li><Link href="/seller/guide" className="hover:text-white transition">Seller Guide</Link></li>
              <li><Link href="/verification" className="hover:text-white transition">PAC Verification</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="hover:text-white transition">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-white transition">Returns & Refunds</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© 2024 IndieVerse. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white transition">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
