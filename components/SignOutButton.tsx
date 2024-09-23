"use client";

import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
