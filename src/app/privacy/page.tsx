export default function PrivacyPage() {
  const lastUpdated = "August 1, 2024";

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">Privacy Policy</h1>
        <p className="text-gray-500 mb-10">Last updated: {lastUpdated}</p>
        
        <div className="prose prose-indigo max-w-none prose-p:text-gray-600 prose-headings:text-gray-900">
          <p>
            At Premium Store, we take your privacy seriously. This Privacy Policy describes how your personal 
            information is collected, used, and shared when you visit or make a purchase from our website.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">1. Personal Information We Collect</h2>
          <p>
            When you visit the Site, we automatically collect certain information about your device, including 
            information about your web browser, IP address, time zone, and some of the cookies that are 
            installed on your device.
          </p>
          <p className="mt-4">
            Additionally, as you browse the Site, we collect information about the individual web pages or 
            products that you view, what websites or search terms referred you to the Site, and information 
            about how you interact with the Site.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">2. Order Information</h2>
          <p>
            When you make a purchase or attempt to make a purchase through the Site, we collect certain 
            information from you, including your name, billing address, shipping address, payment information 
            (processed securely through our payment provider), email address, and phone number. We refer to 
            this information as "Order Information."
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">3. How Do We Use Your Personal Information?</h2>
          <p>
            We use the Order Information that we collect generally to fulfill any orders placed through the 
            Site (including processing your payment information, arranging for shipping, and providing you 
            with invoices and/or order confirmations).
          </p>
          <p className="mt-4">
            Additionally, we use this Order Information to:
          </p>
          <ul className="list-disc pl-6 my-4 text-gray-600">
            <li className="mb-2">Communicate with you;</li>
            <li className="mb-2">Screen our orders for potential risk or fraud; and</li>
            <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">4. Sharing Your Personal Information</h2>
          <p>
            We share your Personal Information with third parties to help us use your Personal Information, 
            as described above. For example, we use Google Analytics to help us understand how our customers 
            use the Site. We also share your information securely with our payment processors (Razorpay) to 
            facilitate transactions.
          </p>
          <p className="mt-4">
            Finally, we may also share your Personal Information to comply with applicable laws and regulations, 
            to respond to a subpoena, search warrant or other lawful request for information we receive, or to 
            otherwise protect our rights.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">5. Data Retention</h2>
          <p>
            When you place an order through the Site, we will maintain your Order Information for our records 
            unless and until you ask us to delete this information.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">6. Contact Us</h2>
          <p>
            For more information about our privacy practices, if you have questions, or if you would like to 
            make a complaint, please contact us by e-mail at:
            <br />
            <strong>Email:</strong> privacy@premiumstore.com
          </p>
        </div>
      </div>
    </div>
  );
}
