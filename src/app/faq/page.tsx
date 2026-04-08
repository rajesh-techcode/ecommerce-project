"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      question: "What forms of payment do you accept?",
      answer: "We securely process payments through Razorpay, which accepts credit cards (Visa, MasterCard, American Express), debit cards, Netbanking, UPI, and various mobile wallets.",
    },
    {
      question: "How long does shipping typically take?",
      answer: "Standard shipping typically takes 3-5 business days within the continental US. International shipping can take 7-14 business days depending on customs processing.",
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day money-back guarantee on all our products. If you are not completely satisfied with your purchase, you can return it within 30 days of receipt for a full refund (minus shipping costs). Items must be in their original, unused condition.",
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 50 countries worldwide. International shipping rates and estimated delivery times are calculated at checkout based on your destination.",
    },
    {
      question: "How can I track my order?",
      answer: "Once your order has shipped, you will receive a confirmation email containing a tracking number and a link to track your package in real-time.",
    },
    {
      question: "Can I cancel or modify my order?",
      answer: "Orders can only be modified or cancelled within 1 hour of placement, as we begin processing them very quickly. Please contact our support team immediately if you need to make changes.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-[70vh] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-base leading-7 text-gray-600">
            Have a different question and can't find the answer you're looking for? Reach out to our support team by sending us an email and we'll get back to you as soon as we can.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-3xl divide-y divide-gray-200">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-200 text-left">
            {faqs.map((faq, index) => (
              <div key={index} className="px-6 py-6 sm:px-8 sm:py-8">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  <span className="ml-6 flex items-center bg-gray-50 rounded-full p-1 text-gray-500">
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </button>
                <div 
                  className={`mt-4 pr-12 transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'block opacity-100' : 'hidden opacity-0'
                  }`}
                >
                  <p className="text-base text-gray-600 leading-7">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 sm:mt-24 flex justify-center">
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 text-center max-w-2xl w-full">
            <h3 className="text-lg font-semibold text-indigo-900 mb-2">Still need help?</h3>
            <p className="text-indigo-700 mb-6">Our customer care team is available 24/7 to answer your questions.</p>
            <a 
              href="/contact" 
              className="inline-flex justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
