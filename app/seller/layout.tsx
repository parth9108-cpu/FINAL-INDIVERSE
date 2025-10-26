'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import SellerSidebar from '@/components/seller/sidebar';
import { getCurrentUser } from '@/lib/auth';

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Allow access to login and signup pages
    if (pathname?.startsWith('/seller/login') || pathname?.startsWith('/seller/signup')) {
      setIsAuthorized(true);
      return;
    }

    // Check if user is authenticated and has seller role
    const user = getCurrentUser();
    if (!user || user.role !== 'seller') {
      router.push('/seller/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router, pathname]);

  // Don't show sidebar for auth pages
  if (pathname?.startsWith('/seller/login') || pathname?.startsWith('/seller/signup')) {
    return <>{children}</>;
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SellerSidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
