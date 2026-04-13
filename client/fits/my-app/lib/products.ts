import { Product } from '@/types';
import buds from "@/public/images/buds.jpg";
import mouse from "@/public/images/mouse.webp";
import mouse2 from "@/public/images/mouse2.jpg";
import watch from "@/public/images/watch.webp";
import hero1 from "@/public/images/hero1.webp";
import hero2 from "@/public/images/hero2.webp";
import game from "@/public/images/game.webp";
import feature from "@/public/images/feature.webp";

// Mock product database - In a real app, this would come from an API or database
const allProducts: Product[] = [
  {
    id: "1",
    name: "Apple airpods with charging case bluetooth",
    price: 100.0,
    image: buds,
    images: [buds, mouse, watch, mouse2],
    imageAlt: "Apple airpods with charging case bluetooth",
    description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals.",
    category: "Headphones",
    inStock: true,
    badge: "New",
    brand: "Apple",
    reference: "ATRL_8543",
    condition: "New",
    rating: 4,
    colors: [
      { name: "Red", value: "#EF4444" },
      { name: "Black", value: "#111827" },
      { name: "Blue", value: "#3B82F6" },
    ],
    sizes: ["Small", "Medium", "Large", "Extra Large"],
    dimensions: ["40x60cm", "60x90cm", "80x120cm"],
  },
  {
    id: "2",
    name: "Apple iPhone 14 pro max - fully unlocked",
    price: 110.0,
    image: hero2,
    imageAlt: "Gaming Mouse",
    description: "High-precision gaming mouse with customizable RGB lighting, programmable buttons, and ergonomic design. Built for competitive gaming.",
    category: "Headphones",
    inStock: true,
    colors: [
      { name: "Black", value: "#111827" },
      { name: "Brown", value: "#92400E" },
    ],
    sizes: ["Small", "Medium", "Large"],
  },
  {
    id: "3",
    name: "Colorcase silicone joymy bluetooth pro",
    price: 70.0,
    image: hero1,
    imageAlt: "Wireless Earbuds",
    description: "True wireless earbuds with crystal-clear audio, touch controls, and comfortable fit. Perfect for workouts and daily commutes.",
    category: "Headphones",
    inStock: true,
    colors: [
      { name: "Blue", value: "#3B82F6" },
      { name: "Green", value: "#84CC16" },
    ],
    sizes: ["Small", "Medium", "Large", "Extra Large"],
  },
  {
    id: "4",
    name: "Apple magsafe airpods headset with mic",
    price: 130.0,
    image: buds,
    imageAlt: "iPhone 15 Pro",
    description: "The latest iPhone with A17 Pro chip, ProMotion display, and advanced camera system. Experience the future of smartphones.",
    category: "Headphones",
    inStock: true,
    badge: "Hot",
    colors: [
      { name: "Orange", value: "#F59E0B" },
      { name: "Black", value: "#111827" },
    ],
    sizes: ["Medium", "Large"],
  },
  {
    id: "5",
    name: "Wireless headset max with noise cancelling",
    price: 240.0,
    salePrice: 199.0,
    image: feature,
    imageAlt: "Wireless headset max with noise cancelling",
    description: "Smartwatch with health tracking, fitness monitoring, and seamless integration with your iPhone. Stay connected and healthy.",
    category: "Headphones",
    inStock: true,
    badge: "Sale",
    colors: [
      { name: "Black", value: "#111827" },
      { name: "Camel", value: "#C19A6B" },
    ],
    sizes: ["Small", "Medium", "Large"],
  },
  {
    id: "6",
    name: "Premium bluetooth earbuds with touch control",
    price: 89.99,
    image: buds,
    imageAlt: "Premium bluetooth earbuds with touch control",
    description: "Premium mechanical keyboard with Cherry MX switches, RGB backlighting, and durable construction. Perfect for typing and gaming.",
    category: "Headphones",
    inStock: true,
    colors: [
      { name: "Yellow", value: "#FBBF24" },
      { name: "Black", value: "#111827" },
    ],
    sizes: ["Small", "Medium"],
  },
  {
    id: "7",
    name: "Over-ear studio headphones for creators",
    price: 159.99,
    image: game,
    imageAlt: "Over-ear studio headphones for creators",
    description: "27-inch 4K UHD monitor with HDR support, 144Hz refresh rate, and ultra-thin bezels. Ideal for gaming and professional work.",
    category: "Headphones",
    inStock: true,
    colors: [{ name: "Black", value: "#111827" }],
    sizes: ["Medium", "Large", "Extra Large"],
  },
  {
    id: "8",
    name: "Wireless earbuds with crystal clear audio",
    price: 79.0,
    image: buds,
    imageAlt: "Wireless earbuds with crystal clear audio",
    description: "1080p HD webcam with auto-focus, built-in microphone, and privacy shutter. Perfect for video calls and streaming.",
    category: "Headphones",
    inStock: true,
    colors: [
      { name: "Red", value: "#EF4444" },
      { name: "Blue", value: "#3B82F6" },
    ],
    sizes: ["Small", "Medium", "Large"],
  },
  {
    id: "9",
    name: "On-ear headphones with deep bass",
    price: 119.99,
    image: hero1,
    imageAlt: "On-ear headphones with deep bass",
    description: "Multi-port USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery. Expand your connectivity options.",
    category: "Headphones",
    inStock: true,
    colors: [
      { name: "Brown", value: "#92400E" },
      { name: "Green", value: "#84CC16" },
    ],
    sizes: ["Medium", "Large"],
  },
  {
    id: "10",
    name: "Sports earbuds with sweat resistance",
    price: 95.0,
    image: hero2,
    imageAlt: "Sports earbuds with sweat resistance",
    description: "Ergonomic aluminum laptop stand with adjustable height and ventilation. Improve your workspace comfort and productivity.",
    category: "Headphones",
    inStock: true,
    colors: [
      { name: "Orange", value: "#F59E0B" },
      { name: "Black", value: "#111827" },
    ],
    sizes: ["Small", "Medium", "Large"],
  },
  {
    id: "11",
    name: "Bluetooth headset with detachable mic",
    price: 149.0,
    image: feature,
    imageAlt: "Bluetooth headset with detachable mic",
    category: "Headphones",
    inStock: true,
    colors: [{ name: "Black", value: "#111827" }],
    sizes: ["Medium", "Large", "Extra Large"],
  },
  {
    id: "12",
    name: "Compact earbuds for daily commute",
    price: 65.0,
    image: buds,
    imageAlt: "Compact earbuds for daily commute",
    category: "Headphones",
    inStock: true,
    colors: [
      { name: "Camel", value: "#C19A6B" },
      { name: "Blue", value: "#3B82F6" },
    ],
    sizes: ["Small", "Medium"],
  },
  {
    id: "13",
    name: "Noise cancelling earbuds pro edition",
    price: 179.0,
    salePrice: 149.0,
    image: hero1,
    imageAlt: "Noise cancelling earbuds pro edition",
    category: "Headphones",
    inStock: true,
    badge: "Sale",
    colors: [
      { name: "Black", value: "#111827" },
      { name: "Red", value: "#EF4444" },
    ],
    sizes: ["Small", "Medium", "Large"],
  },
  {
    id: "14",
    name: "Over-ear headphones with 30h battery",
    price: 199.0,
    image: game,
    imageAlt: "Over-ear headphones with 30h battery",
    category: "Headphones",
    inStock: true,
    colors: [
      { name: "Green", value: "#84CC16" },
      { name: "Black", value: "#111827" },
    ],
    sizes: ["Medium", "Large"],
  },
  {
    id: "15",
    name: "Kids safe volume limited headphones",
    price: 59.0,
    image: hero2,
    imageAlt: "Kids safe volume limited headphones",
    category: "Headphones",
    inStock: true,
    colors: [
      { name: "Yellow", value: "#FBBF24" },
      { name: "Orange", value: "#F59E0B" },
    ],
    sizes: ["Small", "Medium"],
  },
  {
    id: "16",
    name: "Gaming headset with surround sound",
    price: 169.0,
    image: mouse,
    imageAlt: "Gaming headset with surround sound",
    category: "Headphones",
    inStock: true,
    colors: [
      { name: "Black", value: "#111827" },
      { name: "Blue", value: "#3B82F6" },
    ],
    sizes: ["Large", "Extra Large"],
  },
  {
    id: "17",
    name: "Ultra light earbuds with charging case",
    price: 84.0,
    image: buds,
    imageAlt: "Ultra light earbuds with charging case",
    category: "Headphones",
    inStock: true,
    colors: [
      { name: "Camel", value: "#C19A6B" },
      { name: "Brown", value: "#92400E" },
    ],
    sizes: ["Small", "Medium", "Large"],
  },
  {
    id: "18",
    name: "Foldable headphones travel friendly",
    price: 139.0,
    image: watch,
    imageAlt: "Foldable headphones travel friendly",
    category: "Headphones",
    inStock: true,
    colors: [
      { name: "Black", value: "#111827" },
      { name: "Brown", value: "#92400E" },
    ],
    sizes: ["Medium", "Large"],
  },
  {
    id: "19",
    name: "Wireless earbuds with fast pairing",
    price: 72.0,
    image: hero1,
    imageAlt: "Wireless earbuds with fast pairing",
    category: "Headphones",
    inStock: true,
    colors: [
      { name: "Red", value: "#EF4444" },
      { name: "Yellow", value: "#FBBF24" },
    ],
    sizes: ["Small", "Medium", "Large", "Extra Large"],
  },
  {
    id: "20",
    name: "Studio monitor headphones balanced sound",
    price: 219.0,
    image: mouse2,
    imageAlt: "Studio monitor headphones balanced sound",
    category: "Headphones",
    inStock: true,
    colors: [{ name: "Black", value: "#111827" }],
    sizes: ["Medium", "Large", "Extra Large"],
  },
];

/**
 * Get a product by ID
 */
export function getProductById(id: string): Product | undefined {
  return allProducts.find(product => product.id === id);
}

/**
 * Get all products
 */
export function getAllProducts(): Product[] {
  return allProducts;
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: string): Product[] {
  return allProducts.filter(product => product.category === category);
}

/**
 * Get related products (excluding the current product)
 */
export function getRelatedProducts(currentProductId: string, limit: number = 4): Product[] {
  const currentProduct = getProductById(currentProductId);
  if (!currentProduct) return [];

  return allProducts
    .filter(product => 
      product.id !== currentProductId && 
      product.category === currentProduct.category
    )
    .slice(0, limit);
}

