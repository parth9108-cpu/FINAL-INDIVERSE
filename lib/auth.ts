// Authentication utilities
export type UserRole = 'seller' | 'buyer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

// Storage keys
const AUTH_STORAGE_KEY = 'indieverse_auth';
const USER_STORAGE_KEY = 'indieverse_user';

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem(AUTH_STORAGE_KEY);
}

// Get current user
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem(USER_STORAGE_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

// Get user role
export function getUserRole(): UserRole | null {
  const user = getCurrentUser();
  return user?.role || null;
}

// Login function (simulated)
export function login(email: string, password: string, role: UserRole): User {
  // In a real app, this would make an API call
  const user: User = {
    id: Math.random().toString(36).substring(7),
    email,
    name: email.split('@')[0],
    role,
  };
  
  localStorage.setItem(AUTH_STORAGE_KEY, 'true');
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  
  return user;
}

// Signup function (simulated)
export function signup(name: string, email: string, password: string, role: UserRole): User {
  // In a real app, this would make an API call
  const user: User = {
    id: Math.random().toString(36).substring(7),
    email,
    name,
    role,
  };
  
  localStorage.setItem(AUTH_STORAGE_KEY, 'true');
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  
  return user;
}

// Logout function
export function logout(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
}

// Check if user has the required role
export function hasRole(requiredRole: UserRole): boolean {
  const user = getCurrentUser();
  return user?.role === requiredRole;
}
