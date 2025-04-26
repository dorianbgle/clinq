import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";

export default async function ProtectedPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Protected Page</h1>
      <p>Welcome, {session?.user?.name}! You have access to this protected content.</p>
      <SignOutButton />
    </div>
  );
}
