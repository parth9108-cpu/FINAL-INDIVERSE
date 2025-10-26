'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Allow access to login and signup pages
    if (pathname?.startsWith('/buyer/login') || pathname?.startsWith('/buyer/signup')) {
      setIsAuthorized(true);
      return;
    }

    // Check if user is authenticated and has buyer role
    const user = getCurrentUser();
    if (!user || user.role !== 'buyer') {
      router.push('/buyer/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router, pathname]);

  // Show auth pages without layout
  if (pathname?.startsWith('/buyer/login') || pathname?.startsWith('/buyer/signup')) {
    return <>{children}</>;
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
