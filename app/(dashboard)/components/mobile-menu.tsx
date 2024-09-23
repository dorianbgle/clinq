"use client";

import { Button } from "../../../components/ui/button";
import { Sheet, SheetContent } from "../../../components/ui/sheet";
import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { IoExitSharp } from "react-icons/io5";

export function MobileMenu() {
  const [isOpen, setOpen] = useState(false);
  // Check Mobile View for File

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setOpen(true)}
          className="rounded-full w-8 h-8 items-center relative flex md:hidden"
        >
          <Menu size={16} />
        </Button>
      </div>
      <SheetContent side="left" className="border-none rounded-none -ml-2 flex flex-col p-10 justify-between">
        <section className="flex-col flex space-y-3 text-xl">
        <Link className="text-5xl p-3 bg-gradient-to-r from-cyan-400 via-purple-300 to-cyan-300 inline-block text-transparent bg-clip-text font-medium" href={"/"}>ClinQ</Link>
        <Link href="/dashboard" onClick={() => setOpen(false)} className="">Dashboard</Link>
        <Link href="/approaches" onClick={() => setOpen(false)} className="">Approaches</Link>
        <Link href="/checklists" onClick={() => setOpen(false)}>Checklists</Link>
        <Link href="/specialty" onClick={() => setOpen(false)}>Cases</Link>
        <Link href="/cases" onClick={() => setOpen(false)}>Long Stay Patients</Link>
        </section>
        <section className="flex text-sm gap-2 rounded-xl hover:bg-yellow-800/20 p-2 border-yellow-700 hover:border hover:text-yellow-700 justify-center"><IoExitSharp className="w-5 h-5"/> Sign Out</section>
      </SheetContent>
    </Sheet>
  );
}
