"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function SubscriptionPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const handleSubscription = async () => {
    setLoading(true);

    // Make sure the user's session is loaded before proceeding
    if (!session?.user?.email) {
      console.error("User email is required to create a subscription session.");
      setLoading(false);
      return;
    }

    try {
      // Create a subscription session by making a request to our API route
      const response = await fetch("/api/create-subscription-session", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session.user.email }), // Send user's email
      });

      const sessionData = await response.json();

      if (sessionData.id) {
        const stripe = await stripePromise;
        // Redirect to the Stripe Checkout page
        await stripe?.redirectToCheckout({ sessionId: sessionData.id });
      } else {
        console.error("Failed to create Stripe session:", sessionData.error);
      }
    } catch (error) {
      console.error("Error during subscription process:", error);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Subscribe to Premium</h1>
      <button
        onClick={handleSubscription}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={loading || status === 'loading'}
      >
        {loading ? "Processing..." : "Subscribe with Stripe"}
      </button>
    </div>
  );
}
