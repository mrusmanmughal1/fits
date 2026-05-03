"use client";

import React from "react";
import Image from "next/image";
import { BRAND_NAME } from "@/constants";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export const Loader: React.FC<LoaderProps> = ({ className, size = "md" }) => {
  const sizeMap = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
    full: "w-64 h-64",
  };

  const containerHeight = size === "full" ? "min-h-[60vh]" : "";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6",
        containerHeight,
        className,
      )}
    >
      <div className={cn("relative", sizeMap[size])}>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse scale-150" />

        {/* Logo with bounce and scale animation */}
        <div className="relative animate-bounce duration-1000">
          <div className="animate-pulse">
            <Image
              src={BRAND_NAME}
              alt="Loading..."
              width={200}
              height={200}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Modern dot loader */}
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-primary/80 animate-bounce [animation-delay:-0.32s]" />
        <div className="w-3 h-3 rounded-full bg-primary/80 animate-bounce [animation-delay:-0.16s]" />
        <div className="w-3 h-3 rounded-full bg-primary/80 animate-bounce" />
      </div>
    </div>
  );
};

export const MiniLoader: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("inline-flex items-center justify-center", className)}>
      <div className="w-6 h-6 relative animate-spin duration-700">
        <Image
          src={BRAND_NAME}
          alt="Loading..."
          fill
          className="object-contain opacity-80"
        />
      </div>
    </div>
  );
};

export const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-md flex items-center justify-center">
      <Loader size="lg" />
    </div>
  );
};
