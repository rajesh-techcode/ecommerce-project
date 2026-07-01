import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, ShoppingBag } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">Premium Store</span>
            </Link>
            <p className="text-sm leading-6 text-gray-600 max-w-xs">
              Making the world a better place through beautifully crafted, high-quality products delivered straight to your door.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" aria-hidden="true" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" aria-hidden="true" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" aria-hidden="true" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                <span className="sr-only">YouTube</span>
                <Youtube className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Shop</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/category/electronics" className="text-sm leading-6 text-gray-600 hover:text-indigo-600 transition-colors">Electronics</Link>
                  </li>
                  <li>
                    <Link href="/category/clothing" className="text-sm leading-6 text-gray-600 hover:text-indigo-600 transition-colors">Clothing</Link>
                  </li>
                  <li>
                    <Link href="/category/home" className="text-sm leading-6 text-gray-600 hover:text-indigo-600 transition-colors">Home & Garden</Link>
                  </li>
                  <li>
                    <Link href="/" className="text-sm leading-6 text-gray-600 hover:text-indigo-600 transition-colors">All Products</Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/faq" className="text-sm leading-6 text-gray-600 hover:text-indigo-600 transition-colors">Pricing & FAQ</Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-sm leading-6 text-gray-600 hover:text-indigo-600 transition-colors">Contact Us</Link>
                  </li>
                  <li>
                    <Link href="/returns" className="text-sm leading-6 text-gray-600 hover:text-indigo-600 transition-colors">Returns</Link>
                  </li>
                  <li>
                    <Link href="/profile" className="text-sm leading-6 text-gray-600 hover:text-indigo-600 transition-colors">Order Status</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/blog" className="text-sm leading-6 text-gray-600 hover:text-indigo-600 transition-colors">Blog</Link>
                  </li>
                  <li>
                    <Link href="/careers" className="text-sm leading-6 text-gray-600 hover:text-indigo-600 transition-colors">Careers</Link>
                  </li>
                  <li>
                    <Link href="/careers" className="text-sm leading-6 text-gray-600 hover:text-indigo-600 transition-colors">Careers</Link>
                  </li>
                  <li>
                    <Link href="/press" className="text-sm leading-6 text-gray-600 hover:text-indigo-600 transition-colors">Press</Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/privacy" className="text-sm leading-6 text-gray-600 hover:text-indigo-600 transition-colors">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-sm leading-6 text-gray-600 hover:text-indigo-600 transition-colors">Terms of Service</Link>
                  </li>
                  <li>
                    <Link href="/cookies" className="text-sm leading-6 text-gray-600 hover:text-indigo-600 transition-colors">Cookie Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-200 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-500 text-center">
            &copy; {currentYear} Premium Store, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
