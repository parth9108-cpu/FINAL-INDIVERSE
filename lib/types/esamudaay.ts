// User and Authentication Interfaces
export interface User {
  id: string;
  phone: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  user_profile: {
    id: string;
    phone: string;
    email?: string;
  };
  profile_pic?: {
    url: string;
    thumbnail_url: string;
  };
  profile_name: string;
  created: string;
  modified: string;
  is_suspended: boolean;
  role: ProfileRole;
  token: string;
}

export enum ProfileRole {
  CUSTOMER = 'CUSTOMER',
  MERCHANT = 'MERCHANT',
  AGENT = 'AGENT',
  PROVIDER = 'PROVIDER',
  DA_MANAGER = 'DA_MANAGER',
  ADMIN = 'ADMIN',
  EXTERNAL_SERVICE = 'EXTERNAL_SERVICE'
}

// Product and Catalog Interfaces
export interface Category {
  category_id: string;
  category_name: string;
  category_description?: string;
  parent_category_id?: string;
  business_id: string;
  status: 'active' | 'inactive';
  priority: number;
  product_count: number;
  subcategory_count: number;
}

export interface Product {
  product_id: string;
  product_name: string;
  product_description?: string;
  business_id: string;
  status: 'active' | 'inactive' | 'draft' | 'archived';
  composition_type: 'simple' | 'variable' | 'grouped' | 'external';
  is_spotlight: boolean;
  is_featured: boolean;
  priority: number;
  categories: Category[];
  skus: SKU[];
  min_price: number;
  max_price: number;
  is_bookmarked: boolean;
}

export interface SKU {
  sku_id: string;
  sku_code: string;
  sku_name: string;
  product_id: string;
  business_id: string;
  status: 'in_stock' | 'out_of_stock' | 'discontinued';
  pricing: {
    base_price: number;
    selling_price: number;
    discount_price?: number;
  };
  inventory: {
    quantity: number;
    min_quantity?: number;
    max_quantity?: number;
    track_inventory: boolean;
  };
  variants?: {
    color?: string;
    size?: string;
    material?: string;
    [key: string]: any;
  };
  commission?: {
    rate: number;
    type: 'percentage' | 'fixed';
  };
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
}

// Address Interfaces
export interface Address {
  address_id: string;
  address_name: string;
  pretty_address: string;
  location_point: {
    lat: number;
    lon: number;
  };
  geo_addr: {
    city: string;
    pincode: string;
    house: string;
    landmark?: string;
    state: string;
  };
}

// API Response Interfaces
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ProfileResponse {
  profiles: UserProfile[];
}