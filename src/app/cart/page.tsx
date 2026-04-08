"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 max-w-2xl mx-auto">
          <ShoppingBag className="mx-auto h-20 w-20 text-gray-300 mb-6" />
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 text-lg">Looks like you haven't added any products yet.</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Start Shopping
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-10">
        Shopping Cart
      </h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <div className="lg:col-span-8">
          <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
            <ul role="list" className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="p-6 flex sm:p-8 hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 border border-gray-200 rounded-xl overflow-hidden bg-gray-100 relative group">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="ml-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium text-gray-900 pr-4">
                          <Link href={`/product/${item.id}`} className="hover:text-indigo-600 transition-colors">
                            {item.name}
                          </Link>
                        </h3>
                        <p className="text-lg font-bold text-gray-900">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                      <p className="mt-1 text-sm text-gray-500 font-medium">₹{item.price.toFixed(2)} each</p>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center border border-gray-300 rounded-lg bg-white shadow-sm w-fit">
                        <button
                          type="button"
                          className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-l-lg transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 text-sm font-medium text-gray-900 border-x border-gray-300 w-12 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-r-lg transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-4 sm:mt-0">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm font-medium text-red-600 hover:text-red-500 flex items-center bg-red-50 px-3 py-2 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4 mr-1.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="bg-gray-50 p-6 flex justify-between items-center border-t border-gray-200">
              <button
                onClick={clearCart}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center transition-colors"
              >
                Clear all
              </button>
              <span className="text-sm text-gray-500">{items.reduce((total, item) => total + item.quantity, 0)} items in cart</span>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="mt-10 lg:mt-0 lg:col-span-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-6 py-8 sm:p-8 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <dl className="space-y-4 text-sm text-gray-600">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <dt>Subtotal</dt>
                <dd className="font-medium text-gray-900">₹{getCartTotal().toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <dt>Shipping estimate</dt>
                <dd className="font-medium text-gray-900">{getCartTotal() > 500 ? 'Free' : '₹99'}</dd>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <dt>GST (18%)</dt>
                <dd className="font-medium text-gray-900">₹{(getCartTotal() * 0.18).toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between pt-2">
                <dt className="text-base font-bold text-gray-900">Order total</dt>
                <dd className="text-2xl font-extrabold text-indigo-600">
                  ₹{(getCartTotal() + (getCartTotal() > 500 ? 0 : 99) + getCartTotal() * 0.18).toFixed(2)}
                </dd>
              </div>
            </dl>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => router.push("/checkout")}
                className="w-full bg-indigo-600 border border-transparent rounded-xl shadow-md py-4 px-4 text-base font-bold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors transform hover:-translate-y-1"
              >
                Proceed to Checkout
              </button>
            </div>
            
            <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
              <p>
                or{" "}
                <Link href="/" className="text-indigo-600 font-medium hover:text-indigo-500 transition-colors">
                  Continue Shopping<span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
