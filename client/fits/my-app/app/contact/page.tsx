"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

import { Breadcrumb, Button } from "@/components/ui";

type ContactValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const initialValues: ContactValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const validationSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        subject: Yup.string().required("Subject is required"),
        message: Yup.string()
          .min(10, "Please add a bit more detail")
          .required("Message is required"),
      }),
    []
  );

  return (
    <div className="min-h-screen bg-accent">
      <main className="container max-w-[90%] mx-auto px-4 py-8">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        />

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Contact Us
          </h1>
          <p className="text-sm text-price mt-2 max-w-2xl">
            Have a question about an order, a product, or returns? Send us a
            message and we’ll get back to you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <section className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Send a message
            </h2>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, helpers) => {
                try {
                  await new Promise((r) => setTimeout(r, 600));
                  toast.success("Message sent — we’ll reply soon.", {
                    id: "contact-success",
                  });
                  helpers.resetForm();
                } catch (e) {
                  toast.error("Could not send message. Try again.", {
                    id: "contact-failed",
                  });
                } finally {
                  helpers.setSubmitting(false);
                }
              }}
            >
              {(formik) => (
                <Form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <Field
                        name="name"
                        placeholder="Your name"
                        className={`input ${
                          formik.touched.name && formik.errors.name
                            ? "input-error"
                            : ""
                        }`}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <p className="mt-1 text-xs text-red-600">
                          {String(formik.errors.name)}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <Field
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        className={`input ${
                          formik.touched.email && formik.errors.email
                            ? "input-error"
                            : ""
                        }`}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <p className="mt-1 text-xs text-red-600">
                          {String(formik.errors.email)}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <Field
                      name="subject"
                      placeholder="How can we help?"
                      className={`input ${
                        formik.touched.subject && formik.errors.subject
                          ? "input-error"
                          : ""
                      }`}
                    />
                    {formik.touched.subject && formik.errors.subject ? (
                      <p className="mt-1 text-xs text-red-600">
                        {String(formik.errors.subject)}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <Field
                      as="textarea"
                      name="message"
                      rows={6}
                      placeholder="Tell us a little more…"
                      className={`input rounded-2xl ${
                        formik.touched.message && formik.errors.message
                          ? "input-error"
                          : ""
                      }`}
                    />
                    {formik.touched.message && formik.errors.message ? (
                      <p className="mt-1 text-xs text-red-600">
                        {String(formik.errors.message)}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex items-center justify-between gap-3 flex-wrap pt-2">
                    <Link
                      href="/products"
                      className="text-sm text-gray-700 hover:text-primary transition-colors"
                    >
                      Browse products
                    </Link>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={formik.isSubmitting}
                      disabled={formik.isSubmitting}
                      className="px-10"
                    >
                      Send message
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </section>

          <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">
                Contact details
              </h2>

              <div className="space-y-4 text-sm text-price">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="break-words">admin@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Phone</div>
                    <div>(+001) 0123-456-789</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Address</div>
                    <div>1801 Zboncak Island Suite Street Hampshire</div>
                    <div>New Paris, 00021 • United States</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Hours</div>
                    <div>Mon–Fri: 9:00–18:00</div>
                    <div>Sat: 10:00–14:00</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/60 rounded-3xl border border-dashed border-gray-300 p-6 md:p-8">
              <h3 className="text-sm font-semibold text-gray-900">
                Need help faster?
              </h3>
              <p className="text-xs text-gray-600 mt-2">
                Include your order number (if you have one) and we’ll prioritize
                the request.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}


