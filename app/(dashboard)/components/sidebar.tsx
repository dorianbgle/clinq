"use client";

import Link from "next/link";
import { IoHomeSharp } from "react-icons/io5";
import { GoBriefcase } from "react-icons/go";
import { FaMicroscope, FaRegListAlt } from "react-icons/fa";
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
import { IoBody } from "react-icons/io5";

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
    name: "Technique",
    path: "/physicalexamination",
    icon: IoBody,
    id: 3,
  },
  {
    name: "Interpretation",
    path: "/interpretation",
    icon: FaMicroscope,
    id: 4,
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
                      ? "bg-zinc-900 p-4 border-zinc-600 border relative rounded-xl active:scale-90"
                      : " p-4 hover:bg-zinc-900 border-zinc-600 hover:border relative rounded-xl active:scale-90"
                  }
                >
                  <Icon />
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
