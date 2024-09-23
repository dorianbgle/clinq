// app/components/LoginButton.tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image"

export default function LoginButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (session) {
    return (
      <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Welcome, {session.user?.name}!
        </h2>
        <p className="text-gray-600 mb-4">Email: {session.user?.email}</p>
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt={`${session.user?.name}'s profile picture`}
            className="w-16 h-16 rounded-full mb-4"
          />
        )}
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg">
      <p className="text-gray-700 mb-4">You are not signed in</p>
      <button
        onClick={() => signIn("github")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
