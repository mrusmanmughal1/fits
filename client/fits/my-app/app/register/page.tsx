"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AuthBreadcrumb, Button } from "@/components/ui";
import { useRegister } from "@/hooks/Auth/useRegister";
import type { RegisterPayload } from "@/services/auth";
import { useAuthStore } from "@/stores/authStore";
import { validationSchema } from "@/lib/validation/auth";
interface FormValues {
  socialTitle: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: FormValues = {
  socialTitle: "Mr.",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, isLoading: registering } = useRegister();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    const registerPayload: RegisterPayload = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
    };

    try {
      const res = await register(registerPayload, {
        resetForm: () => resetForm(),
        redirectTo: "/login",
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
    }
  };

  return (
    <div className="min-h-screen bg-accent">
      <main className="container mx-auto px-4 py-8">
        <AuthBreadcrumb current="Create An Account" />
        {/* Page Title */}

        {/* Registration Form Card */}
        <div className="max-w-3/4 mx-auto">
          <h1 className="text-xl font-medium text-gray-900 mb-6">
            Create An Account
          </h1>
          <div className="bg-white rounded-3xl p-8 md:p-12">
            {/* Already have account link */}
            <div className="mb-6 text-center">
              <span className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary underline hover:text-blue-700 transition-colors"
                >
                  Log in instead!
                </Link>
              </span>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-6">
                  {/* Social Title */}
                  <div className="grid grid-cols-3 items-start justify-between gap-4">
                    <label className="text-sm font-medium text-gray-700 w-20 shrink-0 pt-3">
                      Social title
                    </label>
                    <div className="col-span-2">
                      <div
                        className="flex gap-6"
                        role="group"
                        aria-labelledby="social-title-label"
                      >
                        <label className="flex items-center gap-2 cursor-pointer">
                          <Field
                            type="radio"
                            name="socialTitle"
                            value="Mr."
                            className="w-4 h-4 text-primary focus:ring-primary"
                          />
                          <span className="text-sm text-gray-700">Mr.</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <Field
                            type="radio"
                            name="socialTitle"
                            value="Mrs."
                            className="w-4 h-4 text-primary focus:ring-primary"
                          />
                          <span className="text-sm text-gray-700">Mrs.</span>
                        </label>
                      </div>
                      <ErrorMessage
                        name="socialTitle"
                        component="p"
                        className="mt-1 text-xs text-red-600"
                      />
                    </div>
                  </div>

                  {/* First Name */}
                  <div className="grid grid-cols-3 items-start justify-between gap-4">
                    <label
                      htmlFor="firstname"
                      className="text-sm font-medium text-gray-700 w-20 shrink-0 pt-3"
                    >
                      First name
                    </label>
                    <div className="col-span-2">
                      <Field
                        id="firstname"
                        name="firstname"
                        type="text"
                        className={`w-full px-4 py-3 rounded-3xl border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                          errors.firstname && touched.firstname
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter your first name"
                      />
                      <ErrorMessage
                        name="firstname"
                        component="p"
                        className="mt-1 text-xs text-red-600"
                      />
                      {!errors.firstname && (
                        <p className="mt-1 text-xs text-gray-500">
                          Only letters and the dot (.) character, followed by a
                          space, are allowed.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="grid grid-cols-3 items-start justify-between gap-4">
                    <label
                      htmlFor="lastname"
                      className="text-sm font-medium text-gray-700 w-20 shrink-0 pt-3"
                    >
                      Last name
                    </label>
                    <div className="col-span-2">
                      <Field
                        id="lastname"
                        name="lastname"
                        type="text"
                        className={`w-full px-4 py-3 rounded-3xl border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                          errors.lastname && touched.lastname
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter your last name"
                      />
                      <ErrorMessage
                        name="lastname"
                        component="p"
                        className="mt-1 text-xs text-red-600"
                      />
                      {!errors.lastname && (
                        <p className="mt-1 text-xs text-gray-500">
                          Only letters and the dot (.) character, followed by a
                          space, are allowed.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="grid grid-cols-3 items-start justify-between gap-4">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700 w-20 shrink-0 pt-3"
                    >
                      Email
                    </label>
                    <div className="col-span-2">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        className={`w-full px-4 py-3 rounded-3xl border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                          errors.email && touched.email
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter your email"
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="mt-1 text-xs text-red-600"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="grid grid-cols-3 items-start justify-between gap-4">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700 w-20 shrink-0 pt-3"
                    >
                      Password
                    </label>
                    <div className="col-span-2">
                      <div className="relative">
                        <Field
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className={`w-full px-4 py-3 rounded-3xl border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                            errors.password && touched.password
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-pressed={showPassword}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          className="px-6 py-3 absolute right-0 top-0 h-full bg-primary text-white rounded-r-3xl hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="mt-1 text-xs text-red-600"
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="grid grid-cols-3 items-start justify-between gap-4">
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-gray-700 w-20 shrink-0 pt-3"
                    >
                      Confirm password
                    </label>
                    <div className="col-span-2">
                      <div className="relative">
                        <Field
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          className={`w-full px-4 py-3 rounded-3xl border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                            errors.confirmPassword && touched.confirmPassword
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          aria-pressed={showConfirmPassword}
                          aria-label={
                            showConfirmPassword
                              ? "Hide confirm password"
                              : "Show confirm password"
                          }
                          className="px-6 py-3 absolute right-0 top-0 h-full bg-primary text-white rounded-r-3xl hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
                        >
                          {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="p"
                        className="mt-1 text-xs text-red-600"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting || registering}
                      className="w-full md:w-auto px-12 py-3 border   transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting || registering
                        ? "Creating Account..."
                        : "Create Account"}
                    </Button>
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
