import Auth from "@/clinq-components/layout-components/(layout-components)/Auth";
import Footer from "@/clinq-components/layout-components/(layout-components)/Footer";
import Header from "@/clinq-components/layout-components/(layout-components)/Header";
import NavBar from "@/clinq-components/layout-components/(layout-components)/NavBar";
import Link from "next/link";

export default function Home() {

  return (
    <main className="w-full h-screen flex flex-col">
    <title>ClinQ</title>
    <header className="flex p-5 items-center text-3xl"><Header/><Auth/></header>
    <NavBar/> 
      <Link href='/approach'>Approaches</Link>
      <Link href='/specialty'>Specialty</Link>
    <Footer/>
    </main>
  );
}
