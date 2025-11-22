// Shared TypeScript types and interfaces
import { StaticImageData } from 'next/image';

export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string | StaticImageData;
  imageAlt?: string;
  badge?: string;
  badgeVariant?: 'primary' | 'success' | 'error' | 'sale';
  description?: string;
  category?: string;
  inStock?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  image: string;
  excerpt?: string;
  slug?: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Button variants
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Badge variants
export type BadgeVariant = 'primary' | 'success' | 'error' | 'sale' | 'warning' | 'info';

