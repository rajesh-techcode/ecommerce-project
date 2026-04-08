"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { db } from "@/lib/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    address: "",
    city: "",
    postalCode: "",
    country: "IN"
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 99;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  if (items.length === 0 && !success) {
    router.replace("/cart");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const verifyPayment = async (response: any) => {
    try {
      if (!user) {
        throw new Error("You must be logged in to complete checkout.");
      }

      const orderData = {
        userId: user.uid,
        items,
        total,
        currency: "INR",
        shippingAddress: formData,
        paymentId: response.razorpay_payment_id,
        orderId: response.razorpay_order_id,
        status: "success",
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, "orders"), orderData);
      
      clearCart();
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError("Payment verified but failed to save order details. Our team will contact you.");
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/login?redirect=/checkout");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1. Create order on server
      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      const order = await res.json();

      if (!res.ok) throw new Error(order.error || "Failed to initiate payment");

      // 2. Initialize Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Premium Store",
        description: "Order Checkout",
        order_id: order.id,
        handler: function (response: any) {
          verifyPayment(response);
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
        },
        notes: {
          address: formData.address,
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      
      rzp.on("payment.failed", function (response: any) {
        setError(response.error.description || "Payment failed. Please try again.");
      });

      rzp.open();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unable to process payment right now.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center p-10 bg-white rounded-3xl shadow-xl">
          <CheckCircle className="mx-auto h-20 w-20 text-green-500 mb-6" />
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Payment Successful!</h2>
          <p className="text-gray-500 mb-8 text-lg">Your order is confirmed. We will send you an email with shipping details shortly.</p>
          <Link
            href="/"
            className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md transform hover:-translate-y-1"
          >
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border text-gray-900 border-gray-200 shadow-sm rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-8">Shipping Information</h2>
              
              {error && (
                <div className="mb-6 bg-red-50 p-4 rounded-md flex items-center text-red-700 text-sm">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handlePayment} className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-900 border"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-900 border"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-900 border"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="address"
                        id="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-900 border"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-900 border"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal code</label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-900 border"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-10 border-t border-gray-200 pt-6">
                  {!user && (
                    <div className="mb-6 p-4 rounded-md bg-yellow-50 text-yellow-800 text-sm">
                      Please log in to complete your purchase. Your cart will be saved.
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading || !user}
                    className="w-full bg-indigo-600 border border-transparent rounded-xl shadow-md py-4 px-4 text-base font-bold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors transform hover:-translate-y-1 flex justify-center items-center"
                  >
                    {loading && <Loader2 className="animate-spin h-5 w-5 mr-3" />}
                    {loading ? "Processing..." : `Pay ₹${total.toFixed(2)} with Razorpay`}
                  </button>
                  <p className="mt-4 flex justify-center text-xs text-gray-500">
                    Secure payment processed by Razorpay • INR
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="mt-10 lg:mt-0 lg:col-span-5">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-6 py-8 sm:p-8 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <ul role="list" className="divide-y divide-gray-200 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <li key={item.id} className="py-4 flex">
                    <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-lg overflow-hidden relative">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-center object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">IMG</div>
                      )}
                    </div>
                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3 className="line-clamp-1">{item.name}</h3>
                          <p className="ml-4">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex-1 flex items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {item.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="space-y-4 text-sm text-gray-600 border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between">
                  <dt>Subtotal</dt>
                  <dd className="font-medium text-gray-900">₹{subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Shipping</dt>
                  <dd className="font-medium text-gray-900">{shipping === 0 ? 'Free' : `₹${shipping}`}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>GST (18%)</dt>
                  <dd className="font-medium text-gray-900">₹{tax.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <dt className="text-base font-bold text-gray-900">Total</dt>
                  <dd className="text-2xl font-extrabold text-indigo-600">
                    ₹{total.toFixed(2)}
                  </dd>
                </div>
              </dl>

              <p className="mt-4 text-xs text-center text-gray-400">
                Free shipping on orders above ₹500
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
