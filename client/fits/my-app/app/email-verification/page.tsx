"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthBreadcrumb, Button } from "@/components/ui";
import { BadgeCheck } from "lucide-react";

export default function EmailVerificationSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-accent">
      <main className="container mx-auto px-4 py-8">
        <AuthBreadcrumb current="Email Verified" />

        <div className="max-w-3/4 mx-auto">
          <h1 className="text-xl font-medium text-gray-900 mb-6">
            Email verification
          </h1>

          <div className="bg-white/80 rounded-3xl p-8 md:p-12 text-center">
            <div className="mx-auto w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4">
              <BadgeCheck className="w-7 h-7" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Your email has been verified successfully
            </h2>
            <p className="text-sm text-gray-600 mb-8">
              You can now log in to your account and continue shopping.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                type="button"
                size="lg"
                className="px-10 py-3 rounded-3xl"
                onClick={() => router.push("/login")}
              >
                Go to login
              </Button>
              <Link
                href="/"
                className="text-sm text-gray-700 hover:text-primary transition-colors"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


