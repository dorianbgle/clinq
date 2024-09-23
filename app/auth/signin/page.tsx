"use client";

import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { data: session, status } = useSession(); // Access session data and status
  const [providers, setProviders] = useState<any>(null); // Store providers
  const router = useRouter(); // Use Next.js router

  // Fetch available providers on the client side
  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  // Check subscription status once the session is available
  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      if (session?.user?.email) {
        // Call API to check subscription status in Supabase
        const response = await fetch("/api/check-subscription-status", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: session.user.email }), // Send user email
        });

        const { isActive } = await response.json();

        // If subscription is active, redirect to /protected
        if (isActive) {
          router.push("/protected");
        } else {
          // Otherwise, redirect to the /subscription page
          router.push("/log");
        }
      }
    };

    if (session) {
      checkSubscriptionStatus();
    }
  }, [session, router]);

  // Display loading spinner while fetching providers or session
  if (!providers || status === 'loading') {
    return (
      <div className="w-full h-screen items-center justify-center flex font-semibold text-7xl">
        Clin<span className="animate-pulse text-zinc-500 text-7xl">Q</span>
      </div>
    );
  }

  // Render the login/sign-out buttons and the list of providers
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">
        {session ? `Welcome, ${session.user?.name}` : 'Sign in'}
      </h1>

      {/* Show sign-out button if the user is signed in */}
      {session ? (
        <div className="mt-6">
          <p className="mb-4">Signed in as {session.user?.email}</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sign out
          </button>
        </div>
      ) : (
        <>
          {/* Display available providers for signing in */}
          {providers && Object.values(providers).map((provider: any) => (
            <div key={provider.name} className="mb-4">
              <button
                onClick={() => signIn(provider.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}

          {/* Explicit Sign-in with GitHub button */}
          <div className="mt-6">
            <button
              onClick={() => signIn("github")}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Sign in with GitHub
            </button>
          </div>
        </>
      )}
    </div>
  );
}
