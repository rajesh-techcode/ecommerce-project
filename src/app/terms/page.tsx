export default function TermsPage() {
  const lastUpdated = "August 1, 2024";

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">Terms of Service</h1>
        <p className="text-gray-500 mb-10">Last updated: {lastUpdated}</p>
        
        <div className="prose prose-indigo max-w-none prose-p:text-gray-600 prose-headings:text-gray-900">
          <p>
            Welcome to Premium Store. By accessing or using our website, you agree to be bound by these Terms of Service. 
            Please read them carefully before using our platform.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing this website, we assume you accept these terms and conditions. Do not continue to use 
            Premium Store if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">2. Account Registration</h2>
          <p>
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
            Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
          </p>
          <ul className="list-disc pl-6 my-4 text-gray-600">
            <li className="mb-2">You are responsible for safeguarding the password that you use to access the service.</li>
            <li className="mb-2">You agree not to disclose your password to any third party.</li>
            <li>You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">3. E-commerce Purchases</h2>
          <p>
            If you wish to purchase any product made available through the Service ("Purchase"), you may be asked to supply certain 
            information relevant to your Purchase including, without limitation, your credit card number, the expiration date of 
            your credit card, your billing address, and your shipping information.
          </p>
          <p className="mt-4">
            You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) in 
            connection with any Purchase; and that (ii) the information you supply to us is true, correct and complete.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">4. Shipping and Returns</h2>
          <p>
            Our Shipping and Returns policies are described in detail on our FAQ page and form part of these Terms of Service. 
            We reserve the right to refuse or cancel your order at any time for certain reasons including but not limited to: 
            product or service availability, errors in the description or price of the product or service, error in your order 
            or other reasons.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">5. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of 
            Premium Store and its licensors. The Service is protected by copyright, trademark, and other laws of both the 
            United States and foreign countries.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">6. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
            <br />
            <strong>Email:</strong> legal@premiumstore.com
          </p>
        </div>
      </div>
    </div>
  );
}
