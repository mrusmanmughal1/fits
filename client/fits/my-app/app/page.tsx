import {
  Header,
  Footer,
  Hero,
  ProductShowcase,
  Features,
  ProductGrid,
  CategoryBanner,
  Brands,
  Blog,
  Newsletter,
} from "@/components";
import { Product } from "@/types";
import { SERVICE_GUARANTEES } from "@/constants";
import headphone from "@/public/images/mouse.webp";

// Sample product data
const newProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 199.99,
    image: headphone,
  },
  {
    id: "2",
    name: "Gaming Mouse",
    price: 79.99,
    image: headphone,
  },
  {
    id: "3",
    name: "Wireless Earbuds",
    price: 129.99,
    image: headphone,
  },
  {
    id: "4",
    name: "iPhone 15 Pro",
    price: 999.99,
    salePrice: 899.99,
    image: headphone,
    badge: "Sale",
  },
  {
    id: "5",
    name: "Apple Watch",
    price: 399.99,
    image: headphone,
  },
];

const featuredProducts: Product[] = [
  {
    id: "6",
    name: "Mechanical Keyboard",
    price: 149.99,
    image: headphone,
  },
  {
    id: "7",
    name: "4K Monitor",
    price: 499.99,
    salePrice: 399.99,
    image: headphone,
    badge: "Sale",
  },
  {
    id: "8",
    name: "Webcam HD",
    price: 89.99,
    image: headphone,
  },
  {
    id: "9",
    name: "USB-C Hub",
    price: 59.99,
    image: headphone,
  },
  {
    id: "10",
    name: "Laptop Stand",
    price: 49.99,
    image: headphone,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen  ">
      <Header />

      <Hero />

      {/* Product Showcases */}
      <section className="py-4 bg-white overflow-hidden">
        <div className="container mx-auto   space-y-4">
          <ProductShowcase
            title="Longer Battery Life Faster Charging"
            image="/images/feature.webp"
            subtitle="Portable Versatile Exceptional"
            position=" justify-end items-end w-full flex"
          />
          <ProductShowcase
            subtitle="Portable Versatile Exceptional"
            title="Smarter Living Starts Apple Watch"
            image="/images/watch.webp"
            position=" justify-start items-start w-full flex"
          />
        </div>
      </section>

      <Features />

      <ProductGrid
        title="New Products"
        description="Check out our collection of the top New Products."
        products={newProducts}
      />

      <ProductGrid
        title="Featured Products"
        description="Check out our collection of the top New Products."
        products={featuredProducts}
      />

      {/* Category Banners */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CategoryBanner
              title="Meets Simplicity Choose Mac"
              subtitle="Experience the power of simplicity"
              emoji="💻"
              gradient="bg-gradient-to-br from-gray-50 to-gray-100"
            />
            <CategoryBanner
              title="Unmatched Clarity"
              subtitle="Capture every moment with precision"
              emoji="📷"
              gradient="bg-gradient-to-br from-gray-50 to-gray-100"
            />
            <CategoryBanner
              title="Latest Phone 14 Pro Max"
              subtitle="The future of smartphones"
              emoji="📱"
              gradient="bg-gradient-to-br from-gray-50 to-gray-100"
            />
            <CategoryBanner
              title="Dominate Every Move with Game Control"
              subtitle="Take your gaming to the next level"
              emoji="🎮"
              gradient="bg-gradient-to-br from-gray-50 to-gray-100"
            />
          </div>
        </div>
      </section>

      <Brands />

      <Blog />

      {/* Service Guarantees */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICE_GUARANTEES.map((service, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />

      <Footer />
    </div>
  );
}
