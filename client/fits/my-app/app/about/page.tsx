import React from "react";
import Link from "next/link";
import { ShieldCheck, Truck, Headphones, Sparkles } from "lucide-react";

import { Breadcrumb } from "@/components/ui";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-accent">
      <main className="container max-w-[90%] mx-auto px-4 py-8">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "About" }]}
        />

        <section className="bg-white rounded-3xl border border-gray-200 p-8 md:p-10">
          <div className="flex flex-col gap-4">
            <span className="badge badge-primary w-fit">About Fits</span>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Built for people who love great tech.
            </h1>
            <p className="text-sm md:text-base text-price max-w-3xl">
              Fits is a modern store experience for electronics and accessories.
              We focus on quality products, transparent pricing, and a checkout
              flow that stays fast and simple.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card p-6">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-gray-900">
                Fast delivery
              </h3>
              <p className="mt-2 text-sm text-price">
                Reliable shipping with clear tracking updates.
              </p>
            </div>

            <div className="card p-6">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-gray-900">
                Secure checkout
              </h3>
              <p className="mt-2 text-sm text-price">
                Your data stays protected with safe access controls.
              </p>
            </div>

            <div className="card p-6">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-gray-900">
                Curated picks
              </h3>
              <p className="mt-2 text-sm text-price">
                A tighter catalog with the essentials people actually want.
              </p>
            </div>

            <div className="card p-6">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-gray-900">
                Helpful support
              </h3>
              <p className="mt-2 text-sm text-price">
                Quick replies for orders, returns, and product questions.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900">Our story</h2>
            <p className="mt-3 text-sm text-price">
              Fits started as a simple idea: make buying accessories feel as
              smooth as the devices they go with. We keep the experience clean,
              and we keep the product quality high.
            </p>
            <p className="mt-3 text-sm text-price">
              We’re continually improving our catalog, checkout, and delivery
              experience. If you have feedback, we’d love to hear it.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Browse products
              </Link>
              <Link
                href="/contact"
                className="px-6 py-2.5 rounded-full border border-gray-300 text-sm font-medium text-gray-800 hover:border-primary/40 hover:text-primary transition-colors"
              >
                Contact us
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white rounded-3xl border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900">
              What we value
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-price">
              <li className="flex gap-2">
                <span className="text-primary font-semibold">•</span>
                Clear pricing and product info.
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-semibold">•</span>A checkout
                that stays fast and accessible.
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-semibold">•</span>
                Customer-first support and fair policies.
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-semibold">•</span>
                Consistent quality control.
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
