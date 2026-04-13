"use client";

import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-accent">
      <main className="container mx-auto px-4 py-8">
        <nav className="mb-6 text-sm mx-auto w-3/4">
          <ol className="flex items-center gap-2 text-price">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gray-400">|</li>
            <li className="text-foreground">Page Not Found</li>
          </ol>
        </nav>

        <div className="max-w-3/4 mx-auto">
          <h1 className="text-2xl md:text-3xl font-medium text-gray-900 mb-8">
            The Page You Are Looking For Was Not Found.
          </h1>

          <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12">
            <p className="text-sm font-medium text-gray-900 mb-3">
              No content available yet
            </p>
            <p className="text-sm text-gray-600 mb-6">
              Stay tuned! More content will be shown here as it is added.
            </p>

            <div className="flex items-center gap-3 text-gray-700">
              <SearchX className="w-7 h-7" />
              <span className="text-sm">Try going back to a safe page.</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-3xl bg-primary text-white hover:bg-blue-700 transition-colors"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-3xl border border-gray-300 text-gray-700 hover:border-primary hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}


