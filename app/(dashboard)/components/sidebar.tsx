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
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const initialLinks = [
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
  {
    name: "Search",
    path: "/search",
    icon: IoSearchSharp,
    id: 8,
  },
];

const Sidebar = () => {
  const [sideLinks, setSideLinks] = useState(initialLinks);
  const pathname = usePathname();

  const checkActivePath = (path: string) => pathname.startsWith(path);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    const reorderedLinks = Array.from(sideLinks);
    const [movedLink] = reorderedLinks.splice(source.index, 1);
    reorderedLinks.splice(destination.index, 0, movedLink);

    setSideLinks(reorderedLinks);
  };

  return (
    <div className="flex flex-col items-center select-none">
      <Link className="py-2" href={"/"}>
        <PiApertureDuotone className="h-11 w-11" />
      </Link>
      <hr className="w-10" />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sideLinks" direction="vertical">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col items-center space-y-2 w-full pt-5 "
            >
              {sideLinks.map(({ path, id, icon: Icon, name }, index) => (
                <Draggable key={id} draggableId={id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="w-full flex justify-center"
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={path}
                              className={`${
                                checkActivePath(path)
                                  ? "bg-zinc-800/80 p-3 border-zinc-700 border relative active:scale-90 items-center flex justify-center w-full"
                                  : "p-3 hover:bg-zinc-800/80 border-zinc-700 hover:border relative active:scale-90 w-full flex justify-center"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent className="absolute left-8 top-3 z-20">
                            {name}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Sidebar;
