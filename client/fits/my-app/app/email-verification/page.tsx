"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthBreadcrumb, Button, Loader } from "@/components/ui";
import { BadgeCheck, AlertCircle, Mail } from "lucide-react";
import { useVerifyEmail } from "@/hooks/Auth/useVerifyEmail";

export default function EmailVerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const hasVerified = useRef(false);

  const { mutate, isPending, isSuccess, isError, error } = useVerifyEmail();

  useEffect(() => {
    if (token && !hasVerified.current) {
      mutate(token);
      hasVerified.current = true;
    }
  }, [token, mutate]);

  const renderContent = () => {
    if (!token) {
      return (
        <div className="bg-white/80 rounded-3xl p-8 md:p-12 text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
            <Mail className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Verification link missing
          </h2>
          <p className="text-sm text-gray-600 mb-8">
            The verification link seems to be invalid or expired. Please check
            your email or request a new link.
          </p>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="px-10 py-3 rounded-3xl"
            onClick={() => router.push("/login")}
          >
            Back to login
          </Button>
        </div>
      );
    }

    if (isPending) {
      return (
        <div className="bg-white/80 rounded-3xl p-8 md:p-12 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader size="lg" />
            <p className="text-gray-600 font-medium">Verifying your email...</p>
          </div>
        </div>
      );
    }

    if (isSuccess) {
      return (
        <div className="bg-white/80 rounded-3xl p-8 md:p-12 text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4">
            <BadgeCheck className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Verification Successful
          </h2>
          <p className="text-sm text-gray-600 mb-8">
            Your email has been verified successfully. You can now log in to
            your account and continue shopping.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              type="button"
              size="lg"
              className="px-10 py-3 rounded-3xl"
              onClick={() => router.push("/login")}
            >
              Log in to your account
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="px-10 py-3 rounded-3xl"
              onClick={() => router.push("/products")}
            >
              Browse products
            </Button>
          </div>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="bg-white/80 rounded-3xl p-8 md:p-12 text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Verification Failed
          </h2>
          <p className="text-sm text-gray-600 mb-8">
            {(error as any)?.response?.data?.message ||
              "Something went wrong while verifying your email. The link may have expired."}
          </p>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="px-10 py-3 rounded-3xl"
            onClick={() => router.push("/login")}
          >
            Back to login
          </Button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-accent">
      <main className="container mx-auto px-4 py-8">
        <AuthBreadcrumb current="Email Verification" />

        <div className="max-w-2xl mx-auto mt-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Email verification
          </h1>

          {renderContent()}
        </div>
      </main>
    </div>
  );
}
