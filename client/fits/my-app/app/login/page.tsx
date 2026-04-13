"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthBreadcrumb, Button } from "@/components/ui";
import { useLogin } from "@/hooks/Auth/useLogin";
import { loginValidationSchema } from "@/lib/validation/auth";
import { useAuthStore } from "@/stores/authStore";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useLogin();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const router = useRouter();

  // If already authenticated, block access to login page
  useEffect(() => {
    if (isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;

  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting, resetForm }: any
  ) => {
    try {
      await login(values);
      resetForm();
      // optionally redirect on success
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-accent">
      <main className="container mx-auto px-4 py-8">
        <AuthBreadcrumb current="Log In To Your Account" />

        {/* Login Form Card */}
        <div className="max-w-3/4 mx-auto">
          <h1 className="text-xl font-medium text-gray-900  mb-6">
            Log In To Your Account
          </h1>
          <div className="bg-white rounded-lg p-8 md:p-12">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6 w-3/4 mx-auto">
                  <div className="flex items-center justify-between gap-4">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700 w-20 shrink-0"
                    >
                      Email
                    </label>
                    <div className="md:w-3/4">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        className="  w-full px-4 py-3 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter your email"
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="mt-1 ps-4  text-xs text-red-600"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700 w-20 shrink-0"
                    >
                      Password
                    </label>
                    <div className="md:w-3/4">
                      <div className=" relative">
                        <Field
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className="w-full px-4 py-3 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-pressed={showPassword}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          className="px-6 w-28 py-3 absolute right-0 top-0 h-full bg-primary text-white rounded-r-3xl hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="mt-1 ps-4 text-xs text-red-600"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <Link
                      href="/forgot-password"
                      className="text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  <div className="text-center">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting || isLoading}
                      className="w-full md:w-auto px-12 py-3 rounded-3xl border border-primary  text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      {isSubmitting || isLoading ? "Logging In..." : "Sign In"}
                    </Button>
                  </div>

                  <div className="text-center">
                    <Link
                      href="/register"
                      className="text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      No account? Create one here
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </main>
    </div>
  );
}
