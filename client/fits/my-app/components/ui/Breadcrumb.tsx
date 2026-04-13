"use client";

import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
  className?: string;
}

export function Breadcrumb({
  items,
  separator = "|",
  className = "",
}: BreadcrumbProps) {
  return (
    <nav className={`mb-6 text-sm ${className}`.trim()}>
      <ol className="flex items-center gap-2 text-price">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <span
              key={`${item.label}-${idx}`}
              className="flex items-center gap-2"
            >
              <li>
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-foreground" : ""}>
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && <li className="text-gray-400">{separator}</li>}
            </span>
          );
        })}
      </ol>
    </nav>
  );
}
