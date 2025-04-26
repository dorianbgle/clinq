"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { StatusWidget } from "./(homepage-components)/status-widget";

export function Footer() {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out", 
      once: true, 
    });
  }, []);

  if (pathname.includes("pitch")) {
    return null;
  }

  return (
    <footer className="border-t-[1px] border-border px-4 md:px-6 pt-10 md:pt-16 bg-[#0C0C0C] overflow-hidden md:max-h-[820px]">
      <div className="container">
        <div className="flex justify-between items-center border-border border-b-[1px] pb-10 md:pb-16 mb-12">
          <Link href="/" className="font-semibold text-5xl">
            ClinQ
          </Link>

          <span className="md:text-2xl text-right">Study medicine smarter</span>
        </div>

        <div className="flex flex-col md:flex-row w-full">
          <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:w-6/12 justify-between leading-8">
            <>
              <h3 className="font-medium">Features</h3>
              <ul>
                <li className="transition-colors text-[#878787]">
                  <Link href="#overview">Overview</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="#approaches">Approach Guide</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="#checklists">Pre-made Checklists</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="#cases">Case Files</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="#simulations">Hospital Simulations</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="#pricing">Pricing</Link>
                </li>
              </ul>
            </>

            <>
              <h3>Resources</h3>
              <ul>
                <li className="transition-colors text-[#878787]">
                  <Link href="/privacy-policy">Privacy policy</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/terms-and-conditions">Terms and Conditions</Link>
                </li>
              </ul>
            </>

            <>
              <h3>Company</h3>
              <ul>
                <li className="transition-colors text-[#878787]">
                  <Link href="/intro-about">About us</Link>
                </li>
              </ul>
            </>
          </div>

          <div className="md:w-6/12 flex mt-8 md:mt-0 md:justify-end">
            <div className="flex md:items-end flex-col">
              <div className="md:mr-0 mt-auto mr-auto">
                <StatusWidget />
              </div>
            </div>
          </div>
        </div>
      </div>

      <h5
        className="text-[#161616] text-[500px] leading-none text-center pointer-events-none font-bold"
        data-aos="fade-up"
      >
        ClinQ
      </h5>
    </footer>
  );
}
