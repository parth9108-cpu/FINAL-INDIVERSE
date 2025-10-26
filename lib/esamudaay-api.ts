import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_ESAMUDAAY_API_URL || 'https://api.esamudaay.com/api/v1';

// Authentication APIs
export const auth = {
  // Request OTP for phone verification
  requestOTP: async (phone: string, thirdPartyId: string) => {
    return axios.get(`${BASE_URL}/auth/token`, {
      params: { phone, third_party_id: thirdPartyId }
    });
  },

  // Verify OTP/password and get user token
  verifyOTP: async (phone: string, token: string, thirdPartyId: string) => {
    return axios.post(`${BASE_URL}/auth/token`, {
      phone,
      token,
      third_party_id: thirdPartyId
    });
  },

  // User signup
  signup: async (userData: {
    phone: string;
    third_party_id: string;
    email?: string;
    password?: string;
  }) => {
    return axios.post(`${BASE_URL}/auth/user`, userData);
  },

  // Get user info
  getUserInfo: async (token: string) => {
    return axios.get(`${BASE_URL}/auth/user`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Update user info
  updateUserInfo: async (token: string, userData: any) => {
    return axios.patch(`${BASE_URL}/auth/user`, userData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
};

// Profile Management APIs
export const profiles = {
  // Get all profiles
  getProfiles: async (token: string) => {
    return axios.get(`${BASE_URL}/auth/profiles`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Create new profile
  createProfile: async (token: string, profileData: {
    role: string;
    profile_name: string;
  }) => {
    return axios.post(`${BASE_URL}/auth/profiles`, profileData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Update profile
  updateProfile: async (token: string, profileData: any) => {
    return axios.patch(`${BASE_URL}/auth/profiles`, profileData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
};

// Product Catalog APIs
export const catalog = {
  // Get categories for a business
  getCategories: async (businessId: string) => {
    return axios.get(`${BASE_URL}/businesses/${businessId}/catalog/categories`);
  },

  // Get products for a business
  getProducts: async (businessId: string) => {
    return axios.get(`${BASE_URL}/businesses/${businessId}/catalog/products`);
  },

  // Get product details
  getProductDetails: async (businessId: string, productId: string) => {
    return axios.get(`${BASE_URL}/businesses/${businessId}/catalog/products/${productId}`);
  },

  // Get SKUs for a product
  getProductSKUs: async (businessId: string, productId: string) => {
    return axios.get(`${BASE_URL}/businesses/${businessId}/catalog/products/${productId}/skus`);
  },
};

// Address Management APIs
export const addresses = {
  // Get all addresses for authenticated customer
  getAddresses: async (token: string) => {
    return axios.get(`${BASE_URL}/addresses`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Create new address
  createAddress: async (token: string, addressData: {
    address_name: string;
    pretty_address: string;
    location_point: { lat: number; lon: number };
    geo_addr: {
      city: string;
      pincode: string;
      house: string;
      landmark?: string;
      state: string;
    };
  }) => {
    return axios.post(`${BASE_URL}/addresses`, addressData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Update address
  updateAddress: async (token: string, addressId: string, addressData: any) => {
    return axios.patch(`${BASE_URL}/addresses/${addressId}`, addressData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Delete address
  deleteAddress: async (token: string, addressId: string) => {
    return axios.delete(`${BASE_URL}/addresses/${addressId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
};

// Error handler wrapper
export const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with error
    return {
      status: error.response.status,
      message: error.response.data.message || 'An error occurred',
      data: error.response.data
    };
  } else if (error.request) {
    // Request made but no response
    return {
      status: 503,
      message: 'Service unavailable',
      data: null
    };
  } else {
    // Error in request setup
    return {
      status: 400,
      message: error.message,
      data: null
    };
  }
};