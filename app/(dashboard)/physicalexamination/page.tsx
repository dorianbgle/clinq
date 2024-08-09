"use client";

import supabase from "@/packages/lib/supabase/client";
import { ArrowRight } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
type ScrollContainerRef = HTMLDivElement | null;

const sectionTexts = [
  "General Principles of Physical Examination",
  "Cardiovascular System",
  "Respiratory System",
  "Gastrointestinal System",
  "Genitourinary System",
  "Haematological System",
  "Rheumatological System",
  "Endocrine System",
  "Nervous System",
  "Paediatrics",
  "Women's Health",
  "Specialty Systems",
  "Psychiatric Examination",
];

const sectionModules = [
  {
    sectionName: "General Principles of Physical Examination",
    modules: [
      { href: "/1", content: "Establishing Rapport" },
      { href: "/2", content: "Hand washing" },
      { href: "/3", content: "First Impressions" },
    ],
  },
  {
    sectionName: "Cardiovascular System",
    modules: [
      { href: "/4", content: "General Appearance" },
      { href: "/5", content: "Pulse" },
      { href: "/6", content: "Blood Pressure" },
      { href: "/7", content: "Face and Neck" },
      { href: "/8", content: "Praecordium" },
      { href: "/9", content: "Back" },
      { href: "/10", content: "Abdomen and Legs" },
      { href: "/11", content: "Lower Limb and Peripheral Vascular Disease" },
    ],
  },
  {
    sectionName: "Respiratory System",
    modules: [
      { href: "/12", content: "General Appearance" },
      { href: "/13", content: "Pulse" },
      { href: "/14", content: "Blood Pressure" },
      { href: "/15", content: "Face and Neck" },
      { href: "/16", content: "Praecordium" },
      { href: "/17", content: "Back" },
      { href: "/18", content: "Abdomen and Legs" },
      { href: "/19", content: "Lower Limb and Peripheral Vascular Disease" },
    ],
  },
  {
    sectionName: "Gastrointestinal System",
    modules: [
      { href: "/12", content: "General Appearance" },
      { href: "/13", content: "Pulse" },
      { href: "/14", content: "Blood Pressure" },
      { href: "/15", content: "Face and Neck" },
      { href: "/16", content: "Praecordium" },
      { href: "/17", content: "Back" },
      { href: "/18", content: "Abdomen and Legs" },
      { href: "/19", content: "Lower Limb and Peripheral Vascular Disease" },
    ],
  },
  {
    sectionName: "Genitourinary System",
    modules: [
      { href: "/12", content: "General Appearance" },
      { href: "/13", content: "Pulse" },
      { href: "/14", content: "Blood Pressure" },
      { href: "/15", content: "Face and Neck" },
      { href: "/16", content: "Praecordium" },
      { href: "/17", content: "Back" },
      { href: "/18", content: "Abdomen and Legs" },
      { href: "/19", content: "Lower Limb and Peripheral Vascular Disease" },
    ],
  }
];

const Page = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<string>(sectionTexts[0]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;

      // Find the index of the currently visible section
      let visibleIndex = -1;
      Array.from(container.children).forEach((child, index) => {
        const sectionElement = child as HTMLDivElement;
        const sectionTop = sectionElement.offsetTop;
        const sectionBottom = sectionTop + sectionElement.clientHeight;

        // Check if the section is currently in view
        if (
          scrollTop + containerHeight > sectionTop &&
          scrollTop < sectionBottom
        ) {
          visibleIndex = index;
        }
      });

      // Update status based on the currently visible section
      setStatus(
        visibleIndex >= 0 ? sectionTexts[visibleIndex] : "Scroll down..."
      );
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);

    // Initial check in case we start at a section that's already in view
    handleScroll();

    // Cleanup event listener on component unmount
    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
    {/* Issue present with the styling. To be fixed. */}
      <span className="p-5 gap-5 select-none">
        <h1 className="text-2xl">
          Physical Examination + Procedural Technique
        </h1>
        <h3 className="text-zinc-500">
          Study our Physical Examination technique based on Talley O&apos;Connor
          and other industry leaders.
        </h3>
      </span>

      <div className="flex flex-col md:flex-row-reverse justify-center p-5 select-none">
        <div
          ref={containerRef}
          className="overflow-y-scroll p-4 bg-transparent w-full md:w-1/3 md:ml-4 h-96 space-y-5 gap-2"
        >
          {sectionModules.map((i, index) => (
            <div key={index} className="flex flex-col gap-1">
              <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-3 dark:bg-zinc-500" />
              {i.modules.map((i) => (
                <>
                   <p className="py-3 px-3 text-zinc-500 border hover:border-zinc-900 hover:bg-zinc-600/20 rounded-2xl flex items-center gap-2">{i.content}
                   </p>
                </>
              ))}
            </div>
          ))}
        </div>
        <div className="w-full md:w-1/3">
          <p className="sticky top-0 md:top-10 p-4 uppercase text-3xl text-zinc-600 font-semibold text-end">
            {status}
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
