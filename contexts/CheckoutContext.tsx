'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './Auth';
import { loadRazorpay } from '../lib/utils';

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image?: string;
}

interface Cart {
  items: CartItem[];
  subtotal: number;
  total: number;
  itemCount: number;
}

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: 'CARD' | 'UPI' | 'COD';
  name: string;
  displayName: string;
  isActive: boolean;
}

interface CheckoutContextType {
  cart: Cart | null;
  selectedAddress: Address | null;
  paymentMethod: PaymentMethod | null;
  loading: boolean;
  error: string | null;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  setSelectedAddress: (address: Address | null) => void;
  setPaymentMethod: (method: PaymentMethod | null) => void;
  refreshCart: () => Promise<void>;
  placeOrder: () => Promise<{ orderId: string; success: boolean }>;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

// Utility to handle API calls with auth
const fetchWithAuth = async (
  url: string, 
  options: RequestInit & { token: string }
) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${options.token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
};

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [cartData, setCartData] = useState<Cart | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshCart = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const data = await fetchWithAuth('/api/cart', {
        method: 'GET',
        token: user.token
      });
      setCartData(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch cart data');
      setCartData(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addToCart = async (productId: string, quantity: number) => {
    if (!user) return;
    
    try {
      setLoading(true);
      await fetchWithAuth('/api/cart/add', {
        method: 'POST',
        token: user.token,
        body: JSON.stringify({ productId, quantity })
      });
      await refreshCart();
    } catch (err) {
      setError('Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (!user) return;
    
    try {
      setLoading(true);
      await fetchWithAuth(`/api/cart/items/${itemId}`, {
        method: 'DELETE',
        token: user.token
      });
      await refreshCart();
    } catch (err) {
      setError('Failed to remove item from cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!user) return;
    
    try {
      setLoading(true);
      await fetchWithAuth(`/api/cart/items/${itemId}`, {
        method: 'PATCH',
        token: user.token,
        body: JSON.stringify({ quantity })
      });
      await refreshCart();
    } catch (err) {
      setError('Failed to update quantity');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isSubscribed = true;

    const loadCart = async () => {
      if (user && isSubscribed) {
        await refreshCart();
      }
    };

    loadCart();

    return () => {
      isSubscribed = false;
    };
  }, [user, refreshCart]);

  const placeOrder = async () => {
    if (!user || !cartData || !selectedAddress || !paymentMethod) {
      throw new Error('Missing required checkout information');
    }

    try {
      setLoading(true);
      // Create order
      const { orderId } = await fetchWithAuth('/api/orders', {
        method: 'POST',
        token: user.token,
        body: JSON.stringify({
          addressId: selectedAddress.id,
          paymentMethodId: paymentMethod.id,
          items: cartData.items
        })
      });

      if (paymentMethod.type === 'COD') {
        return { orderId, success: true };
      }

      // For online payments (Razorpay)
      if (paymentMethod.type === 'CARD' || paymentMethod.type === 'UPI') {
        const razorpay = await loadRazorpay();
        const { razorpayOrderId, keyId } = await fetchWithAuth('/api/payments', {
          method: 'POST',
          token: user.token,
          body: JSON.stringify({
            orderId,
            amount: cartData.total
          })
        });

        const options = {
          key: keyId,
          amount: cartData.total * 100,
          currency: 'INR',
          name: 'IndieVerse',
          description: `Order #${orderId}`,
          order_id: razorpayOrderId,
          prefill: {
            name: selectedAddress.name,
            contact: selectedAddress.phone,
          },
          handler: async (response: any) => {
            await fetchWithAuth('/api/payments/verify', {
              method: 'POST',
              token: user.token,
              body: JSON.stringify({
                orderId,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature
              })
            });
          },
          theme: {
            color: '#3B82F6'
          }
        };

        const rzp = new razorpay(options);
        rzp.open();

        return { orderId, success: true };
      }

      return { orderId: '', success: false };
    } catch (err) {
      setError('Failed to place order');
      return { orderId: '', success: false };
    } finally {
      setLoading(false);
    }
  };

  return (
    <CheckoutContext.Provider
      value={{
        cart: cartData,
        selectedAddress,
        paymentMethod,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        setSelectedAddress,
        setPaymentMethod,
        refreshCart,
        placeOrder
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}