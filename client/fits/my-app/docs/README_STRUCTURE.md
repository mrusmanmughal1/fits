# Project Structure

This document describes the professional folder structure of the Fits e-commerce application.

## 📁 Folder Structure

```
my-app/
├── app/                    # Next.js App Router
│   ├── components/         # (DEPRECATED - use root components/)
│   ├── globals.css         # Global styles and Tailwind config
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
│
├── components/             # React Components
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx      # Button component
│   │   ├── Input.tsx        # Input component
│   │   ├── Card.tsx         # Card component
│   │   ├── Badge.tsx        # Badge component
│   │   └── index.ts        # Barrel export
│   │
│   ├── layout/             # Layout components
│   │   ├── Header.tsx      # Site header/navigation
│   │   ├── Footer.tsx      # Site footer
│   │   └── index.ts        # Barrel export
│   │
│   ├── sections/           # Page sections
│   │   ├── Hero.tsx         # Hero section
│   │   ├── Features.tsx     # Features section
│   │   ├── ProductShowcase.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── CategoryBanner.tsx
│   │   ├── Brands.tsx
│   │   ├── Blog.tsx
│   │   ├── Newsletter.tsx
│   │   └── index.ts        # Barrel export
│   │
│   ├── features/           # Feature-specific components
│   │   ├── ProductCard.tsx # Product card component
│   │   └── index.ts        # Barrel export
│   │
│   └── index.ts            # Main barrel export
│
├── lib/                    # Utility functions
│   └── utils.ts            # Helper functions (cn, formatPrice, etc.)
│
├── types/                  # TypeScript type definitions
│   └── index.ts            # Shared types and interfaces
│
├── constants/              # Application constants
│   └── index.ts            # Constants (colors, nav links, etc.)
│
├── hooks/                  # Custom React hooks
│   └── index.ts            # Hook exports
│
└── public/                 # Static assets
```

## 📦 Component Categories

### UI Components (`components/ui/`)
Reusable, generic UI elements that can be used throughout the application:
- **Button** - Button with variants (primary, secondary, outline, ghost)
- **Input** - Form input with label, error, and helper text
- **Card** - Container card component
- **Badge** - Badge/label component

### Layout Components (`components/layout/`)
Site-wide layout components:
- **Header** - Navigation header with menu, search, cart
- **Footer** - Site footer with links and social media

### Section Components (`components/sections/`)
Page sections used on landing pages and other pages:
- **Hero** - Hero banner section
- **Features** - Features grid
- **ProductShowcase** - Product showcase banners
- **ProductGrid** - Product listing grid
- **CategoryBanner** - Category promotion banners
- **Brands** - Brand logos section
- **Blog** - Blog posts section
- **Newsletter** - Newsletter signup form

### Feature Components (`components/features/`)
Feature-specific components:
- **ProductCard** - Product card for displaying products

## 🔧 Utilities

### `lib/utils.ts`
Utility functions:
- `cn()` - Merge Tailwind CSS classes
- `formatPrice()` - Format numbers as currency
- `calculateDiscount()` - Calculate discount percentage
- `isEmoji()` - Check if string is emoji
- `generateId()` - Generate unique IDs
- `debounce()` - Debounce function calls
- `formatDate()` - Format dates

## 📝 Types

### `types/index.ts`
Shared TypeScript interfaces:
- `Product` - Product data structure
- `BlogPost` - Blog post structure
- `Feature` - Feature item structure
- `Category` - Category structure
- `CartItem` - Shopping cart item
- `User` - User data structure
- `ButtonVariant`, `ButtonSize` - Button type definitions
- `BadgeVariant` - Badge variant types

## 📊 Constants

### `constants/index.ts`
Application constants:
- `BRAND_NAME` - Brand name
- `BRAND_TAGLINE` - Brand tagline
- `NAV_LINKS` - Navigation links
- `FEATURES` - Feature list
- `BRANDS` - Brand names
- `SERVICE_GUARANTEES` - Service guarantee items
- `COLORS` - Color palette
- `BREAKPOINTS` - Responsive breakpoints

## 🎣 Hooks

### `hooks/`
Custom React hooks (to be added):
- `useCart` - Shopping cart management
- `useAuth` - Authentication
- `useProducts` - Product data fetching
- etc.

## 📥 Import Examples

### Importing UI Components
```tsx
import { Button, Input, Card, Badge } from '@/components/ui';
```

### Importing Layout Components
```tsx
import { Header, Footer } from '@/components/layout';
```

### Importing Section Components
```tsx
import { Hero, Features, ProductGrid } from '@/components/sections';
```

### Importing Feature Components
```tsx
import { ProductCard } from '@/components/features';
```

### Importing Everything from Components
```tsx
import { Button, Header, Hero, ProductCard } from '@/components';
```

### Importing Types
```tsx
import { Product, BlogPost } from '@/types';
```

### Importing Utilities
```tsx
import { cn, formatPrice, isEmoji } from '@/lib/utils';
```

### Importing Constants
```tsx
import { BRAND_NAME, NAV_LINKS, COLORS } from '@/constants';
```

## 🎯 Best Practices

1. **Component Organization**
   - Keep components in their appropriate category folders
   - Use barrel exports (`index.ts`) for clean imports
   - One component per file

2. **Type Safety**
   - Define types in `types/index.ts`
   - Use TypeScript interfaces for all props
   - Export types alongside components

3. **Reusability**
   - UI components should be generic and reusable
   - Section components can be page-specific
   - Feature components are domain-specific

4. **Constants**
   - Store all constants in `constants/index.ts`
   - Use constants instead of hardcoded values
   - Makes updates easier and consistent

5. **Utilities**
   - Keep utility functions pure (no side effects)
   - Document complex functions
   - Use TypeScript for type safety

## 🚀 Adding New Components

1. **UI Component**: Add to `components/ui/`
2. **Layout Component**: Add to `components/layout/`
3. **Section Component**: Add to `components/sections/`
4. **Feature Component**: Add to `components/features/`
5. **Update barrel exports**: Add to appropriate `index.ts`
6. **Add types**: If needed, add to `types/index.ts`

## 📚 Next Steps

- Add custom hooks in `hooks/`
- Create API routes in `app/api/`
- Add tests in `__tests__/` or `tests/`
- Add storybook stories if using Storybook

