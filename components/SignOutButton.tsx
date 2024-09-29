"use client";

import { signOut } from "next-auth/react";
import { IoExitSharp } from "react-icons/io5";

const SignOutButton = () => {
  const handleSignOut = async () => {
    try {
      // Set a flag in local storage to display the toast on the next page
      localStorage.setItem("signOutToast", "true");
      // Sign the user out and redirect to the sign-in page
      await signOut({ callbackUrl: "/auth/signin" });
    } catch (error) {
      console.error("Error during sign out", error);
    }
  };

  return (
    <button
      className="mb-5 p-3 hover:bg-yellow-800/50 border-yellow-600 hover:border rounded-xl active:scale-90 hover:text-yellow-600 flex items-center justify-center"
      onClick={handleSignOut}
    >
      <IoExitSharp className="w-5 h-5" />
    </button>
  );
};

export default SignOutButton;
