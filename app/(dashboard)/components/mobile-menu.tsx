"use client";

import { Button } from "../../../components/ui/button";
import { Sheet, SheetContent } from "../../../components/ui/sheet";
import { useState } from "react";
import { Menu } from "lucide-react";

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
      <SheetContent side="left" className="border-none rounded-none -ml-2">
        <div className="ml-2 mb-8">ClinQ</div>
      </SheetContent>
    </Sheet>
  );
}
