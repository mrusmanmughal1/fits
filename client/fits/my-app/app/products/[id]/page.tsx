import { productsService } from "@/services/products";
import { ProductGrid } from "@/components";
import { Breadcrumb } from "@/components/ui";
import {
  AddToCartPanel,
  ProductImageGallery,
  ProductInfoTabs,
  ProductOptions,
  ReviewsSection,
  StarRating,
} from "@/components/features";
import type { Product } from "@/types";
import { SocialShare } from "./SocialShare";
import { PolicySection } from "./PolicySection";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  try {
    const { data: product } = await productsService.getProduct(id);
    return {
      title: `${product.name} | Fits`,
      description: product.description || `Details for ${product.name}`,
    };
  } catch (error) {
    return {
      title: `Product Not Found | Fits`,
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const response = await productsService.getProduct(id);
  const product = response.data;

  // Fetch related products
  const relatedResponse = await productsService.getProducts({
    category: product.category,
    limit: 5,
  });
  const relatedProducts = (relatedResponse?.data?.data || []).filter(
    (p: Product) => p._id !== id,
  );

  // The backend populates `brand` as an object { _id, name, ... }
  // We extract the name string to avoid passing an object to React children
  const brandName: string =
    product.brand && typeof product.brand === "object"
      ? (product.brand as any).name ?? ""
      : (product.brand as string) ?? "";

  const productView = {
    breadcrumb: [{ label: "Home", href: "/" }, { label: product.name }],
    title: product.name,
    rating: product.rating || 0,
    meta: [
      { label: "Brand", value: brandName },
      { label: "Reference", value: product.reference },
      { label: "Condition", value: product.condition },
    ].filter((x) => Boolean(x.value)) as Array<{
      label: string;
      value: string;
    }>,
    price: {
      current: `$${product.price.toFixed(2)}`,
      original: product.salePrice ? `$${product.salePrice.toFixed(2)}` : null,
    },
    options: {
      colors: product.colors || [],
      sizes: product.sizes || [],
      dimensions: product.dimensions || [],
    },
    cart: {
      productId: product._id || product.id,
      inStock: product.inStock ?? true,
    },
    gallery: {
      images:
        product.images && product.images.length > 0
          ? product.images
          : ["/images/placeholder.jpg"],
      alt: product.imageAlt || product.name,
    },
    share: {
      productName: product.name,
      productUrl: `/products/${product._id || product.id}`,
    },
  };

  const tabs = [
    {
      key: "description",
      label: "Description",
      content: (
        <div className="space-y-4">
          <div className="prose prose-sm max-w-none text-gray-600">
            {product.description ||
              "No description available for this product."}
          </div>
          {product.features && product.features.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Key Features
              </h4>
              <ul className="list-disc ps-5 space-y-1 text-gray-600">
                {product.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "details",
      label: "Details",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-gray-700">
                Brand:{" "}
                <span className="font-medium">{brandName || "N/A"}</span>
              </p>
              <p className="text-gray-700">
                Category:{" "}
                <span className="font-medium">{product.category}</span>
              </p>
              {product.reference && (
                <p className="text-gray-700">
                  Reference:{" "}
                  <span className="font-medium">{product.reference}</span>
                </p>
              )}
            </div>
            {/* specifications mapping from backend */}
            {product.specifications &&
              (product.specifications as any[]).length > 0 && (
                <div className="space-y-2">
                  {(product.specifications as any[]).map((spec, i) => (
                    <p key={i} className="text-gray-700">
                      {spec.key}:{" "}
                      <span className="font-medium">{spec.value}</span>
                    </p>
                  ))}
                </div>
              )}
          </div>
        </div>
      ),
    },
    {
      key: "shipping",
      label: "Shipping",
      content: (
        <div className="space-y-2">
          <p>
            Standard shipping: 3–7 business days. Express shipping: 1–3 business
            days.
          </p>
          <p className="text-gray-600">
            Shipping costs are calculated at checkout based on destination and
            weight.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen  bg-accent">
      <main className="container max-w-[90%] mx-auto px-4 py-8">
        <Breadcrumb items={productView.breadcrumb} />

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column - Product Image Gallery */}
          <div className="lg:col-span-5">
            <ProductImageGallery
              images={productView.gallery.images}
              alt={productView.gallery.alt}
            />
          </div>

          {/* Middle Column - Product Details */}
          <div className="lg:col-span-4">
            {/* Product Title */}
            <h1 className="text-xl font-medium text-gray-900 mb-3">
              {productView.title}
            </h1>
            {/* Rating */}
            {productView.rating && (
              <div className="mb-4">
                <StarRating rating={productView.rating} />
              </div>
            )}

            {/* Product Metadata - Brand, Reference, Condition */}
            {productView.meta.length > 0 && (
              <div className="mb-2 text-xs">
                <div className="flex items-center  gap-2 text-gray-500">
                  {productView.meta.map((m, idx) => (
                    <span key={m.label} className="flex items-center">
                      <span>
                        <span className="font-semibold text-gray-700">
                          {m.label} :
                        </span>{" "}
                        <span className="font-normal">{m.value}</span>
                      </span>
                      {idx < productView.meta.length - 1 && (
                        <span className="text-gray-400 mx-1">|</span>
                      )}
                    </span>
                  ))}
                </div>
                <div className="mt-4 border-t border-gray-300"></div>
              </div>
            )}

            {/* Price */}
            <div className="mb-2">
              <span className="text-xl font-semibold text-gray-900">
                {productView.price.current}
              </span>
              {productView.price.original && (
                <span className="ml-4 text-2xl text-price line-through">
                  {productView.price.original}
                </span>
              )}
            </div>

            {/* Product Options */}
            <div className="mb-8">
              <ProductOptions
                colors={productView.options.colors}
                sizes={productView.options.sizes}
                dimensions={productView.options.dimensions}
              />
            </div>

            {/* Quantity and Actions (reusable) */}
            <div className="mb-8 border-t border-gray-300 pt-4">
              <AddToCartPanel
                product={product}
                inStock={productView.cart.inStock}
              />
            </div>

            {/* Social Share */}
            <div className="mb-8">
              <SocialShare
                productName={productView.share.productName}
                productUrl={productView.share.productUrl}
              />
            </div>
          </div>

          {/* Right Column - Policy + Payment */}
          <div className="lg:col-span-3">
            <PolicySection />
          </div>
        </div>

        <div className="mb-16">
          <ProductInfoTabs tabs={tabs} defaultKey="description" />
        </div>

        {/* Reviews Section */}
        <div className="mb-16">
          <ReviewsSection productId={product._id || product.id} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-16">
            <ProductGrid
              title="Related Products"
              description="You might also like these products"
              products={relatedProducts}
            />
          </section>
        )}
      </main>
    </div>
  );
}
