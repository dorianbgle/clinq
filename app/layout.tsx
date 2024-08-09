"use client"

import "./globals.css";
import { cn } from "../packages/lib/utils";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Header } from "./(website)/components/header";
import { FooterCTA } from "./(website)/components/footer-cta";
import { Footer } from "./(website)/components/footer";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();

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
        <Header />
        {children}
        <FooterCTA />
        <Footer />
        </main>
        
      ) : ( 
        <>
          {children}
        </>
        
      )}
      

    </body>
    </html>

  );
}
