"use client";
import {
  Hero,
  ProductShowcase,
  Features,
  ProductGrid,
  CategoryBanner,
  Brands,
  Blog,
  Newsletter,
} from "@/components";
import { useProducts } from "@/hooks/Products/useProducts";
import { SERVICE_GUARANTEES } from "@/constants";

export default function Home() {
  const { data: newProductsData, isLoading: loadingNew } = useProducts({
    limit: 10,
    // You can add more filters here if needed
  });

  const { data: featuredProductsData, isLoading: loadingFeatured } =
    useProducts({
      limit: 10,
      isFeatured: true,
    });

  const newProducts = newProductsData?.data || [];
  const featuredProducts = featuredProductsData?.data || [];

  if (loadingNew || loadingFeatured) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  ">
      <Hero />

      {/* Product Showcases */}
      <section className="py-1 bg-white overflow-hidden">
        <div className="  mx-auto   space-y-4">
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
      <section className="py-16  ">
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
    </div>
  );
}
