"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function FooterCTA() {
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
    <div className="border border-border md:container text-center px-10 py-14 mx-4 md:mx-auto md:px-24 md:py-20 mb-32 mt-24 flex items-center flex-col bg-[#121212]">
      <span
        className="text-6xl md:text-8xl font-medium text-white"
        data-aos="fade" // Changed to "fade" for simple fade-in effect
      >
        Study smarter with ClinQ.
      </span>
      <p className="text-[#878787] mt-6">
        An all-in-one tool for medical students, interns and allied health,
        <br />
        to simulate real-world medical scenarios, build clinical acumen and
        perform better.
      </p>

      <div className="mt-10 md:mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="border border-primary h-12 px-6 border-white text-white hidden md:block"
            >
              Talk to us
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button className="h-12 px-5 bg-white text-black hover:bg-white/80">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
