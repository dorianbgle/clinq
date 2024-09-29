"use client";

import "./globals.css";
import { cn } from "../packages/lib/utils";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Header } from "./(website)/components/header";
import { FooterCTA } from "./(website)/components/footer-cta";
import { Footer } from "./(website)/components/footer";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  useEffect(() => {
    // Check if the signOutToast flag is set in local storage
    const showToast = localStorage.getItem("signOutToast");
    if (showToast === "true") {
      // Show the success toast
      toast.success("You have successfully signed out.", {
        style: {
          borderRadius: "10px",
          background: "#000000",
          color: "#FFFFFF",
        },
      });
      // Remove the flag from local storage after displaying the toast
      localStorage.removeItem("signOutToast");
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${GeistSans.variable} ${GeistMono.variable}`,
          "bg-[#0C0C0C] overflow-x-hidden dark antialiased"
        )}
      >
        {pathname === "/" ? (
          <main className="container mx-auto px-4 overflow-hidden md:overflow-visible">
            <Analytics />
            <SpeedInsights />
            <Header />
            {children}
            <FooterCTA />
            <Footer />
            <Toaster position="bottom-right" reverseOrder={false} />
          </main>
        ) : (
          <>
            <SessionProvider>
              {children}
              <Toaster position="top-center" reverseOrder={false} />
            </SessionProvider>
          </>
        )}
      </body>
    </html>
  );
}
