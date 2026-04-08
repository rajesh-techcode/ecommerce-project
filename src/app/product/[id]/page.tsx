"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById } from "@/lib/firebase/firestore";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      try {
        const data = await getProductById(id);
        if (data) {
          setProduct(data);
        } else {
          router.push("/404");
        }
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Link>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        {/* Product Image */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white aspect-w-4 aspect-h-3 sm:aspect-w-3 sm:aspect-h-4">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-center object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 min-h-[400px]">
                No image available
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-10 px-4 sm:px-0 lg:mt-0">
          <div className="flex justify-between items-center text-sm font-medium text-indigo-600 mb-2">
            <span>{product.category || "Uncategorized"}</span>
            <div className="flex items-center text-yellow-400">
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 text-gray-300" />
              <span className="ml-2 text-gray-500">(128 reviews)</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {product.name}
          </h1>
          
          <div className="mt-4 flex items-center">
            <p className="text-3xl font-extrabold text-gray-900">₹{product.price.toFixed(2)}</p>
            <span className="ml-4 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              In Stock
            </span>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900">Description</h3>
            <div className="mt-4 prose prose-sm text-gray-500">
              <p>{product.description}</p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => {
                addToCart(product);
                addToast(`${product.name} added to cart!`, "success");
              }}
              className="flex-1 bg-indigo-600 border border-transparent rounded-xl py-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transform transition hover:-translate-y-1"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to cart
            </button>
            <button
              onClick={() => {
                addToCart(product);
                addToast(`${product.name} added to cart!`, "success");
                router.push("/cart");
              }}
              className="flex-1 bg-white border-2 border-indigo-600 rounded-xl py-4 flex items-center justify-center text-base font-medium text-indigo-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transform transition hover:-translate-y-1"
            >
              Buy now
            </button>
          </div>

          {/* Guarantees */}
          <div className="mt-10 border-t border-gray-200 pt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
            <div className="flex flex-col items-center justify-center text-center">
              <Truck className="h-8 w-8 text-gray-400 mb-3" />
              <span className="text-sm font-medium text-gray-900">Free Shipping</span>
              <span className="text-xs text-gray-500 mt-1">Orders over $50</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <RotateCcw className="h-8 w-8 text-gray-400 mb-3" />
              <span className="text-sm font-medium text-gray-900">Easy Returns</span>
              <span className="text-xs text-gray-500 mt-1">30-day policy</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <ShieldCheck className="h-8 w-8 text-gray-400 mb-3" />
              <span className="text-sm font-medium text-gray-900">Secure Checkout</span>
              <span className="text-xs text-gray-500 mt-1">256-bit encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
