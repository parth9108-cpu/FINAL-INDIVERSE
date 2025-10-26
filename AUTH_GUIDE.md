# Authentication System Guide

## Overview
IndieVerse now has a complete authentication system with separate login/signup flows for **Sellers** and **Buyers**, along with middleware-based route protection.

## Features

### 1. Separate User Roles
- **Sellers**: Can access `/seller/*` routes
- **Buyers**: Can access `/buyer/*` routes

### 2. Authentication Pages

#### Seller Routes
- **Login**: `/seller/login` - Purple-themed login page for sellers
- **Signup**: `/seller/signup` - Registration page for new sellers

#### Buyer Routes
- **Login**: `/buyer/login` - Green-themed login page for buyers
- **Signup**: `/buyer/signup` - Registration page for new buyers

### 3. Protected Routes
All routes under `/seller/*` and `/buyer/*` (except login/signup) are protected by middleware and client-side checks.

### 4. Navigation Features
- **Navbar**: Shows different options based on login status
  - Not logged in: Shows "Login" and "Become a Seller" buttons
  - Logged in: Shows user menu with Dashboard, Profile, Orders (for buyers), and Logout
- **Homepage**: "Start Shopping" and "Become a Seller" buttons now link to appropriate pages

### 5. User Dashboards

#### Seller Dashboard (`/seller`)
- Analytics
- Product management (`/seller/products`)
- Order management (`/seller/orders`)
- AI Assistant (`/seller/ai-assistant`)
- Profile settings

#### Buyer Dashboard (`/buyer`)
- Recent orders overview
- Quick actions (Browse, Orders, Wishlist, Profile)
- Order history (`/buyer/orders`)
- Wishlist (`/buyer/wishlist`)
- Profile settings (`/buyer/profile`)

## How to Use

### For Testing

#### Login as Seller:
1. Go to `/seller/login`
2. Enter any email and password
3. You'll be redirected to `/seller` dashboard

#### Login as Buyer:
1. Go to `/buyer/login`
2. Enter any email and password
3. You'll be redirected to `/buyer` dashboard

#### Sign Up:
- `/seller/signup` - Create seller account
- `/buyer/signup` - Create buyer account

### Important Notes

1. **Current Implementation**: Uses localStorage and cookies for demo purposes
2. **Production Use**: Replace with proper backend authentication (JWT, OAuth, etc.)
3. **Middleware**: Checks cookies for `auth_token` and `user_role`
4. **Client Protection**: Layouts check localStorage for additional security

## File Structure

```
├── app/
│   ├── buyer/
│   │   ├── layout.tsx              # Buyer route protection
│   │   ├── page.tsx                # Buyer dashboard
│   │   ├── login/page.tsx          # Buyer login
│   │   ├── signup/page.tsx         # Buyer signup
│   │   ├── orders/page.tsx         # Buyer orders
│   │   ├── wishlist/page.tsx       # Buyer wishlist
│   │   └── profile/page.tsx        # Buyer profile
│   ├── seller/
│   │   ├── layout.tsx              # Seller route protection
│   │   ├── login/page.tsx          # Seller login
│   │   └── signup/page.tsx         # Seller signup
├── lib/
│   └── auth.ts                     # Authentication utilities
├── contexts/
│   └── AuthContext.tsx             # React context for auth state
└── middleware.ts                   # Next.js middleware for route protection
```

## API Reference

### Auth Utilities (`lib/auth.ts`)

```typescript
// Check if user is authenticated
isAuthenticated(): boolean

// Get current user
getCurrentUser(): User | null

// Get user role
getUserRole(): UserRole | null

// Login (demo implementation)
login(email: string, password: string, role: UserRole): User

// Signup (demo implementation)
signup(name: string, email: string, password: string, role: UserRole): User

// Logout
logout(): void

// Check if user has required role
hasRole(requiredRole: UserRole): boolean
```

### Auth Context

```typescript
// Use in components
import { useAuth } from '@/contexts/AuthContext';

const { user, setUser, logout } = useAuth();
```

## Middleware Protection

The middleware in `middleware.ts` protects routes:
- Redirects unauthorized users to login pages
- Checks role-based access (seller vs buyer)
- Allows public access to login/signup pages

## Next Steps for Production

1. **Backend Integration**:
   - Connect to a real authentication API
   - Implement JWT tokens
   - Add refresh token logic

2. **Security Enhancements**:
   - Add password strength validation
   - Implement email verification
   - Add 2FA support
   - Use HTTP-only cookies for tokens

3. **User Management**:
   - Password reset functionality
   - Email change verification
   - Account deletion

4. **Session Management**:
   - Implement proper session timeout
   - Add "Remember me" functionality
   - Handle concurrent sessions

## Testing

### Manual Testing:
1. Visit homepage at `localhost:3000`
2. Click "Become a Seller" → redirects to `/seller/signup`
3. Fill form and create seller account → redirects to `/seller` dashboard
4. Logout from user menu
5. Click "Start Shopping" → redirects to `/products`
6. Click user icon → redirects to `/buyer/login`
7. Create buyer account → redirects to `/buyer` dashboard
8. Try accessing `/seller` → should redirect to `/seller/login`

### Route Protection Testing:
- Try accessing `/seller/products` without login → redirects to `/seller/login`
- Try accessing `/buyer/orders` without login → redirects to `/buyer/login`
- Login as seller, try accessing `/buyer/*` → should redirect to buyer login
- Login as buyer, try accessing `/seller/*` → should redirect to seller login
