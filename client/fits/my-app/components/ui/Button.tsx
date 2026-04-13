import React from "react";
import { ButtonVariant, ButtonSize } from "@/types";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  isLoading = false,
  disabled = false,
  fullWidth = false,
  ...props
}) => {
  const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-md",
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-primary text-white border border-primary hover:bg-primary-dark hover:border-primary-dark active:scale-95",
    secondary:
      "bg-secondary text-white border border-secondary hover:bg-secondary-dark hover:border-secondary-dark active:scale-95",
    outline:
      "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white active:scale-95",
    ghost:
      "bg-transparent text-primary border border-transparent hover:bg-gray-100 active:scale-95",
    danger:
      "bg-red-500 text-white border border-red-500 hover:bg-red-600 hover:border-red-600 active:scale-95",
    success:
      "bg-green-500 text-white border border-green-500 hover:bg-green-600 hover:border-green-600 active:scale-95",
    warning:
      "bg-yellow-500 text-white border border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600 active:scale-95",
    disabled:
      "bg-gray-300 text-gray-500 border border-gray-300 cursor-not-allowed",
  };

  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-3xl transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60";
  const sizeClass = sizeClasses[size];
  const variantClass = variantClasses[variant];
  const widthClass = fullWidth ? "w-full" : "";
  const loadingClass = isLoading ? "opacity-60 pointer-events-none" : "";

  return (
    <button
      className={cn(
        baseClasses,
        sizeClass,
        variantClass,
        widthClass,
        loadingClass,
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
};
