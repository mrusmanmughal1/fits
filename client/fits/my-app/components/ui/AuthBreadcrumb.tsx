"use client";

import Link from "next/link";

interface AuthBreadcrumbProps {
  current: string;
  className?: string;
}

export function AuthBreadcrumb({
  current,
  className = "",
}: AuthBreadcrumbProps) {
  return (
    <nav className={`mb-6 mx-auto w-3/4 text-sm ${className}`.trim()}>
      <ol className="flex items-center gap-2 text-price">
        <li>
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
        </li>
        <li className="text-gray-400">|</li>
        <li className="text-foreground">{current}</li>
      </ol>
    </nav>
  );
}
