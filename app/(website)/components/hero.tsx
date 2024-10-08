"use client";

import { Button } from "@/components/ui/button";
import { cn } from "../../../packages/lib/utils";
import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Hero() {
  const [isPlaying, setPlaying] = useState(false);

  useEffect(() => {
    setPlaying(true);
  }, []);

  return (
    <motion.section
      className="md:mt-[250px] relative md:min-h-[375px]"
      onViewportEnter={() => {
        if (!isPlaying) {
          setPlaying(true);
        }
      }}
      onViewportLeave={() => {
        if (isPlaying) {
          setPlaying(false);
        }
      }}
    >
      <div className="hero-slide-up flex flex-col mt-[240px]">
        <div>
          <div
            className="rounded-full flex space-x-2 items-center "
          >
            <span className="font-mono text-xs border border-zinc-700 p-2 rounded-2xl">Currently in Beta</span>
          </div>
        </div>

        <h1 className="text-[30px] md:text-[90px] font-medium mt-6 leading-none">
          Creating first-class
          <br /> physicians
        </h1>

        <p className="mt-4 md:mt-6 max-w-[600px] text-[#878787]">
          An all-in-one tool for medical students, interns, registrars, and
          allied health to simulate real-world medical scenarios, build clinical
          acumen, and perform better.
        </p>

        <div className="mt-8">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="border border-primary h-12 px-6"
              >
                Talk to us
              </Button>
            </Link>

            <a href="/dashboard">
              <Button className="h-12 px-5">Get Started</Button>
            </a>
          </div>
        </div>

        <p className="text-xs text-[#707070] mt-8 font-mono">
          Used by{" "}
            <span className="underline">internationally</span>

          recognised medical schools.
        </p>
      </div>

      {/* Consider importing later on */}

      {/* <div className="scale-50 md:scale-100 -top-[500px] -right-[380px] pointer-events-none transform-gpu grayscale md:flex lg:animate-[open-scale-up-fade_1.5s_ease-in-out] absolute md:-right-[200px] xl:-right-[100px] w-auto h-auto md:-top-[200px]">
        <div className={cn(isPlaying && "animate-webgl-scale-in-fade")}>
          {isPlaying && (
            <Spline
              scene="https://prod.spline.design/HAMm7mSDmXF4PVqs/scene.splinecode"
              style={{
                width: "auto",
                height: "auto",
                background: "transparent",
              }}
            />
          )}
        </div>
      </div> */}
    </motion.section>
  );
}
