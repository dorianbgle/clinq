"use client";

import { signOut } from "next-auth/react";
import { IoExitSharp } from "react-icons/io5";
import { toast } from "@/components/ui/use-toast"; // Adjust the path according to your setup

const SignOutButton = () => {
  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/auth/signin" });
      toast({
        title: "Signed out",
        description: "You have successfully signed out."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again."
      });
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
