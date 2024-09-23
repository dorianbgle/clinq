"use client"

import React, { useEffect } from 'react';
import AOS from 'aos'
import 'aos/dist/aos.css';

export function SectionOne() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of the animation in milliseconds
    });
  }, []);

  return (
    <section
      className="mt-24 md:mt-[200px] mb-12"
      id="overview"
      data-aos="fade-right" // Add AOS animation attribute here
    >
      <h3 className="text-4xl md:text-8xl font-medium">Case-based approach</h3>
      <p className="mt-4 md:mt-8 text-[#878787]">
        Students are guided from a symptom-based approached, provided with
        comprehensive checklists and cases that simulate real-world scenarios.
      </p>
    </section>
  );
}
