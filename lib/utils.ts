import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(2) + ' Cr';
  } else if (num >= 100000) {
    return (num / 100000).toFixed(2) + ' L';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + ' K';
  }
  return num.toString();
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function getIndianStates() {
  return [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];
}

export function generateMockProducts(count: number = 12) {
  const categories = ['Textiles', 'Handicrafts', 'Pottery', 'Jewelry', 'Spices', 'Art'];
  const states = getIndianStates();
  
  // Specific product names matching the images
  const productNames = [
    'Handwoven Banarasi Silk Saree',
    'Traditional Block Print Fabric',
    'Handcrafted Ceramic Pottery Set',
    'Kundan Meenakari Jewelry',
    'Organic Indian Spice Collection',
    'Madhubani Folk Art Painting',
    'Pure Cotton Khadi Kurta',
    'Brass Handicraft Diya Set'
  ];

  // Relevant images mapped to product names above
  const productImages = [
    '/Handwoven Banarasi Silk Saree.jpg', // Handwoven Banarasi Silk Saree
    '/jaipuri-hand-block-print-fabric-500x500.webp', // Traditional Block Print Fabric
    '/emery-ceramic-collection-202348-0006-open-box-emery-handcrafted-ceramic-vases-z.avif', // Handcrafted Ceramic Pottery Set
    '/Kundan Meenakari Jewelry.jpg', // Kundan Meenakari Jewelry
    '/various-organic-indian-spices-powder-photography-cuisine_753390-10068.jpg', // Organic Indian Spice Collection
    '/Madhubani Folk Art Painting.jpg', // Madhubani Folk Art Painting
    '/Pure Cotton Khadi Kurta.webp', // Pure Cotton Khadi Kurta
    '/41XHeCo-9hL._AC_.jpg' // Brass Handicraft Diya Set
  ];
  
  // Use deterministic values to avoid hydration mismatch
  const prices = [1299, 2499, 899, 3499, 1799, 999, 4299, 1599, 2199, 3299, 1499, 2799];
  const originalPrices = [2499, 4999, 1799, 5999, 3499, 1999, 6999, 2999, 3999, 5499, 2799, 4499];
  const ratings = ['4.5', '4.8', '4.2', '4.9', '4.6', '4.3', '4.7', '4.4', '4.8', '4.5', '4.6', '4.7'];
  const reviewCounts = [234, 156, 89, 412, 278, 145, 367, 198, 289, 334, 223, 301];
  const stateIndices = [0, 5, 10, 15, 20, 2, 7, 12, 17, 22, 4, 9];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `product-${i + 1}`,
    name: productNames[i % productNames.length],
    price: prices[i % prices.length],
    originalPrice: originalPrices[i % originalPrices.length],
    image: productImages[i % productImages.length],
    rating: ratings[i % ratings.length],
    reviews: reviewCounts[i % reviewCounts.length],
    seller: `Artisan ${i + 1}`,
    state: states[stateIndices[i % stateIndices.length]],
    category: categories[i % categories.length],
    verified: i % 3 !== 0, // Deterministic pattern
    description: 'Handcrafted with traditional techniques passed down through generations.',
  }));
}

export const loadRazorpay = () => {
  return new Promise<any>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve((window as any).Razorpay);
    };
    script.onerror = () => {
      reject(new Error('Razorpay SDK failed to load'));
    };
    document.body.appendChild(script);
  });
};
