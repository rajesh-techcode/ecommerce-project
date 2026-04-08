import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Users, Shield, Zap } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      name: "Customer First",
      description: "Everything we do is focused on delivering the best possible experience to our customers. Your satisfaction is our top priority.",
      icon: Users,
    },
    {
      name: "Quality Guarantee",
      description: "We source our products from trusted manufacturers and rigorously test everything to ensure premium quality.",
      icon: CheckCircle2,
    },
    {
      name: "Secure Shopping",
      description: "Your data privacy and payment security are paramount. We use industry-leading encryption to keep your information safe.",
      icon: Shield,
    },
    {
      name: "Fast Delivery",
      description: "We understand you want your items quickly. Our optimized logistics network ensures rapid processing and shipping.",
      icon: Zap,
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">About Us</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              We started with a simple vision: to create a destination where premium quality meets everyday convenience. 
              Today, we serve thousands of happy customers worldwide with our curated selection of hand-picked products.
            </p>
          </div>
        </div>
      </div>

      {/* Values section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Core Values</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              These principles guide everything we do, from sourcing new products to handling customer support.
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.name}>
                <dt className="font-semibold text-gray-900 flex items-center gap-2">
                  <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                    <value.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  {value.name}
                </dt>
                <dd className="mt-4 text-gray-600">{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Story section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:gap-x-24">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Story</h2>
              <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                  <p className="text-xl leading-8 text-gray-600">
                    Founded in 2024, we recognized a gap in the market for a truly customer-centric e-commerce platform that didn't compromise on aesthetic appeal or product quality.
                  </p>
                  <p className="mt-10 max-w-xl text-base leading-7 text-gray-600">
                    What began as a small operation out of a garage has grown into a global marketplace. But despite our rapid growth, we haven't lost sight of what made us successful in the first place: a relentless dedication to our customers and an unwavering eye for quality.
                  </p>
                  <p className="mt-10 max-w-xl text-base leading-7 text-gray-600">
                    We're building more than just a store; we're building a community of passionate individuals who value great design and exceptional functionality. Join us on this journey.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 flex justify-center lg:justify-end items-center">
              <div className="w-full max-w-md h-[400px] bg-indigo-100 rounded-3xl flex items-center justify-center p-8 text-center text-indigo-800 font-medium">
                [Company Team Photo placeholder]
                <br />(In a real app, this would be an image)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center bg-indigo-600 rounded-3xl px-6 py-20 sm:p-20">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to dive in?</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100">
              Start exploring our curated collection today and discover why thousands of customers choose us.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/"
                className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
