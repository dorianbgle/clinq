// import supabase from "@/lib/supabase/client"

import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";

const DashboardDisplay = () => {
  // Using Supasbase, select featured modules to display.
  const exampleModules = [
    { id: "1", name: "63M Shortness of Breath" },
    { id: "2", name: "81F Weakness in Right Hand" },
    { id: "3", name: "4M Visual Disturbances" },
    { id: "4", name: "13M Visual Disturbances" },
    { id: "4", name: "13M Visual Disturbances" },
  ];

  return (
    <>
      <>
        <Link
          className="flex flex-col p-5 pl-14 border-2 h-72 justify-end items-end bg-gradient-to-r from-black to-zinc-900 gap-2 hover:border-zinc-600 delay-300 duration-150 ease-in-out"
          href={"/approaches"}
        >
          <h2 className="text-2xl flex items-center">
            Review our Modules&nbsp;
            <MdArrowRightAlt />
          </h2>
          <h3 className="text-zinc-500">
            Read through of Guide on how to use ClinQ for efficient and
            effective study.
          </h3>
        </Link>
        {/* <aside className="grid grid-cols-1 justify-evenly">
        {exampleModules && exampleModules.map((module) => (
            <figure key={module.id} className="p-4 border hover:bg-zinc-800">
                {module.name}
            </figure>
        ))}
        </aside> */}
      </>
    </>
  );
};

export default DashboardDisplay;
