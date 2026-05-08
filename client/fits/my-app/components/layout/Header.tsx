"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { NAV_LINKS, BRAND_TAGLINE, BRAND_NAME } from "@/constants";
import Image from "next/image";
import { useCartApi } from "@/hooks";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "@/components/cart/ShoppingCart";
import { useAuthStore } from "@/stores/authStore";
import {
  Bell,
  ChevronDown,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  ShoppingCart as ShoppingCartIcon,
  User,
} from "lucide-react";
import { useLogout } from "@/hooks/Auth/useLogout";
import { CategoryDropdown } from "./CategoryDropdown";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const { cart } = useCartApi();
  const { openCart } = useCart();
  const totalItems = cart?.totalQuantity || 0;
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const { logout, isLoading: isLogoutLoading } = useLogout();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!userMenuRef.current) return;
      if (!userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsUserMenuOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push("/login");
  };

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Top Banner */}
      <div className="bg-white border-b border-gray-200 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center ">
            <p className="text-xs text-gray-600">{BRAND_TAGLINE}</p>
            <Link
              href="/products"
              className="text-xs font-medium text-primary     px-2  underline        transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto w-[90%]">
        <div className="grid grid-cols-3 items-center justify-between  ">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 w-full">
            <CategoryDropdown />
            {NAV_LINKS.filter((link) => link.label !== "Shop").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700  text-sm font-medium hover:text-primary transition-colors "
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center justify-center gap-4 w-full ">
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900  drop-shadow-lg  rounded-full py-1 px-4"
            >
              <Image
                src={BRAND_NAME}
                alt="logo"
                width={70}
                className="drop-shadow-3xl"
                height={100}
              />
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 w-full justify-end">
            <div
              className={`flex items-center transition-all duration-300 ease-in-out ${
                isSearchOpen
                  ? "absolute right-0 top-1/2 -translate-y-1/2 w-[calc(100%-2rem)] md:w-[350px] z-10"
                  : "relative w-10"
              }`}
            >
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center w-full relative"
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full h-10 pl-10 pr-10 bg-white border border-gray-200 shadow-lg rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${
                    isSearchOpen
                      ? "opacity-100 visible"
                      : "opacity-0 invisible w-0 border-none shadow-none"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`absolute left-0 p-2 text-gray-700 hover:text-primary transition-colors ${
                    isSearchOpen ? "text-primary" : ""
                  }`}
                  aria-label="Toggle search"
                >
                  <Search className="w-5 h-5" />
                </button>
                {isSearchOpen && (
                  <button
                    type="button"
                    onClick={() => {
                      if (searchQuery) {
                        setSearchQuery("");
                      } else {
                        setIsSearchOpen(false);
                      }
                    }}
                    className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </form>
            </div>

            <button
              onClick={() => openCart(true)}
              className="relative p-2 text-gray-700 hover:text-primary transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <Link
              href="/login"
              className="p-2 text-gray-700 hover:text-primary transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Admin Dashboard Icon (Only for Admins) */}
            {isAuthenticated && user?.role === "admin" && (
              <Link
                href="/admin"
                className="p-2 text-gray-700 hover:text-primary transition-colors"
                aria-label="Admin Dashboard"
                title="Admin Dashboard"
              >
                <LayoutDashboard className="w-5 h-5" />
              </Link>
            )}

            {/* User / Auth */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen((v) => !v)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  aria-label="User menu"
                  aria-haspopup="menu"
                  aria-expanded={isUserMenuOpen}
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>

                  <div className="hidden md:flex flex-col items-start leading-tight">
                    <span className="text-sm font-medium text-gray-900">
                      {user?.name || "User"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {user?.email || ""}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>

                {isUserMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 md:hidden">
                      <div className="text-sm font-medium text-gray-900">
                        {user?.name || "User"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {user?.email || ""}
                      </div>
                    </div>

                    <Link
                      href="/account"
                      role="menuitem"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Settings className="w-5 h-5 text-gray-500" />
                      Account Settings
                    </Link>

                    <Link
                      href="/notifications"
                      role="menuitem"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Bell className="w-5 h-5 text-gray-500" />
                      Notifications
                    </Link>

                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-5 h-5 text-red-500" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="p-2 text-gray-700 hover:text-primary transition-colors"
                aria-label="User profile"
              >
                <User className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {/* Shop / Categories Section for Mobile */}
            <div>
              <button
                onClick={() =>
                  setIsMobileCategoriesOpen(!isMobileCategoriesOpen)
                }
                className="flex items-center justify-between w-full text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Shop
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isMobileCategoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isMobileCategoriesOpen && (
                <div className="mt-2 pl-4 flex flex-col gap-2">
                  <Link
                    href="/products"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsMobileCategoriesOpen(false);
                    }}
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    All Products
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/products?category=${encodeURIComponent(category)}`}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsMobileCategoriesOpen(false);
                      }}
                      className="text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {NAV_LINKS.filter((link) => link.label !== "Shop").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Shopping Cart */}
      <ShoppingCart />
    </header>
  );
};
