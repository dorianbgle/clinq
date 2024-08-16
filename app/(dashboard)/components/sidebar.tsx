"use client";

import Link from "next/link";
import { IoHomeSharp } from "react-icons/io5";
import { GoBriefcase } from "react-icons/go";
import { FaBookOpen } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineChecklist } from "react-icons/md";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PiApertureDuotone } from "react-icons/pi";

const sideLinks = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: IoHomeSharp,
    id: 1,
  },
  {
    name: "Approaches",
    path: "/approaches",
    icon: FaBookOpen,
    id: 2,
  },
  {
    name: "Checklists",
    path: "/checklists",
    icon: MdOutlineChecklist,
    id: 5,
  },
  {
    name: "Specialty",
    path: "/specialty",
    icon: FaUserDoctor,
    id: 6,
  },
  {
    name: "Long Cases",
    path: "/cases",
    icon: GoBriefcase,
    id: 7,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const checkActivePath = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <>
    <Link className="py-2" href={"/"}>
    <PiApertureDuotone className="h-11 w-11"/>
    </Link>
    <hr className="w-10"/>
      {sideLinks.map(({ path, id, icon, name }) => {
        const Icon = icon;
        return (
          <TooltipProvider key={id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`${path}`}
                  className={
                    checkActivePath(path)
                      ? "bg-zinc-800/80 p-3 border-zinc-700 border relative active:scale-90 items-center flex justify-center"
                      : " p-3 hover:bg-zinc-800/80 border-zinc-700 hover:border relative active:scale-90"
                  }
                >
                  <Icon className="h-4 w-4"/>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="absolute left-8 top-3">
                {name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </>
  );
};

export default Sidebar;
