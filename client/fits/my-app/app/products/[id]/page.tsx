import { ProductGrid } from "@/components";
import { Breadcrumb } from "@/components/ui";
import {
  AddToCartPanel,
  ProductImageGallery,
  ProductInfoTabs,
  ProductOptions,
  StarRating,
} from "@/components/features";
import type { Product } from "@/types";
import { SocialShare } from "./SocialShare";
import { PolicySection } from "./PolicySection";
import buds from "@/public/images/buds.jpg";
import mouse from "@/public/images/mouse.webp";
import mouse2 from "@/public/images/mouse2.jpg";
import watch from "@/public/images/watch.webp";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  return {
    title: `Product Details | Fits`,
    description: `Product details page`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Dummy product + related products (ensures ALL UI elements always render)
  const dummyProduct: Product = {
    id: "demo-1",
    name: "Apple Airpods With Charging Case Bluetooth",
    price: 100,
    image: buds,
    images: [buds, mouse, watch, mouse2],
    imageAlt: "Apple Airpods With Charging Case Bluetooth",
    inStock: true,
    brand: "Asus",
    reference: "ATRL_1056",
    condition: "New",
    rating: 4,
    colors: [
      { name: "Black", value: "#374151" },
      { name: "Yellow", value: "#FBBF24" },
      { name: "Brown", value: "#92400E" },
    ],
    sizes: ["Small", "Medium", "Large", "Extra Large"],
    dimensions: ["40x60cm", "60x90cm"],
    category: "Audio",
  };

  const relatedProducts: Product[] = [
    {
      id: "demo-2",
      name: "Gaming Mouse",
      price: 79.99,
      image: mouse,
      imageAlt: "Gaming Mouse",
      inStock: true,
    },
    {
      id: "demo-3",
      name: "Apple Watch",
      price: 399.99,
      image: watch,
      imageAlt: "Apple Watch",
      inStock: true,
    },
    {
      id: "demo-4",
      name: "Wireless Earbuds",
      price: 129.99,
      image: buds,
      imageAlt: "Wireless Earbuds",
      inStock: true,
    },
    {
      id: "demo-5",
      name: "Mouse Pro",
      price: 49.99,
      image: mouse2,
      imageAlt: "Mouse Pro",
      inStock: true,
    },
  ];

  const productView = {
    breadcrumb: [{ label: "Home", href: "/" }, { label: dummyProduct.name }],
    title: dummyProduct.name,
    rating: dummyProduct.rating,
    meta: [
      { label: "Brand", value: dummyProduct.brand },
      { label: "Reference", value: dummyProduct.reference },
      { label: "Condition", value: dummyProduct.condition },
    ].filter((x) => Boolean(x.value)) as Array<{
      label: string;
      value: string;
    }>,
    price: {
      current: "$100.00",
      original: null as string | null,
    },
    options: {
      colors: dummyProduct.colors,
      sizes: dummyProduct.sizes,
      dimensions: dummyProduct.dimensions,
    },
    cart: {
      productId: dummyProduct.id,
      inStock: dummyProduct.inStock,
    },
    gallery: {
      images: dummyProduct.images ?? [dummyProduct.image],
      alt: dummyProduct.imageAlt || dummyProduct.name,
    },
    share: {
      productName: dummyProduct.name,
      productUrl: `/products/${dummyProduct.id}`,
    },
  };

  const tabs = [
    {
      key: "description",
      label: "Description",
      content: (
        <div className="space-y-4">
          <p>
            The passage experienced a surge in popularity during the 1960s when
            Letraset used it on their dry-transfer sheets, and again during the
            90s as desktop publishers bundled the text with their software.
            Today it&apos;s seen all around the web; on templates, websites, and
            stock designs.
          </p>
          <ul className="list-disc ps-6 space-y-2">
            <li>Offer personalized virtual styling appointments</li>
            <li>
              Outfit recommendations based on their preferences and body type.
            </li>
            <li>Provide a unique service allowing customers to personalize</li>
            <li>Customize their clothing purchases</li>
          </ul>
        </div>
      ),
    },
    {
      key: "details",
      label: "Product Details",
      content: (
        <div className="space-y-2">
          <p className="text-gray-700">
            Brand: <span className="font-medium">{dummyProduct.brand}</span>
          </p>
          <p className="text-gray-700">
            Reference:{" "}
            <span className="font-medium">{dummyProduct.reference}</span>
          </p>
          <p className="text-gray-700">
            Condition:{" "}
            <span className="font-medium">{dummyProduct.condition}</span>
          </p>
          <p className="text-gray-700">
            Category:{" "}
            <span className="font-medium">{dummyProduct.category}</span>
          </p>
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
    {
      key: "size",
      label: "Size Chart",
      content: (
        <div className="space-y-3">
          <p className="text-gray-600">
            Use this chart as a reference. If you are between sizes, we
            recommend sizing up.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-[520px] w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-medium text-gray-700">
                    Size
                  </th>
                  <th className="text-left p-3 font-medium text-gray-700">
                    Chest
                  </th>
                  <th className="text-left p-3 font-medium text-gray-700">
                    Waist
                  </th>
                  <th className="text-left p-3 font-medium text-gray-700">
                    Hip
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {["Small", "Medium", "Large", "Extra Large"].map((s) => (
                  <tr key={s} className="border-t border-gray-200">
                    <td className="p-3 text-gray-700">{s}</td>
                    <td className="p-3 text-gray-600">34–38</td>
                    <td className="p-3 text-gray-600">28–32</td>
                    <td className="p-3 text-gray-600">36–40</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
                productId={productView.cart.productId}
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
