"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import condtionSearch from "@/public/condition-search.jpg";
import { useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import { MdOutlineChecklist } from "react-icons/md";
import { cn } from "@/packages/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BarChart } from "lucide-react";
import { BsQuestion } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import { GoBriefcase } from "react-icons/go";

const listVariant = {
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const itemVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export function Header() {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);
  const [showBlur, setShowBlur] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lastPath = `/${pathname.split("/").pop()}`;

  const handleToggleMenu = () => {
    setOpen((prev) => {
      document.body.style.overflow = prev ? "" : "hidden";
      return !prev;
    });
  };

  const handleOnClick = () => {
    setShowBlur(false);
    setHidden(true);

    setTimeout(() => {
      setHidden(false);
    }, 100);
  };

  const links = [
    {
      title: "Features",
      cover: (
        <Link href="#overview" onClick={handleOnClick}>
          <Image alt="ConditionSearch" src={condtionSearch} quality={100} />
        </Link>
      ),
      children: [
        {
          path: "#overview",
          title: "Overview",
          icon: <BarChart size={20} />,
        },
        {
          path: "/intro-approaches",
          title: "Approach Guide",
          icon: <FaBookOpen size={20} />,
        },
        {
          path: "/intro-checklists",
          title: "Pre-made Checklists",
          icon: <MdOutlineChecklist size={20} />,
        },
        {
          path: "#cases",
          title: "Case Files",
          icon: <FaUserDoctor size={20} />,
        },
        {
          path: "#simulations",
          title: "Hospital Simulation",
          icon: <GoBriefcase size={20} />,
        },
      ],
    },
    {
      title: "Pricing",
      path: "/pricing",
    },
  ];

  if (pathname.includes("pitch")) {
    return null;
  }

  return (
    <header
      className={cn(
        "sticky mt-4 top-4 z-50 px-2 md:px-4 md:flex justify-center",
        pathname === "/" &&
          "transition duration-1s ease-in-out animate-header-slide-down-fade"
      )}
    >
      <nav className="border border-border px-4 flex items-center backdrop-filter backdrop-blur-xl bg-zinc-950 bg-opacity-70 h-[50px] z-20">
        <Link href="/">
          <Link
            className="text-4xl p-3 bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-200 inline-block text-transparent bg-clip-text font-medium"
            href={"/"}
          >
            ClinQ
          </Link>
        </Link>

        <ul className="space-x-2 font-medium text-sm hidden md:flex mx-3">
          {links.map(({ path, title, children, cover }) => {
            if (path) {
              return (
                <li key={path}>
                  <Link
                    onClick={handleOnClick}
                    href={path}
                    className="h-8 items-center justify-center text-sm font-medium px-3 py-2 inline-flex text-secondary-foreground transition-opacity hover:opacity-70 duration-200"
                  >
                    {title}
                  </Link>
                </li>
              );
            }

            return (
              <li
                key={title}
                className="group"
                onMouseEnter={() => setShowBlur(true)}
                onMouseLeave={() => setShowBlur(false)}
              >
                <span className="h-8 items-center justify-center text-sm font-medium transition-opacity hover:opacity-70 duration-200 px-3 py-2 inline-flex text-secondary-foreground cursor-pointer">
                  {title}
                </span>

                {children && (
                  <div
                    className={cn(
                      "absolute top-[48px] w-[676px] -left-[1px] bg-[#121212] flex h-0 group-hover:h-[250px] overflow-hidden transition-all duration-300 ease-in-out border-l-[1px] border-r-[1px]",
                      hidden && "hidden"
                    )}
                  >
                    <ul className="p-4 w-[200px] flex-0 space-y-5 mt-2">
                      {children.map((child) => {
                        return (
                          <li key={child.title}>
                            <Link
                              onClick={handleOnClick}
                              href={child.path}
                              className="flex space-x-2 items-center transition-opacity hover:opacity-70 duration-200"
                            >
                              <span>{child.icon}</span>
                              <span className="text-sm font-medium">
                                {child.title}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="flex-1 p-4">{cover}</div>
                    <div className="absolute bottom-0 w-full border-b-[1px]" />
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="ml-auto md:hidden p-2"
          onClick={() => handleToggleMenu()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={13}
            fill="none"
          >
            <path
              fill="currentColor"
              d="M0 12.195v-2.007h18v2.007H0Zm0-5.017V5.172h18v2.006H0Zm0-5.016V.155h18v2.007H0Z"
            />
          </svg>
        </button>

        <a
          className="text-sm font-medium pr-2 border-l-[1px] border-border pl-4 hidden md:block"
          href="/signin"
        >
          Sign in
        </a>
      </nav>

      {isOpen && (
        <motion.div
          className="fixed bg-background -top-[2px] right-0 left-0 bottom-0 h-screen z-10 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="mt-4 flex justify-between p-3 px-4 relative ml-[1px]">
            <button type="button" onClick={handleToggleMenu}>
              <span className="sr-only">Midday Logo</span>
              <BsQuestion />
            </button>

            <button
              type="button"
              className="ml-auto md:hidden p-2 absolute right-[10px] top-2"
              onClick={handleToggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                className="fill-primary"
              >
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
              </svg>
            </button>
          </div>

          <div className="h-screen pb-[150px] overflow-auto">
            <motion.ul
              initial="hidden"
              animate="show"
              className="px-3 pt-8 text-xl text-[#878787] space-y-8 mb-8 overflow-auto"
              variants={listVariant}
            >
              {links.map(({ path, title, children }) => {
                const isActive =
                  path === "/updates"
                    ? pathname.includes("updates")
                    : path === lastPath;

                if (path) {
                  return (
                    <motion.li variants={itemVariant} key={path}>
                      <Link
                        href={path}
                        className={cn(isActive && "text-primary")}
                        onClick={handleToggleMenu}
                      >
                        {title}
                      </Link>
                    </motion.li>
                  );
                }

                return (
                  <li key={path}>
                    <Accordion collapsible type="single">
                      <AccordionItem value="item-1" className="border-none">
                        <AccordionTrigger className="flex items-center justify-between w-full font-normal p-0 hover:no-underline">
                          <span className="text-[#878787]">{title}</span>
                        </AccordionTrigger>

                        {children && (
                          <AccordionContent className="text-xl">
                            <ul className="space-y-8 ml-4 mt-6" key={path}>
                              {children.map((child) => {
                                return (
                                  <li key={child.path}>
                                    <Link
                                      onClick={handleToggleMenu}
                                      href={child.path}
                                      className="text-[#878787]"
                                    >
                                      {child.title}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </AccordionContent>
                        )}
                      </AccordionItem>
                    </Accordion>
                  </li>
                );
              })}

              <motion.li
                className="mt-auto border-t-[1px] pt-8"
                variants={itemVariant}
              >
                <Link className="text-xl text-primary" href="/signin">
                  Sign in
                </Link>
              </motion.li>
            </motion.ul>
          </div>
        </motion.div>
      )}

      <div
        className={cn(
          "fixed w-screen h-screen backdrop-blur-md left-0 top-0 invisible opacity-0 transition-all duration-300 z-10",
          showBlur && "md:visible opacity-100"
        )}
      />
    </header>
  );
}
