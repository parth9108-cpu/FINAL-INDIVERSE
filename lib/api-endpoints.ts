import axios from 'axios';
import { ApiResponse } from './types/api-types';

const BASE_URL = process.env.NEXT_PUBLIC_ESAMUDAAY_API_URL || 'https://api.esamudaay.com/api/v1';

// Orders API endpoints
export const orders = {
  // Get all orders for a customer
  getCustomerOrders: async (token: string) => {
    return axios.get(`${BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Get order details
  getOrderDetails: async (token: string, orderId: string) => {
    return axios.get(`${BASE_URL}/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Create a new order
  createOrder: async (token: string, orderData: any) => {
    return axios.post(`${BASE_URL}/orders`, orderData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Update order status
  updateOrderStatus: async (token: string, orderId: string, status: string) => {
    return axios.patch(`${BASE_URL}/orders/${orderId}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Cancel order
  cancelOrder: async (token: string, orderId: string, reason: string) => {
    return axios.post(`${BASE_URL}/orders/${orderId}/cancel`, { reason }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

// Cart API endpoints
export const cart = {
  // Get cart items
  getCart: async (token: string) => {
    return axios.get(`${BASE_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Add item to cart
  addToCart: async (token: string, item: {
    product_id: string;
    sku_id: string;
    quantity: number;
  }) => {
    return axios.post(`${BASE_URL}/cart/items`, item, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Update cart item
  updateCartItem: async (token: string, itemId: string, quantity: number) => {
    return axios.patch(`${BASE_URL}/cart/items/${itemId}`, { quantity }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Remove item from cart
  removeFromCart: async (token: string, itemId: string) => {
    return axios.delete(`${BASE_URL}/cart/items/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Clear cart
  clearCart: async (token: string) => {
    return axios.delete(`${BASE_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

// Payment API endpoints
export const payments = {
  // Get payment gateway entities
  getPaymentEntities: async (token: string) => {
    return axios.get(`${BASE_URL}/payment/gateway/entity`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Create payment for order
  createPayment: async (token: string, orderId: string, paymentData: any) => {
    return axios.post(`${BASE_URL}/payment/orders/${orderId}`, paymentData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Verify payment
  verifyPayment: async (token: string, paymentId: string, orderId: string) => {
    return axios.post(`${BASE_URL}/payment/verify`, {
      payment_id: paymentId,
      order_id: orderId
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

// Business API endpoints
export const business = {
  // Get business details
  getBusinessDetails: async (businessId: string) => {
    return axios.get(`${BASE_URL}/businesses/${businessId}`);
  },

  // Get business catalog
  getBusinessCatalog: async (businessId: string) => {
    return axios.get(`${BASE_URL}/businesses/${businessId}/catalog`);
  },

  // Search businesses
  searchBusinesses: async (params: {
    query?: string;
    category?: string;
    location?: { lat: number; lon: number };
    radius?: number;
  }) => {
    return axios.get(`${BASE_URL}/businesses/search`, { params });
  }
};

// Support API endpoints
export const support = {
  // Get support tickets
  getTickets: async (token: string, params?: {
    state?: string;
    business_id?: string;
    cluster_id?: string;
  }) => {
    return axios.get(`${BASE_URL}/support/ticket`, {
      headers: { Authorization: `Bearer ${token}` },
      params
    });
  },

  // Create support ticket
  createTicket: async (token: string, ticketData: any) => {
    return axios.post(`${BASE_URL}/support/ticket`, ticketData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Get ticket details
  getTicketDetails: async (token: string, ticketId: string) => {
    return axios.get(`${BASE_URL}/support/ticket/${ticketId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Update ticket
  updateTicket: async (token: string, ticketId: string, updateData: any) => {
    return axios.patch(`${BASE_URL}/support/ticket/${ticketId}`, updateData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};