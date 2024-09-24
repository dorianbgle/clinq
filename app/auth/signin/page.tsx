"use client";

import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { data: session, status } = useSession(); // Access the session data and status
  const [providers, setProviders] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();

  // Fetch providers on the client side
  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
      setLoading(false); // Stop loading once providers are fetched
    };
    fetchProviders();
  }, []);

  // Check if the user is signed in and redirect to protected page
  useEffect(() => {
    if (session) {
      router.push("/protected"); // Redirect to protected page if logged in
    }
  }, [session, router]);

  // Handle loading UI while fetching session or providers
  if (loading || status === 'loading') {
    return (
      <div className="w-full h-screen flex items-center justify-center font-semibold text-7xl">
        Clin<span className="animate-pulse text-zinc-500 text-7xl">Q</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">
        {session ? `Welcome, ${session.user?.name}` : 'Sign in'}
      </h1>

      {/* Display sign out button if user is signed in */}
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
          {/* Display all available providers */}
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

          {/* Explicit Sign in with GitHub Button */}
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
