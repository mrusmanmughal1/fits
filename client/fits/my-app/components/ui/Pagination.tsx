"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PaginationItem = number | "dots";

function range(start: number, end: number): number[] {
  const out: number[] = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}

function getPaginationItems(
  totalPages: number,
  currentPage: number,
  siblingCount: number
): PaginationItem[] {
  const safeTotal = Math.max(1, totalPages);
  const safeCurrent = Math.min(Math.max(1, currentPage), safeTotal);

  const totalNumbersToShow = siblingCount * 2 + 5; // first, last, current, 2*siblings, 2*dots

  if (safeTotal <= totalNumbersToShow) {
    return range(1, safeTotal);
  }

  const leftSiblingIndex = Math.max(safeCurrent - siblingCount, 1);
  const rightSiblingIndex = Math.min(safeCurrent + siblingCount, safeTotal);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < safeTotal - 1;

  const firstPageIndex = 1;
  const lastPageIndex = safeTotal;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + siblingCount * 2;
    const leftRange = range(1, leftItemCount);
    return [...leftRange, "dots", lastPageIndex];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + siblingCount * 2;
    const rightRange = range(safeTotal - rightItemCount + 1, safeTotal);
    return [firstPageIndex, "dots", ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, "dots", ...middleRange, "dots", lastPageIndex];
  }

  return range(1, safeTotal);
}

export interface PaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
  siblingCount = 1,
  className = "",
}) => {
  const safePageSize = Math.max(1, pageSize);
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const safeCurrent = Math.min(Math.max(1, currentPage), totalPages);

  const startIdx = totalItems === 0 ? 0 : (safeCurrent - 1) * safePageSize + 1;
  const endIdx =
    totalItems === 0
      ? 0
      : Math.min(safeCurrent * safePageSize, totalItems);

  const items = getPaginationItems(totalPages, safeCurrent, siblingCount);

  const canGoPrev = safeCurrent > 1;
  const canGoNext = safeCurrent < totalPages;

  const goTo = (page: number) => {
    const next = Math.min(Math.max(1, page), totalPages);
    if (next === safeCurrent) return;
    onPageChange(next);
  };

  return (
    <div
      className={cn(
        "w-full flex items-center justify-between gap-4 flex-wrap py-6",
        className
      )}
    >
      <div className="text-sm text-gray-800">
        Showing {startIdx}-{endIdx} of {totalItems} item(s)
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => goTo(safeCurrent - 1)}
          disabled={!canGoPrev}
          className={cn(
            "h-10 w-10 rounded-full border border-gray-200 bg-white flex items-center justify-center transition",
            canGoPrev ? "hover:bg-gray-50" : "opacity-50 cursor-not-allowed"
          )}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>

        {items.map((it, idx) => {
          if (it === "dots") {
            return (
              <span
                key={`dots-${idx}`}
                className="h-10 min-w-10 px-2 flex items-center justify-center text-gray-500"
              >
                …
              </span>
            );
          }
          const isActive = it === safeCurrent;
          return (
            <button
              key={it}
              type="button"
              onClick={() => goTo(it)}
              className={cn(
                "h-10 w-10 rounded-full border flex items-center justify-center text-sm font-medium transition",
                isActive
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-gray-200 text-gray-800 hover:bg-gray-50"
              )}
              aria-current={isActive ? "page" : undefined}
              aria-label={`Page ${it}`}
            >
              {it}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => goTo(safeCurrent + 1)}
          disabled={!canGoNext}
          className={cn(
            "h-10 w-10 rounded-full border border-gray-200 bg-white flex items-center justify-center transition",
            canGoNext ? "hover:bg-gray-50" : "opacity-50 cursor-not-allowed"
          )}
          aria-label="Next page"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
};


