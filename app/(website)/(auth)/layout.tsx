"use client";

import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <section>
      {pathname === "/login" || pathname.startsWith("/") ? (
        null
      ) : (
         null
      )}
      {children}
    </section>
  );
}
