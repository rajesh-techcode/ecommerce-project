"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShoppingCart, LogOut, Settings, Package, UserCircle, Search } from "lucide-react";

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const { items } = useCart();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push(`/shop?q=${encodeURIComponent(q)}`);
    } else {
      router.push("/shop");
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          
          {/* Logo + Nav Links */}
          <div className="flex items-center gap-6 flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Package className="h-6 w-6 text-indigo-600 hidden sm:block" />
              <span className="text-xl sm:text-2xl font-bold text-gray-900">
                Premium<span className="text-indigo-600">Store</span>
              </span>
            </Link>
            
            <div className="hidden md:flex space-x-6 pt-1">
              <Link href="/" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">Home</Link>
              <Link href="/shop" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">Shop All</Link>
              <Link href="/category/electronics" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">Electronics</Link>
              <Link href="/category/clothing" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">Clothing</Link>
            </div>
          </div>

          {/* Search Bar — center */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-sm hidden sm:flex items-center relative"
          >
            <Search className="absolute left-3 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              id="navbar-search"
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </form>

          {/* Right Actions */}
          <div className="flex items-center space-x-5 sm:space-x-6 flex-shrink-0">
            {/* Mobile search icon links to shop */}
            <Link href="/shop" className="sm:hidden text-gray-600 hover:text-indigo-600 transition-colors">
              <Search className="h-5 w-5" />
            </Link>

            <Link href="/cart" className="relative text-gray-600 hover:text-indigo-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link href="/admin" className="text-gray-600 hover:text-indigo-600 transition-colors hidden sm:block" title="Admin Panel">
                    <Settings className="h-5 w-5" />
                  </Link>
                )}
                <Link href="/profile" className="text-gray-600 hover:text-indigo-600 flex items-center gap-2 transition-colors">
                  <UserCircle className="h-6 w-6" />
                  <span className="text-sm font-medium hidden sm:block">Profile</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 sm:space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-indigo-600 text-sm font-medium transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
