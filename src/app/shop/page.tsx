"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { getProducts } from "@/lib/firebase/firestore";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import Link from "next/link";
import { ShoppingCart, Star, PackageSearch, Filter, Search } from "lucide-react";

function ShopContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const categories = ["All", "Electronics", "Clothing", "Home & Garden", "Beauty & Health"];

  const categoryImages: Record<string, string> = {
    Electronics: "/images/electronics.svg",
    Clothing: "/images/clothing.svg",
    "Home & Garden": "/images/home.svg",
    "Beauty & Health": "/images/beauty.svg",
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      p.name.toLowerCase().includes(query) ||
      (p.description && p.description.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 border-b border-gray-200 pb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              All Products
            </h1>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl">
              Browse our entire collection of premium products.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              id="shop-search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Shop by Category */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-600">Shop by category</h3>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.filter((c) => c !== "All").map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors hover:shadow-md ${selectedCategory === cat ? 'bg-white shadow-sm' : 'bg-gray-50'}`}
              >
                <div className="w-20 h-20 rounded-md overflow-hidden bg-white flex items-center justify-center">
                  <Image src={categoryImages[cat]} alt={cat} width={80} height={80} className="object-contain" />
                </div>
                <div className="text-sm font-medium text-gray-700">{cat}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400 flex-shrink-0" />
          <div className="flex bg-gray-100 rounded-lg p-1 overflow-x-auto max-w-[90vw] md:max-w-none no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-none px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedCategory === cat
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <PackageSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-gray-500">
            {searchQuery
              ? `No results for "${searchQuery}". Try a different term.`
              : "We couldn't find any products in this category."}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-sm text-indigo-600 hover:underline font-medium"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <Link href={`/product/${product.id}`} className="block relative h-72 sm:h-64 object-cover overflow-hidden bg-gray-100">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-900 shadow-sm">
                    {product.category || "New"}
                  </span>
                </div>
                {product.isOriginal && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 shadow-sm">
                      Original
                    </span>
                  </div>
                )}
              </Link>
              
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900 truncate pr-4">
                      <Link href={`/product/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-lg font-bold text-indigo-600">
                      ₹{product.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
                
                <div className="mt-4 flex items-center justify-between z-10 border-t border-gray-100 pt-4">
                  <div className="flex items-center text-sm text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current text-gray-300" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-gray-500">Free returns • 30 days</div>
                    <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                      addToast(`${product.name} added to cart!`, "success");
                    }}
                    className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    title="Add to cart"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add
                  </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
