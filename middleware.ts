import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get authentication info from cookies (we'll use this approach for SSR)
  const authToken = request.cookies.get('auth_token');
  const userRole = request.cookies.get('user_role');
  
  const { pathname } = request.nextUrl;

  // Protect seller routes
  if (pathname.startsWith('/seller')) {
    // Allow access to auth pages
    if (pathname.startsWith('/seller/login') || pathname.startsWith('/seller/signup')) {
      return NextResponse.next();
    }
    
    // Check if authenticated and has seller role
    if (!authToken || userRole?.value !== 'seller') {
      return NextResponse.redirect(new URL('/seller/login', request.url));
    }
  }

  // Protect buyer routes
  if (pathname.startsWith('/buyer')) {
    // Allow access to auth pages
    if (pathname.startsWith('/buyer/login') || pathname.startsWith('/buyer/signup')) {
      return NextResponse.next();
    }
    
    // Check if authenticated and has buyer role
    if (!authToken || userRole?.value !== 'buyer') {
      return NextResponse.redirect(new URL('/buyer/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/seller/:path*', '/buyer/:path*'],
};
