"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import { AuthBreadcrumb, Button } from "@/components/ui";
import {
  resetPasswordValidationSchema,
  type ResetPasswordFormValues,
} from "@/lib/validation/auth";
import { useResetPassword } from "@/hooks/Auth/useResetPassword";
import { ArrowLeft } from "lucide-react";

const initialValues: ResetPasswordFormValues = {
  password: "",
  confirmPassword: "",
};

export default function ResetPasswordClient() {
  const { submitResetPassword, isLoading } = useResetPassword();
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token") || "";

  const handleSubmit = async (
    values: ResetPasswordFormValues,
    { setSubmitting, resetForm }: any
  ) => {
    if (!token) {
      toast.error("Missing reset token", {
        id: "reset-password-missing-token",
      });
      setSubmitting(false);
      return;
    }

    try {
      await submitResetPassword({ token, password: values.password });
      resetForm();
      router.push("/login");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-accent">
      <main className="container mx-auto px-4 py-8">
        <AuthBreadcrumb current="Reset Password" />

        <div className="max-w-3/4 mx-auto">
          <h1 className="text-xl font-medium text-gray-900 mb-6">
            Reset your password
          </h1>

          <div className="bg-white/80 rounded-3xl p-8 md:p-12">
            <p className="text-sm text-gray-700 mb-8">
              Enter a new password for your account.
            </p>

            <Formik
              initialValues={initialValues}
              validationSchema={resetPasswordValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                    <label className="md:col-span-4 text-sm font-medium text-gray-700">
                      New password
                    </label>
                    <div className="md:col-span-8">
                      <Field
                        name="password"
                        type="password"
                        placeholder="Enter new password"
                        className="w-full px-4 py-3 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="mt-1 ps-4 text-xs text-red-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                    <label className="md:col-span-4 text-sm font-medium text-gray-700">
                      Confirm password
                    </label>
                    <div className="md:col-span-8">
                      <Field
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full px-4 py-3 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="p"
                        className="mt-1 ps-4 text-xs text-red-600"
                      />
                    </div>
                  </div>

                  {!token && (
                    <p className="text-xs text-red-600">
                      Missing reset token. Please use the link from your email.
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
                    <Button
                      type="submit"
                      variant="outline"
                      size="lg"
                      disabled={!token || isSubmitting || isLoading}
                      className="px-10 py-3 rounded-3xl"
                    >
                      {isSubmitting || isLoading
                        ? "Updating..."
                        : "Update password"}
                    </Button>
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
