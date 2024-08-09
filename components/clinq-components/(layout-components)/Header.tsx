"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="flex items-center justify-center gap-2">
      <Link className="text-4xl p-3 bg-gradient-to-r from-cyan-400 via-purple-300 to-cyan-300 inline-block text-transparent bg-clip-text font-medium" href={"/"}>ClinQ</Link>
      {pathname === "/login" || pathname.startsWith("/login") ? (
        null
      ) : (
        <section className="flex gap-2 items-center justify-end">
          <Link href="/login" className="bg-slate-300 rounded rounded-lg p-1 hover:bg-slate-200">Login</Link>
          <Link href="/login" className="bg-slate-300 rounded rounded-lg p-1 hover:bg-slate-200">Signup</Link>
        </section>
      )}

      

    </header>
  )
}

export default Header
