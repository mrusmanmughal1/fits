# E-Commerce Design System

## Color Palette

### Primary Colors
- **Primary**: `#006edb` - Main brand color for buttons, links, and interactive elements
- **Primary Hover**: `#005bb8` - Darker shade for hover states
- **Primary Light**: `#e6f2ff` - Light background variant
- **Primary Dark**: `#004a94` - Darker variant for emphasis

### Secondary Colors
- **Secondary**: `#ffffff` - White background and cards
- **Secondary Hover**: `#f5f5f5` - Subtle hover state for white elements

### Price Colors
- **Price**: `#595959` - Standard price color
- **Price Sale**: `#dc2626` - Sale/discounted price color

### Semantic Colors
- **Success**: `#10b981` - Success messages, positive actions
- **Error**: `#ef4444` - Error messages, destructive actions
- **Warning**: `#f59e0b` - Warning messages, caution states
- **Info**: `#3b82f6` - Informational messages

### Neutral Colors
- **Gray Scale**: 50-900 scale for text, borders, and backgrounds
- **Border**: `#e5e7eb` - Default border color
- **Border Hover**: `#d1d5db` - Hover state for borders

## Typography

### Font Families
- **Sans**: Geist Sans (primary)
- **Mono**: Geist Mono (code/technical)

### Font Sizes
- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **base**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 1.875rem (30px)
- **4xl**: 2.25rem (36px)
- **5xl**: 3rem (48px)

### Font Weights
- **Light**: 300
- **Normal**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

### Typography Classes
- `.text-heading-1` - Largest heading (5xl, bold)
- `.text-heading-2` - Second heading (4xl, bold)
- `.text-heading-3` - Third heading (3xl, semibold)
- `.text-heading-4` - Fourth heading (2xl, semibold)
- `.text-body` - Body text (base, normal)
- `.text-body-small` - Small body text (sm, normal, secondary color)
- `.text-price` - Price display (lg, semibold, price color)
- `.text-price-sale` - Sale price (lg, semibold, sale color)

## Components

### Buttons

#### Variants
- **Primary** (`.btn-primary`): Blue background, white text
- **Secondary** (`.btn-secondary`): White background, border
- **Outline** (`.btn-outline`): Transparent, primary border
- **Ghost** (`.btn-ghost`): Transparent, hover background

#### Sizes
- **Small** (`.btn-sm`): Compact padding
- **Default**: Standard padding
- **Large** (`.btn-lg`): Larger padding

#### Usage
```tsx
<button className="btn btn-primary">Add to Cart</button>
<button className="btn btn-secondary btn-sm">Learn More</button>
<button className="btn btn-outline btn-lg">View Details</button>
```

### Inputs

#### Base Input (`.input`)
- Standard text input with border
- Focus state with primary color and shadow
- Disabled state with reduced opacity
- Error state with red border

#### Textarea (`.textarea`)
- Multi-line text input
- Same styling as input
- Resizable vertically

#### Select (`.select`)
- Dropdown select element
- Same styling as input

#### Usage
```tsx
<input type="text" className="input" placeholder="Enter your name" />
<textarea className="textarea" placeholder="Enter message" />
<select className="select">
  <option>Option 1</option>
</select>
```

### Cards

#### Base Card (`.card`)
- White background
- Border and shadow
- Hover effect with elevated shadow

#### Interactive Card (`.card-interactive`)
- Adds hover transform effect
- Enhanced shadow on hover

#### Product Card (`.product-card`)
- Specialized for product display
- Image container with aspect ratio
- Product info section
- Hover effect with border color change

#### Usage
```tsx
<div className="card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>

<div className="product-card">
  <img className="product-image" src="..." alt="Product" />
  <div className="product-info">
    <h3 className="product-title">Product Name</h3>
    <span className="product-price">$99.99</span>
  </div>
</div>
```

### Badges

#### Variants
- **Primary** (`.badge-primary`): Light blue background
- **Success** (`.badge-success`): Green variant
- **Error** (`.badge-error`): Red variant
- **Sale** (`.badge-sale`): Red background, white text

#### Usage
```tsx
<span className="badge badge-primary">New</span>
<span className="badge badge-sale">-20%</span>
```

### Links

#### Base Link (`.link`)
- Primary color
- Underline on hover
- Smooth transition

#### Usage
```tsx
<a href="#" className="link">Learn More</a>
```

## Spacing

### Scale
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)
- **3xl**: 4rem (64px)

## Border Radius

- **sm**: 0.25rem (4px)
- **md**: 0.5rem (8px)
- **lg**: 0.75rem (12px)
- **xl**: 1rem (16px)
- **full**: 9999px (fully rounded)

## Shadows

- **sm**: Subtle shadow for cards
- **md**: Medium shadow for hover states
- **lg**: Large shadow for elevated elements
- **xl**: Extra large shadow for modals/overlays

## Transitions

- **fast**: 150ms - Quick interactions
- **base**: 200ms - Standard transitions
- **slow**: 300ms - Smooth animations

## Layout

### Container (`.container`)
- Max width: 1280px
- Responsive padding:
  - Mobile: 1rem
  - Tablet: 1.5rem
  - Desktop: 2rem

## Utility Classes

### Color Utilities
- `.text-primary` - Primary text color
- `.text-price` - Price text color
- `.text-price-sale` - Sale price color
- `.bg-primary` - Primary background
- `.bg-primary-light` - Light primary background
- `.border-primary` - Primary border color
- `.hover-primary:hover` - Primary color on hover
- `.hover-bg-primary:hover` - Primary background on hover

## Usage Examples

### Product Listing
```tsx
<div className="container">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="product-card">
      <img className="product-image" src="/product.jpg" alt="Product" />
      <div className="product-info">
        <span className="badge badge-sale">Sale</span>
        <h3 className="product-title">Product Name</h3>
        <div>
          <span className="product-price-sale">$79.99</span>
          <span className="product-price-original">$99.99</span>
        </div>
        <button className="btn btn-primary w-full mt-4">Add to Cart</button>
      </div>
    </div>
  </div>
</div>
```

### Form Example
```tsx
<form className="card max-w-md mx-auto">
  <h2 className="text-heading-3 mb-6">Contact Us</h2>
  <div className="space-y-4">
    <input type="text" className="input" placeholder="Name" />
    <input type="email" className="input" placeholder="Email" />
    <textarea className="textarea" placeholder="Message"></textarea>
    <button type="submit" className="btn btn-primary w-full">Send</button>
  </div>
</form>
```

## Best Practices

1. **Consistency**: Always use design system classes instead of custom styles
2. **Accessibility**: Ensure sufficient color contrast (WCAG AA minimum)
3. **Responsive**: Use Tailwind responsive prefixes (sm:, md:, lg:)
4. **Hover States**: Always provide hover feedback for interactive elements
5. **Loading States**: Consider disabled states for async actions
6. **Error States**: Use error colors and styles for validation feedback

