"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [products, ordersSnap, usersSnap] = await Promise.all([
          getProducts(),
          getDocs(collection(db, "orders")),
          getDocs(collection(db, "users"))
        ]);

        let revenue = 0;
        ordersSnap.forEach((doc) => {
          revenue += doc.data().total || 0;
        });

        setStats({
          totalProducts: products.length,
          totalOrders: ordersSnap.size,
          totalRevenue: revenue,
          totalUsers: usersSnap.size
        });
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]"></div>
    );
  }

  const statCards = [
    { name: "Total Revenue", value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: "bg-green-500" },
    { name: "Products", value: stats.totalProducts.toString(), icon: Package, color: "bg-indigo-500" },
    { name: "Orders", value: stats.totalOrders.toString(), icon: ShoppingCart, color: "bg-blue-500" },
    { name: "Customers", value: stats.totalUsers.toString(), icon: Users, color: "bg-purple-500" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <Link 
          href="/admin/products/add" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`${stat.color} p-4 rounded-xl text-white shadow-sm`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="flex flex-col items-center justify-center h-48 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
            <p className="text-sm">Activity feed will appear here</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h2>
          <div className="space-y-3">
            <Link href="/admin/products" className="flex items-center justify-between p-4 bg-gray-50 hover:bg-indigo-50 rounded-xl transition-colors border border-gray-100 text-gray-700 hover:text-indigo-700 font-medium">
              Manage Products overview
              <span className="text-indigo-600">&rarr;</span>
            </Link>
            <Link href="/admin/products/add" className="flex items-center justify-between p-4 bg-gray-50 hover:bg-indigo-50 rounded-xl transition-colors border border-gray-100 text-gray-700 hover:text-indigo-700 font-medium">
              Add a new product
              <span className="text-indigo-600">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
