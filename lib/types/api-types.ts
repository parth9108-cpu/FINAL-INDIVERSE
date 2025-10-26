// Address Interface
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

// Order Interfaces
export interface Order {
  order_id: string;
  customer_id: string;
  business_id: string;
  items: OrderItem[];
  total_amount: number;
  status: OrderStatus;
  payment_status: PaymentStatus;
  delivery_address: Address;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  item_id: string;
  product_id: string;
  sku_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  product_name: string;
  sku_name: string;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  READY_FOR_PICKUP = 'READY_FOR_PICKUP',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

// Cart Interfaces
export interface Cart {
  cart_id: string;
  customer_id: string;
  items: CartItem[];
  total_amount: number;
  item_count: number;
}

export interface CartItem {
  item_id: string;
  product_id: string;
  sku_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  product_name: string;
  sku_name: string;
}

// Payment Interfaces
export interface Payment {
  payment_id: string;
  order_id: string;
  amount: number;
  status: PaymentStatus;
  gateway: string;
  gateway_payment_id: string;
  created_at: string;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export interface PaymentGatewayEntity {
  entity_id: string;
  entity_name: string;
  gateway: 'RAZORPAY' | 'DEBUG';
  collector_name: string;
  kid: string;
  wsecret: string;
  ksecret: string;
  emails: string[];
}

// Business Interfaces
export interface Business {
  business_id: string;
  business_name: string;
  description?: string;
  status: 'active' | 'inactive';
  business_type: BusinessType;
  contact: {
    phone: string;
    email?: string;
    website?: string;
  };
  address: Address;
  operating_hours?: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  rating?: number;
  review_count?: number;
}

export enum BusinessType {
  RETAIL = 'RETAIL',
  SERVICE = 'SERVICE',
  RESTAURANT = 'RESTAURANT',
  ONLINE = 'ONLINE'
}

// Support Interfaces
export interface SupportTicket {
  ticket_id: string;
  customer_id: string;
  business_id?: string;
  cluster_id?: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  created_at: string;
  updated_at: string;
  comments: TicketComment[];
}

export interface TicketComment {
  comment_id: string;
  ticket_id: string;
  user_id: string;
  user_type: 'CUSTOMER' | 'SUPPORT' | 'SYSTEM';
  content: string;
  created_at: string;
}

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED'
}

export enum TicketPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}