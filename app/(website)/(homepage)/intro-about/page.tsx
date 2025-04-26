import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ClinQ - About Us",
  description: "Get to know our team of medical students and doctors.",
};

const Page = () => {
  return (
    <div className="container mb-52">
      <div className="mb-40">
        <h1 className="mt-24 font-medium text-center text-[75px] md:text-[170px] mb-2 leading-none text-stroke">
          About
        </h1>
        o
        <h3 className="font-medium text-center text-[75px] md:text-[170px] mb-2 leading-none">
          Us
        </h3>
        <div className="flex items-center flex-col text-center relative">
          <p className="text-lg mt-4 max-w-[600px]">
            We&apos;re a team of medical students and doctors who are passionate
            about improving medical education.
          </p>
        </div>
      </div>


      <Link href="/dashboard">
        <Button className="h-12 px-5 bg-white text-black hover:bg-white/80">
          Get Started
        </Button>
      </Link>
    </div>
  );
};

export default Page;
