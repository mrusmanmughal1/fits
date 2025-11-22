// Application constants
import logo from '@/public/logo.png';
export const BRAND_NAME = logo;
export const BRAND_TAGLINE = 'The best place to buy and sell electronics';

// Navigation links
export const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pages', href: '/pages' },
] as const;

// Feature list - Left column (3 items)
export const FEATURES_LEFT = [
  {
    icon: 'key',
    title: 'Fast and secure options',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore',
  },
  {
    icon: 'speaker',
    title: 'Voice assistant speaker',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore',
  },
  {
    icon: 'diamond',
    title: 'Apps you love google',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore',
  },
] as const;

// Feature list - Right column (3 items)
export const FEATURES_RIGHT = [
  {
    icon: 'thumbs-up',
    title: 'Stay in touch massage',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore',
  },
  {
    icon: 'user',
    title: 'Design for application',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore',
  },
  {
    icon: 'earbuds',
    title: 'Precision pieces reviews',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore',
  },
] as const;

// Legacy feature list (for backward compatibility)
export const FEATURES = [
  { icon: '💬', title: '24/7 Support', description: 'Round the clock assistance' },
  { icon: '🔊', title: 'Premium Quality', description: 'Top-notch products' },
  { icon: '💎', title: 'Best Deals', description: 'Competitive pricing' },
  { icon: '🛡️', title: 'Secure Payment', description: 'Safe transactions' },
  { icon: '🚚', title: 'Fast Delivery', description: 'Quick shipping' },
  { icon: '↩️', title: 'Easy Returns', description: 'Hassle-free returns' },
] as const;

// Brand logos
export const BRANDS = ['BOSS', 'Canon', 'DELL', 'Nikon', 'Panasonic', 'PENTAX', 'SAMSUNG'] as const;

// Service guarantees
export const SERVICE_GUARANTEES = [
  {
    icon: '🚚',
    title: 'Free Express Shipping Today',
    description: 'Fast and reliable delivery',
  },
  {
    icon: '🛡️',
    title: 'Secure Premium Guaranteed',
    description: '100% secure transactions',
  },
  {
    icon: '↩️',
    title: 'Easy Goods Free Returns',
    description: 'Hassle-free return policy',
  },
] as const;

// Colors
export const COLORS = {
  primary: '#006edb',
  primaryHover: '#005bb8',
  secondary: '#ffffff',
  price: '#595959',
  priceSale: '#dc2626',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
} as const;

// Breakpoints (for reference)
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

