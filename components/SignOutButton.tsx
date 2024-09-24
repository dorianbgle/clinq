"use client";

import { signOut } from "next-auth/react";
import { IoExitSharp } from "react-icons/io5";

const SignOutButton = () => {
  return (
    <button className="mb-5 p-3 hover:bg-yellow-800/50 border-yellow-600 hover:border rounded-xl active:scale-90 hover:text-yellow-600"
      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
    >
        <IoExitSharp className="w-5 h-5"/>
    </button>
  );
};

export default SignOutButton;
