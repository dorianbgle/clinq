import { getServerSession } from "next-auth/next"; // No need for authOptions
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  // Get session information directly without passing authOptions
  const session = await getServerSession();

  // If no session, redirect to the login page
  if (!session) {
    redirect("/signin"); // Redirect to the sign-in page if not authenticated
  }

  // If authenticated, render the protected content

}
