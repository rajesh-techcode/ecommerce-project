"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/firebase/firestore";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import Link from "next/link";
import { ShoppingCart, Star, ArrowRight, TrendingUp, ShieldCheck, Truck } from "lucide-react";

const categories = [
  {
    name: "Electronics",
    description: "Cutting-edge tech, audio, and gadgets.",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop",
    href: "/category/electronics",
  },
  {
    name: "Clothing",
    description: "Premium apparel for every occasion.",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop",
    href: "/category/clothing",
  },
  {
    name: "Home & Garden",
    description: "Beautiful pieces to elevate your space.",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop",
    href: "/category/home",
  },
  {
    name: "Beauty & Health",
    description: "Self-care essentials and premium cosmetics.",
    image: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?w=800&auto=format&fit=crop",
    href: "/category/beauty",
  },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToast } = useToast();

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

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 h-[600px] sm:h-[700px] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start w-full">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/30 mb-6 backdrop-blur-sm">
            New Collection 2024
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl max-w-3xl leading-tight">
            Elevate Your Everyday <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Essentials</span>
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl">
            Discover a carefully curated selection of premium products designed to bring exceptional quality and style to your life. Shop our latest arrivals today.
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30"
            >
              Shop the Collection
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-base font-semibold rounded-full text-white bg-white/10 hover:bg-white/20 transition-all backdrop-blur-md"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
              <Truck className="h-8 w-8 text-indigo-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Free Global Shipping</h3>
              <p className="text-gray-500 mt-2 text-sm">On all orders over $150</p>
            </div>
            <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
              <ShieldCheck className="h-8 w-8 text-indigo-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Secure Payments</h3>
              <p className="text-gray-500 mt-2 text-sm">100% secure checkout process</p>
            </div>
            <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
              <TrendingUp className="h-8 w-8 text-indigo-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Premium Quality</h3>
              <p className="text-gray-500 mt-2 text-sm">Hand-picked by our experts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Shop by Category */}
      <div className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shop by Category</h2>
              <p className="mt-4 text-lg text-gray-500">Explore our wide range of premium collections.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                href={category.href}
                className="group relative rounded-2xl overflow-hidden h-80 flex flex-col justify-end p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-indigo-200 text-sm mb-4 line-clamp-2">{category.description}</p>
                  <span className="inline-flex items-center text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">
                    Explore deeper <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products (Latest Arrivals) */}
      <div id="latest-arrivals" className="bg-gray-50 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Latest Arrivals</h2>
              <p className="mt-4 text-lg text-gray-500">Our newest additions to the store.</p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
              <ShoppingCart className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">The storefront is currently empty</h3>
              <p className="mt-1 text-gray-500">Admin needs to add products or seed the database.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.slice(0, 8).map((product) => ( // only show up to 8 on the homepage
                <div key={product.id} className="group relative flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
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
                    {/* Badge could go here depending on logic */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white text-gray-900 shadow-sm">
                        {product.category || "New"}
                      </span>
                    </div>
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
                      <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    
                    <div className="mt-5 flex items-center justify-between z-10">
                      <div className="flex items-center text-sm text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current text-gray-300" />
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                          addToast(`${product.name} added to cart!`, "success");
                        }}
                        className="bg-gray-900 text-white p-2.5 rounded-full hover:bg-indigo-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        title="Add to cart"
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {products.length > 8 && (
            <div className="mt-16 text-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
              >
                View All Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
