import Link from "next/link"

const NavBar = () => {
  return (
     <nav className="w-full">
        <div className="flex justify-center">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
        </div>
    </nav>
  )
}

export default NavBar
