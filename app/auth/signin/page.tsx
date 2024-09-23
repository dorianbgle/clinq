"use client";

import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { data: session, status } = useSession();
  const [providers, setProviders] = useState<any>(null);
  const [loadingProviders, setLoadingProviders] = useState(true); 
  const router = useRouter();

  // Fetch available providers on the client side
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await getProviders();
        setProviders(res);
      } catch (error) {
        console.error("Error fetching providers:", error);
      } finally {
        setLoadingProviders(false); 
      }
    };
    fetchProviders();
  }, []);

  // Check subscription status once the session is available
  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch("/api/check-subscription-status", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: session.user.email }),
          });

          const { isActive } = await response.json();

          if (isActive) {
            router.push("/protected");
          } else {
            router.push("/log");
          }
        } catch (error) {
          console.error("Error checking subscription status:", error);
        }
      }
    };

    if (session) {
      checkSubscriptionStatus();
    }
  }, [session, router]);

  // Display loading spinner while fetching providers or session
  if (loadingProviders || status === 'loading') {
    return (
      <div className="w-full h-screen items-center justify-center flex font-semibold text-7xl">
        Clin<span className="animate-pulse text-zinc-500">Q</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">
        {session ? `Welcome, ${session.user?.name}` : 'Sign in'}
      </h1>

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
          {providers && Object.values(providers).map((provider: any) => (
            <div key={provider.name} className="mb-4">
              <button
                onClick={() => signIn(provider.id, { callbackUrl: '/login' })} // Redirect to /login
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}

          <div className="mt-6">
            <button
              onClick={() => signIn("github", { callbackUrl: '/login' })} // Redirect to /login
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
