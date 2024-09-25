"use client";

import { Button } from "../../../components/ui/button";
import { Sheet, SheetContent } from "../../../components/ui/sheet";
import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { IoExitSharp } from "react-icons/io5";
import SignOutButton from "@/components/SignOutButton";

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
        <section className="flex-col flex space-y-3 text-md">
        <Link className="text-5xl py-5 bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-300 inline-block text-transparent bg-clip-text" href={"/"}>ClinQ</Link>
        <Link href="/dashboard" onClick={() => setOpen(false)} className="">Dashboard</Link>
        <Link href="/approaches" onClick={() => setOpen(false)} className="">Approaches</Link>
        <Link href="/checklists" onClick={() => setOpen(false)}>Checklists</Link>
        <Link href="/specialty" onClick={() => setOpen(false)}>Cases</Link>
        <Link href="/cases" onClick={() => setOpen(false)}>Long Stay Patients</Link>
        </section>
        <div><SignOutButton /></div>
      </SheetContent>
    </Sheet>
  );
}
