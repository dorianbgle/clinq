import Header from "./components/header";
import { Metadata } from "next/types";
import Sidebar from "./components/sidebar";
import { ThemeProvider } from "@/app/(dashboard)/components/theme-provider"
import { IoExitSharp } from "react-icons/io5";
import SignOutButton from "@/components/SignOutButton";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "ClinQ | Dashboard",
  description: "Creating better physicians",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const session = await getServerSession();

  // If no session, redirect to the login page
  if (!session) {
    redirect("/signin"); // Redirect to the sign-in page if not authenticated
  }
  return (
    <div className="relative">
                <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
      
      <nav className="h-screen flex-shrink-0 flex-col justify-between fixed top-0 ml-4 pb-4 items-center hidden md:flex">
        <div className="flex flex-col items-center justify-between mt-6 h-full">
          <div className="flex flex-col gap-3">
          <Sidebar />
          </div>
          <SignOutButton />
        </div>
      </nav>
      <div className="mx-4 md:ml-[95px] md:mr-10 pb-8">
        <Header />
        {children}
      </div>
      </ThemeProvider>

    </div>
  );
}
