import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton"; // Ensure the correct path for your component

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  // If no session, redirect to the login page
  if (!session) {
    redirect("/auth/signin"); // Redirect to the sign-in page if not authenticated
  }

  // If authenticated, render the protected content
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Protected Page</h1>
      <p>Welcome, {session?.user?.name}! You have access to this protected content.</p>
      {/* Sign-out button */}
      <SignOutButton />
    </div>
  );
}
