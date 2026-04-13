"use client";

import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthBreadcrumb, Button } from "@/components/ui";
import {
  forgotPasswordValidationSchema,
  type ForgotPasswordFormValues,
} from "@/lib/validation/auth";
import { useForgotPassword } from "@/hooks/Auth/useForgotPassword";
import { ArrowLeft } from "lucide-react";

const initialValues: ForgotPasswordFormValues = {
  email: "",
};

export default function ForgotPasswordPage() {
  const { sendResetLink, isLoading } = useForgotPassword();

  const handleSubmit = async (
    values: ForgotPasswordFormValues,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      await sendResetLink({ email: values.email });
      resetForm();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className=" bg-accent">
      <main className="container mx-auto px-4 py-8">
        <AuthBreadcrumb current="Reset Your Password" />

        <div className="max-w-3/4 mx-auto">
          <h1 className="text-xl font-medium text-gray-900 mb-6">
            Forgot Your Password?
          </h1>

          <div className="bg-white/80 rounded-3xl p-8 md:p-12">
            <p className="text-sm text-gray-700 mb-8">
              Please enter the email address you used to register. You will
              receive a temporary link to reset your password.
            </p>

            <Formik
              initialValues={initialValues}
              validationSchema={forgotPasswordValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-2">
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-4">
                    <label className="lg:col-span-3 text-sm font-medium text-gray-700">
                      Email address
                    </label>

                    <div className="lg:col-span-6">
                      <Field
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="mt-1 ps-4 text-xs text-red-600"
                      />
                    </div>

                    <div className="lg:col-span-3 flex lg:justify-end">
                      <Button
                        type="submit"
                        variant="outline"
                        size="lg"
                        disabled={isSubmitting || isLoading}
                        className="px-10 py-3 rounded-3xl"
                      >
                        {isSubmitting || isLoading
                          ? "Sending..."
                          : "Send Reset Link"}
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <div className="mt-6">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
