// import Footer from "@/components/clinq-components/(layout-components)/Footer";
import { LandingPage } from "@/components/landing-page";
import { Header } from "./(website)/components/header";
import { Hero } from "./(website)/components/hero";
import { SectionOne } from "./(website)/components/(homepage-components)/section-one";
import { SectionTwo } from "./(website)/components/(homepage-components)/section-two";
import { Screens } from "./(website)/components/(homepage-components)/screens";
import { SectionThree } from "./(website)/components/(homepage-components)/section-three";
import { SectionFour } from "./(website)/components/(homepage-components)/section-four";

export default function Home() {
  return (
    // <main className="h-screen flex flex-col glassmorphism">
      <>
        {/* <Header /> */}
        <Hero />
        <Screens />
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
{/* <LandingPage /> */}
      {/* <Footer/> */}
    {/* </main> */}
</>
      
  );
}
