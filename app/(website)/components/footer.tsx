"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { SubscribeInput } from "./subscribe-input";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { StatusWidget } from "./(homepage-components)/status-widget";

export function Footer() {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of the animation in milliseconds
      easing: "ease-out", // Easing function for the animation
      once: true, // Whether animation should happen only once or every time you scroll up and down
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
            <div>
              <span className="font-medium">Features</span>
              <ul>
                <li className="transition-colors text-[#878787]">
                  <Link href="/overview">Overview</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/approachguide">Symptom Guide</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/checklistguide">Checklists</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/caseguide">Case Files</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/longcaseguide">Long Stay Cases</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/pricing">Pricing</Link>
                </li>
              </ul>
            </div>

            <div>
              <span>Resources</span>
              <ul>
                <li className="transition-colors text-[#878787]">
                  <Link href="/support">Support</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/policy">Privacy policy</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/terms">Terms and Conditions</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/feature-request">Feature Request</Link>
                </li>
              </ul>
            </div>

            <div>
              <span>Company</span>
              <ul>
                <li className="transition-colors text-[#878787]">
                  <Link href="/story">Story</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/open-startup">Open startup</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:w-6/12 flex mt-8 md:mt-0 md:justify-end">
            <div className="flex md:items-end flex-col">
              <div className="mb-8">
                <SubscribeInput group="news" />
              </div>
              <div className="md:mr-0 mt-auto mr-auto">
                <StatusWidget />
              </div>
            </div>
          </div>
        </div>
      </div>

      <h5
        className="text-[#161616] text-[500px] leading-none text-center pointer-events-none font-bold"
        data-aos="fade-up" // Apply AOS animation here
      >
        ClinQ
      </h5>
    </footer>
  );
}
