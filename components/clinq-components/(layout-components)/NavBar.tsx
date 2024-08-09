import Link from "next/link"

const NavBar = () => {
  return (
     <nav className="w-full">
        <ul className="flex justify-center mx-5 items-stretch border border-slate-400">
            <li><Link href="/" className="p-5">Home</Link></li>
            <li><Link href="/contact" className="p-5">Contact</Link></li>
            <li><Link href="/subscription" className="p-5">Subscription</Link></li>
            <li><Link href="/blog" className="p-5">Blog</Link></li>
            <li><Link href="/about" className="p-5">About Us</Link></li>
        </ul>
    </nav>
  )
}

export default NavBar
