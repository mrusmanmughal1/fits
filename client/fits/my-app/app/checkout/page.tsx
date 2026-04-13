"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";

import { Breadcrumb, Button } from "@/components/ui";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import type { CartItem, Product } from "@/types";

type PaymentMethod = "card" | "cod";

type CheckoutValues = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  paymentMethod: PaymentMethod;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvc: string;
  notes: string;
};

function getItemImage(item: Product) {
  const img = item.images?.[0] ?? item.image;
  const isEmoji =
    typeof img === "string" &&
    img.length <= 2 &&
    !img.startsWith("/") &&
    !img.startsWith("http");
  return { img, isEmoji };
}

const DUMMY_CART_ITEMS: CartItem[] = [
  {
    id: "demo-tee",
    name: "Classic Tee",
    price: 29,
    salePrice: 19,
    image: "👕",
    imageAlt: "Classic Tee",
    quantity: 2,
  },
  {
    id: "demo-sneakers",
    name: "Everyday Sneakers",
    price: 89,
    image: "👟",
    imageAlt: "Everyday Sneakers",
    quantity: 1,
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    getTotalItems,
    getSubtotal,
    getShipping,
    getTax,
    getTotal,
    clearCart,
  } = useCart();

  const initialValues: CheckoutValues = {
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
    notes: "",
  };

  const validationSchema = useMemo(
    () =>
      Yup.object({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        phone: Yup.string().min(7, "Too short").required("Phone is required"),
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        address1: Yup.string().required("Address is required"),
        address2: Yup.string(),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        zip: Yup.string().required("ZIP is required"),
        country: Yup.string().required("Country is required"),
        paymentMethod: Yup.mixed<PaymentMethod>()
          .oneOf(["card", "cod"])
          .required(),
        cardNumber: Yup.string().when("paymentMethod", {
          is: "card",
          then: (s) =>
            s
              .required("Card number is required")
              .min(12, "Invalid card number"),
          otherwise: (s) => s.notRequired(),
        }),
        cardName: Yup.string().when("paymentMethod", {
          is: "card",
          then: (s) => s.required("Name on card is required"),
          otherwise: (s) => s.notRequired(),
        }),
        cardExpiry: Yup.string().when("paymentMethod", {
          is: "card",
          then: (s) => s.required("Expiry is required"),
          otherwise: (s) => s.notRequired(),
        }),
        cardCvc: Yup.string().when("paymentMethod", {
          is: "card",
          then: (s) => s.required("CVC is required").min(3, "Invalid CVC"),
          otherwise: (s) => s.notRequired(),
        }),
        notes: Yup.string(),
      }),
    []
  );

  const isUsingDummyCart = items.length === 0;
  const effectiveItems = isUsingDummyCart ? DUMMY_CART_ITEMS : items;

  return (
    <div className="min-h-screen bg-accent">
      <main className="container max-w-[90%] mx-auto px-4 py-8">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Checkout" }]}
        />

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>
          <p className="text-sm text-price mt-2">
            Complete your order by filling in the details below.
          </p>
        </div>

        {isUsingDummyCart ? (
          <div className="mb-6 bg-white rounded-3xl border border-amber-200 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-gray-800">
                Your cart is empty — showing{" "}
                <span className="font-semibold">demo items</span> for preview.
              </p>
              <Link
                href="/products"
                className="text-sm font-medium text-primary hover:underline"
              >
                Add real items
              </Link>
            </div>
          </div>
        ) : null}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, helpers) => {
            if (effectiveItems.length === 0) return;
            try {
              // demo checkout: in real app send to backend
              await new Promise((r) => setTimeout(r, 600));
              if (!isUsingDummyCart) clearCart();
              toast.success("Order placed successfully", {
                id: "checkout-success",
              });
              router.push("/");
            } catch (e) {
              toast.error("Checkout failed", { id: "checkout-failed" });
            } finally {
              helpers.setSubmitting(false);
            }
          }}
        >
          {(formik) => {
            const subtotal = isUsingDummyCart
              ? effectiveItems.reduce((sum, item) => {
                  const price = item.salePrice || item.price;
                  return sum + price * item.quantity;
                }, 0)
              : getSubtotal();
            const shipping = isUsingDummyCart
              ? subtotal > 0
                ? 7
                : 0
              : getShipping();
            const tax = isUsingDummyCart ? 0 : getTax();
            const total = isUsingDummyCart
              ? subtotal + shipping + tax
              : getTotal();
            const totalItems = isUsingDummyCart
              ? effectiveItems.reduce((sum, item) => sum + item.quantity, 0)
              : getTotalItems();

            return (
              <Form className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: form */}
                <section className="lg:col-span-8 space-y-6">
                  <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                      Contact information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <Field
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          className="input"
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <p className="mt-1 text-xs text-red-600">
                            {String(formik.errors.email)}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <Field
                          name="phone"
                          type="tel"
                          placeholder="+1 555 000 0000"
                          className="input"
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                          <p className="mt-1 text-xs text-red-600">
                            {String(formik.errors.phone)}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                      Shipping address
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First name
                        </label>
                        <Field name="firstName" className="input" />
                        {formik.touched.firstName && formik.errors.firstName ? (
                          <p className="mt-1 text-xs text-red-600">
                            {String(formik.errors.firstName)}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last name
                        </label>
                        <Field name="lastName" className="input" />
                        {formik.touched.lastName && formik.errors.lastName ? (
                          <p className="mt-1 text-xs text-red-600">
                            {String(formik.errors.lastName)}
                          </p>
                        ) : null}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <Field
                          name="address1"
                          placeholder="Street address"
                          className="input"
                        />
                        {formik.touched.address1 && formik.errors.address1 ? (
                          <p className="mt-1 text-xs text-red-600">
                            {String(formik.errors.address1)}
                          </p>
                        ) : null}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Apartment, suite, etc. (optional)
                        </label>
                        <Field
                          name="address2"
                          placeholder="Apt / suite"
                          className="input"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <Field name="city" className="input" />
                        {formik.touched.city && formik.errors.city ? (
                          <p className="mt-1 text-xs text-red-600">
                            {String(formik.errors.city)}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        <Field name="state" className="input" />
                        {formik.touched.state && formik.errors.state ? (
                          <p className="mt-1 text-xs text-red-600">
                            {String(formik.errors.state)}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP
                        </label>
                        <Field name="zip" className="input" />
                        {formik.touched.zip && formik.errors.zip ? (
                          <p className="mt-1 text-xs text-red-600">
                            {String(formik.errors.zip)}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        <Field as="select" name="country" className="select">
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                        </Field>
                        {formik.touched.country && formik.errors.country ? (
                          <p className="mt-1 text-xs text-red-600">
                            {String(formik.errors.country)}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                      Payment
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-gray-200 hover:border-primary/40 transition">
                        <span className="flex items-center gap-3">
                          <Field
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            className="h-4 w-4 accent-primary"
                          />
                          <span className="text-sm font-medium text-gray-900">
                            Credit / Debit Card
                          </span>
                        </span>
                        <span className="text-xs text-gray-500">
                          Visa / Master
                        </span>
                      </label>

                      <label className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-gray-200 hover:border-primary/40 transition">
                        <span className="flex items-center gap-3">
                          <Field
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            className="h-4 w-4 accent-primary"
                          />
                          <span className="text-sm font-medium text-gray-900">
                            Cash on Delivery
                          </span>
                        </span>
                        <span className="text-xs text-gray-500">
                          Pay at door
                        </span>
                      </label>
                    </div>

                    {formik.values.paymentMethod === "card" && (
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Card number
                          </label>
                          <Field
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            className="input"
                          />
                          {formik.touched.cardNumber &&
                          formik.errors.cardNumber ? (
                            <p className="mt-1 text-xs text-red-600">
                              {String(formik.errors.cardNumber)}
                            </p>
                          ) : null}
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name on card
                          </label>
                          <Field name="cardName" className="input" />
                          {formik.touched.cardName && formik.errors.cardName ? (
                            <p className="mt-1 text-xs text-red-600">
                              {String(formik.errors.cardName)}
                            </p>
                          ) : null}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry
                          </label>
                          <Field
                            name="cardExpiry"
                            placeholder="MM/YY"
                            className="input"
                          />
                          {formik.touched.cardExpiry &&
                          formik.errors.cardExpiry ? (
                            <p className="mt-1 text-xs text-red-600">
                              {String(formik.errors.cardExpiry)}
                            </p>
                          ) : null}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVC
                          </label>
                          <Field
                            name="cardCvc"
                            placeholder="123"
                            className="input"
                          />
                          {formik.touched.cardCvc && formik.errors.cardCvc ? (
                            <p className="mt-1 text-xs text-red-600">
                              {String(formik.errors.cardCvc)}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    )}

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Order notes (optional)
                      </label>
                      <Field
                        as="textarea"
                        name="notes"
                        rows={3}
                        className="input rounded-2xl"
                        placeholder="Any special instructions?"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <Link
                      href="/products"
                      className="text-sm text-gray-700 hover:text-primary transition-colors"
                    >
                      &lt; Continue shopping
                    </Link>

                    <Button
                      type="submit"
                      variant="outline"
                      size="lg"
                      disabled={formik.isSubmitting}
                      isLoading={formik.isSubmitting}
                      className="px-12"
                    >
                      Place order
                    </Button>
                  </div>
                </section>

                {/* Right: summary */}
                <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                  <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-7">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Order summary
                      </h2>
                      <span className="text-sm text-gray-700">
                        {totalItems} {totalItems === 1 ? "item" : "items"}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {effectiveItems.map((item) => {
                        const price = item.salePrice || item.price;
                        const itemTotal = price * item.quantity;
                        const { img, isEmoji } = getItemImage(item);
                        return (
                          <div key={item.id} className="flex items-start gap-3">
                            <div className="relative w-12 h-12 shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                              {isEmoji ? (
                                <div className="w-full h-full flex items-center justify-center text-2xl">
                                  {img as string}
                                </div>
                              ) : (
                                <Image
                                  src={img}
                                  alt={item.imageAlt || item.name}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <div className="text-sm font-semibold text-gray-900">
                              {formatPrice(itemTotal)}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="my-5 border-t border-gray-200" />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold text-gray-900">
                          {formatPrice(subtotal)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-semibold text-gray-900">
                          {formatPrice(shipping)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Taxes</span>
                        <span className="font-semibold text-gray-900">
                          {formatPrice(tax)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                      <span className="text-base font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-base font-semibold text-gray-900">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/60 rounded-3xl border border-dashed border-gray-300 p-6 md:p-7">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                        <Lock className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          Security policy
                        </h3>
                        <p className="text-xs text-gray-600">
                          Your payment and personal data are protected with
                          secure encryption and safe access.
                        </p>
                      </div>
                    </div>
                  </div>
                </aside>
              </Form>
            );
          }}
        </Formik>
      </main>
    </div>
  );
}
