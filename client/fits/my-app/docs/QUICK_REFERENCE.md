# Quick Reference Guide

## Colors in Tailwind Classes

Since we're using Tailwind CSS 4 with custom theme variables, you can use these classes:

### Primary Colors
```tsx
className="bg-primary"           // Primary background
className="text-primary"          // Primary text
className="border-primary"        // Primary border
className="hover:bg-primary-hover" // Hover state
```

### Price Colors
```tsx
className="text-price"           // Standard price color (#595959)
className="text-price-sale"      // Sale price color (#dc2626)
```

### Semantic Colors
```tsx
className="text-success"         // Success green
className="text-error"           // Error red
className="text-warning"        // Warning orange
className="text-info"            // Info blue
```

## Common Component Patterns

### Button
```tsx
import { Button } from '@/app/components';

<Button variant="primary" size="md">Click Me</Button>
<Button variant="secondary" size="sm">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

### Input
```tsx
import { Input } from '@/app/components';

<Input 
  label="Email" 
  type="email" 
  placeholder="Enter your email"
  error="This field is required"
/>
```

### Product Card
```tsx
import { ProductCard } from '@/app/components';

<ProductCard
  id="1"
  name="Product Name"
  price={99.99}
  salePrice={79.99}
  image="/product.jpg"
  badge="Sale"
  badgeVariant="sale"
  onAddToCart={() => console.log('Added')}
/>
```

### Card
```tsx
import { Card } from '@/app/components';

<Card interactive>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

## Typography Classes

```tsx
<h1 className="text-heading-1">Heading 1</h1>
<h2 className="text-heading-2">Heading 2</h2>
<h3 className="text-heading-3">Heading 3</h3>
<h4 className="text-heading-4">Heading 4</h4>
<p className="text-body">Body text</p>
<p className="text-body-small">Small body text</p>
<span className="text-price">$99.99</span>
<span className="text-price-sale">$79.99</span>
```

## Layout Utilities

```tsx
<div className="container">  {/* Max width container with responsive padding */}
  {/* Your content */}
</div>
```

## Common E-Commerce Patterns

### Product Grid
```tsx
<div className="container">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {products.map(product => (
      <ProductCard key={product.id} {...product} />
    ))}
  </div>
</div>
```

### Price Display
```tsx
<div className="flex items-center gap-2">
  <span className="text-price-sale text-2xl font-bold">$79.99</span>
  <span className="text-price-original">$99.99</span>
</div>
```

### Badge
```tsx
<span className="badge badge-sale">-20%</span>
<span className="badge badge-primary">New</span>
<span className="badge badge-success">In Stock</span>
```

