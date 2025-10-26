'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  HelpCircle,
  FileText,
  Users,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/seller' },
  { icon: Package, label: 'Products', href: '/seller/products' },
  { icon: FileText, label: 'Orders', href: '/seller/orders' },
  { icon: BarChart3, label: 'Analytics', href: '/seller/analytics' },
  { icon: Users, label: 'Customers', href: '/seller/customers' },
  { icon: Sparkles, label: 'AI Assistant', href: '/seller/ai-assistant' },
  { icon: MessageSquare, label: 'Messages', href: '/seller/messages' },
  { icon: Settings, label: 'Settings', href: '/seller/settings' },
  { icon: HelpCircle, label: 'Help', href: '/seller/help' },
];

export default function SellerSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load sidebar state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setIsCollapsed(savedState === 'true');
    }
  }, []);

  // Save sidebar state to localStorage whenever it changes
  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', String(newState));
  };

  return (
    <aside className={cn(
      "bg-white border-r min-h-screen sticky top-0 transition-all duration-300 ease-in-out relative",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="p-6">
        <Link href="/seller" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-white to-green-500 rounded-lg flex items-center justify-center font-bold text-blue-600">
            IV
          </div>
          {!isCollapsed && (
            <div>
              <div className="font-bold text-gradient">IndieVerse</div>
              <div className="text-xs text-gray-500">Seller Hub</div>
            </div>
          )}
        </Link>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-8 bg-white border rounded-full p-1 shadow-md hover:shadow-lg transition-all hover:scale-110 z-10"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>

      <nav className="px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2.5 rounded-lg mb-1 transition',
                isCollapsed ? 'justify-center' : 'space-x-3',
                isActive 
                  ? 'bg-blue-50 text-blue-600 font-medium' 
                  : 'text-gray-700 hover:bg-gray-50'
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
