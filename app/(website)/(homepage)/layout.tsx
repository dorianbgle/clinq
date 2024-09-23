import type { Metadata } from "next";
import "../../globals.css";
import { cn } from "@/packages/lib/utils";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FooterCTA } from "../components/footer-cta";

export const metadata: Metadata = {
  title: "ClinQ",
  description: "Creating better physicians",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body
      className={cn(
        `${GeistSans.variable} ${GeistMono.variable}`,
        "bg-[#0C0C0C] overflow-x-hidden dark antialiased"
      )}
    >
      <main className="container mx-auto px-4 overflow-hidden md:overflow-visible">
      <Header />
        {children}
      <FooterCTA />
      <Footer/>
      </main>

    </body>
    </html>

  );
}
